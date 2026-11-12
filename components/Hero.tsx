import { SITE } from "@/content/site";
import { ArchPhoto, Photo } from "./Photo";
import { ArrowIcon, DownIcon } from "./Icons";

/** 01 · The square. Daylight, white, the invitation. */
export function Hero() {
  return (
    <section className="hero" id="top" data-tone="light" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="eyebrow" data-intro>
          Coffee inside a working church <span aria-hidden="true">·</span> Greenmarket Square
        </p>
        <h1 className="hero__title" id="hero-title" data-intro>
          Heaven is at <em>38 Burg Street.</em>
        </h1>
        <p className="hero__lede" data-intro>
          Behind a Gothic stone arch in the middle of Cape Town there are pews, a pipe organ, a
          border collie called Coco, and very good coffee. Everyone who finds the door is welcome.
        </p>
        <div className="hero__cta" data-intro>
          <a className="btn btn--primary" href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
            Get directions
            <ArrowIcon />
          </a>
          <a className="btn btn--ghost" href="#door">
            Find the door
            <DownIcon />
          </a>
        </div>
      </div>

      <figure className="hero__figure" data-intro-figure>
        <ArchPhoto
          image="mondli-coco-doorway"
          sizes="(min-width: 900px) 40vw, 92vw"
          priority
          focus="58% 30%"
        />
        <figcaption>
          Mondli Mahamba and Coco, <span>at the door since 2017</span>
        </figcaption>
      </figure>

      <div className="hero__snap" data-intro aria-hidden="true">
        <div className="hero__snap-inner" data-parallax="0.35">
          <Photo image="latte-art" sizes="180px" alt="" />
        </div>
      </div>

      <dl className="hero__facts" data-intro>
        <div>
          <dt>Since</dt>
          <dd>April 2017</dd>
        </div>
        <div>
          <dt>Open</dt>
          <dd>
            Daily {SITE.hours.open} to {SITE.hours.close}
          </dd>
        </div>
        <div>
          <dt>Inside</dt>
          <dd>Central Methodist Mission</dd>
        </div>
        <div>
          <dt>Dogs</dt>
          <dd>Welcome, on leads</dd>
        </div>
      </dl>
    </section>
  );
}
