export function startFrameUpater (eventEmitter) {

    var emitter = eventEmitter;

    var delta;
    var time;
    var oldTime;
    var count = 0;

    let fn = () => {}


    var animate = function () {
        requestAnimationFrame(animate)
      
        time = Date.now();
        delta = (time - oldTime) * 0.001;
        if (isNaN(delta) || delta > 1000 || delta == 0 ) {
            delta = 1000/60 * 0.001;
        }
        count += delta;

        fn(time, delta, count)
        //emitter.emit('frameUpdate', { time, delta , count })

        oldTime = time;
    } 

    animate();

    return {
        on: f => {
            fn = f
        }
    }
}




