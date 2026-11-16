"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, SITE } from "@/content/site";
import { FlowButton } from "./ui/flow-button";
import { Icon, InstagramIcon } from "./Icon";

/**
 * A floating translucent pill that stays on screen. On small screens the
 * links move into a drawer; the header sits above it so the same button
 * closes it. While the drawer is open the page behind is inert.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const drawer = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  // Close on navigation and when the layout grows past the drawer.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const close = () => setOpen(false);
    const wide = window.matchMedia("(min-width: 1000px)");
    window.addEventListener("heaven:navigate", close);
    wide.addEventListener("change", close);
    return () => {
      window.removeEventListener("heaven:navigate", close);
      wide.removeEventListener("change", close);
    };
  }, []);

  useEffect(() => {
    const background = document.querySelectorAll<HTMLElement>("#main, .footer");
    background.forEach((el) => (el.inert = open));
    document.documentElement.classList.toggle("drawer-open", open);
    window.dispatchEvent(new Event(open ? "heaven:lock" : "heaven:unlock"));
    if (!open) return;

    drawer.current?.querySelector<HTMLElement>("a[href]")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        toggle.current?.focus({ preventScroll: true });
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = [
        ...(header.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []),
        ...(drawer.current?.querySelectorAll<HTMLElement>("a[href]") ?? []),
      ].filter((el) => el.getClientRects().length > 0);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) => !href.includes("#") && pathname === href;

  return (
    <>
      <header className="site-header" ref={header}>
        <Link className="wordmark site-header__logo" href="/" aria-label="Heaven Coffee, home">
          heaven <small>coffee</small>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-nav__link"
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <FlowButton href={SITE.mapsUrl} size="sm" className="site-header__cta">
          Get directions
        </FlowButton>

        <button
          ref={toggle}
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="nav-drawer"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle__bars" data-open={open} aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </header>

      <div
        id="nav-drawer"
        className="drawer"
        ref={drawer}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        data-open={open}
      >
        <div className="drawer__layer drawer__layer--amber" />
        <div className="drawer__layer drawer__layer--royal" />
        <div className="drawer__panel">
          <nav className="drawer__nav" aria-label="Mobile">
            {[{ href: "/", label: "Home" }, ...NAV].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="drawer__link"
                style={{ transitionDelay: open ? `${180 + i * 55}ms` : "0ms" }}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="drawer__no">0{i + 1}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="drawer__foot" style={{ transitionDelay: open ? "480ms" : "0ms" }}>
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="map-point-linear" size={18} /> Get directions
            </a>
            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
              <InstagramIcon size={18} /> @{SITE.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
