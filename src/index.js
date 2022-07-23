
import { showStartButton, hideStartScreen } from './ui/hideStartScreen'
import { createStudio } from './entities/Studio'
import { createKeyBoard } from './utils/createKeyBoard'
import { createEventEmitter } from './utils/createEventEmitter'
import { createLoadManager } from './helpers/LoadManager'
//import { createPlayer } from './entities/Player'
import { createCamera } from './entities/Camera'
import { startFrameUpater } from './utils/createFrameUpater'
//import { createProjector } from './helpers/Projector'
import { ASSETS_TO_LOAD } from './constants/constants_assetsToLoad'
//import { createActions } from './actions/actions'
import { createCyberTruck } from  './systems/cyberTruck'
import { createTown } from './systems/town'


const root = {}


/** INIT  ***********************************************************/

const initApp = () => {
  root.emitter = createEventEmitter()

  root.studio = createStudio(root.emitter)
  root.studio.initScene()


  root.camMovies = createCamera(root)
  root.studio.setCamera(root.camMovies.camera)

  //root.projector = createProjector()
  //root.projector.setCamera(root.camMovies.camera)

  root.loadManager = new createLoadManager()
  //root.actions = createActions(root)
  root.loadManager.startLoad(ASSETS_TO_LOAD).then(assets => {
    root.assets = assets
    root.town = createTown(root)
    root.cyberTruck = createCyberTruck(root)

    root.frameUpdater = startFrameUpater(root)
    root.frameUpdater.on(() => {
      root.cyberTruck.update()
      root.studio.render()
    })
    hideStartScreen()
  })
}


window.addEventListener('load', initApp)

