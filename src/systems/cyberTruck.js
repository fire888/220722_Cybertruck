

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
        //root.studio.addToScene(arrPointsMeshes[i])
        arrPointsMeshes[i].geometry.computeBoundingSphere()
        arrPoints.push(new THREE.Vector3(
            arrPointsMeshes[i].geometry.boundingSphere.center.x,
            arrPointsMeshes[i].geometry.boundingSphere.center.y,
            arrPointsMeshes[i].geometry.boundingSphere.center.z,
        ))
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
    let spdRot = 0.05
    let phaseRot = 0

    const oldQ = new THREE.Quaternion()
    const newQ = new THREE.Quaternion()


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


        oldQ.copy(tr.quaternion)
        tr.lookAt(nextPos)
        newQ.copy(tr.quaternion)
        tr.quaternion.copy(oldQ)
        phaseRot = 0
    }

    generateDataForMove()

    return {
        update: () => {
            if (phaseRot < 1) {
                phaseRot += spdRot
                tr.quaternion.slerpQuaternions(oldQ, newQ, Math.min(1, phaseRot))
            }
            tr.position.x += spdX
            tr.position.z += spdZ
            ++currentNumUpdate
            if (currentNumUpdate > numsToUpdate) {
                generateDataForMove()
            }
        }
    }
}