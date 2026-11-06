import { useEffect, type RefObject } from 'react';

const DRAG_THRESHOLD_PX = 4;

// Drag a scrolling row sideways with the mouse. Touch is left to the browser's own swipe. The pointer is
// captured only once a press has become a drag, so a plain click still reaches the link under it; the
// click that ends a drag is swallowed so it does not open that link.
export function useDragScroll(rowRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let pressed = false;
    let dragged = false;
    let startX = 0;
    let startLeft = 0;

    const down = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      pressed = true;
      dragged = false;
      startX = e.clientX;
      startLeft = row.scrollLeft;
    };
    const move = (e: PointerEvent) => {
      if (!pressed) return;
      const dx = e.clientX - startX;
      if (!dragged && Math.abs(dx) < DRAG_THRESHOLD_PX) return;
      if (!dragged) {
        dragged = true;
        row.setPointerCapture(e.pointerId);
        row.classList.add('is-dragging');
      }
      row.scrollLeft = startLeft - dx;
    };
    const up = () => {
      pressed = false;
      row.classList.remove('is-dragging');
    };
    const click = (e: MouseEvent) => {
      if (!dragged) return;
      dragged = false;
      e.preventDefault();
      e.stopPropagation();
    };
    // Tiles are links and images, which the browser would otherwise pick up and drag as a file.
    const noNativeDrag = (e: Event) => e.preventDefault();

    row.addEventListener('pointerdown', down);
    row.addEventListener('pointermove', move);
    row.addEventListener('pointerup', up);
    row.addEventListener('pointercancel', up);
    row.addEventListener('click', click, true);
    row.addEventListener('dragstart', noNativeDrag);

    return () => {
      row.removeEventListener('pointerdown', down);
      row.removeEventListener('pointermove', move);
      row.removeEventListener('pointerup', up);
      row.removeEventListener('pointercancel', up);
      row.removeEventListener('click', click, true);
      row.removeEventListener('dragstart', noNativeDrag);
    };
  }, [rowRef]);
}
