import { NAV, SITE } from "@/content/site";
import { hoursBar } from "@/lib/hours";
import { ArchPhoto } from "./Photo";
import { OpenStatus } from "./OpenStatus";
import { Wordmark } from "./Wordmark";
import { ArrowIcon, InstagramIcon } from "./Icons";

/** 06 · Back out on the square. Hours, address, the way here. White again. */
export function Visit() {
  const bar = hoursBar();
  return (
    <section className="visit" id="visit" data-tone="light" aria-labelledby="visit-title">
      <div className="visit__head">
        <p className="eyebrow" data-reveal>
          Back out on the square
        </p>
        <h2 className="visit__title" id="visit-title" data-split>
          Open seven to six, <em>every day.</em>
        </h2>
      </div>

      <div className="visit__grid">
        <div className="visit__hours" data-reveal>
          <OpenStatus className="status--lg" />
          <div className="ruler" role="img" aria-label={`Open ${SITE.hours.label.toLowerCase()} from ${SITE.hours.open} to ${SITE.hours.close}`}>
            <div className="ruler__scale" aria-hidden="true">
              <span>00</span>
              <span>06</span>
              <span>12</span>
              <span>18</span>
              <span>24</span>
            </div>
            <div className="ruler__track" aria-hidden="true">
              <div className="ruler__bar" style={{ left: `${bar.left}%`, width: `${bar.width}%` }} />
            </div>
            <div className="ruler__row" aria-hidden="true">
              <span>{SITE.hours.label}</span>
              <span>
                {SITE.hours.open} to {SITE.hours.close}
              </span>
            </div>
          </div>
          <p className="visit__small">
            The church still holds its services, so hours can shift on public holidays. Call ahead
            if it matters.
          </p>
        </div>

        <figure className="visit__figure" data-reveal>
          <ArchPhoto image="sign-in-love" sizes="(min-width: 900px) 26vw, 70vw" focus="50% 60%" />
        </figure>

        <div className="visit__card" data-reveal>
          <p className="eyebrow">Find us</p>
          <address>{SITE.address}</address>
          <p>
            From the street it reads as a church, because it is. Look for the navy umbrellas and
            the chalkboard, then climb the steps under the arch.
          </p>
          <div className="visit__actions">
            <a className="btn btn--primary" href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
              Get directions
              <ArrowIcon />
            </a>
            <a className="btn btn--ghost" href={SITE.phoneHref}>
              Call {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer" data-tone="light">
      <div className="footer__cols">
        <div>
          <h2 className="footer__label">Visit</h2>
          <p>{SITE.addressShort}</p>
          <p>
            Daily {SITE.hours.open} to {SITE.hours.close}
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="footer__label">Explore</h2>
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div>
          <h2 className="footer__label">Say hello</h2>
          <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
          <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
            <InstagramIcon /> @{SITE.instagramHandle}
          </a>
        </div>
        <div>
          <h2 className="footer__label">On the door</h2>
          <p className="footer__motto">you are born in love, by love, for love</p>
        </div>
      </div>

      <div className="footer__mark" aria-hidden="true">
        <div data-parallax="-0.5">
          <Wordmark />
        </div>
      </div>

      <div className="footer__base">
        <span>Heaven Coffee · Central Methodist Mission, Greenmarket Square, Cape Town</span>
        <a href="#top">Back to the square ↑</a>
      </div>
    </footer>
  );
}
