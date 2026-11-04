import { useRef } from 'react';
import { brand, hours } from '../lib/content';
import { useHeroIntro } from '../lib/useHeroIntro';
import './hero.css';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useHeroIntro(ref);
  return (
    <section id="hero" ref={ref} className="hero">
      <div className="hero-inner">
        <p data-intro className="hero-est">Est. 2017 · Burg Street</p>
        <h1 data-intro className="hero-title font-display">heaven <br />Coffee</h1>
        <p data-intro className="hero-line">Open daily {hours.open} to {hours.close}. {brand.tagline}.</p>
      </div>
    </section>
  );
}
