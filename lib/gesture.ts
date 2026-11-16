// Small gesture helpers, after Apple's "Designing Fluid Interfaces".

/** Where a flick would come to rest. Velocity in px/s. */
export function project(velocity: number, deceleration = 0.998) {
  return ((velocity / 1000) * deceleration) / (1 - deceleration);
}

/** Progressive resistance past a boundary. */
export function rubberband(overshoot: number, dimension: number, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

/** Keeps the last few pointer samples so a release has a velocity. */
export function velocityTracker() {
  let samples: { v: number; t: number }[] = [];
  return {
    reset() {
      samples = [];
    },
    add(v: number, t = performance.now()) {
      samples.push({ v, t });
      if (samples.length > 6) samples.shift();
    },
    /** px (or degrees) per second */
    get() {
      if (samples.length < 2) return 0;
      const a = samples[0];
      const b = samples[samples.length - 1];
      const dt = b.t - a.t;
      if (dt <= 0 || performance.now() - b.t > 90) return 0;
      return ((b.v - a.v) / dt) * 1000;
    },
  };
}
