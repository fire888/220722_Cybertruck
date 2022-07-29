import * as SHADERS from "./shaders/shaders"
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import imgSrc from './assets/Eye_hero-1a07d0e7d224bdb3db50da7eb6f6d53c.jpeg'

const canvasDom = document.getElementById("webgl-bottom")

export const initApp = (on) => {
    let scene, camera, renderer, cameraBottom, rendererBottom, composerBottom, passSpace, startTime 


    let lightPoint = new THREE.PointLight( 0xf114b5d, 1 )
    lightPoint.position.set( 500, 500, 600 )
    let lightAmb = new THREE.AmbientLight( 0x8a0873, 0.2 )
    scene = new THREE.Scene()
    scene.add( lightPoint, lightAmb )


    const texture = new THREE.TextureLoader().load(imgSrc);

    // immediately use the texture for material creation
    const material = new THREE.MeshBasicMaterial( { map: texture } );
    const eye = new THREE.Mesh(
        new THREE.PlaneGeometry(3000, 1000),
        material,
    )
    scene.add(eye)




    startTime = Date.now()
    rendererBottom = new THREE.WebGLRenderer( { canvas: canvasDom } )
    rendererBottom.setSize(window.innerWidth, window.innerHeight)
    composerBottom = new EffectComposer( rendererBottom )	
    cameraBottom = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 3.5, 15000 )
    cameraBottom.position.set( 0, 0, 2000)
    cameraBottom.lookAt(new THREE.Vector3())
    //cameraBottom.rotation.x = -0.4  
    composerBottom.addPass( new RenderPass( scene, cameraBottom ) )
    passSpace = new ShaderPass( SHADERS.spaceShader )
    composerBottom.addPass( passSpace )
    passSpace.renderToScreen = true 



    const arrCubes = []

    const createCubes = () => {
      let cubesGroup = new THREE.Group()
      scene.add( cubesGroup )
      cubesGroup.rotation.x = -1
      cubesGroup.position.set( 0, -10000, -3000 )
      let mat = new THREE.MeshPhongMaterial( {
        color: 0x1ee5ba,
        emissive: 0x00000,
        specular: 0xc0c0c0,
        shininess: 100 
      } )
      let geom = new THREE.BoxGeometry( 1000, 1000, 1000 )
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
    //createCubes()

    let n = 0
    let state = 'S' // 'F' // 'E'
    let spdCircles = 0.001


    const cursor = {
        x: 0,
        y: 0,
    }
    window.addEventListener('mousemove', (e) => {
        cursor.x = e.clientX / window.innerWidth - 0.5
        cursor.y = e.clientY / window.innerHeight - 0.5
    })



    const clock = new THREE.Clock();
    let previousTime = 0 // for cursor animation



    const animate = () => {
        //eye.rotation.y += .1
        //eye.rotation.x += .2        
        //eye.rotation.z += .3
        ++n
        let currentTime = Date.now()
        passSpace.uniforms.iGlobalTime.value = ( currentTime - startTime ) * 0.0002
        animateCubes()

        if (state === 'S') {
            if (n > 40) {
                state = 'F'
            } 
        }
        if (state === 'F') {
            if ( passSpace.uniforms.circleSize.value < 0.071 ) {
                spdCircles *= 1.01     
            } else if ( passSpace.uniforms.circleSize.value > 0.07 && passSpace.uniforms.circleSize.value < 0.08 ) {
                spdCircles = 0.0002
            } else {
                spdCircles *= 1.03 + 0.0005    
            }
            passSpace.uniforms.circleSize.value += spdCircles
            if ( passSpace.uniforms.circleSize.value > 0.08) {
                state = 'E'
            }
        }
        if (state === 'E') {
            console.log('show')
            //on()
            state = 'D' 
        }




        const elapsedTime = clock.getElapsedTime(); // for scroll animation
        const deltaTime = elapsedTime - previousTime; // for scroll animation
        previousTime = elapsedTime; // for scroll animation

        const parallaxX = cursor.x * 5; // for scroll animation (изменение цифры - изменение расстояния движения)
        const parallaxY = - cursor.y * 5; // for scroll animation (изменение цифры - изменение расстояния движения)
        cameraBottom.position.x += (parallaxX - cameraBottom.position.x) * 100 * deltaTime; // for scroll animation (если камера фиксированная)
        cameraBottom.position.y += (parallaxY - cameraBottom.position.y) * 100 * deltaTime; // for scroll animation (если камера фиксированная)
        // cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 0.1; // for scroll animation (если камера динамическая)
        // cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 0.1; // for scroll animation (если камера динамическая)
    


        composerBottom.render()         
        requestAnimationFrame(animate)
    }
    animate()










    

    console.log('!!!!!s')
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

  ///////////////////////////////////



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


/////////////////////////////////////////



/*%%  INIT SCENE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/ 
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/ 



////////////////////////////////

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

///////////////////////

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
//////////////////////////////////////

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








