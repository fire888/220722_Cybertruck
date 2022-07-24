import { checkDevice } from './utils/checkDevice'
import { showStartButton, hideStartScreen } from './ui/hideStartScreen'
import { createStudio } from './entities/Studio'
import { createKeyBoard } from './utils/createKeyBoard'
import { createLoadManager } from './helpers/LoadManager'
import { createPlayer } from './entities/Player'
import { createCamera } from './entities/Camera'
import { startFrameUpater } from './utils/createFrameUpater'
import { ASSETS_TO_LOAD } from './constants/constants_assetsToLoad'
//import { createActions } from './actions/actions'
import { createCyberTruck } from  './systems/cyberTruck'
import { createTown } from './systems/town'

import Stats from 'three/examples/jsm/libs/stats.module.js';


const root = {
  appData: {}
}


/** INIT  ***********************************************************/

const initApp = () => {
  root.device = checkDevice()
  root.studio = createStudio(root.emitter)
  root.studio.initScene()
  root.keyboard = createKeyBoard(root)


  root.camMovies = createCamera(root)
  root.studio.setCamera(root.camMovies.camera)


  root.loadManager = new createLoadManager()
  root.loadManager.startLoad(ASSETS_TO_LOAD).then(assets => {
    const stats = new Stats()
    const container = document.querySelector('.canvas-wrapper')
    container.appendChild(stats.dom)
    
    root.assets = assets
    root.town = createTown(root)
    root.cyberTruck = createCyberTruck(root)
    root.player = createPlayer(root)
    root.studio.setCamera(root.player.getCamera())
    root.cyberTruck.setPlayerToCollisions(root.player.getCollisionMesh())


    root.frameUpdater = startFrameUpater(root)
    root.frameUpdater.on(n => {
      root.player.update(n)
      root.cyberTruck.update(n)
      root.studio.render()
      stats.update()
    })
    hideStartScreen(root, () => {
      root.keyboard.show()
    })
  })
}


window.addEventListener('load', initApp)

