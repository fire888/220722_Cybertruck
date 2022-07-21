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
  renderer.setClearColor(0x696c6d)
  renderer.autoClear = false
  renderer.autoClearColor = false
  renderer.autoClearStencil = false
  renderer.setPixelRatio( window.devicePixelRatio)
  renderer.setSize( window.innerWidth, window.innerHeight )

  scene = new THREE.Scene()
  scene2 = new THREE.Scene()
  scene3 = new THREE.Scene()

  //scene.background = 0x777777
  const lightA = new THREE.AmbientLight( 0xffffff, 0.7 )
  lightA.position.set( 5, 5, 5 )
  scene.add( lightA )
  const light = new THREE.PointLight( 0xffffff, 3.5, 1000 );
  //light.position.set( 0, 50, 500);
  light.position.set( 17, 25, 19);
  scene.add( light );
  scene.fog = new THREE.Fog(0x576066, 0, 400)
  const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
  hemiLight.color.setHSL( 0.6, 1, 0.6 );
  hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
  hemiLight.position.set( 0, 50, 0 );
  scene.add( hemiLight );


  const light2 = new THREE.PointLight( 0xffffff, 1, 1000 );
  light2.position.set( 0, 20, 100);
  scene2.add(light2)

  const lightA2 = new THREE.AmbientLight( 0xffffff, .5 )
  lightA2.position.set( 5, 5, 5 )
  scene2.add(lightA2)

  const vertexShader = vSh;
  const fragmentShader = fSh;
  const uniforms = {
    'topColor': { value: new THREE.Color( 0x7bb9e5 ) },
    //'bottomColor': { value: new THREE.Color( 0x7a8e90) },
    'bottomColor': { value: new THREE.Color( 0x000000) },
    'offset': { value: 66 },
    'exponent': { value: 0.6 }
  };

 scene.fog.color.copy( uniforms[ 'bottomColor' ].value );

  const skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
  const skyMat = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.BackSide
  })

  const sky = new THREE.Mesh( skyGeo, skyMat )
  scene.add( sky )


  const resize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    if (camera) {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }
  }
  window.addEventListener('resize', resize)



  emitter.subscribe('frameUpdate', () => {
    if (!camera ) {
      return;
    }
    renderer.clear()
    renderer.render(scene, camera)
    renderer.clearDepth()
    renderer.render(scene2, camera)
    renderer.clearDepth()
    renderer.render(scene3, camera)
  })


  return {
    initScene: function () {
      resize()
    },

    setCamera: function (cam) {
      camera = cam
      camera.add(light)
      scene.add(camera)
    },

    getRenderer() {
      return renderer
    },

    addToScene: function (mesh) {
      scene.add(mesh)
    },

    removeFromScene: mesh => {
      scene.remove(mesh)
    },

    addToScene2: function (mesh) {
      scene2.add(mesh)
    },
    removeFromScene2: mesh => {
      scene2.remove(mesh)
    },

    addToScene3: function (mesh) {
      scene3.add(mesh)
    },
    removeFromScene3: function (mesh) {
      scene3.remove(mesh)
    },


  }
}
