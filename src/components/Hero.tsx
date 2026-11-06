import { useRef } from 'react';
import { useHeroIntro } from '../lib/useHeroIntro';
import { DirectionsLink } from './DirectionsLink';
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useHeroIntro(ref);
  return (
    <section id="hero" ref={ref} className="hero-section relative w-full overflow-hidden">
      <div className="cloud d lg:hidden" style={{ width: "320px", height: "110px", left: "-90px", top: "300px" }} aria-hidden="true" />
      <div className="cloud lg:hidden" style={{ width: "420px", height: "140px", left: "-20px", top: "900px" }} aria-hidden="true" />
      <div className="cloud d hidden lg:block" style={{ width: "620px", height: "180px", left: "-120px", top: "320px" }} aria-hidden="true" />
      <div className="cloud d hidden lg:block" style={{ width: "520px", height: "150px", right: "-80px", top: "230px", animationDelay: "-6s" }} aria-hidden="true" />
      <div className="cloud hidden lg:block" style={{ width: "900px", height: "220px", left: "270px", top: "1040px" }} aria-hidden="true" />
      <div className="hero-vignette absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="absolute z-[2] flex justify-center lg:hidden" style={{ left: "20px", right: "20px", top: "300px" }}>
        <div className="tile" style={{ width: "240px", height: "340px", borderRadius: "120px 120px 12px 12px", overflow: "hidden", border: "6px solid var(--ink-bright)", boxShadow: "0 30px 60px -26px rgba(15,27,45,.45)" }}>
          <picture className="block w-full h-full">
            <source type="image/webp" sizes="240px" srcSet="images/door-arch-480.webp 480w, images/door-arch-800.webp 800w" />
            <img src="images/door-arch-480.jpg" srcSet="images/door-arch-480.jpg 480w, images/door-arch-800.jpg 800w" sizes="240px" alt="The Gothic stone entrance to Heaven Coffee: a pointed arch above a flight of steps, a navy umbrella and a chalkboard sign" width="480" height="640" className="w-full h-full object-cover block" style={{ objectPosition: "50% 28%" }} fetchPriority="high" decoding="async" />
          </picture>
        </div>
      </div>
      <div className="absolute z-[2] hidden lg:flex justify-center items-start" style={{ left: "56px", right: "56px", top: "560px", gap: "24px" }}>
        <div className="tile" style={{ width: "320px", height: "260px", marginTop: "120px", borderRadius: "14px", overflow: "hidden", border: "6px solid var(--ink-bright)", boxShadow: "0 30px 60px -30px rgba(15,27,45,.42)" }}>
          <picture className="block w-full h-full">
            <source type="image/webp" srcSet="images/cup-handover.webp" />
            <img src="images/cup-handover.jpg" alt="A barista handing over a heaven coffee to-go cup" width="446" height="448" className="w-full h-full object-cover block" loading="lazy" decoding="async" />
          </picture>
        </div>
        <div className="tile" style={{ width: "360px", height: "380px", borderRadius: "180px 180px 14px 14px", overflow: "hidden", border: "6px solid var(--ink-bright)", boxShadow: "0 34px 70px -30px rgba(15,27,45,.45)" }}>
          <picture className="block w-full h-full">
            <source type="image/webp" sizes="360px" srcSet="images/door-arch-480.webp 480w, images/door-arch-800.webp 800w" />
            <img src="images/door-arch-480.jpg" srcSet="images/door-arch-480.jpg 480w, images/door-arch-800.jpg 800w" sizes="360px" alt="The Gothic stone entrance to Heaven Coffee: a pointed arch above a flight of steps, a navy umbrella and a chalkboard sign" width="480" height="640" className="w-full h-full object-cover block" style={{ objectPosition: "50% 28%" }} fetchPriority="high" decoding="async" />
          </picture>
        </div>
        <div className="tile" style={{ width: "320px", height: "260px", marginTop: "120px", borderRadius: "14px", overflow: "hidden", border: "6px solid var(--ink-bright)", boxShadow: "0 30px 60px -30px rgba(15,27,45,.42)" }}>
          <picture className="block w-full h-full">
            <source type="image/webp" srcSet="images/storefront-entrance.webp" />
            <img src="images/storefront-entrance.jpg" alt="The Burg Street entrance with navy umbrellas" width="690" height="768" className="w-full h-full object-cover block" loading="lazy" decoding="async" />
          </picture>
        </div>
      </div>
      <div className="hero-est absolute left-5 right-5 lg:left-14 lg:right-14 z-[5] pointer-events-none flex items-center justify-center text-white uppercase" style={{ fontWeight: "700", letterSpacing: "0.22em" }}>
        <span className="hidden lg:inline-block" style={{ width: "32px", height: "1px", background: "var(--ink-bright)", marginRight: "12px" }} />
        {' '}
        <span className="lg:hidden">
          Est. 2017 · Burg Street
        </span>
        {' '}
        <span className="hidden lg:inline">
          Est. 2017 · 38 Burg Street, Cape Town
        </span>
        {' '}
        <span className="hidden lg:inline-block" style={{ width: "32px", height: "1px", background: "var(--ink-bright)", marginLeft: "12px" }} />
      </div>
      <h1 className="hero-h1 absolute left-5 right-5 lg:left-14 lg:right-14 z-[5] pointer-events-none font-display text-white uppercase text-center m-0" style={{ marginTop: "44px", fontStretch: "62%", fontWeight: "900", letterSpacing: "-0.02em", lineHeight: "0.82", textShadow: "0 6px 34px rgba(12,40,84,.5)" }}>
        heaven
        {' '}
        <br />
        Coffee
      </h1>
      <div className="hero-sub absolute left-5 right-5 lg:left-14 lg:right-14 z-[9] flex flex-col items-center">
        <p data-intro className="font-quote italic text-center m-0" style={{ color: "var(--ink)" }}>
          Sanctuary coffee at Greenmarket Square, inside a working 19th-century church.
        </p>
        <div data-intro className="hero-pill on-light inline-flex items-center gap-2.5 rounded-full mt-5" style={{ background: "var(--card)", boxShadow: "0 10px 30px -18px rgba(15,27,45,.6)" }}>
          <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "var(--action)" }} />
          {' '}
          <span style={{ fontWeight: "700", color: "var(--ink)" }}>
            Open daily 07:00 — 18:00
          </span>
        </div>
        <DirectionsLink className="hv-btn hv-link lg:hidden mt-6 w-full flex items-center justify-center gap-2.5" style={{ height: "52px", borderRadius: "999px", background: "var(--action)", color: "var(--action-ink)", fontSize: "15px", fontWeight: "700" }}>
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
