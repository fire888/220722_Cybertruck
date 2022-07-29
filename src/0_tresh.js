

import * as SHADERS from "./shaders/shaders"

export { 
  loadAssets,
  initAPP,
  startAPP,
  startFlashTopCanvas,
  resizeCanvas,
  setOnBottomAnimationDone,
} 



/*%%  PARAMS  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/ 
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/ 

const app_Params =  {
  earthRed: 0.0,
  earthGreen: 0.04,
  earthBlue: 0.08,
  glowRed: 0.0,
  glowGreen: 0.19,
  glowBlue: 0.22,
  glowLight: 0.0,
  glowBorder: 2.9,
  wireColor: "#ffae23",
  wireDiodRed: 0.9,
  wireDiodGreen: 0.9,
  wireDiodBlue: 0.9,
  earthLeftMax: -2.0,
  earthRightMax: 0.45,
  earthAxell: 0.00085,
  earthMaxSpd: 0.017,
  earthSpdFree: 0.015
}




/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/ 

let BOTTOM_CANVAS_STATE = 'NONE' // || 'DELAYbeforeCIRCLES || 'CIRCLES' || 'FREESPACE' || 'TEXT'

const updateBottomCanvasSTATE = () => {
  if ( BOTTOM_CANVAS_STATE == 'NONE' ) {
    if ( checkCenterCanvas( canvasBottom ) ) {
      startDelay()
      BOTTOM_CANVAS_STATE = 'DELAYbeforeCIRCLES'
    }  
  }
  if ( BOTTOM_CANVAS_STATE == 'CIRCLES') {
    updateCanvasBottomCircles()
    if ( checkCirclesDone() ) {
      BOTTOM_CANVAS_STATE = 'FREESPACE'
    }
  }
  if ( BOTTOM_CANVAS_STATE == 'FREESPACE' ) {
    onBottomAnimationDone() 
    BOTTOM_CANVAS_STATE = 'TEXT'
  }
  animateCubes() 
}

const startDelay = () => { setTimeout( () => { BOTTOM_CANVAS_STATE = 'CIRCLES'}, 500 ) }

let onBottomAnimationDone = () => {} 
const setOnBottomAnimationDone = f => onBottomAnimationDone = f  




/*%%  INIT SCENE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/ 
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/ 

let canvasBottom

const initAPP = (params) => {     
  canvasBottom = c2.canvas    
  createScene()      
  createRendererBottom(params) 
  resizeCanvas()
}

let scene, camera, renderer, 
cameraBottom, rendererBottom, composerBottom, passSpace, startTime 

const createScene = () => {
  let lightPoint = new THREE.PointLight( 0xf114b5d, 0.3 )
  lightPoint.position.set( 500, 500, 600 )
  let lightAmb = new THREE.AmbientLight( 0x8a0873, 0.2 )
  scene = new THREE.Scene()
  scene.add( lightPoint, lightAmb )
}


const createRendererBottom = c2 => {
  startTime = Date.now()
  rendererBottom = new THREE.WebGLRenderer( { canvas: c2.canvas } )
  composerBottom = new THREE.EffectComposer( rendererBottom )	
  cameraBottom = new THREE.PerspectiveCamera( 40, c2.w / c2.h, 3.5, 15000 )
  cameraBottom.position.set( 0, 4000, 0)
  cameraBottom.rotation.x = -0.4  
  composerBottom.addPass( new THREE.RenderPass( scene, cameraBottom ) )
  passSpace = new THREE.ShaderPass( SHADERS.spaceShader )
  composerBottom.addPass( passSpace )
  passSpace.renderToScreen = true  
}


/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

const resizeCanvas = (       
      size2 = { 
        w: window.innerWidth,
        h: window.innerWidth 
      } ) => {
 
  if ( rendererBottom ) rendererBottom.setSize( size2.w, size2.h )
  if ( cameraBottom ) { 
    cameraBottom.aspect = size2.w / size2.h * size2.h / size2.w
    cameraBottom.updateProjectionMatrix()
  }
  if ( passSpace ) passSpace.uniforms.iResolution.value = new THREE.Vector2( size2.w, size2.h )   
  let size = rendererBottom.getDrawingBufferSize()
  if ( composerBottom )composerBottom.setSize( size.width, size.height )
} 


/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

const startAPP = () => drawFrame() 

const drawFrame = () => {
    updateBottomCanvasSTATE()    
    let currentTime = Date.now()
    passSpace.uniforms.iGlobalTime.value = ( currentTime - startTime ) * 0.0002
    composerBottom.render() 
  requestAnimationFrame( drawFrame ) 
}

const checkVisible = elm => {
  let rect = elm.getBoundingClientRect()
  let viewHeight = Math.max( document.documentElement.clientHeight, window.innerHeight )
  return ! ( rect.bottom < 0 || rect.top - viewHeight >= 0 )
}

const checkCenterCanvas = elm => {
  let rect = elm.getBoundingClientRect()
  let viewHeight = Math.max( document.documentElement.clientHeight, window.innerHeight )
  return ! ( rect.bottom < 0 || rect.top + ( rect.bottom - rect.top ) * 0.5 - viewHeight >= 0 )  
}

let spdCircles = 0.001
const updateCanvasBottomCircles = () => { 
  if ( passSpace.uniforms.circleSize.value < 0.071 ) {
    spdCircles *= 1.01     
  } else if ( passSpace.uniforms.circleSize.value > 0.07 && passSpace.uniforms.circleSize.value < 0.08 ) {
    spdCircles = 0.0002
  } else {
    spdCircles *= 1.03 + 0.0005    
  }
  passSpace.uniforms.circleSize.value += spdCircles
} 

const checkCirclesDone = () => {
  if ( passSpace.uniforms.circleSize.value > 2.2 ) return true
  return false
}









/*%% BACKGROUND CUBES %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/ 
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/ 

let arrCubes = []

const createCubes = () => {
  let cubesGroup = new THREE.Group()
  scene.add( cubesGroup )
  cubesGroup.rotation.x = -1
  cubesGroup.position.set( 0, 0, -9000 )
  let mat = new THREE.MeshPhongMaterial( {
    color: 0x1ee5ba,
    emissive: 0x00000,
    specular: 0xc0c0c0,
    shininess: 100 
  } )
  let geom = new THREE.CubeGeometry( 1000, 1000, 1000 )
  for ( let yi = 0; yi < 20; yi ++ ) {
    for ( let xi = 0; xi < 20; xi ++ ) {
      let cube = new THREE.Mesh( geom, mat )
      cubesGroup.add( cube )
      cube.position.set( xi * 1000 - 10000, yi * 1000 - 5000, 0 )
      cube.rotation.x = ( xi / 5.0 + yi / 5.0 )
      arrCubes.push( cube )
    }
  }     
}

const animateCubes = () => arrCubes.forEach( item => item.rotation.x += 0.01 )

