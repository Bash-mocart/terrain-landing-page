"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TerrainLogo } from "./TerrainLogo";

// Top navigation. Fixed over the interactive hero map, so legibility
// has to be guaranteed against whatever map content sits beneath it.
// Two states:
//   - At rest over the hero: transparent bar with a Warm Canvas scrim
//     gradient behind the content, so the dark wordmark + links always
//     have a light base without boxing the map in.
//   - Scrolled (or mobile menu open): a solid Warm Canvas bar with a
//     Border Rule hairline and light blur, the conventional legible
//     treatment for the rest of the page.
// Mobile gains a menu button + Warm Canvas sheet (the links were
// previously invisible on small screens).

const LINKS = [
  { label: "Products", href: "#the-terrain-way" },
  { label: "How we vet", href: "#vetting" },
  { label: "Available Plots", href: "#listings" },
];

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A solid background applies when the page is scrolled OR the mobile
  // sheet is open (so the sheet reads as one surface with the bar).
  const solid = scrolled || menuOpen;

  return (
    <nav
      id="top"
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        solid
          ? "border-[--color-border-rule] bg-canvas/85 backdrop-blur-md"
          : "border-transparent"
      }`}
      aria-label="Primary"
    >
      {/* Resting scrim over the hero map. Removed once the bar goes
         solid so it never doubles up. */}
      {!solid && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-canvas/95 via-canvas/55 to-transparent"
        />
      )}

      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 sm:px-8 sm:py-5 lg:px-10">
        <Link href="/" aria-label="Terrain home">
          <TerrainLogo markSize={36} tone="onLight" wordClassName="text-[36px]" />
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
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center text-primary md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <MenuGlyph open={menuOpen} />
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="border-t border-[--color-border-rule] bg-canvas md:hidden"
        >
          <div className="flex flex-col px-6 py-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-[--color-border-rule] py-4 text-base text-primary"
                style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="#download"
              onClick={() => setMenuOpen(false)}
              className="mt-4 mb-2 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-canvas"
              style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
            >
              Get the App
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      {open ? (
        <>
          <line x1="5" y1="5" x2="17" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="17" y1="5" x2="5" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="3" y1="13" x2="19" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
