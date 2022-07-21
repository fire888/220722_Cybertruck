import { LABELS_DATA, START_CLICKS_TO_PATH } from '../constants/itemsData'


export const createActions = root => {

    let currentStart = START_CLICKS_TO_PATH[0].label
    let currentEnd = START_CLICKS_TO_PATH[1].label


    let isCanChangePath = true

    const changePath = data => {
        if (!isCanChangePath) {
            return;
        }

        if (root.flyButton) {
            if (!data.currentStart && !data.currentEnd) {
                root.flyButton.toggleView(false)
            } else {
                root.flyButton.toggleView(true)
            }
        }


        root.system_arrows && root.system_arrows.drawPath(data)
        root.system_labels.setToBiggest(data.currentStart, data.currentEnd)

        let key1 = null
        let key2 = null
        if (
            LABELS_DATA[data.currentStart] && 
            LABELS_DATA[data.currentStart].mesh
        ) {
            key1 = LABELS_DATA[data.currentStart].mesh
        }

        if (                
            LABELS_DATA[data.currentEnd] && 
            LABELS_DATA[data.currentEnd].mesh 
        ) {
            key2 = LABELS_DATA[data.currentEnd].mesh
        }

        root.system_assets.setCurrent(key1, key2)
    }


    root.projector.on((newItem, oldItem) => {
        if (oldItem) {
          root.system_assets.darkObject(oldItem)
        }
        if (newItem) {
            root.system_assets.lightObject(newItem)
        }
    })


    async function clickOnScene (item, e) {
        if (!isCanChangePath) {
            return;
        }

        if (!item) {
            return;
        }
        
        let currentLabel = null 
        for (let key in LABELS_DATA) {
            if (LABELS_DATA[key].mesh && LABELS_DATA[key].mesh === item.name) {
                currentLabel =  key
            }
        }

        if (!currentLabel) {
            return;
        }

        const keyStartOrEnd = await root.choiseStartEnd.waitChoise(e.pageX, e.pageY, currentLabel)

        if (!keyStartOrEnd) {
            return;
        }

        if (keyStartOrEnd === 'start') {
            currentStart = currentLabel
        }
        if (keyStartOrEnd === 'end') {
            currentEnd = currentLabel
        }

        root.buttons.click({ dir: keyStartOrEnd, label: currentLabel})
    }
    root.projector.onClick(clickOnScene)


    return {
        toggleVisibleFloor: (keyFloor, is) => {
            root.system_assets &&
                root.system_assets.toggleVisibleFloor(keyFloor, is)
        },
        changePath,
        startFly: isStopFly => {
            root.choiseStartEnd.toggleView(false)
            root.buttons.disable()
            isCanChangePath = false


            const flyData = isStopFly
                ? false
                : root.system_arrows.getCurrentPathPoints()

            root.camMovies.flyByPath(flyData, () => {
                root.buttons.enable()
                isCanChangePath = true
                root.flyButton.reset()
            })
        },
    }
} 