
import { showStartButton, hideStartScreen } from './ui/hideStartScreen'
import { createStudio } from './entities/Studio'
//import { createKeyBoard } from './utils/createKeyBoard'
import { createEventEmitter } from './utils/createEventEmitter'
import { createLoadManager } from './helpers/LoadManager'
//import { createPlayer } from './entities/Player'
import { createCamera } from './entities/Camera'
import { startFrameUpater } from './utils/createFrameUpater'
import { createProjector } from './helpers/Projector'
import { ASSETS_TO_LOAD } from './constants/constants_assetsToLoad'
import { createActions } from './actions/actions'
import { createCyberTruck } from  './systems/cyberTruck'


const root = {}


/** INIT  ***********************************************************/

const initApp = () => {
  root.emitter = createEventEmitter()
  root.frameUpdater = startFrameUpater(root.emitter)

  root.studio = createStudio(root.emitter)
  root.studio.initScene()


  root.camMovies = createCamera(root)
  root.studio.setCamera(root.camMovies.camera)

  root.projector = createProjector()
  root.projector.setCamera(root.camMovies.camera)

  root.loadManager = new createLoadManager()
  root.actions = createActions(root)
  root.loadManager.startLoad(ASSETS_TO_LOAD).then(assets => {
    root.cyberTruck = createCyberTruck(root, assets)
    hideStartScreen()
  })
}


window.addEventListener('load', initApp)

