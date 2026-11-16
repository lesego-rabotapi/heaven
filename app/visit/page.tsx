import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Hours } from "@/components/Hours";
import { OpenStatus } from "@/components/OpenStatus";
import { ArchPhoto, Photo } from "@/components/Photo";
import { Icon } from "@/components/Icon";
import { FlowButton } from "@/components/ui/flow-button";
import { OriginButton } from "@/components/ui/origin-button";
import { CUES, SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Hours & visit",
  description:
    "Heaven Coffee is open every day, 07:00 to 18:00, at 38 Burg Street on the corner of Burg and Longmarket, Greenmarket Square, Cape Town. How to find the door.",
};

export default function VisitPage() {
  return (
    <>
      <PageHero eyebrow="Hours & visit" title="Open 7–6" aside="every day">
        <OpenStatus className="status--onDark status--lg" />
      </PageHero>

      <section className="visit" aria-labelledby="visit-title">
        <h2 className="sr-only" id="visit-title">
          Hours and address
        </h2>
        <div className="visit__hours" data-reveal>
          <Hours />
          <p className="visit__small">
            The church still holds its services, and public-holiday hours can differ. Call ahead if
            it matters.
          </p>
        </div>

        <div className="visit__grid">
          <div className="visit__card" data-reveal>
            <p className="eyebrow">Find us</p>
            <address>{SITE.address}</address>
            <p>
              From the street it reads as a church, because it is. Look for the navy awning at the
              Burg Street entrance.
            </p>
            <div className="visit__actions">
              <FlowButton href={SITE.mapsUrl}>Get directions</FlowButton>
              <OriginButton href={SITE.phoneHref}>
                <Icon name="phone-linear" size={18} /> Call {SITE.phoneDisplay}
              </OriginButton>
            </div>
          </div>
          <figure className="visit__figure" data-reveal data-reveal-delay="0.1">
            <ArchPhoto image="glass-door" sizes="(min-width: 900px) 30vw, 80vw" focus="50% 60%" />
          </figure>
        </div>
      </section>

      <section className="cues" aria-labelledby="cues-title">
        <div className="cues__head">
          <p className="eyebrow" data-reveal>
            How to find the door
          </p>
          <h2 className="cues__title" id="cues-title" data-split>
            Three things <em>to look for</em>
          </h2>
        </div>
        <ol className="cues__list">
          {CUES.map((cue, i) => (
            <li className="cue" key={cue.title} data-reveal data-reveal-delay={i * 0.08}>
              <div className="cue__photo">
                <Photo image={cue.image} sizes="(min-width: 900px) 30vw, 90vw" />
                <span className="cue__icon" aria-hidden="true">
                  <Icon name={cue.icon} size={22} />
                </span>
              </div>
              <p className="cue__no">0{i + 1}</p>
              <h3 className="cue__title">{cue.title}</h3>
              <p className="cue__body">{cue.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
