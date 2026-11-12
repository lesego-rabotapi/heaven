import { WALL } from "@/content/site";
import { ArchPhoto, Photo } from "./Photo";

/** 03 · The nave. Inside, navy: who made this place and what hangs on its wall. */
export function Nave() {
  return (
    <section className="nave" id="story" data-tone="dark" aria-labelledby="story-title">
      <p className="nave__statement" data-scrub-words>
        Come in. Slow down. This is a café between the pews of a working church, where the coffee
        is taken seriously and nobody is asked what they believe.
      </p>

      <div className="story">
        <figure className="story__figure" data-reveal>
          <ArchPhoto image="mondli-laughing" sizes="(min-width: 900px) 34vw, 86vw" focus="50% 40%" />
          <figcaption>
            <strong>Mondli Mahamba</strong>
            <span>Founder, since April 2017</span>
          </figcaption>
        </figure>

        <div className="story__copy">
          <p className="eyebrow eyebrow--onDark" data-reveal>
            Our story
          </p>
          <h2 className="story__title" id="story-title" data-split>
            A coffee shop that opens like a <em>church door.</em>
          </h2>
          <p data-reveal>
            Mondli Mahamba opened Heaven Coffee in April 2017 inside the Central Methodist Mission
            on Greenmarket Square, one of Cape Town&rsquo;s most storied buildings. The counter
            went in beside the front door. The tables went in among the pews.
          </p>
          <p data-reveal>
            Since then the door has stayed open to whoever comes up the steps: people on a morning
            commute, travellers a day off the plane, a wedding party, a dog. Most of them say the
            same thing on the way out. They did not expect to stay that long.
          </p>
          <blockquote className="story__quote" data-reveal>
            <p>&ldquo;You are born in love, by love, for love.&rdquo;</p>
            <footer>On the glass of the front door</footer>
          </blockquote>
        </div>
      </div>

      <section className="wall" aria-labelledby="wall-title">
        <div className="wall__head">
          <p className="eyebrow eyebrow--onDark" data-reveal>
            The wall behind the counter
          </p>
          <h2 className="wall__title" id="wall-title" data-split>
            Read it while you <em>wait.</em>
          </h2>
        </div>

        <div className="wall__photo" data-reveal>
          <Photo image="counter-wall" sizes="(min-width: 900px) 36vw, 92vw" focus="50% 30%" />
        </div>

        <ul className="wall__frames">
          {WALL.map((saying, i) => (
            <li
              key={saying.text}
              className={`frame frame--${saying.style}`}
              data-parallax={[0.18, 0.42, 0.28, 0.5, 0.22, 0.38, 0.3][i % 7]}
            >
              <span>{saying.text}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
