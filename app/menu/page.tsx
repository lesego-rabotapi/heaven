import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { MenuPoster } from "@/components/MenuPoster";
import { Photo } from "@/components/Photo";
import { FlowButton } from "@/components/ui/flow-button";
import { OriginButton } from "@/components/ui/origin-button";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "The menu",
  description:
    "Espresso, flat whites, cortados and bakes from the counter at Heaven Coffee, 38 Burg Street, Cape Town. Sample menu; prices to be confirmed.",
};

export default function MenuPage() {
  return (
    <>
      <PageHero eyebrow="Read off the letterboard" title="The Menu" aside="poured daily" />
      <MenuPoster />

      <section className="counter" aria-labelledby="counter-title">
        <div className="counter__head">
          <p className="eyebrow" data-reveal>
            From the counter
          </p>
          <h2 className="counter__title" id="counter-title" data-split>
            Baked for <em>the morning</em>
          </h2>
        </div>
        <ul className="counter__grid">
          <li data-reveal>
            <figure>
              <div className="counter__photo">
                <Photo image="bakes" sizes="(min-width: 900px) 30vw, 90vw" />
              </div>
              <figcaption>A loaf, shortbread and choc chip cookies, still on the tray.</figcaption>
            </figure>
          </li>
          <li data-reveal data-reveal-delay="0.08">
            <figure>
              <div className="counter__photo">
                <Photo image="counter-above" sizes="(min-width: 900px) 30vw, 90vw" focus="50% 40%" />
              </div>
              <figcaption>The pastry case sits on the counter, just inside the door.</figcaption>
            </figure>
          </li>
          <li data-reveal data-reveal-delay="0.16">
            <figure>
              <div className="counter__photo">
                <Photo image="pastry-sun" sizes="(min-width: 900px) 30vw, 90vw" focus="50% 60%" />
              </div>
              <figcaption>Best eaten at a pavement table, facing the square.</figcaption>
            </figure>
          </li>
        </ul>
        <div className="counter__cta" data-reveal>
          <FlowButton href={SITE.mapsUrl}>Get directions</FlowButton>
          <OriginButton href="/visit">Hours &amp; how to find us</OriginButton>
        </div>
      </section>
    </>
  );
}
