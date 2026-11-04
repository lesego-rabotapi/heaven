import { useEffect, type RefObject } from 'react';

// The arch portal: as the hero photo scrolls away through the top of the screen, the door photo fades
// out while the stone nave behind it fades in and the arch grows a little, so it feels like walking
// through the door. Off unless the address has ?journey=on, never under reduced motion, and it stops
// at once if reduced motion is turned on while the page is open. The markup is always in the page (the
// nave image is display:none, so it is never fetched); this hook only switches it on and feeds it a
// number: --journey, 0 while the arch is whole and 1 once it has left through the top.
export function useArchPortal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!/[?&]journey=on(&|$)/.test(window.location.search) || reduce.matches || !('IntersectionObserver' in window)) return;

    const html = document.documentElement;
    html.setAttribute('data-journey', 'on');
    const thresholds = Array.from({ length: 41 }, (_, i) => i / 40);
    const frames = Array.from(root.querySelectorAll<HTMLElement>('.journey-tile'));
    // Watch each frame's parent, which is the same size and never scaled. Watching the frame itself fed
    // back: growing it changed the ratio that decides how much it grows.
    const observers = frames.map((frame) => {
      const io = new IntersectionObserver((entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        const gone = entry.boundingClientRect.top < 0 ? 1 - entry.intersectionRatio : 0;
        frame.style.setProperty('--journey', gone.toFixed(3));
      }, { threshold: thresholds });
      if (frame.parentElement) io.observe(frame.parentElement);
      return io;
    });

    const stop = () => { observers.forEach((o) => o.disconnect()); frames.forEach((f) => f.style.removeProperty('--journey')); html.removeAttribute('data-journey'); };
    const onMotion = (e: MediaQueryListEvent) => { if (e.matches) stop(); };
    reduce.addEventListener('change', onMotion);
    return () => { reduce.removeEventListener('change', onMotion); stop(); };
  }, [ref]);
}
