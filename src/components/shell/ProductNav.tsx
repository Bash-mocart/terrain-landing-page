"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TerrainLogo } from "../TerrainLogo";
import { DestinationIcon } from "./DestinationIcon";
import { ALL_DESTINATIONS, DESTINATIONS } from "./destinations";

const MIN_DESKTOP_DESTINATIONS = 2;

// Product routes use compact application chrome. Marketing navigation and app
// promotion stay on the landing page; mobile product navigation joins this
// shell as a bottom bar once there are enough real routes to move between.
export function ProductNav() {
  const pathname = usePathname();
  const showDesktopDestinations =
    DESTINATIONS.length >= MIN_DESKTOP_DESTINATIONS;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border-rule bg-canvas">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-10">
          <Link href="/" prefetch={false} aria-label="Terrain home">
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

      <nav
        aria-label="Product tabs"
        data-product-bottom-nav
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 md:hidden"
      >
        <div className="flex justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-2">
          <div className="pointer-events-auto flex max-w-full items-center gap-1 rounded-full bg-canvas p-1 shadow-[0_8px_24px_rgba(9,5,3,0.18)]">
            {ALL_DESTINATIONS.map((destination) => {
              const active =
                pathname === destination.href ||
                pathname.startsWith(`${destination.href}/`);
              const className = `flex h-11 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-[background-color,color,opacity,width] duration-300 ease-in-out ${
                active
                  ? "w-[104px] bg-verified text-canvas"
                  : "w-11 text-primary"
              }`;
              const icon = (
                <DestinationIcon href={destination.href} size={18} />
              );
              const label = (
                <span
                  className={`overflow-hidden whitespace-nowrap transition-[max-width,margin,opacity] duration-300 ease-in-out ${
                    active
                      ? "ml-2 max-w-20 opacity-100"
                      : "ml-0 max-w-0 opacity-0"
                  }`}
                >
                  {destination.label}
                </span>
              );

              if (!destination.ready) {
                return (
                  <button
                    key={destination.href}
                    type="button"
                    disabled
                    aria-label={`${destination.label} (coming soon)`}
                    title="Coming soon"
                    className={`${className} cursor-not-allowed opacity-35`}
                  >
                    {icon}
                    {label}
                  </button>
                );
              }

              return (
                <Link
                  key={destination.href}
                  href={destination.href}
                  prefetch={false}
                  aria-current={active ? "page" : undefined}
                  className={className}
                >
                  {icon}
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
