import { useRef } from 'react';
import { brand, hours } from '../lib/content';
import { useReveal } from '../lib/useReveal';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section id="hero" ref={ref} className="hero-section relative w-full overflow-hidden">
      <div className="mx-auto max-w-3xl px-4 pt-28 text-center">
        <p data-reveal className="text-xs font-bold uppercase tracking-widest">Est. 2017 · Burg Street</p>
        <h1 data-reveal className="font-display uppercase m-0">heaven <br />Coffee</h1>
        <p data-reveal className="mt-6">Open daily {hours.open} to {hours.close}. {brand.tagline}.</p>
      </div>
    </section>
  );
}
