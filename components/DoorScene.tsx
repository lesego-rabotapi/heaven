"use client";

import { useRef } from "react";
import { gsap, useGSAP, motionOK } from "@/lib/gsap";
import { Photo } from "./Photo";

/**
 * 02 · The door. The one pinned moment on the page: the real doorway grows
 * until you are through it and standing in the nave. White outside, navy
 * inside. Without motion it reads as two stacked photographs with their lines.
 */
export function DoorScene() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!motionOK() || !root.current) return;
      const el = root.current;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.9,
          // The header follows the room: light on the square, dark inside.
          onUpdate: (self) => {
            el.dataset.tone = self.progress > 0.46 ? "dark" : "light";
          },
        },
      });

      // Approach, step through the dark of the doorway, let the nave open up,
      // then dim it for the welcome.
      tl.fromTo(".door__frame", { scale: 1 }, { scale: 1.16, duration: 0.18 }, 0)
        .to(".door__outside", { autoAlpha: 0, y: -30, duration: 0.12 }, 0.14)
        .to(".door__frame", { scale: 16, duration: 0.42, ease: "power2.in" }, 0.18)
        .fromTo(".door__stage", { backgroundColor: "#ffffff" }, { backgroundColor: "#071024", duration: 0.12 }, 0.44)
        .fromTo(".door__nave", { autoAlpha: 0, scale: 1.18 }, { autoAlpha: 1, scale: 1, duration: 0.3 }, 0.5)
        .to(".door__frame", { autoAlpha: 0, duration: 0.1 }, 0.52)
        .fromTo(".door__shade", { opacity: 0.25 }, { opacity: 1, duration: 0.2 }, 0.7)
        .fromTo(".door__inside > *", { autoAlpha: 0, y: 44 }, { autoAlpha: 1, y: 0, duration: 0.16, stagger: 0.035 }, 0.74)
        .to({}, { duration: 0.05 });
    },
    { scope: root },
  );

  return (
    <section className="door" id="door" ref={root} data-tone="light" aria-labelledby="door-title">
      <div className="door__stage">
        <div className="door__nave">
          <Photo image="nave-four-friends" sizes="100vw" focus="50% 42%" />
          <div className="door__shade" aria-hidden="true" />
        </div>

        <div className="door__outside">
          <p className="eyebrow">The door</p>
          <p className="door__line door__line--a">From the street it reads as a church.</p>
          <p className="door__line door__line--b">
            <em>Because it is.</em>
          </p>
          <p className="door__hint">Look for the navy umbrellas and the chalkboard on the pavement.</p>
        </div>

        <div className="door__frame arch">
          <Photo image="door-guest-smiling" sizes="(min-width: 900px) 34vw, 70vw" focus="50% 50%" />
        </div>

        <div className="door__inside">
          <p className="eyebrow eyebrow--onDark">Central Methodist Mission</p>
          <h2 className="door__welcome" id="door-title">
            Everyone who finds the door is <em>welcome.</em>
          </h2>
          <p className="door__motto">
            you are born in love <span aria-hidden="true">|</span> by love{" "}
            <span aria-hidden="true">|</span> for love
          </p>
          <p className="door__motto-src">Written on the glass of the front door</p>
        </div>
      </div>
    </section>
  );
}
