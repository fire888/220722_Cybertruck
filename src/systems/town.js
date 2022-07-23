import * as THREE from 'three'

const MODEL_KEYS = [
    'build_01',
    'build_02',
    'build_03',
    'build_04',
]

// const TOWN = [
//     3, 2, 1, 1, 1, 1,
//     1, 1, 3, 1, 1, 1,
//     1, 1, 1, 1, 2, 1,
//     1, 2, 1, 1, 1, 1,
//     1, 1, 1, 2, 1, 1,
// ]
const TOWN = []
for (let i = 0; i < 1500; ++i) {
    TOWN.push(Math.floor(Math.random() * MODEL_KEYS.length))
}
const L = Math.sqrt(TOWN.length)


const SEGMENT_SIZE = [40, 30]
//const SEGMENT_SIZE = [10, 20]






export const createTown = root => {
    const mats = {
        'build_01': new THREE.MeshPhongMaterial({
            map: root.assets.b01Map,
            color: 0x0000FF,
        }),
        'build_02': new THREE.MeshPhongMaterial({
            map: root.assets.b02Map,
            color: 0x003388,
        }),
        'build_03': new THREE.MeshPhongMaterial({
            map: root.assets.b02Map,
            color: 0x9900FF,
        }),
        'build_04': new THREE.MeshPhongMaterial({
            color: 0x77FF00,
        }),
        'walkRoad': new THREE.MeshPhongMaterial({
            color: 0x333399,
        }),
        'lamp': new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
        }),
        'default': new THREE.MeshPhongMaterial({
            color: 0x6666FF,
        }),
    }

    const instItems = {}


    root.assets.town.traverse(item => {
        if (item.constructor.name === 'Mesh') {
            instItems[item.name] = item
        }
    })

    const items = []

    for (let i = 0; i < TOWN.length; ++i) {
        if (!instItems[MODEL_KEYS[TOWN[i]]]) {
            continue;
        }


        const x = Math.floor(i % L ) * SEGMENT_SIZE[0]
        const z = -Math.floor(i / L ) *  SEGMENT_SIZE[1]


        const road = new THREE.Mesh(
            instItems['road'].geometry,
            mats['default']
        )
        road.position.x = x
        road.position.z = -z
        root.studio.addToScene(road)

        const walkRoad = new THREE.Mesh(
            instItems['walk_road'].geometry,
            mats['walkRoad']
        )
        walkRoad.position.x = x
        walkRoad.position.z = -z
        root.studio.addToScene(walkRoad)

        const lamp = new THREE.Mesh(
            instItems['lamp'].geometry,
            mats['lamp']
        )
        lamp.position.x = x
        lamp.position.z = -z
        root.studio.addToScene(lamp)

        const b = new THREE.Mesh(
            instItems[MODEL_KEYS[TOWN[i]]].geometry,
            mats[MODEL_KEYS[TOWN[i]]] || mats['default']
        )
        b.position.x = x
        b.position.z = -z
        root.studio.addToScene(b)

        items.push({ r: road, w: walkRoad })
    }

    return {}
}