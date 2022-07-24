import * as THREE from 'three'

const vSh = `varying vec3 vWorldPosition;

void main() {

vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
vWorldPosition = worldPosition.xyz;

gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}`


const fSh = `
uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float offset;
uniform float exponent;

varying vec3 vWorldPosition;

void main() {

float h = normalize( vWorldPosition + offset ).y;
gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );

}`




export function createStudio (emitterLink) {
  const emitter = emitterLink

  let camera, scene, scene2, scene3, renderer



  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById( 'webgl-canvas' ),
    antialias: true
  })
  renderer.setClearColor(0x000000)
  renderer.autoClear = false
  renderer.autoClearColor = false
  renderer.autoClearStencil = false
  renderer.setPixelRatio( window.devicePixelRatio)
  renderer.setSize( window.innerWidth, window.innerHeight )

  scene = new THREE.Scene()
  scene2 = new THREE.Scene()

  const lightA = new THREE.AmbientLight( 0x4c1200, 1 )
  lightA.position.set( 5, 5, 5 )
  scene.add( lightA )

  const light = new THREE.PointLight( 0x5b7558, 2, 10000);
  light.position.set( -1000, 100, 200);
  scene.add( light );
  scene.fog = new THREE.Fog(0x000000, 0, 200)


  const resize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    if (camera) {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }
  }
  window.addEventListener('resize', resize)


  return {
    light,
    render: () => {
      if (!camera ) {
        return;
      }
      //renderer.clearDepth()
      renderer.clear()
      renderer.render(scene, camera)
    },
    initScene: () => {
      resize()
    },
    setCamera: cam => {
      camera = cam
      //camera.add(light)
      //scene.add(camera)
    },

    getRenderer() {
      return renderer
    },

    addToScene: mesh => {
      scene.add(mesh)
    },
    addToScene2: mesh => {
      scene2.add(mesh)
    },
    setBack: back => {
      scene.background = back
    }
  }
}
