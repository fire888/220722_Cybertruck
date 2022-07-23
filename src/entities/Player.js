import * as THREE from 'three'
import { SEGMENT_SIZE } from '../constants/constants_assetsToLoad'
import { helper_CollisionsItems_v02 } from '../helpers/CollisionsHelper'

export function createPlayer (root) {
    let mainObj
    let frontObj

    let keys = null
    let isOn = true
    let speed = .3

    mainObj = new THREE.Object3D()
    const { startCarPoint } = root.appData
    mainObj.position.set(
        startCarPoint.toArray()[0],
        startCarPoint.toArray()[1],
        startCarPoint.toArray()[2] + 10,
    )

    const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 )
    camera.position.set(0, 1.8, 0)
    mainObj.add(camera)

    const collisionBox = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
        new THREE.MeshBasicMaterial()
    )
    collisionBox.visible = false
    root.studio.addToScene(collisionBox)

    frontObj = new THREE.Object3D()
    frontObj.position.set(0, 1.8, -1)
    mainObj.add(frontObj)

    const light = new THREE.PointLight(0xffffff, 0.4)
    light.position.set(0, 35, 0)
    mainObj.add(light)

    root.keyboard.on(data => {
        keys = data
    })

    root.studio.addToScene(mainObj)

    const collisions = new helper_CollisionsItems_v02()
    let savedPlayerSegmentKey = null


    return {
        update: () => {
            if ( !keys || !isOn ) {
                return;
            }

            if (keys['up'] === true) {
                const keyX = Math.floor(mainObj.position.x / SEGMENT_SIZE[0])
                const keyZ = Math.abs(Math.floor((mainObj.position.z) / SEGMENT_SIZE[1]))

                const k = keyX + '_' + keyZ
                if (savedPlayerSegmentKey !== k) {
                    collisions.clearArrCollisions()
                    collisions.setItemToCollision(root.appData.town[k].bCollision)
                    collisions.setItemToCollision(root.appData.town[`${keyX + 1}_${keyZ + 1}`].bCollision)
                    collisions.setItemToCollision(root.appData.town[`${keyX + 1}_${keyZ - 1}`].bCollision)
                    collisions.setItemToCollision(root.appData.town[`${keyX}_${keyZ + 1}`].bCollision)
                    collisions.setItemToCollision(root.appData.town[`${keyX}_${keyZ - 1}`].bCollision)
                    collisions.setItemToCollision(root.appData.town[`${keyX - 1}_${keyZ + 1}`].bCollision)
                    collisions.setItemToCollision(root.appData.town[`${keyX - 1}_${keyZ - 1}`].bCollision)
                    savedPlayerSegmentKey = k
                }

                const [is] = collisions.checkCollisions(camera, frontObj, 3)
                if (is) {
                    return;
                }

                mainObj.translateZ(-speed)
                collisionBox.position.copy(mainObj.position)
            }
            if (keys['left'] === true) {
                 mainObj.rotation.y += 0.02
            }
            if (keys['right'] === true) {
                mainObj.rotation.y -= 0.02
            }
        },

        getCamera: () => {
            return camera;
        },

        getCollisionMesh: () => collisionBox
    }
}



