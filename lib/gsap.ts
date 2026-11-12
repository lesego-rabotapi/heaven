import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** True when the visitor has not asked for reduced motion (set in <head>). */
export function motionOK() {
  return (
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("js-motion")
  );
}

/**
 * Unit Gothic arch as points: x in [-0.5, 0.5], y from 0 (sill) to 1 (apex).
 * Shared by the preloader's opening so it matches the #arch clip-path.
 */
export function archPoints(steps = 14): [number, number][] {
  const spring = 0.45;
  const bez = (t: number, a: number, b: number, c: number, d: number) =>
    (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t ** 2 * c + t ** 3 * d;
  const left: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    left.push([bez(t, -0.5, -0.5, -0.25, 0), bez(t, spring, 0.78, 0.95, 1)]);
  }
  const right = left
    .slice(0, -1)
    .reverse()
    .map(([x, y]) => [-x, y] as [number, number]);
  return [[-0.5, 0], ...left, ...right, [0.5, 0]];
}

export { gsap, ScrollTrigger, useGSAP };
