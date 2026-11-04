import { HoursRows } from './HoursRows';
import { DirectionsLink, OtherMaps } from './DirectionsLink';
export function FooterMobile() {
  return (
    <footer id="footer-mobile" className="lg:hidden relative overflow-hidden flex flex-col" style={{ padding: "48px 16px 28px", gap: "32px" }}>
      <div className="footer-links grid grid-cols-2" style={{ gap: "24px", fontSize: "14px" }}>
        <nav aria-label="Footer" className="flex flex-col" style={{ gap: "10px" }}>
          <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-accent)" }}>
            Explore
          </span>
          {' '}
          <a href="#find-the-door" className="hv-link" style={{ color: "var(--ink)" }}>
            Find us
          </a>
          <a href="#story" className="hv-link" style={{ color: "var(--ink)" }}>
            Story
          </a>
          <a href="#menu" className="hv-link" style={{ color: "var(--ink)" }}>
            Menu
          </a>
          <a href="#feed" className="hv-link" style={{ color: "var(--ink)" }}>
            In pictures
          </a>
          <a href="#visit" className="hv-link" style={{ color: "var(--ink)" }}>
            Hours &amp; visit
          </a>
        </nav>
        <div className="flex flex-col" style={{ gap: "10px" }}>
          <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-accent)" }}>
            Say hello
          </span>
          <span data-phone-placeholder style={{ color: "var(--ink-muted)" }}>
            0XX XXX XXXX
          </span>
          <a href="https://instagram.com/heavencoffeect" rel="noopener noreferrer" target="_blank" className="hv-link" style={{ color: "var(--ink)" }}>
            @heavencoffeect
          </a>
        </div>
      </div>
      <div className="footer-follow" style={{ padding: "32px 16px 0" }}>
        <a href="https://instagram.com/heavencoffeect" rel="noopener noreferrer" target="_blank" className="hv-btn hv-link flex items-center justify-center gap-2.5" style={{ height: "52px", borderRadius: "999px", background: "var(--action)", color: "var(--action-ink)", fontSize: "15px", fontWeight: "700" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
          </svg>
          {' '}
          Follow @heavencoffeect
        </a>
      </div>
      <section id="visit" aria-label="Hours and visit" className="flex flex-col" style={{ padding: "40px 16px 0" }}>
        <div className="visit-head flex items-end justify-between" style={{ borderBottom: "2px solid var(--rule-strong)", paddingBottom: "6px" }}>
          <h2 aria-label="Open 7 to 6" className="font-display uppercase m-0" style={{ fontStretch: "62%", fontWeight: "900", fontSize: "104px", lineHeight: "0.78", letterSpacing: "-0.03em" }}>
            Open 7–6
          </h2>
          <span className="font-quote italic" style={{ paddingBottom: "8px", fontSize: "20px", color: "var(--ink-accent)" }}>
            daily
          </span>
        </div>
        <div id="hours-rows-mobile">
          <HoursRows compact={true} />
        </div>
        <div className="visit-photo" style={{ borderRadius: "150px 150px 18px 18px", overflow: "hidden" }}>
          <picture className="block w-full h-full">
            <source type="image/webp" srcSet="images/puppy-entrance-door.webp" />
            <img src="images/puppy-entrance-door.jpg" alt="The Gothic entrance with heaven coffee door signage" width="652" height="867" className="w-full h-full object-cover block" loading="lazy" decoding="async" />
          </picture>
        </div>
        <div className="visit-card flex flex-col" style={{ padding: "22px", borderRadius: "18px", background: "var(--card)", gap: "14px" }}>
          <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
            Find us
          </span>
          {' '}
          <span style={{ fontSize: "18px", fontWeight: "700", lineHeight: "1.35" }}>
            38 Burg Street, corner of Burg &amp; Longmarket, Cape Town 8000
          </span>
          <p className="m-0" style={{ fontSize: "14px", lineHeight: "1.55", color: "var(--ink-soft)" }}>
            From the street it reads as a church, because it is. Look for the navy umbrellas and the chalkboard sign:
            {' '}
            <span className="font-quote italic">
              Stairway to heaven in a cup.
            </span>
          </p>
          <DirectionsLink className="hv-btn hv-link flex items-center justify-center" style={{ height: "50px", borderRadius: "999px", background: "var(--action)", color: "var(--action-ink)", fontSize: "14px", fontWeight: "700" }}>
            Get directions
          </DirectionsLink>
          <OtherMaps />
          {' '}
          <span data-phone-placeholder className="flex items-center justify-center" style={{ height: "50px", borderRadius: "999px", border: "1.5px dashed var(--ink-muted)", color: "var(--ink-muted)", fontSize: "14px", fontWeight: "700" }}>
            Call 0XX XXX XXXX
          </span>
        </div>
        <p className="visit-foot text-center font-quote italic m-0" style={{ marginTop: "32px", fontSize: "1.5rem", lineHeight: "1.15", color: "var(--ink)" }}>
          born in love, by love, for love
        </p>
        <div className="visit-foot footer-heaven text-center" style={{ marginTop: "16px", fontFamily: "'Poppins',sans-serif", fontWeight: "300", lineHeight: "0.9", letterSpacing: "-0.06em", color: "var(--ink-bright)" }}>
          heaven
        </div>
      </section>
    </footer>
  );
}
