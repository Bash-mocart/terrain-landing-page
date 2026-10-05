import Link from "next/link";
import { TerrainLogo } from "./TerrainLogo";
import { Coordinate } from "./cartographic";

// Footer. Dark surface with the wordmark, three nav columns, and a
// thin legal line. Social icons land alongside the wordmark; copy
// stays minimal so the page exits cleanly.
const NAV = [
  {
    heading: "Explore",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Fraud protection", href: "/#protection" },
      { label: "Verified companies", href: "/#companies" },
      { label: "Join the waitlist", href: "/#waitlist" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "For companies", href: "/#for-companies" },
      { label: "Apply to list", href: "mailto:agents@terrain.ng" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Platform Status", href: "#" },
      { label: "Contact Support", href: "mailto:support@terrain.ng" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-primary py-16 text-canvas sm:py-20">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-6">
            <Link href="/" aria-label="Terrain home">
              <TerrainLogo markSize={32} tone="onDark" wordClassName="text-3xl" />
            </Link>
            <p
              className="mt-6 max-w-sm text-base leading-relaxed text-canvas/70"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Land and homes in Nigeria from verified real estate companies,
              with every deal kept on record.
            </p>
          </div>
          {NAV.map((col) => (
            <div key={col.heading} className="lg:col-span-2">
              <h4
                className="text-xs uppercase tracking-[0.18em] text-canvas/60"
                style={{ fontFamily: "var(--font-interactive)" }}
              >
                {col.heading}
              </h4>
              <ul
                className="mt-5 space-y-3"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-canvas/85 transition-colors hover:text-canvas"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start gap-3 border-t border-canvas/15 pt-6 text-xs text-canvas/55 sm:mt-16 md:flex-row md:items-center md:justify-between">
          <p style={{ fontFamily: "var(--font-body)" }}>
            © {new Date().getFullYear()} Terrain Technologies Ltd. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <Coordinate tone="canvas">9.0820&deg; N &middot; 8.6753&deg; E</Coordinate>
            <p style={{ fontFamily: "var(--font-interactive)" }}>
              Built in Nigeria for buyers at home and in the diaspora.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
