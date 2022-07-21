export const createCyberTruck = (root, assets) => {
    console.log(root, assets)

    const truckScene = assets.cyberTruck.scene
    truckScene.scale.set(.01, .01, .01)
    root.studio.addToScene(assets.cyberTruck.scene)


    return {}
}