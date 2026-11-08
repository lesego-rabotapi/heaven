import { useRef } from 'react';
import { useHeroIntro } from '../lib/useHeroIntro';
import { usePointerGlow } from '../lib/usePointerGlow';
import { HeavenLockup } from './HeavenLockup';
import { HoursCard } from './HoursCard';
import { Sticker } from './Sticker';

// Two banks of night cloud, each a few soft puffs. They start drawn across the logo and part to show it;
// with reduced motion they are simply already apart.
const bank = (side: 'l' | 'r') => (
  <div className={`cloud-bank cloud-bank-${side}`}>
    <span className="cloud-puff cloud-puff-1" />
    <span className="cloud-puff cloud-puff-2" />
    <span className="cloud-puff cloud-puff-3" />
  </div>
);

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useHeroIntro(ref);
  usePointerGlow(ref);
  return (
    <section id="hero" ref={ref} className="hero-section">
      <div className="hero-vignette" aria-hidden="true" />
      <div className="rays" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="sky" aria-hidden="true">
        {bank('l')}
        {bank('r')}
      </div>
      <div className="hero-copy">
        <div data-intro>
          <HeavenLockup as="h1" size="hero" />
        </div>
        <p data-intro className="hero-tagline font-quote italic">
          Sanctuary coffee at Greenmarket Square, inside a working 19th-century church.
        </p>
      </div>
      <div className="hero-door">
        <div className="hero-arch tile">
          <picture>
            <source type="image/webp" sizes="(min-width: 1024px) 40vw, 90vw" srcSet="images/door-arch-480.webp 480w, images/door-arch-800.webp 800w, images/door-arch-1600.webp 1600w" />
            <img src="images/door-arch-800.jpg" srcSet="images/door-arch-480.jpg 480w, images/door-arch-800.jpg 800w, images/door-arch-1600.jpg 1600w" sizes="(min-width: 1024px) 40vw, 90vw" alt="The Gothic stone entrance to Heaven Coffee: a pointed arch above a flight of steps, a navy umbrella and a chalkboard sign" width="800" height="1067" style={{ objectPosition: "50% 28%" }} fetchPriority="high" decoding="async" />
          </picture>
        </div>
        <Sticker />
        <HoursCard />
      </div>
    </section>
  );
}
