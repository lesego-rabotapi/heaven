import { WALL } from "@/content/site";
import { ArchPhoto, Photo } from "../Photo";
import { Spotlight } from "../Spotlight";
import { FlowButton } from "../ui/flow-button";

/** Who opened the door. The copy is the old site's, kept as written. */
export function Founder() {
  return (
    <section className="founder" aria-labelledby="founder-title">
      <figure className="founder__figure" data-reveal>
        <ArchPhoto image="mondli-laugh" sizes="(min-width: 900px) 36vw, 88vw" focus="50% 45%" />
        <figcaption>
          <strong>Mondli Mahamba</strong>
          <span>Founder, since April 2017</span>
        </figcaption>
      </figure>
      <div className="founder__copy">
        <p className="eyebrow" data-reveal>
          Our story
        </p>
        <h2 className="founder__title" id="founder-title" data-split>
          A place of welcome, <em>off the square</em>
        </h2>
        <p data-reveal>
          Mondli Mahamba opened Heaven Coffee in April 2017 inside the Central Methodist Mission on
          Greenmarket Square, one of Cape Town&rsquo;s most storied buildings.
        </p>
        <p data-reveal>
          Inside Gothic stone arches, next to wooden pews, Heaven became a place of welcome for
          everyone who steps off the square: locals on a morning commute, tourists looking for
          somewhere quiet, and everyone in between.
        </p>
        <blockquote className="founder__quote" data-reveal>
          &ldquo;Community and coffee belong together here.&rdquo;
        </blockquote>
      </div>
    </section>
  );
}

/** The dog at the door. */
export function Collie() {
  return (
    <section className="collie" aria-labelledby="collie-title">
      <div className="collie__copy">
        <p className="eyebrow" data-reveal>
          Dog friendly
        </p>
        <h2 className="collie__title" id="collie-title" data-split>
          Head of <em>security</em>
        </h2>
        <p data-reveal>
          Dogs are welcome at Heaven, on leads. The border collie in these photos has been greeting
          people at the door since it was small enough to carry.
        </p>
      </div>
      <ul className="collie__photos">
        <li data-reveal>
          <div data-parallax="0.08">
            <Photo image="collie-puppy" sizes="(min-width: 900px) 24vw, 60vw" focus="50% 55%" />
          </div>
        </li>
        <li data-reveal data-reveal-delay="0.08">
          <div data-parallax="-0.06">
            <Photo image="collie-carried" sizes="(min-width: 900px) 20vw, 50vw" />
          </div>
        </li>
        <li data-reveal data-reveal-delay="0.16">
          <div data-parallax="0.1">
            <Photo image="collie-pavement" sizes="(min-width: 900px) 24vw, 60vw" focus="50% 60%" />
          </div>
        </li>
      </ul>
    </section>
  );
}

/** The framed sayings behind the counter, under a pool of amber light. */
export function Wall() {
  return (
    <Spotlight className="wall" aria-labelledby="wall-title">
      <div className="wall__head">
        <p className="eyebrow eyebrow--onDark" data-reveal>
          The wall behind the counter
        </p>
        <h2 className="wall__title" id="wall-title" data-split>
          Read it while <em>you wait</em>
        </h2>
      </div>
      <div className="wall__grid">
        <figure className="wall__photo" data-reveal>
          <Photo image="counter-wall" sizes="(min-width: 900px) 34vw, 92vw" focus="50% 35%" />
        </figure>
        <ul className="wall__frames">
          {WALL.map((saying, i) => (
            <li
              key={saying.text}
              className={`frame frame--${saying.style}`}
              data-parallax={[0.14, 0.3, 0.2, 0.36, 0.24][i % 5]}
            >
              <span>{saying.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="wall__cta" data-reveal>
        <p>The rest is better in person.</p>
        <FlowButton href="/visit" tone="amber">
          Plan a visit
        </FlowButton>
      </div>
    </Spotlight>
  );
}
