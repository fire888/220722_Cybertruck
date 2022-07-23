export function startFrameUpater () {
    var delta
    var time
    var oldTime

    const fns = []


    var animate = function () {
        requestAnimationFrame(animate)
      
        time = Date.now()
        delta = (time - oldTime)
        const n = Math.round(delta / 16)    
        for (let i = 0; i < fns.length; ++i) {
            fns[i](n)
        }
        oldTime = time;
    } 

    animate()

    return {
        on: f => {
            fns.push(f)
        }
    }
}




