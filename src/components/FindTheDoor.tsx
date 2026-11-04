import { isKnown } from '../lib/content';
import { DirectionsLink } from './DirectionsLink';
export function FindTheDoor() {
  return (
    <section id="find-the-door" className="find-section" aria-labelledby="find-h2">
      <div className="find-head">
        <span className="find-kicker">
          Find us
        </span>
        <h2 id="find-h2" className="find-h2 font-display uppercase m-0">
          From the square to the door
        </h2>
        <p className="find-lede m-0">
          Heaven Coffee is inside the Central Methodist Mission, on the corner of Burg and Longmarket, a step off the Greenmarket Square market.
        </p>
      </div>
      <ol className="find-steps" role="list">
        <li className="find-step" style={{ "--i": "0" }}>
          <div className="find-photo">
            <picture>
              <source type="image/webp" srcSet="images/tourist-pastry-umbrella.webp" />
              <img src="images/tourist-pastry-umbrella.jpg" alt="A visitor with coffee and a pastry under a navy Heaven umbrella, market stalls across the square behind her" width="697" height="875" loading="lazy" decoding="async" />
            </picture>
          </div>
          <div className="find-text">
            <span className="find-no font-display" aria-hidden="true">
              1
            </span>
            <h3 className="find-h3 font-display uppercase m-0">
              Start at Greenmarket Square
            </h3>
            <p>
              The café is a step off the market stalls.
            </p>
          </div>
        </li>
        <li className="find-step" style={{ "--i": "1" }}>
          <div className="find-photo">
            <picture>
              <source type="image/webp" srcSet="images/storefront-entrance.webp" />
              <img src="images/storefront-entrance.jpg" alt="The grey stone front of the church, with a pointed arch, a flight of steps and a navy umbrella" width="690" height="768" loading="lazy" decoding="async" />
            </picture>
          </div>
          <div className="find-text">
            <span className="find-no font-display" aria-hidden="true">
              2
            </span>
            <h3 className="find-h3 font-display uppercase m-0">
              Walk to Burg and Longmarket
            </h3>
            <p>
              We are inside the Central Methodist Mission, the stone church on the corner.
            </p>
          </div>
        </li>
        <li className="find-step" style={{ "--i": "2" }}>
          <div className="find-photo">
            <picture>
              <source type="image/webp" srcSet="images/door-arch-800.webp" />
              <img src="images/door-arch-800.jpg" alt="A chalkboard sign and a navy Heaven umbrella at the foot of the steps to the pointed door" width="800" height="1067" loading="lazy" decoding="async" style={{ objectPosition: "50% 85%" }} />
            </picture>
          </div>
          <div className="find-text">
            <span className="find-no font-display" aria-hidden="true">
              3
            </span>
            <h3 className="find-h3 font-display uppercase m-0">
              Look for the navy umbrellas
            </h3>
            <p>
              A chalkboard sign stands by the steps.
            </p>
          </div>
        </li>
        {isKnown("steps") && (
        <li className="find-step" style={{ "--i": "3" }}>
          <div className="find-photo">
            <picture>
              <source type="image/webp" srcSet="images/puppy-entrance-door.webp" />
              <img src="images/puppy-entrance-door.jpg" alt="Two visitors holding a puppy in the pointed doorway, under the heaven coffee sign" width="652" height="867" loading="lazy" decoding="async" />
            </picture>
          </div>
          <div className="find-text">
            <span className="find-no font-display" aria-hidden="true">
              4
            </span>
            <h3 className="find-h3 font-display uppercase m-0">
              Climb the steps to the door
            </h3>
            <p>
              A flight of steps leads up to the door, under the pointed arch.
            </p>
          </div>
        </li>
        )}
      </ol>
      {["outdoorTables", "steps"].filter(isKnown).length >= 2 && (
      <div className="good">
        <span className="good-kicker">
          Good to know
        </span>
        <ul className="good-list" aria-label="Good to know">
          {isKnown("outdoorTables") && (
          <li className="good-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 9h16M12 9v11M8 20h8" />
            </svg>
            Tables outside
          </li>
          )}
          {isKnown("steps") && (
          <li className="good-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 20h4v-4h4v-4h4V8h4V4" />
            </svg>
            A flight of steps to the door
          </li>
          )}
        </ul>
      </div>
      )}
      <div className="find-foot">
        <DirectionsLink className="find-cta hv-btn hv-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 11l19-9-9 19-2-8-8-2z" />
          </svg>
          {' '}
          Get directions
        </DirectionsLink>
      </div>
    </section>
  );
}
