export function createKeyBoard (root) {
    const fns = []

    const keys = {
        'up': false,
        'left': false,
        'right': false,
        'down': false,
        's': false,
        'm': false,
        'w': false,
    }

    const keyUpdate = function ( keyCode, isDown ) {
        switch( keyCode ) {
          case 38:
            keys['up'] = isDown
            break
          case 37:
            keys['left'] = isDown
            break
          case 39:
            keys['right'] = isDown
            break
           case 40:
            keys['down'] = isDown
            break
           case 65:
                keys['left'] = isDown
                break
            case 68:
                keys['right'] = isDown
                break
          case 83:
            keys['down'] = isDown
            break
          case 87:
            keys['up'] = isDown
            break
        }
        for (let i = 0; i < fns.length; ++i) {
            fns[i](keys)
        }
    }

    document.addEventListener( 'keydown', 
      function (event) { keyUpdate( event.keyCode, true )}.bind(this) )
    document.addEventListener( 'keyup', 
      function(event) { keyUpdate( event.keyCode, false )}.bind(this) )

    const buttLeft = document.querySelector('.arrow-left')
    if (buttLeft) {
        buttLeft.addEventListener('mousedown',
            function() { keyUpdate( 37, true ) })
        buttLeft.addEventListener('mouseup',
            function() { keyUpdate( 37, false ) })
        buttLeft.addEventListener('touchstart',
            function() { keyUpdate( 37, true ) })
        buttLeft.addEventListener('touchend',
            function() { keyUpdate( 37, false ) })
    }

    
    const buttRight = document.querySelector('.arrow-right')
    if (buttRight) {
        buttRight.addEventListener('mousedown',
            function() { keyUpdate( 39, true ) })
        buttRight.addEventListener('mouseup',
            function() { keyUpdate( 39, false ) })
        buttRight.addEventListener('touchstart',
            function() { keyUpdate( 39, true ) })
        buttRight.addEventListener('touchend',
            function() { keyUpdate( 39, false ) })
    }

        
    const buttUp = document.querySelector('.arrow-top')
    if (buttUp) {
        buttUp.addEventListener('mousedown',
            function() { keyUpdate( 38, true ) })
        buttUp.addEventListener('mouseup',
            function() { keyUpdate( 38, false ) })
        buttUp.addEventListener('touchstart',
            function() { keyUpdate( 38, true ) })
        buttUp.addEventListener('touchend',
            function() { keyUpdate( 38, false ) })
    }

    const buttDown = document.querySelector('.arrow-bottom')
    if (buttDown) {
        buttDown.addEventListener('mousedown',
            function() { keyUpdate( 40, true ) })
        buttDown.addEventListener('mouseup',
            function() { keyUpdate( 40, false ) })
        buttDown.addEventListener('touchstart',
            function() { keyUpdate( 40, true ) })
        buttDown.addEventListener('touchend',
            function() { keyUpdate( 40, false ) })
    }

   return {
        on: f => {
            fns.push(f)
        },
        show: () => {
            if (buttLeft) {
                if (root.device.deviceType !== 'desktop') {
                    buttLeft.classList.remove('hidden')
                }
            }
            if (buttRight) {
                if (root.device.deviceType !== 'desktop') {
                    buttRight.classList.remove('hidden')
                }
            }
            if (buttUp) {
                if (root.device.deviceType !== 'desktop') {
                    buttUp.classList.remove('hidden')
                }
            }
            if (buttDown) {
                if (root.device.deviceType !== 'desktop') {
                    buttDown.classList.remove('hidden')
                }
            }
        }
   }
}