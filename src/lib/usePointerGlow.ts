import { useEffect, type RefObject } from 'react';

// A soft light that follows the pointer across a section, as if you were carrying a candle. It writes two
// custom properties (--mx, --my) at most once a frame; CSS draws the light. Only for a fine pointer that
// hovers, and never for people who ask for less motion, so phones and reduced motion keep the still halo.
export function usePointerGlow(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      frame = 0;
      el.style.setProperty('--mx', x.toFixed(1) + '%');
      el.style.setProperty('--my', y.toFixed(1) + '%');
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x = ((e.clientX - r.left) / r.width) * 100;
      y = ((e.clientY - r.top) / r.height) * 100;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    el.addEventListener('pointermove', move, { passive: true });
    return () => {
      el.removeEventListener('pointermove', move);
      cancelAnimationFrame(frame);
    };
  }, [ref]);
}
