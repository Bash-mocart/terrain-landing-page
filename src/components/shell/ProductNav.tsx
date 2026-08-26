"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TerrainLogo } from "../TerrainLogo";
import { DestinationIcon } from "./DestinationIcon";
import { DESTINATIONS, MARKETING_LINKS } from "./destinations";

// Header for the product routes. Deliberately not the landing's TopNav: that
// one is a floating pill that overlays the hero map and hides on scroll, and
// its links are landing anchors. A results page needs a header that holds its
// place in the layout and points at product destinations.
//
// Destinations render inline on desktop and as chips inside the mobile menu,
// which also carries the marketing links and the download call to action.

export function ProductNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

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
    <header className="sticky top-0 z-40 border-b border-border-rule bg-canvas">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-10">
        <Link href="/" aria-label="Terrain home">
          <TerrainLogo markSize={26} tone="onLight" wordClassName="text-2xl" />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-sm md:flex"
          style={{ fontFamily: "var(--font-interactive)" }}
        >
          {DESTINATIONS.map((destination) => {
            const active =
              pathname === destination.href ||
              pathname.startsWith(`${destination.href}/`);

            return (
              <Link
                key={destination.href}
                href={destination.href}
                aria-current={active ? "page" : undefined}
                className={`transition-colors ${
                  active ? "text-verified" : "text-primary hover:text-verified"
                }`}
              >
                {destination.label}
              </Link>
            );
          })}
          <Link
            href="/#download"
            className="rounded-full bg-primary px-5 py-2 text-canvas transition-opacity hover:opacity-90"
            style={{ fontWeight: 600 }}
          >
            Get the app
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-1 inline-flex h-9 w-9 items-center justify-center text-primary md:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="product-menu"
          onClick={() => setMenuOpen(true)}
        >
          <HamburgerGlyph />
        </button>
      </div>

      {menuOpen && (
        <div
          id="product-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-canvas md:hidden"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <Link
              href="/"
              aria-label="Terrain home"
              onClick={() => setMenuOpen(false)}
            >
              <TerrainLogo
                markSize={32}
                tone="onLight"
                wordClassName="text-[30px]"
              />
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
            aria-label="Menu"
            className="flex flex-1 flex-col justify-center px-6"
          >
            {MARKETING_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-border-rule py-6 first:border-t"
              >
                <span className="flex items-baseline gap-4">
                  <span
                    aria-hidden
                    className="text-[11px] tracking-[0.16em] text-secondary"
                    style={{
                      fontFamily: "var(--font-interactive)",
                      fontWeight: 600,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-[clamp(30px,9vw,40px)] leading-none tracking-tight text-primary"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                  >
                    {link.label}
                  </span>
                </span>
              </Link>
            ))}

            <div className="mt-8 flex flex-wrap gap-2">
              {DESTINATIONS.map((destination) => (
                <Link
                  key={destination.href}
                  href={destination.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-full border border-border-rule px-4 py-2.5 text-sm text-primary"
                  style={{ fontFamily: "var(--font-interactive)" }}
                >
                  <DestinationIcon href={destination.href} size={18} />
                  {destination.label}
                </Link>
              ))}
            </div>
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
          </div>
        </div>
      )}
    </header>
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
