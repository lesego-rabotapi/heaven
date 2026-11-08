import { DirectionsLink } from './DirectionsLink';
import { Roll } from './Roll';

// The last thing on the page is the first thing a visitor will see: the door, and the way to it.
export function ComeIn() {
  return (
    <section id="come-in" className="come-in" aria-labelledby="come-in-title">
      <picture className="come-in-photo">
        <source type="image/webp" sizes="100vw" srcSet="images/door-arch-800.webp 800w, images/door-arch-1600.webp 1600w" />
        <img src="images/door-arch-1600.jpg" srcSet="images/door-arch-800.jpg 800w, images/door-arch-1600.jpg 1600w" sizes="100vw" alt="" width="1600" height="2133" loading="lazy" decoding="async" />
      </picture>
      <div className="come-in-copy reveal">
        <h2 id="come-in-title" className="t-title come-in-h2">Find the door</h2>
        <p className="come-in-p">38 Burg Street. Up the steps, under the pointed arch.</p>
        <DirectionsLink data-magnet className="hv-btn hv-link btn btn-accent">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 11l19-9-9 19-2-8-8-2z" />
          </svg>
          <Roll>Get directions</Roll>
        </DirectionsLink>
      </div>
    </section>
  );
}
