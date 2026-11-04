import { HoursRows } from './HoursRows';
export function VisitDesktop() {
  return (
    <section id="visit-desktop" className="hidden lg:grid" style={{ background: "var(--ground)", padding: "60px 56px 120px", gridTemplateColumns: "repeat(12,minmax(0,1fr))", columnGap: "24px" }}>
      <div style={{ gridColumn: "span 7" }} className="flex flex-col">
        <div className="flex items-end justify-between" style={{ borderBottom: "2px solid var(--rule-strong)", paddingBottom: "10px" }}>
          <h2 aria-label="Open 7 to 6" className="font-display uppercase m-0" style={{ fontStretch: "62%", fontWeight: "900", fontSize: "200px", lineHeight: "0.78", letterSpacing: "-0.03em" }}>
            Open 7–6
          </h2>
          <span className="font-quote italic" style={{ paddingBottom: "14px", fontSize: "30px", color: "var(--ink-accent)" }}>
            every day
          </span>
        </div>
        <div id="hours-scale" className="grid" style={{ gridTemplateColumns: "140px minmax(0,1fr) 150px", columnGap: "20px", padding: "14px 0 6px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.14em", color: "var(--ink-muted)" }}>
          <span>
            DAY
          </span>
          <div className="flex justify-between">
            <span>
              00
            </span>
            <span>
              06
            </span>
            <span>
              12
            </span>
            <span>
              18
            </span>
            <span>
              24
            </span>
          </div>
          <span className="text-right">
            HOURS
          </span>
        </div>
        <div id="hours-rows-desktop">
          <HoursRows compact={false} />
        </div>
      </div>
      <div style={{ gridColumn: "9 / span 4" }} className="flex flex-col">
        <div style={{ height: "360px", borderRadius: "180px 180px 20px 20px", overflow: "hidden" }}>
          <picture className="block w-full h-full">
            <source type="image/webp" srcSet="images/puppy-entrance-door.webp" />
            <img src="images/puppy-entrance-door.jpg" alt="The Gothic entrance of Central Methodist Mission with heaven coffee door signage" width="652" height="867" className="w-full h-full object-cover block" loading="lazy" decoding="async" />
          </picture>
        </div>
      </div>
    </section>
  );
}
