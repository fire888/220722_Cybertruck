export const createLinear = (duration, f) => {
    const timeStarted = Date.now()
    return () => f(Math.min(1, (Date.now() - timeStarted) / duration))
}