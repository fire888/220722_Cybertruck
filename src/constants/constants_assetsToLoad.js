import '../assets/progress-img.png'
//import '../assets/icon-map.png'

//import sceneSrc from '../assets/interier/scene.FBX'
// import floor01Src from '../assets/floor01.obj'
// import landSrc from '../assets/land.FBX'
// import sceneSrc from '../assets/land.glb'

import cyberTruckSrc from '../assets/cyber_truck/scene.gltf'
import '../assets/cyber_truck/scene.bin'

import townSrc from '../assets/town.obj'
import b01ImgSrc from '../assets/mapTown01.jpg'
import b02ImgSrc from '../assets/mapTown02.jpg'



export const ASSETS_TO_LOAD = [
    {
        type: 'obj',
        filename: townSrc,
        key: 'town'
    },
    {
        type: 'gltfBin',
        filename: cyberTruckSrc,
        key: 'cyberTruck'
    },


    // {
    //     type: 'fbx',
    //     filename: landSrc,
    //     key: 'floor01'
    // },

    // {
    //     type: 'glb',
    //     filename: sceneSrc,
    //     key: 'floor01'
    // },

    {
        type: 'img',
        filename: b01ImgSrc,
        key: 'b01Map'
    },
    {
        type: 'img',
        filename: b02ImgSrc,
        key: 'b02Map'
    },
    // {
    //     type: 'img',
    //     filename: view2Src,
    //     key: 'view2'
    // },
    // {
    //     type: 'img',
    //     filename: view3Src,
    //     key: 'view3'
    // },
    // {
    //     type: 'img',
    //     filename: view4Src,
    //     key: 'view4'
    // },
]