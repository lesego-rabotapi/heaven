import { useEffect, type RefObject } from 'react';

declare global { interface Window { __motionFailsafe?: ReturnType<typeof setTimeout> } }

type RevealOptions = { y?: number; duration?: number; delay?: number };

// Fades and lifts the children marked [data-reveal] inside `ref` when they scroll into view.
// The content is in the HTML already (prerendered); the CSS only hides it while html.js-motion is set,
// and that class is never added for reduced motion. Anime.js is loaded on demand so it stays out of the
// first paint.
export function useReveal(ref: RefObject<HTMLElement | null>, { y = 24, duration = 700, delay = 90 }: RevealOptions = {}) {
  useEffect(() => {
    const root = ref.current;
    if (window.__motionFailsafe) clearTimeout(window.__motionFailsafe);
    if (!root || !document.documentElement.classList.contains('js-motion')) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!items.length) return;
    let cancelled = false;
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      const entering = entries.filter((e) => e.isIntersecting && !seen.has(e.target));
      if (!entering.length) return;
      entering.forEach((e) => { seen.add(e.target); io.unobserve(e.target); });
      import('animejs').then(({ animate, stagger }) => {
        if (cancelled) return;
        animate(entering.map((e) => e.target), {
          opacity: [0, 1],
          y: [y, 0],
          duration,
          delay: stagger(delay),
          ease: 'outCubic',
        });
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    items.forEach((el) => io.observe(el));
    return () => { cancelled = true; io.disconnect(); };
  }, [ref, y, duration, delay]);
}
