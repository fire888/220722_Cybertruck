import { SEGMENT_SIZE } from '../constants/constants_assetsToLoad'

export const createCyberTruck = (root) => {
    const arrPointsMeshes = []

    let test = null

    root.assets.town.traverse(item => {
        if (item.name.includes('p_')) {
            arrPointsMeshes.push(item)
        }
        if (item.name.includes('test')) {
            test = item
        }
    })


    const arrPoints = []

    for (let i = 0; i < arrPointsMeshes.length; ++i) {
        const { cityLen } = root.appData
        arrPointsMeshes[i].geometry.computeBoundingSphere()
        const v = new THREE.Vector3(
            arrPointsMeshes[i].geometry.boundingSphere.center.x + Math.floor((cityLen / 2)) * SEGMENT_SIZE[0],
            arrPointsMeshes[i].geometry.boundingSphere.center.y,
            arrPointsMeshes[i].geometry.boundingSphere.center.z + Math.floor((cityLen / 2)) * SEGMENT_SIZE[1],
        )
        arrPoints.push(v)

        if (i === 0) {
            root.appData.startCarPoint = v
        }
    }


    const truck = root.assets.cyberTruck.scene.children[0]
    truck.scale.set(.01, .01, .01)
    truck.position.y = -2
    truck.position.z = 2
    truck.rotation.z = Math.PI / 2


    const tr = new THREE.Group()
    tr.add(truck)
    root.studio.addToScene(tr)
    if (test) {
        //tr.add(test)
    }



    let currentIndexPath = 0
    let nextIndexPath = 1
    let spdX = 0
    let spdZ = 0
    let numsToUpdate = 0
    let currentNumUpdate = 0
    let spd = 0.4


    const generateDataForMove = () => {
        ++currentIndexPath
        if (!arrPoints[currentIndexPath]) {
            currentIndexPath = 0
        }
        ++nextIndexPath
        if (!arrPoints[nextIndexPath]) {
            nextIndexPath = 0
        }


        const currentPos = arrPoints[currentIndexPath]
        const nextPos = arrPoints[nextIndexPath]

        tr.position.copy(currentPos)

        const d = nextPos.distanceTo(currentPos)
        numsToUpdate = d / spd
        currentNumUpdate = 0

        spdX = (nextPos.x - currentPos.x) / numsToUpdate
        spdZ = (nextPos.z - currentPos.z) / numsToUpdate
    }

    generateDataForMove()


    const savePos = new THREE.Vector3()
    const oldQ = new THREE.Quaternion()
    const newQ = new THREE.Quaternion()
    let spdRot = 0.05
    let phaseRot = 0

    const generateDataForRot = () => {
        let nextNextPos
        if (!arrPoints[nextIndexPath + 1]) {
            nextNextPos = arrPoints[0]
        } else {
            nextNextPos = arrPoints[nextIndexPath + 1]
        }

        savePos.copy(tr.position)
        tr.position.copy(arrPoints[nextIndexPath])
        oldQ.copy(tr.quaternion)
        tr.lookAt(nextNextPos)
        newQ.copy(tr.quaternion)
        tr.quaternion.copy(oldQ)
        tr.position.copy(savePos)

        phaseRot = 0
    }

    generateDataForRot()

    return {
        update: () => {
            if (phaseRot < 1) {
                phaseRot += spdRot
                tr.quaternion.slerpQuaternions(oldQ, newQ, Math.min(1, phaseRot))
            } else {
                phaseRot = 1
            }
            tr.position.x += spdX
            tr.position.z += spdZ
            ++currentNumUpdate
            if (currentNumUpdate > numsToUpdate) {
                generateDataForMove()
            }
            if (phaseRot === 1 && currentNumUpdate + 5 > numsToUpdate) {
                generateDataForRot()
            }
        }
    }
}