import * as THREE from 'three'
//import { MapControls }  from 'three/examples/jsm/controls/OrbitControls'
import { OrbitControls }  from 'three/examples/jsm/controls/OrbitControls'
import { createLinear } from '../helpers/tween'

export const createCamera = (root) => {
    const { studio, emitter } = root

    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 10000 )
    camera.position.set(0, 100, 400)
    camera.lookAt(new THREE.Vector3())


    //const controls = new MapControls(camera, studio.getRenderer().domElement)
    const controls = new OrbitControls(camera, studio.getRenderer().domElement)
    controls.target.set( 0, 0, 0)

    controls.minDistance = 10
    controls.maxDistance = 500
    controls.maxPolarAngle = Math.PI / 2


    window.onresize = function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()
    }

    let tween = null
    emitter.subscribe('frameUpdate', () => {
        if (tween) {
            tween()
        }
        controls.enabled && controls.update();
    })


    /** movie functions *****************************/
    const rotateTo = (p, callback) => {
        const currentQ = new THREE.Quaternion();
        currentQ.copy(camera.quaternion)
        camera.lookAt(...p)
        const targetQ = new THREE.Quaternion()
        targetQ.copy(camera.quaternion)
        camera.quaternion.copy(currentQ)

        if (targetQ.equals(currentQ)) {
            return void callback()
        }

        tween = createLinear(500, val => {
            camera.quaternion.slerpQuaternions(currentQ, targetQ, val)
            if (val === 1) {
                tween = null
                callback()
            }
        })
    }

    const moveTo = (p, callback) => {
        const vCamStart = new THREE.Vector3().copy(camera.position)
        const vCamEnd = new THREE.Vector3().fromArray(p)

        tween = createLinear(500, val => {
            camera.position.lerpVectors(vCamStart, vCamEnd, val)
            if (val === 1) {
                tween = null
                callback()
            }
        })
    }

    const flyToStart = (vLookAt, callback) => {
        const vCamStart = new THREE.Vector3().copy(camera.position)
        const vCamEnd = savedCamPosition

        tween = createLinear(500, val => {
            camera.position.lerpVectors(vCamStart, vCamEnd, val)
            camera.lookAt(vLookAt)
            if (val === 1) {
                controls.enabled = true
                tween = null
                callback()
            }
        })
    }



    const savedCamPosition = new THREE.Vector3()


    const flyByPath = (points, callback = () => {}) => {
        points = JSON.parse(JSON.stringify(points))

        if (points) {
            savedCamPosition.copy(camera.position)
        }

        if (!points) {
            tween = null
            flyToStart(new THREE.Vector3(), callback)
            return;
        }

        for (let i = 0; i < points.length; ++i) {
            points[i][1] += 1.5
        }


        controls.enabled = false

        const iterate = ind => {
            if (!points[ind + 1]) {
                controls.target.set(...points[ind])
                flyToStart(new THREE.Vector3(...points[points.length - 1]), callback)
                return;
            }

            const copyP = [...points[ind + 1]]
            copyP.y += 3

            rotateTo(copyP, () => {
                if (points[ind + 2]) {
                    moveTo(copyP, () => {
                        iterate(++ind)
                    })
                } else {
                    iterate(++ind)
                }
            })
        }

        iterate(0)
    }

    return {
        camera,
        flyByPath,
    } 
}


// /** camera movie ****************************/
// const vCamStart = new THREE.Vector3()
// const vCamEnd = new THREE.Vector3()
//
// const vTargetStart = new THREE.Vector3()
// const vTargetEnd = new THREE.Vector3()
//
// const createTween = (camPos, targetPos, time) => {
//     vCamStart.copy(camera.position)
//     vCamEnd.fromArray(camPos)
//
//     vTargetStart.copy(vTarget)
//     vTargetEnd.fromArray(targetPos)
//
//     tween = createLinear(time)
// }
// const updateTween = () => {
//     tween(val => {
//         camera.position.lerpVectors(vCamStart, vCamEnd, val)
//         vTarget.lerpVectors(vTargetStart, vTargetEnd, val)
//         camera.lookAt(vTarget)
//         if (val === 1) {
//             tween = null
//             currentPosKey = targetPosKey
//             onCompleteTween && onCompleteTween()
//         }
//     })
// }