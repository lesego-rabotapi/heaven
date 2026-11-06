import { HeavenLockup } from './HeavenLockup';

export function Footer() {
  return (
    <footer id="footer" className="site-footer">
      <div className="footer-cols">
        <div className="footer-col">
          <span className="t-label t-accent">Visit</span>
          <span>38 Burg Street, Cape Town</span>
          <span>Daily 07:00 — 18:00</span>
        </div>
        <nav aria-label="Footer" className="footer-col">
          <span className="t-label t-accent">Explore</span>
          <a href="#story" className="hv-link">Story</a>
          <a href="#menu" className="hv-link">Menu</a>
          <a href="#feed" className="hv-link">From the feed</a>
          <a href="#visit" className="hv-link">Hours &amp; visit</a>
        </nav>
        <div className="footer-col">
          <span className="t-label t-accent">Say hello</span>
          <span data-phone-placeholder className="footer-phone">0XX XXX XXXX</span>
          <a href="https://instagram.com/heavencoffeect" rel="noopener noreferrer" target="_blank" className="hv-link">@heavencoffeect</a>
        </div>
      </div>
      <HeavenLockup size="footer" />
      <p className="footer-line">Heaven Coffee · Central Methodist Mission, Greenmarket Square</p>
    </footer>
  );
}
