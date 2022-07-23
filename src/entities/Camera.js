import * as THREE from 'three'
import { OrbitControls }  from 'three/examples/jsm/controls/OrbitControls'

export const createCamera = (root) => {
    const { studio } = root

    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 10000 )
    camera.position.set(0, 100, 400)
    camera.lookAt(new THREE.Vector3())

    const controls = new OrbitControls(camera, studio.getRenderer().domElement)
    controls.target.set( 0, 0, 0)

    controls.minDistance = 10
    controls.maxDistance = 1500
    controls.maxPolarAngle = Math.PI / 2


    window.onresize = function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()
    }

    return {
        camera,
    } 
}
