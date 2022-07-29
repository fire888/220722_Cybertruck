

import { initApp } from './vidget3d'
// import * as C_2D from './2D/main'

const startTime = new Date().getTime()
const showBottomBlock = () => {
    let bottomBlock = document.getElementById( 'bottom-scheme' )
    bottomBlock.className = 'show'
    bottomBlock.style.display = 'flex'
  } 

window.onload = () => {
    initApp(showBottomBlock )
   //initBottomHTML()

}

///const checkStartingTimeAndStart = () => {
// let loadingTime = new Date().getTime() - startTime
//  loadingTime < 1500 ? setTimeout( startApp, 1500 - loadingTime ) : startApp()
//}

const startApp = () => {
  APP_3D.startAPP() 
  //showElement( document.getElementById( 'webgl' ) )
  //hideElement( document.getElementById( 'preloader' ) )
  setMouseWeel( APP_3D.startFlashTopCanvas )  
  APP_3D.setOnBottomAnimationDone( showBottomBlock )  
  setWindowResize( APP_3D.resizeCanvas )
}


/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/ 
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/ 

let onResize

const setWindowResize = f => { 
    onResize = f 
    window.addEventListener( 'resize', () => { 
        onResize( 
          { w: window.innerWidth, h: window.innerHeight },  
          { w: window.innerWidth, h: window.innerHeight },  
         )
        resizeIcons()
      }, false )
}


/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/ 

let actionMouseWheel

const setMouseWeel = f => { 
  actionMouseWheel = f
  document.addEventListener( 'wheel', onMouseWheel, false )
  document.addEventListener( 'scroll', onMouseWheel, false ) 
  document.addEventListener( 'touchstart', onMouseWheel, false)    
}   

const removeListenerMouseWheel = () => {
  document.removeEventListener( 'wheel', onMouseWheel, false )
  document.removeEventListener( 'scroll', onMouseWheel, false )
  document.removeEventListener( 'touchstart', onMouseWheel, false)
}

let onMouseWheel = () => {
  actionMouseWheel()
  removeListenerMouseWheel()
  setTimeout( () => { 
      let slogan = document.getElementById( 'slogan' )
      slogan.className = 'show' 
    }, 500 )
}


/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

let icons
const initBottomHTML = () => { 
  icons = document.getElementById( 'icons' )
  resizeIcons()
}  

const resizeIcons = () => {
  if ( ! icons ) return
  if ( window.innerWidth/window.innerHeight < 1.3 ) {
    icons.style.width = window.innerWidth * 0.9 + 'px'  
    icons.style.height = 'auto'
  } else {
    icons.style.height = window.innerHeight * 0.9 + 'px'  
    icons.style.width = 'auto'     
  } 
}




/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/ 

const showElement = elem => elem.className = 'show'

const hideElement = elem => {
  elem.className = 'hide'
}







// import { checkDevice } from './utils/checkDevice'
// import { hideStartScreen } from './ui/hideStartScreen'
// import { createStudio } from './entities/studio'
// import { createKeyBoard } from './utils/createKeyBoard'
// import { createLoadManager } from './helpers/loadManager'
// //import { createPlayer } from './entities/player'
// import { startFrameUpdater  } from './utils/createFrameUpater'
// //import { ASSETS_TO_LOAD } from './constants/constants_assetsToLoad'
// //import { createCyberTruck } from  './systems/cyberTruck'
// //import { createTown } from './systems/town'
// import { createBox } from './systems/box'

// const root = {
//     appData: {}
// }


// const initApp = () => {
//     root.device = checkDevice()
//     root.studio = createStudio(root)
//     root.keyboard = createKeyBoard(root)
//     root.loadManager = createLoadManager()

//     root.loadManager.startLoad([]).then(assets => {
//         createBox(root)    

//         //root.studio.setBack(assets.skyBox)
//         root.assets = assets
//        // root.town = createTown(root)
//         //root.cyberTruck = createCyberTruck(root)
//        // root.player = createPlayer(root)
//        // root.studio.setCamera(root.player.getCamera())
//        // root.cyberTruck.setPlayerToCollisions(root.player.getCollisionMesh())


//         root.frameUpdater = startFrameUpdater(root)
//         root.frameUpdater.on(n => {
//             //root.player.update(n)
//             //ssroot.cyberTruck.update(n)
//             root.studio.render()
//         })
//         hideStartScreen(root, root.keyboard.show)
//     })
// }


// window.addEventListener('load', initApp)
