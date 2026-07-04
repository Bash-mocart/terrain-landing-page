"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TerrainLogo } from "./TerrainLogo";

// Top navigation, "floating pill" design. A detached rounded Warm
// Canvas pill floats near the top over the hero map. Because the pill
// is its own surface (Warm Canvas + hairline + blur + soft shadow),
// the wordmark and links are always legible regardless of the map
// beneath, no scrim needed. It firms up subtly on scroll.
//
// Desktop: the pill hugs its content, centered, logo + inline links.
// Mobile: the pill spans the width with the logo left and a menu
// button right; tapping opens the full-screen Warm Canvas overlay so
// the busy hero never bleeds through behind the links.

// Absolute hrefs so the same nav works from any route (an anchor like
// "/#listings" routes home, then scrolls). All beats live on the
// landing now; /how-it-works redirects to its anchor here.
const LINKS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Products", href: "/#the-terrain-way" },
  { label: "Properties", href: "/#listings" },
];

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Hide on scroll down, reveal on scroll up. On a page this long
    // (especially mobile, where the pill spans the width) a permanently
    // floating white pill sits on every dark plate; retreating while
    // the reader descends gives the sections back their full canvas,
    // and any upward flick brings the nav straight back.
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > lastY + 4 && y > 160) setHidden(true);
      else if (y < lastY - 4 || y <= 160) setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <div
      id="top"
      className={`fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 transition-transform duration-300 ease-out motion-reduce:transition-none sm:pt-5 ${
        hidden && !menuOpen ? "-translate-y-[130%]" : ""
      }`}
    >
      <nav
        aria-label="Primary"
        className={`flex w-full max-w-[760px] items-center justify-between gap-6 rounded-full border px-5 py-2.5 transition-all duration-300 md:w-auto md:gap-9 md:px-7 md:py-3 ${
          scrolled
            ? "border-[--color-border-rule] bg-canvas/95 shadow-[0_10px_34px_rgba(9,5,3,0.16)] backdrop-blur-md"
            : "border-[--color-border-rule] bg-canvas/80 shadow-[0_8px_28px_rgba(9,5,3,0.10)] backdrop-blur-md"
        }`}
      >
        <Link href="/" aria-label="Terrain home">
          <TerrainLogo markSize={26} tone="onLight" wordClassName="text-2xl" />
        </Link>

        <div
          className="hidden items-center gap-8 text-sm text-primary md:flex"
          style={{ fontFamily: "var(--font-interactive)" }}
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-verified"
            >
              {l.label}
            </Link>
          ))}
          {/* The nav's own conversion exit. A typical landing nav ends
             in its primary CTA; ours is the app download close. */}
          <Link
            href="/#download"
            className="-mr-2 rounded-full bg-primary px-5 py-2 text-canvas transition-opacity hover:opacity-90"
            style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
          >
            Get the app
          </Link>
        </div>

        <button
          type="button"
          className="-mr-1 inline-flex h-9 w-9 items-center justify-center text-primary md:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <HamburgerGlyph />
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="terrain-menu-overlay fixed inset-0 z-50 flex flex-col bg-canvas md:hidden"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <Link
              href="/"
              aria-label="Terrain home"
              onClick={() => setMenuOpen(false)}
            >
              <TerrainLogo markSize={32} tone="onLight" wordClassName="text-[30px]" />
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              className="-mr-2 inline-flex h-10 w-10 items-center justify-center text-primary"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <CloseGlyph />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="flex flex-1 flex-col justify-center px-6"
          >
            {LINKS.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between border-b border-[--color-border-rule] py-6 first:border-t"
              >
                <span className="flex items-baseline gap-4">
                  <span
                    aria-hidden
                    className="text-[11px] tracking-[0.16em] text-secondary"
                    style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-[clamp(30px,9vw,40px)] leading-none tracking-tight text-primary"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                  >
                    {l.label}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="text-secondary transition-transform group-active:translate-x-1"
                >
                  <ArrowGlyph />
                </span>
              </Link>
            ))}
          </nav>

          <div className="px-6 pb-10">
            <Link
              href="/#download"
              onClick={() => setMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-canvas"
              style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
            >
              Get the app
            </Link>
            <p
              className="mt-5 text-center text-[11px] uppercase tracking-[0.16em] text-secondary"
              style={{ fontFamily: "var(--font-interactive)" }}
            >
              Verified agents and companies, across Nigeria
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function HamburgerGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="3" y1="13" x2="19" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <line x1="5" y1="5" x2="17" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="17" y1="5" x2="5" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ArrowGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
