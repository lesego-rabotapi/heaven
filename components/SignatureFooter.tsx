"use client";

import { useRef } from "react";
import Link from "next/link";
import { NAV, SITE } from "@/content/site";
import { gsap, useGSAP, motionOK } from "@/lib/motion";
import { InstagramIcon } from "./Icon";

/**
 * The page signs off like a postcard: an amber nib travels across and the
 * wordmark is written in behind it, then the details settle.
 *
 * The idea comes from "Handwriting Signature Footer" by kedhareswer on
 * 21st.dev (https://21st.dev/@kedhareswer/components/signature-pen-footer).
 * Its source could not be retrieved through the connector (daily limit), so
 * this writes Heaven's own wordmark with a mask instead of script glyphs.
 */
export function SignatureFooter() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!motionOK()) return;
      const state = { p: 0 };
      const word = root.current?.querySelector<HTMLElement>(".footer__word");
      const nib = root.current?.querySelector<HTMLElement>(".footer__nib");
      if (!word || !nib) return;
      const draw = () => {
        word.style.clipPath = `inset(-10% ${(100 - state.p * 100).toFixed(2)}% -20% 0)`;
        nib.style.left = `${(state.p * 100).toFixed(2)}%`;
        // The nib bobs as if following the letterforms.
        nib.style.transform = `translate(-50%, ${(Math.sin(state.p * 26) * 9).toFixed(1)}px)`;
      };
      draw();
      gsap
        .timeline({ scrollTrigger: { trigger: ".footer__sign", start: "top 78%", once: true } })
        .fromTo(nib, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 })
        .to(state, { p: 1, duration: 1.9, ease: "power1.inOut", onUpdate: draw })
        .to(nib, { autoAlpha: 0, y: -14, duration: 0.4 })
        .fromTo(".footer__rule", { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power3.out" }, "-=0.5")
        .fromTo(
          ".footer__settle",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.07 },
          "-=0.6",
        );
    },
    { scope: root },
  );

  return (
    <footer className="footer" ref={root}>
      <div className="footer__sign">
        <p className="footer__thanks footer__settle">Thank you for stopping by. See you at the door.</p>
        <div className="footer__mark" aria-hidden="true">
          <span className="footer__word">heaven</span>
          <span className="footer__nib" />
        </div>
        <span className="footer__rule" aria-hidden="true" />
      </div>

      <div className="footer__cols">
        <div className="footer__settle">
          <h2 className="footer__label">Visit</h2>
          <p>{SITE.addressShort}</p>
          <p>
            Daily {SITE.hours.open} to {SITE.hours.close}
          </p>
          <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
            Get directions
          </a>
        </div>
        <nav className="footer__settle" aria-label="Footer">
          <h2 className="footer__label">Explore</h2>
          <Link href="/">Home</Link>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="footer__settle">
          <h2 className="footer__label">Say hello</h2>
          <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
          <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
            <InstagramIcon size={17} /> @{SITE.instagramHandle}
          </a>
        </div>
        <div className="footer__settle">
          <h2 className="footer__label">As seen on</h2>
          <p>Cape Town CCID (2021)</p>
        </div>
      </div>

      <div className="footer__base">
        <span>Heaven Coffee · Central Methodist Mission, Greenmarket Square, Cape Town</span>
        <a href="#top">Back to the top ↑</a>
      </div>
    </footer>
  );
}
