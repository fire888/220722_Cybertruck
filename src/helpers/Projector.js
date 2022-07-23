// import * as THREE from 'three'
//
//
// export function createProjector() {
//
//     const raycaster = new THREE.Raycaster()
//     const mouse = new THREE.Vector2()
//
//     let targetList = []
//     let camera = null
//     let onEventIntersept = () => {}
//     let onClick = () => {}
//     let oldInterseptObject = null
//
//
//
//     const onMouseMove = ( event ) => {
//         if (!camera) {
//             return;
//         }
//
//         mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
//         mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1
//
//         raycaster.setFromCamera(mouse, camera)
//         const intersects = raycaster.intersectObjects(targetList, true)
//
//         if (!intersects[0]) {
//             document.body.style.cursor = 'auto'
//             if (oldInterseptObject) {
//                 onEventIntersept(null, oldInterseptObject)
//                 oldInterseptObject = null
//             }
//         }
//
//         if (intersects[0]) {
//             document.body.style.cursor = 'pointer'
//             const newObj = intersects[0].object
//
//             if (!oldInterseptObject) {
//                 oldInterseptObject = newObj
//                 onEventIntersept(newObj, null)
//             } else {
//                 if (newObj !== oldInterseptObject.name) {
//                     onEventIntersept(newObj, oldInterseptObject)
//                     oldInterseptObject = newObj
//                 }
//             }
//         }
//     }
//
//
//     const onMouseClick = e => {
//         onClick(oldInterseptObject, e)
//     }
//
//     window.addEventListener('mousemove', onMouseMove, false)
//     window.addEventListener('click', onMouseClick, false)
//
//     return {
//         on: on => onEventIntersept = on,
//         onClick: on => onClick = on,
//         setTargets: targets => targetList = targets,
//         setCamera: cam => camera = cam,
//     }
// }