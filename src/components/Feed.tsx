import { FeedMarquee } from './FeedMarquee';
import { InstagramCards } from './InstagramCard';
import { feed } from '../lib/content';
import { DirectionsLink, OtherMaps } from './DirectionsLink';
export function Feed() {
  return (
    <section id="feed" className="feed-section relative overflow-hidden">
      <div className="feed-head flex flex-col lg:flex-row lg:items-end justify-between px-4 lg:px-14" style={{ gap: "24px" }}>
        <div className="flex flex-col" style={{ gap: "12px" }}>
          <span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-accent)" }}>
            A look around
          </span>
          <h2 className="feed-h2 font-display uppercase m-0" style={{ fontStretch: "70%", fontWeight: "900", lineHeight: "0.86", letterSpacing: "-0.02em" }}>
            Heaven,
            {' '}
            <span className="font-quote italic" style={{ textTransform: "none", color: "var(--ink-accent)" }}>
              in pictures
            </span>
          </h2>
        </div>
        <a href="https://instagram.com/heavencoffeect" rel="noopener noreferrer" target="_blank" className="hv-btn hv-link flex-shrink-0 inline-flex items-center gap-3" style={{ height: "56px", padding: "0 26px", borderRadius: "999px", background: "var(--action)", color: "var(--action-ink)", fontSize: "15px", fontWeight: "700" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
          </svg>
          {' '}
          Follow @heavencoffeect
        </a>
      </div>
      <FeedMarquee />
      <InstagramCards posts={[feed[0], feed[1], feed[9]].filter((p): p is (typeof feed)[number] => Boolean(p))} />
      <div className="hidden lg:block px-14 mt-12">
        <div className="rounded-2xl flex flex-col" style={{ background: "var(--card)", padding: "28px", gap: "18px" }}>
          <div className="flex flex-col" style={{ gap: "4px" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
              Find us
            </span>
            {' '}
            <span style={{ fontSize: "20px", fontWeight: "700", lineHeight: "1.35" }}>
              38 Burg Street, corner of Burg &amp; Longmarket, Cape Town 8000
            </span>
          </div>
          <p className="m-0" style={{ fontSize: "15px", lineHeight: "1.55", color: "var(--ink-soft)" }}>
            From the street it reads as a church, because it is. Look for the navy umbrellas and the chalkboard sign at the Burg Street entrance:
            {' '}
            <span className="font-quote italic">
              Stairway to heaven in a cup.
            </span>
          </p>
          <div className="flex" style={{ gap: "10px" }}>
            <DirectionsLink className="hv-btn hv-link flex-grow flex items-center justify-center" style={{ height: "50px", borderRadius: "999px", background: "var(--action)", color: "var(--action-ink)", fontSize: "14px", fontWeight: "700" }}>
              Get directions
            </DirectionsLink>
            {' '}
            <span data-phone-placeholder className="flex items-center justify-center" style={{ height: "50px", padding: "0 20px", borderRadius: "999px", border: "1.5px dashed var(--ink-muted)", color: "var(--ink-muted)", fontSize: "14px", fontWeight: "700" }}>
              0XX XXX XXXX
            </span>
          </div>
          <OtherMaps />
        </div>
      </div>
    </section>
  );
}
