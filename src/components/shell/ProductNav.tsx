"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TerrainLogo } from "../TerrainLogo";
import { DESTINATIONS } from "./destinations";

const MIN_DESKTOP_DESTINATIONS = 2;

// Product routes use compact application chrome. Marketing navigation and app
// promotion stay on the landing page; mobile product navigation joins this
// shell as a bottom bar once there are enough real routes to move between.
export function ProductNav() {
  const pathname = usePathname();
  const showDesktopDestinations =
    DESTINATIONS.length >= MIN_DESKTOP_DESTINATIONS;

  return (
    <header className="sticky top-0 z-40 border-b border-border-rule bg-canvas">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-10">
        <Link href="/" aria-label="Terrain home">
          <TerrainLogo markSize={26} tone="onLight" wordClassName="text-2xl" />
        </Link>

        {showDesktopDestinations && (
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
                    active
                      ? "text-verified"
                      : "text-primary hover:text-verified"
                  }`}
                >
                  {destination.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
