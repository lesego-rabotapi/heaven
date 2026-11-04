import { DirectionsLink } from './DirectionsLink';
export function FooterDesktop() {
  return (
    <footer id="footer-desktop" className="hidden lg:flex flex-col relative overflow-hidden" style={{ padding: "72px 56px 40px", background: "linear-gradient(180deg, #EEF4FA 0%, #A9CDF0 60%, #7FB3E6 100%)" }}>
      <div className="cloud" style={{ width: "700px", height: "160px", left: "380px", top: "40px", opacity: ".8" }} aria-hidden="true" />
      <div className="relative grid grid-cols-4" style={{ gap: "24px", fontSize: "15px" }}>
        <div className="flex flex-col" style={{ gap: "10px" }}>
          <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.2em", textTransform: "uppercase", color: "#12326E" }}>
            Visit
          </span>
          <span>
            38 Burg Street, Cape Town
          </span>
          <span>
            Daily 07:00 — 18:00
          </span>
          {' '}
          <DirectionsLink className="hv-btn hv-link self-start flex items-center gap-2 mt-1" style={{ height: "46px", padding: "0 20px", borderRadius: "999px", background: "#1D4ED8", color: "#fff", fontSize: "14px", fontWeight: "700" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 11l19-9-9 19-2-8-8-2z" />
            </svg>
            Get directions
          </DirectionsLink>
        </div>
        <nav aria-label="Footer" className="flex flex-col" style={{ gap: "10px" }}>
          <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.2em", textTransform: "uppercase", color: "#12326E" }}>
            Explore
          </span>
          {' '}
          <a href="#find-the-door" className="hv-link" style={{ color: "#0F1B2D" }}>
            Find us
          </a>
          <a href="#story" className="hv-link" style={{ color: "#0F1B2D" }}>
            Story
          </a>
          <a href="#menu" className="hv-link" style={{ color: "#0F1B2D" }}>
            Menu
          </a>
          <a href="#feed" className="hv-link" style={{ color: "#0F1B2D" }}>
            In pictures
          </a>
          <a href="#visit-desktop" className="hv-link" style={{ color: "#0F1B2D" }}>
            Hours &amp; visit
          </a>
        </nav>
        <div className="flex flex-col" style={{ gap: "10px" }}>
          <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.2em", textTransform: "uppercase", color: "#12326E" }}>
            Say hello
          </span>
          <span data-phone-placeholder style={{ color: "#3E4C63" }}>
            0XX XXX XXXX
          </span>
          <a href="https://instagram.com/heavencoffeect" rel="noopener noreferrer" target="_blank" className="hv-link" style={{ color: "#0F1B2D" }}>
            @heavencoffeect
          </a>
        </div>
        <div className="flex flex-col" style={{ gap: "10px" }}>
          <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.2em", textTransform: "uppercase", color: "#12326E" }}>
            In our words
          </span>
          <span className="font-quote italic" style={{ fontSize: "24px", lineHeight: "1.15", color: "#0F1B2D" }}>
            born in love, by love, for love
          </span>
        </div>
      </div>
      <div className="relative flex flex-col" style={{ gap: "20px", marginTop: "40px" }}>
        <div className="footer-heaven text-center" style={{ fontFamily: "'Poppins',sans-serif", fontWeight: "300", lineHeight: "0.8", letterSpacing: "-0.06em", color: "#FBFCFD" }}>
          heaven
        </div>
        <p className="m-0" style={{ fontSize: "13px", color: "#0F1B2D" }}>
          Heaven Coffee · Central Methodist Mission, Greenmarket Square
        </p>
      </div>
    </footer>
  );
}
