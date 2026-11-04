import { useCallback, useEffect, useRef, useState } from 'react';

// The mobile menu drawer. The header (z-50) sits above the drawer (z-40), so the hamburger stays
// tappable as the close control. While it is open everything except the header and the drawer is inert,
// Escape closes it, Tab stays inside it, and focus moves in and returns to the toggle.
const CLOSE_MS = 520;

export function useDrawer() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false); // in the layout at all (not display:none)
  const [shown, setShown] = useState(false); // the slide-in class
  const [closing, setClosing] = useState(false); // the slide-out class
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const openRef = useRef(false);

  const close = useCallback((restoreFocus: boolean, immediate = false) => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    setShown(false);
    if (immediate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false);
      setClosing(false);
    } else {
      setClosing(true);
      timer.current = setTimeout(() => { setVisible(false); setClosing(false); }, CLOSE_MS);
    }
    if (restoreFocus) toggleRef.current?.focus({ preventScroll: true });
  }, []);

  const openDrawer = useCallback(() => {
    if (openRef.current) return;
    openRef.current = true;
    clearTimeout(timer.current);
    setVisible(true);
    setClosing(false);
    setOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
  }, []);

  const toggle = useCallback(() => (openRef.current ? close(true) : openDrawer()), [close, openDrawer]);

  // Page state while open: scroll lock, inert background, focus in.
  useEffect(() => {
    if (!open) return;
    document.body.classList.add('overflow-hidden');
    const background = document.querySelectorAll<HTMLElement>('main, footer, #action-bar');
    background.forEach((el) => { el.inert = true; });
    drawerRef.current?.querySelector<HTMLElement>('a[href]')?.focus({ preventScroll: true });
    return () => {
      document.body.classList.remove('overflow-hidden');
      background.forEach((el) => { el.inert = false; });
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!openRef.current) return;
      if (e.key === 'Escape') { e.preventDefault(); close(true); return; }
      if (e.key !== 'Tab') return;
      const nodes = [
        ...Array.from(document.querySelectorAll<HTMLElement>('.site-header a[href], .site-header button')),
        ...Array.from(drawerRef.current?.querySelectorAll<HTMLElement>('a[href]') ?? []),
      ].filter((el) => el.getClientRects().length > 0);
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    // Crossing into the desktop layout hides the drawer and toggle with CSS; release the scroll lock and
    // the inert state so the page is not left stuck.
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onDesktop = (e: MediaQueryListEvent) => { if (e.matches) close(false, true); };
    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onDesktop);
    return () => { document.removeEventListener('keydown', onKey); desktop.removeEventListener('change', onDesktop); clearTimeout(timer.current); };
  }, [close]);

  return { open, visible, shown, closing, toggle, close, toggleRef, drawerRef };
}

export type Drawer = ReturnType<typeof useDrawer>;
