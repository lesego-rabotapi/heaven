import { useRef } from 'react';
import { useHeroIntro } from '../lib/useHeroIntro';
import { useArchPortal } from '../lib/useArchPortal';
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useHeroIntro(ref);
  useArchPortal(ref);
  return (
    <section id="hero" ref={ref} className="hero-section relative w-full overflow-hidden">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
        <clipPath id="arch-clip-m" clipPathUnits="objectBoundingBox">
          <path d="M0 .9647 L0 .6112 A1 .7059 0 0 1 .5 0 A1 .7059 0 0 1 1 .6112 L1 .9647 Q1 1 .95 1 L.05 1 Q0 1 0 .9647 Z" />
        </clipPath>
        <clipPath id="arch-clip-d" clipPathUnits="objectBoundingBox">
          <path d="M0 .9632 L0 .7637 A.9 .8526 0 0 1 .5 0 A.9 .8526 0 0 1 1 .7637 L1 .9632 Q1 1 .9611 1 L.0389 1 Q0 1 0 .9632 Z" />
        </clipPath>
      </svg>
      <div className="cloud d lg:hidden" style={{ width: "320px", height: "110px", left: "-90px", top: "300px" }} aria-hidden="true" />
      <div className="cloud lg:hidden" style={{ width: "420px", height: "140px", left: "-20px", top: "900px" }} aria-hidden="true" />
      <div className="cloud d hidden lg:block" style={{ width: "620px", height: "180px", left: "-420px", top: "320px" }} aria-hidden="true" />
      <div className="cloud d hidden lg:block" style={{ width: "520px", height: "150px", right: "-380px", top: "230px", animationDelay: "-6s" }} aria-hidden="true" />
      <div className="cloud hidden lg:block" style={{ width: "900px", height: "220px", left: "270px", top: "1040px" }} aria-hidden="true" />
      <div className="hero-vignette absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="absolute z-[2] flex justify-center lg:hidden" style={{ left: "20px", right: "20px", top: "300px" }}>
        <div className="tile journey-tile arch-frame arch-m" style={{ width: "240px", height: "340px" }}>
          <picture className="block w-full h-full journey-door">
            <source type="image/webp" sizes="240px" srcSet="images/door-arch-480.webp 480w, images/door-arch-800.webp 800w" />
            <img src="images/door-arch-480.jpg" srcSet="images/door-arch-480.jpg 480w, images/door-arch-800.jpg 800w" sizes="240px" alt="The Gothic stone entrance to Heaven Coffee: a pointed arch above a flight of steps, a navy umbrella and a chalkboard sign" width="480" height="640" className="w-full h-full object-cover block" style={{ objectPosition: "50% 28%" }} fetchPriority="high" decoding="async" />
          </picture>
          {' '}
          <svg className="arch-edge" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d="M0 .9647 L0 .6112 A1 .7059 0 0 1 .5 0 A1 .7059 0 0 1 1 .6112 L1 .9647 Q1 1 .95 1 L.05 1 Q0 1 0 .9647 Z" />
          </svg>
          <picture className="journey-nave" aria-hidden="true">
            <source type="image/webp" srcSet="images/stone-arch-interior.webp" />
            <img src="images/stone-arch-interior.jpg" alt="" width={662} height={823} loading="lazy" decoding="async" />
          </picture>
        </div>
      </div>
      <div className="hero-band absolute z-[2] hidden lg:flex justify-center items-start" style={{ left: "56px", right: "56px" }}>
        <div className="tile journey-tile arch-frame arch-d" style={{ width: "360px", height: "380px" }}>
          <picture className="block w-full h-full journey-door">
            <source type="image/webp" sizes="360px" srcSet="images/door-arch-480.webp 480w, images/door-arch-800.webp 800w" />
            <img src="images/door-arch-480.jpg" srcSet="images/door-arch-480.jpg 480w, images/door-arch-800.jpg 800w" sizes="360px" alt="The Gothic stone entrance to Heaven Coffee: a pointed arch above a flight of steps, a navy umbrella and a chalkboard sign" width="480" height="640" className="w-full h-full object-cover block" style={{ objectPosition: "50% 28%" }} fetchPriority="high" decoding="async" />
          </picture>
          {' '}
          <svg className="arch-edge" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d="M0 .9632 L0 .7637 A.9 .8526 0 0 1 .5 0 A.9 .8526 0 0 1 1 .7637 L1 .9632 Q1 1 .9611 1 L.0389 1 Q0 1 0 .9632 Z" />
          </svg>
          <picture className="journey-nave" aria-hidden="true">
            <source type="image/webp" srcSet="images/stone-arch-interior.webp" />
            <img src="images/stone-arch-interior.jpg" alt="" width={662} height={823} loading="lazy" decoding="async" />
          </picture>
        </div>
      </div>
      <div className="hero-est absolute left-5 right-5 lg:left-14 lg:right-14 z-[5] pointer-events-none flex items-center justify-center text-white uppercase" style={{ fontFamily: "var(--font-brand)", fontWeight: "500", letterSpacing: "0.22em" }}>
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
      </div>
    </section>
  );
}
