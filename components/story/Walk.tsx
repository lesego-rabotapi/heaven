"use client";

import { useRef } from "react";
import { WALK } from "@/content/site";
import { gsap, useGSAP, motionOK } from "@/lib/motion";
import { Photo } from "../Photo";

/**
 * From the square to the pew, in four steps. On a wide screen the section
 * pins as a split screen: each scroll step lifts the copy out line by line,
 * then the next photo slides up over the last and squares off from an arch.
 * Elsewhere it is four photos with their lines, one after another.
 *
 * After "Scroll Split Product Slider" by kedhareswer on 21st.dev
 * (https://21st.dev/@kedhareswer/components/split-photo-slider). Its source
 * could not be retrieved through the connector (daily limit), so the
 * behaviour is rebuilt here with GSAP ScrollTrigger.
 */
export function Walk() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !motionOK()) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        el.dataset.mode = "pinned";
        const steps = gsap.utils.toArray<HTMLElement>(".walk__step");
        const photos = gsap.utils.toArray<HTMLElement>(".walk__photo");
        const thumbs = gsap.utils.toArray<HTMLElement>(".walk__thumb");
        const lines = (i: number) => steps[i].querySelectorAll<HTMLElement>(".walk__line > span");

        steps.forEach((_, i) => {
          if (i > 0) gsap.set(lines(i), { yPercent: 115 });
        });
        gsap.set(photos.slice(1), { yPercent: 100, borderRadius: "50% 50% 0 0 / 32% 32% 0 0" });
        gsap.set(thumbs[0], { "--on": 1 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".walk__stage",
            start: "top top",
            end: () => `+=${window.innerHeight * (steps.length - 1) * 0.95}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        for (let i = 1; i < steps.length; i++) {
          const at = i - 1;
          tl.to(lines(i - 1), { yPercent: -115, duration: 0.3, stagger: 0.035, ease: "power2.in" }, at)
            .to(
              photos[i],
              { yPercent: 0, borderRadius: "0% 0% 0 0 / 0% 0% 0 0", duration: 0.6, ease: "power2.inOut" },
              at + 0.08,
            )
            .to(photos[i - 1].firstElementChild, { scale: 1.1, filter: "brightness(0.55)", duration: 0.6 }, at + 0.08)
            .to(thumbs[i - 1], { "--on": 0, duration: 0.2 }, at + 0.3)
            .to(thumbs[i], { "--on": 1, duration: 0.2 }, at + 0.3)
            .to(lines(i), { yPercent: 0, duration: 0.38, stagger: 0.045, ease: "power3.out" }, at + 0.42)
            // a held beat on each step
            .to({}, { duration: 0.2 });
        }
        return () => {
          delete el.dataset.mode;
        };
      });
    },
    { scope: root },
  );

  return (
    <section className="walk" ref={root} aria-labelledby="walk-title">
      <div className="walk__stage">
        <div className="walk__copy">
          <p className="eyebrow eyebrow--onDark">The way in</p>
          <h2 className="walk__heading" id="walk-title">
            From the square <em>to the pew</em>
          </h2>
          <ol className="walk__steps">
            {WALK.map((step) => (
              <li className="walk__step" key={step.no}>
                <div className="walk__step-photo">
                  <Photo image={step.image} sizes="92vw" />
                </div>
                <p className="walk__no walk__line">
                  <span>{step.no} / 04</span>
                </p>
                <h3 className="walk__title walk__line">
                  <span>{step.title}</span>
                </h3>
                <p className="walk__lines">
                  {step.lines.map((line) => (
                    <span className="walk__line" key={line}>
                      <span>{line}</span>
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
          <div className="walk__thumbs" aria-hidden="true">
            {WALK.map((step) => (
              <span className="walk__thumb" key={step.no}>
                <Photo image={step.image} sizes="56px" alt="" />
              </span>
            ))}
          </div>
        </div>
        <div className="walk__photos" aria-hidden="true">
          {WALK.map((step, i) => (
            <div className="walk__photo" key={step.no}>
              <Photo image={step.image} sizes="52vw" alt="" priority={i === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
