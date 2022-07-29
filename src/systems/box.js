import * as THREE from 'three'

export const createBox = (root) => {
    const b = new THREE.Mesh(
        new THREE.BoxGeometry(5, 5, 5),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    )

    root.studio.addToScene(b)
}