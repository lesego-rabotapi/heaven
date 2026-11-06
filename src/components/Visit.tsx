import { DirectionsLink } from './DirectionsLink';
import { HoursRows } from './HoursRows';
import { Roll } from './Roll';

// Hours, the door and the way there, once, for every screen size. The bold block of the page: it sits on
// the action blue, so .on-action turns its ink white.
export function Visit() {
  return (
    <section id="visit" className="visit-section on-action">
      <div className="visit-main">
        <div className="visit-head reveal">
          <h2 aria-label="Open 7 to 6" className="t-title visit-h2">Open 7–6</h2>
          <span className="visit-tag font-quote italic">every day</span>
        </div>
        <div className="reveal">
          <HoursRows />
        </div>
        <div className="visit-find reveal">
          <span className="t-label">Find us</span>
          <p className="visit-address">38 Burg Street, corner of Burg &amp; Longmarket, Cape Town 8000</p>
          <p className="visit-p">From the street it reads as a church, because it is. Look for the navy umbrellas and the chalkboard sign at the Burg Street entrance.</p>
          <div className="visit-actions">
            <DirectionsLink className="hv-btn hv-link btn btn-action">
              <Roll>Get directions</Roll>
            </DirectionsLink>
            <span data-phone-placeholder className="visit-phone">0XX XXX XXXX</span>
          </div>
        </div>
      </div>
      <div className="visit-photo reveal">
        <picture className="block w-full h-full">
          <source type="image/webp" srcSet="images/puppy-entrance-door.webp" />
          <img src="images/puppy-entrance-door.jpg" alt="The Gothic entrance of Central Methodist Mission with heaven coffee door signage" width="652" height="867" className="w-full h-full object-cover block" loading="lazy" decoding="async" />
        </picture>
      </div>
    </section>
  );
}
