export const posX = r => a => r * Math.sin(a * Math.PI / 180) + r;
export const posY = r => a => r * -Math.cos(a * Math.PI / 180) + r;
export const timeAngle = T => t => 2 * Math.PI * t / T;

export const ease = t => 1 - Math.sin(Math.acos(t));
export const easeInOut = t => .5 * (Math.sin((t - .5) * Math.PI) + 1);
export const easeInOutTimeFraction = p => (Math.asin(p / .5 - 1) + .5 * Math.PI) / Math.PI;

export const animate = timingFunction => (duration, startingProgress = 0) => cb => {
    let frame;
    const start = performance.now();
    const additionalTimeFraction = easeInOutTimeFraction(startingProgress);
    return frame = requestAnimationFrame(function _fnc(t) {
        let timeFraction = (t - (start)) / duration + additionalTimeFraction;

        if (timeFraction > 1) timeFraction = 1;
        const progress = timingFunction(timeFraction);
        cb(progress, frame);

        if (timeFraction < 1) {
            frame = requestAnimationFrame(_fnc);
        }
    });
}