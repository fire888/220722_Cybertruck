import * as THREE from 'three'


export const createStudio = () => {
    let camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 10000)
    camera.position.set(0, 0, 30)

    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById( 'webgl-canvas' ),
        antialias: true,
        
    })
    // srenderer.setClearColor(0x000000)
    renderer.setPixelRatio( window.devicePixelRatio)
    renderer.setSize( window.innerWidth, window.innerHeight )

    const scene = new THREE.Scene()

    const lightA = new THREE.AmbientLight( 0x4c1200, 1 )
    lightA.position.set( 5, 5, 5 )
    scene.add( lightA )

    const light = new THREE.PointLight( 0x5b7558, 2, 10000)
    light.position.set( -1000, 100, 200)
    scene.add( light )
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
            renderer.render(scene, camera)
        },
        setCamera: cam => {
            camera = cam
        },
        addToScene: mesh => {
            scene.add(mesh)
        },
        setBack: back => {
            scene.background = back
        }
    }
}