import { SITE } from "@/content/site";
import { OpenStatus } from "./OpenStatus";
import { FlowButton } from "./ui/flow-button";
import { OriginButton } from "./ui/origin-button";

/** The short version of the visit page, at the end of the home page. */
export function VisitStrip() {
  return (
    <section className="strip" aria-labelledby="strip-title">
      <div className="strip__top">
        <h2 className="strip__title" id="strip-title" data-split>
          Open 7–6 <em>every day</em>
        </h2>
        <OpenStatus className="status--onDark" />
      </div>
      <div className="strip__row" data-reveal>
        <address className="strip__address">{SITE.address}</address>
        <p className="strip__hint">
          From the street it reads as a church, because it is. Look for the navy umbrellas.
        </p>
        <div className="strip__cta">
          <FlowButton href={SITE.mapsUrl} tone="amber">
            Get directions
          </FlowButton>
          <OriginButton href="/visit" tone="light">
            Hours &amp; how to find us
          </OriginButton>
        </div>
      </div>
    </section>
  );
}
