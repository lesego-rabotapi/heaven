import type { Drawer } from '../lib/useDrawer';
import { DirectionsLink } from './DirectionsLink';
import { HeavenLockup } from './HeavenLockup';
import { Roll } from './Roll';
export function Header({ drawer }: { drawer: Drawer }) {
  return (
    <header className="site-header on-light fixed z-50 flex items-center justify-between gap-3 rounded-full" style={{ background: "var(--surface-light)", border: "1px solid rgba(255,255,255,.9)", WebkitBackdropFilter: "blur(14px)", backdropFilter: "blur(14px)" }}>
      <a href="#top" onClick={() => drawer.close(false)} className="inline-flex" aria-label="Heaven Coffee, back to top">
        <HeavenLockup size="header" />
      </a>
      <nav aria-label="Primary" className="hidden lg:flex items-center">
        <a href="#story" className="hv-link">
          Story
        </a>
        {' '}
        <a href="#menu" className="hv-link">
          Menu
        </a>
        {' '}
        <a href="#feed" className="hv-link">
          From the feed
        </a>
        {' '}
        <a href="#visit" className="hv-link">
          Hours &amp; visit
        </a>
      </nav>
      <DirectionsLink data-magnet className="hv-btn hv-link btn btn-accent hidden lg:inline-flex">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 11l19-9-9 19-2-8-8-2z" />
        </svg>
        <Roll>Get directions</Roll>
      </DirectionsLink>
      <button id="nav-toggle" ref={drawer.toggleRef} onClick={drawer.toggle} type="button" className="lg:hidden flex items-center justify-center flex-shrink-0" style={{ width: "44px", height: "44px", borderRadius: "50%", border: "none", background: "var(--action)", color: "var(--action-ink)", cursor: "pointer" }} aria-label={drawer.open ? "Close menu" : "Open menu"} aria-expanded={drawer.open} aria-controls="nav-drawer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d={drawer.open ? "M6 6l12 12M18 6L6 18" : "M4 8h16M4 16h16"} />
        </svg>
      </button>
    </header>
  );
}
