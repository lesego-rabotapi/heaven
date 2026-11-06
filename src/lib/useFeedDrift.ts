import { useEffect, useState, type RefObject } from 'react';
import { nextScroll, passSeconds } from './feedDriftMath';

const RESUME_AFTER_MS = 3000;

// The feed drifts sideways by itself and stays an ordinary scrolling row, so a hand can take over at any
// time. Drifting moves scrollLeft, not a transform, which is what lets the two share the row. It holds
// still under a pointer, a finger or keyboard focus, off screen and in a hidden tab, picks up 3 s after a
// hand scroll, and never starts under reduced motion. Returns whether the tiles should be doubled for the
// loop: not in the prerendered HTML, so without script the row is simply ten photos to scroll.
export function useFeedDrift(rowRef: RefObject<HTMLElement | null>) {
  const [looped, setLooped] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setLooped(true);
  }, []);

  useEffect(() => {
    const row = rowRef.current;
    const track = row?.firstElementChild;
    if (!row || !track || !looped) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const tiles = track.children;
    let pos = row.scrollLeft;
    let held = false;
    let resumeAt = 0;
    let last = 0;
    let frame = 0;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const ms = Math.min(now - last, 100);
      last = now;
      if (held || document.hidden || reduce.matches || now < resumeAt) { pos = row.scrollLeft; return; }
      const first = tiles[0] as HTMLElement | undefined;
      const copy = tiles[tiles.length / 2] as HTMLElement | undefined;
      if (!first || !copy) return;
      const period = copy.offsetLeft - first.offsetLeft;
      pos = nextScroll(pos, period, period / passSeconds(window.innerWidth), ms);
      row.scrollLeft = pos;
    };

    // Phones fire mouseenter on a tap with no mouseleave after it, which would leave the row stopped.
    const canHover = window.matchMedia('(hover: hover)');
    const hover = () => { if (canHover.matches) held = true; };
    const hold = () => { held = true; };
    const release = () => { held = false; resumeAt = performance.now() + RESUME_AFTER_MS; };
    // A scroll that is not where drifting left the row came from a hand: wheel, swipe, keys or scrollbar.
    const onScroll = () => {
      if (Math.abs(row.scrollLeft - pos) > 2) { pos = row.scrollLeft; resumeAt = performance.now() + RESUME_AFTER_MS; }
    };

    const seen = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry?.isIntersecting) { last = performance.now(); frame = requestAnimationFrame(tick); }
    });
    seen.observe(row);
    row.addEventListener('mouseenter', hover);
    row.addEventListener('mouseleave', release);
    row.addEventListener('focusin', hold);
    row.addEventListener('focusout', release);
    row.addEventListener('touchstart', hold, { passive: true });
    row.addEventListener('touchend', release);
    row.addEventListener('touchcancel', release);
    row.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      seen.disconnect();
      row.removeEventListener('mouseenter', hover);
      row.removeEventListener('mouseleave', release);
      row.removeEventListener('focusin', hold);
      row.removeEventListener('focusout', release);
      row.removeEventListener('touchstart', hold);
      row.removeEventListener('touchend', release);
      row.removeEventListener('touchcancel', release);
      row.removeEventListener('scroll', onScroll);
    };
  }, [rowRef, looped]);

  return looped;
}
