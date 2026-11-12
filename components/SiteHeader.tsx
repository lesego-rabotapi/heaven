"use client";

import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/content/site";
import { Wordmark } from "./Wordmark";
import { OpenStatus } from "./OpenStatus";
import { ArrowIcon, CloseIcon } from "./Icons";

export function SiteHeader() {
  const [tone, setTone] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const drawer = useRef<HTMLDialogElement>(null);

  // The bar takes its colours from whichever section sits under it.
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const probe = 36;
      let next: "light" | "dark" = "light";
      document.querySelectorAll<HTMLElement>("[data-tone]").forEach((el) => {
        if (el.closest("header")) return;
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) next = el.dataset.tone as "light" | "dark";
      });
      setTone(next);
      setScrolled(window.scrollY > 24);
      // Which nav destination the visitor is reading now.
      let here: string | null = null;
      NAV.forEach((item) => {
        const el = document.querySelector(item.href);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) here = item.href;
      });
      setCurrent(here);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const open = () => {
    drawer.current?.showModal();
    window.dispatchEvent(new Event("heaven:lock"));
  };
  const close = () => drawer.current?.close();

  return (
    <>
      <header className="site-header" data-header-tone={tone} data-scrolled={scrolled}>
        <a className="site-header__brand" href="#top" aria-label="Heaven Coffee, back to top">
          <Wordmark />
        </a>

        <nav className="site-header__nav" aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} aria-current={current === item.href ? "location" : undefined}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <OpenStatus className="site-header__status" />
          <a className="btn btn--primary btn--sm" href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
            Get directions
            <ArrowIcon />
          </a>
        </div>

        <button
          type="button"
          className="menu-btn"
          aria-haspopup="dialog"
          aria-controls="site-drawer"
          onClick={open}
        >
          <span aria-hidden="true" className="menu-btn__bars" />
          Menu
        </button>
      </header>

      <dialog
        id="site-drawer"
        className="drawer"
        ref={drawer}
        aria-label="Site menu"
        onClose={() => window.dispatchEvent(new Event("heaven:unlock"))}
        onClick={(e) => {
          if (e.target === drawer.current) close();
        }}
      >
        <div className="drawer__panel">
          <div className="drawer__top">
            <Wordmark />
            <button type="button" className="icon-btn" onClick={close} aria-label="Close menu">
              <CloseIcon />
            </button>
          </div>
          <nav className="drawer__nav" aria-label="Site">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                style={{ ["--i" as string]: i }}
                aria-current={current === item.href ? "location" : undefined}
              >
                <span className="drawer__no">0{i + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="drawer__foot">
            <OpenStatus />
            <a className="btn btn--light" href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
              Get directions
              <ArrowIcon />
            </a>
            <a className="drawer__link" href={SITE.phoneHref}>
              {SITE.phoneDisplay}
            </a>
            <a className="drawer__link" href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
              @{SITE.instagramHandle}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
