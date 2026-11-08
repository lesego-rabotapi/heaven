import { useEffect, type RefObject } from 'react';

declare global { interface Window { __motionFailsafe?: ReturnType<typeof setTimeout> } }

// The hero's entrance: its [data-intro] items rise in one after another, once, a little under two
// seconds in all, and the logo's swoosh draws itself from the left. This is the one place Anime.js is used (a coordinated sequence); scroll reveals are
// CSS only (styles/reveal.css). The items are in the prerendered HTML; the CSS hides them only while
// html.js-motion is set, which the page script never adds for reduced motion and removes after 4 s if
// this bundle never starts. Anime.js loads on demand.
export function useHeroIntro(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (window.__motionFailsafe) clearTimeout(window.__motionFailsafe);
    const root = ref.current;
    if (!root || !document.documentElement.classList.contains('js-motion')) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-intro]'));
    let cancelled = false;
    import('animejs').then(({ createTimeline }) => {
      if (cancelled) return;
      const tl = createTimeline({ defaults: { ease: 'outCubic', duration: 800 } });
      items.forEach((el, i) => tl.add(el, { opacity: [0, 1], y: [28, 0] }, i === 0 ? 0 : '-=550'));
      const swoosh = root.querySelector<SVGElement>('[data-swoosh]');
      if (swoosh) tl.add(swoosh, { scaleX: [0, 1], duration: 900 }, 250);
    });
    return () => { cancelled = true; };
  }, [ref]);
}
