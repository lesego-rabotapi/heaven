"use client";

import { useEffect, useRef } from "react";
import { motionOK } from "@/lib/motion";
import { velocityTracker } from "@/lib/gesture";
import { Icon } from "./Icon";

/**
 * The dog-friendly seal from the old site, now something to play with: it
 * turns slowly on its own, and you can grab it and spin it. It tracks the
 * pointer 1:1 from where it was grabbed, keeps the release velocity, and
 * eases back to its idle turn.
 */
export function Seal() {
  const ring = useRef<SVGSVGElement>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    const svg = ring.current;
    if (!el || !svg || !motionOK()) return;

    const IDLE = 9; // degrees per second
    let angle = 0;
    let velocity = IDLE;
    let dragging = false;
    let last = 0;
    let grab = 0;
    let raf = 0;
    let visible = true;
    const tracker = velocityTracker();

    const pointerAngle = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      return (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI;
    };
    const frame = (t: number) => {
      const dt = Math.min(0.05, (t - (last || t)) / 1000);
      last = t;
      if (!dragging) {
        // Ease the spin back toward the idle turn.
        velocity += (IDLE - velocity) * Math.min(1, dt * 1.6);
        angle += velocity * dt;
        svg.style.transform = `rotate(${angle.toFixed(2)}deg)`;
      }
      raf = visible ? requestAnimationFrame(frame) : 0;
    };

    const down = (e: PointerEvent) => {
      dragging = true;
      el.setPointerCapture(e.pointerId);
      el.dataset.grabbed = "true";
      grab = pointerAngle(e) - angle;
      tracker.reset();
      tracker.add(angle);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      let next = pointerAngle(e) - grab;
      // Keep the angle continuous across the atan2 seam.
      while (next - angle > 180) next -= 360;
      while (next - angle < -180) next += 360;
      angle = next;
      tracker.add(angle);
      svg.style.transform = `rotate(${angle.toFixed(2)}deg)`;
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      delete el.dataset.grabbed;
      velocity = Math.max(-1400, Math.min(1400, tracker.get() || IDLE));
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(el);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    raf = requestAnimationFrame(frame);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <div className="seal" ref={box} role="img" aria-label="Dog friendly">
      <svg className="seal__ring" ref={ring} viewBox="0 0 150 150" aria-hidden="true">
        <defs>
          <path id="seal-path" d="M75,75 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0" />
        </defs>
        <circle cx="75" cy="75" r="73" />
        <text>
          <textPath href="#seal-path">Dog friendly · Dog friendly · </textPath>
        </text>
      </svg>
      <Icon name="paw-bold" size={38} className="seal__paw" />
    </div>
  );
}
