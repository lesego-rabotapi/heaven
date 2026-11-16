"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, motionOK, scroller, splitWords } from "@/lib/motion";

declare global {
  interface Window {
    __heavenReady?: boolean;
  }
}

const PAGE_NAMES: Record<string, string> = {
  "/": "The square",
  "/story": "The story",
  "/menu": "The menu",
  "/visit": "Hours & visit",
};

/**
 * Owns everything global about motion: the one smooth scroller, in-page
 * anchors, the wipe between pages, and the reveal attributes any section can
 * use ([data-intro], [data-reveal], [data-split], [data-parallax]).
 * With reduced motion none of it runs and links behave natively.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const wipe = useRef<HTMLDivElement>(null);
  const wipeLabel = useRef<HTMLSpanElement>(null);
  const covering = useRef(false);
  const firstPaint = useRef(true);

  // The smooth scroller, once.
  useEffect(() => {
    window.__heavenReady = true;
    if (!motionOK()) return;

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, smoothWheel: true });
    scroller.lenis = lenis;    lenis.on("scroll", ScrollTrigger.update);
    // Pinned sections add height (their spacers). ScrollTrigger removes and
    // re-adds that height while it measures, and Lenis can catch the short
    // moment: its scroll limit then stays too small, so anything that scrolls
    // by script is clamped part-way down the page. Re-measure once each
    // refresh has settled.
    const remeasure = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", remeasure);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (document.documentElement.classList.contains("is-loading")) lenis.stop();

    const lock = () => lenis.stop();
    const unlock = () => lenis.start();
    window.addEventListener("heaven:lock", lock);
    window.addEventListener("heaven:unlock", unlock);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => undefined);

    return () => {
      window.removeEventListener("heaven:lock", lock);
      window.removeEventListener("heaven:unlock", unlock);
      window.removeEventListener("load", refresh);
      ScrollTrigger.removeEventListener("refresh", remeasure);
      gsap.ticker.remove(tick);
      lenis.destroy();
      scroller.lenis = null;
    };
  }, []);

  // Links: anchors on this page glide; links to another page go through the wipe.
  useEffect(() => {
    let failsafe = 0;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const lenis = scroller.lenis;
      if (!motionOK() || !lenis) return;

      if (url.pathname === window.location.pathname) {
        const target = url.hash ? document.querySelector<HTMLElement>(url.hash) : null;
        if (url.hash && !target) return;
        e.preventDefault();
        window.dispatchEvent(new Event("heaven:navigate"));
        lenis.start();
        if (target && a.classList.contains("skip-link")) {
          // A skip link jumps and hands focus over. Gliding would play every
          // scrubbed scene on the way past, which looks like the page thrashing.
          if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
          // A number, not the element: Lenis resolves an element against its own
          // idea of the current scroll, which lands short when the page has
          // pinned sections above the target.
          const top = target.getBoundingClientRect().top + window.scrollY;
          lenis.scrollTo(top, { immediate: true, force: true });
          target.focus({ preventScroll: true });
        } else {
          lenis.scrollTo(target ?? 0, { duration: 1.3 });
        }
        window.history.replaceState(null, "", url.hash || url.pathname);
        return;
      }

      e.preventDefault();
      if (covering.current || !wipe.current) return;
      covering.current = true;
      window.dispatchEvent(new Event("heaven:navigate"));
      if (wipeLabel.current) wipeLabel.current.textContent = PAGE_NAMES[url.pathname] ?? "";
      gsap
        .timeline()
        .set(wipe.current, { display: "grid", yPercent: 100 })
        .to(wipe.current, { yPercent: 0, duration: 0.6, ease: "power3.inOut" })
        .fromTo(
          wipeLabel.current,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" },
          "-=0.2",
        )
        .add(() => router.push(url.pathname + url.search + url.hash));
      // Never leave the visitor behind the curtain.
      failsafe = window.setTimeout(() => {
        if (!covering.current || !wipe.current) return;
        covering.current = false;
        gsap.set(wipe.current, { display: "none" });
      }, 6000);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(failsafe);
    };
  }, [router]);

  // Per page: position, reveals, and lifting the wipe.
  useEffect(() => {
    const lenis = scroller.lenis;
    const wasFirst = firstPaint.current;
    firstPaint.current = false;

    if (!wasFirst) {
      const target = window.location.hash
        ? document.querySelector<HTMLElement>(window.location.hash)
        : null;
      if (lenis) {
        lenis.start();
        lenis.scrollTo(target ?? 0, { immediate: true, force: true });
      } else if (!target) {
        window.scrollTo(0, 0);
      }
    }
    if (!motionOK()) return;

    const ctx = gsap.context(() => {
      // The first things on a page, once the curtain (preloader or wipe) lifts.
      const intro = gsap.utils.toArray<HTMLElement>("[data-intro]");
      if (intro.length) {
        gsap.set(intro, { autoAlpha: 0, y: 44 });
        const play = () =>
          gsap.to(intro, {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.09,
            delay: covering.current ? 0.45 : 0.05,
          });
        if (document.documentElement.classList.contains("is-loading")) {
          window.addEventListener("heaven:ready", play, { once: true });
        } else {
          play();
        }
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.05,
            ease: "power3.out",
            delay: Number(el.dataset.revealDelay ?? 0),
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const words = splitWords(el);
        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(
          words,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.055,
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax) * 100;
        gsap.fromTo(
          el,
          { y: amount },
          {
            y: -amount,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });
    });

    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    if (covering.current && wipe.current) {
      gsap.to(wipe.current, {
        yPercent: -100,
        duration: 0.7,
        ease: "power3.inOut",
        delay: 0.2,
        onComplete: () => {
          covering.current = false;
          if (wipe.current) gsap.set(wipe.current, { display: "none" });
        },
      });
    }

    return () => ctx.revert();
  }, [pathname]);

  return (
    <>
      {children}
      <div className="wipe" ref={wipe} aria-hidden="true">
        <span className="wipe__label" ref={wipeLabel} />
      </div>
    </>
  );
}
