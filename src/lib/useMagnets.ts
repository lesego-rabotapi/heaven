import { useEffect } from 'react';

const PULL = 0.22;
const MAX_PX = 8;

// Buttons marked data-magnet lean a few pixels towards the pointer, and settle back when it leaves. The
// lean is written to --mgx/--mgy and drawn with the CSS translate property, so it adds to the hover lift
// instead of replacing it. Only for a fine pointer that hovers, and never under reduced motion.
export function useMagnets() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const clamp = (v: number) => Math.max(-MAX_PX, Math.min(MAX_PX, v));
    const cleanups = Array.from(document.querySelectorAll<HTMLElement>('[data-magnet]')).map((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mgx', clamp((e.clientX - (r.left + r.width / 2)) * PULL).toFixed(1) + 'px');
        el.style.setProperty('--mgy', clamp((e.clientY - (r.top + r.height / 2)) * PULL).toFixed(1) + 'px');
      };
      const leave = () => {
        el.style.setProperty('--mgx', '0px');
        el.style.setProperty('--mgy', '0px');
      };
      el.addEventListener('pointermove', move, { passive: true });
      el.addEventListener('pointerleave', leave);
      return () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      };
    });
    return () => cleanups.forEach((c) => c());
  }, []);
}
