import type { Drawer } from '../lib/useDrawer';
import { DirectionsLink } from './DirectionsLink';
export function Header({ drawer }: { drawer: Drawer }) {
  return (
    <header className="site-header on-light fixed z-50 flex items-center justify-between gap-3 rounded-full" style={{ background: "var(--surface-light)", border: "1px solid rgba(255,255,255,.9)", WebkitBackdropFilter: "blur(14px)", backdropFilter: "blur(14px)" }}>
      <a href="#top" onClick={() => drawer.close(false)} className="inline-flex items-baseline gap-1.5" style={{ color: "var(--ink)", fontFamily: "'Poppins',sans-serif", fontWeight: "300", letterSpacing: "-0.02em" }}>
        <span className="logo-word">
          heaven
        </span>
        {' '}
        <span className="logo-sub" style={{ fontWeight: "400", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
          coffee
        </span>
      </a>
      <nav aria-label="Primary" className="hidden lg:flex items-center" style={{ gap: "36px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.02em" }}>
        <a href="#story" className="hv-link" style={{ color: "var(--ink)" }}>
          Story
        </a>
        {' '}
        <a href="#menu" className="hv-link" style={{ color: "var(--ink)" }}>
          Menu
        </a>
        {' '}
        <a href="#feed" className="hv-link" style={{ color: "var(--ink)" }}>
          From the feed
        </a>
        {' '}
        <a href="#visit-desktop" className="hv-link" style={{ color: "var(--ink)" }}>
          Hours &amp; visit
        </a>
      </nav>
      <DirectionsLink className="hv-btn hv-link hidden lg:flex items-center gap-2.5" style={{ height: "48px", padding: "0 22px", borderRadius: "999px", background: "var(--action)", color: "var(--action-ink)", fontSize: "14px", fontWeight: "700" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 11l19-9-9 19-2-8-8-2z" />
        </svg>
        {' '}
        Get directions
      </DirectionsLink>
      <button id="nav-toggle" ref={drawer.toggleRef} onClick={drawer.toggle} type="button" className="lg:hidden flex items-center justify-center flex-shrink-0" style={{ width: "44px", height: "44px", borderRadius: "50%", border: "none", background: "var(--action)", color: "var(--action-ink)", cursor: "pointer" }} aria-label={drawer.open ? "Close menu" : "Open menu"} aria-expanded={drawer.open} aria-controls="nav-drawer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d={drawer.open ? "M6 6l12 12M18 6L6 18" : "M4 8h16M4 16h16"} />
        </svg>
      </button>
    </header>
  );
}
