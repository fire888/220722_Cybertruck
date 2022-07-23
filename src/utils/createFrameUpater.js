export function startFrameUpater (eventEmitter) {

    var emitter = eventEmitter;

    var delta;
    var time;
    var oldTime;
    var count = 0;

    const fns = []


    var animate = function () {
        requestAnimationFrame(animate)
      
        time = Date.now();
        delta = (time - oldTime) * 0.001;
        if (isNaN(delta) || delta > 1000 || delta == 0 ) {
            delta = 1000/60 * 0.001;
        }
        count += delta;

        for (let i = 0; i < fns.length; ++i) {
            fns[i](time, delta, count)
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




