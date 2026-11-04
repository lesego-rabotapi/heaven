import { useEffect, useState } from 'react';
import { hours } from './content';
import { getOpenState, type OpenState } from './open-state';

// The open-now chip's state. Null until the page is hydrated, so the prerendered HTML (and a visitor
// with JavaScript off) keeps the printed "Open daily 07:00 — 18:00". Cape Town time whatever the
// visitor's clock says. It ticks on the minute boundary, so the label flips at 07:00 and 18:00 and not
// up to a minute later, and it re-reads when the tab becomes visible. No aria-live: a chip that changes
// at 07:00 and 18:00 should not interrupt a screen reader mid-sentence.
export function useOpenState(): OpenState | null {
  const [state, setState] = useState<OpenState | null>(null);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const read = () => {
      const next = getOpenState(new Date(), hours);
      setState((prev) => (prev && prev.label === next.label && prev.open === next.open ? prev : next));
    };
    const tick = () => { read(); timer = setTimeout(tick, 60000 - (Date.now() % 60000) + 50); };
    tick();
    const onVisible = () => { if (!document.hidden) read(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => { clearTimeout(timer); document.removeEventListener('visibilitychange', onVisible); };
  }, []);
  return state;
}
