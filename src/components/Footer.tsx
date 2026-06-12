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
      { label: "Available Listings", href: "/#listings" },
      { label: "How it Works", href: "/how-it-works" },
      { label: "Get the App", href: "/#download" },
      { label: "Sample Agent Profile", href: "/agents/sample" },
      { label: "List as an Agent", href: "mailto:agents@terrain.ng" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "For Real Estate Agents", href: "#" },
      { label: "Vetting Process", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
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
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" aria-label="Terrain home">
              <TerrainLogo markSize={32} tone="onDark" wordClassName="text-3xl" />
            </Link>
            <p
              className="mt-6 max-w-sm text-base leading-relaxed text-canvas/70"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Nigeria&rsquo;s directory of CAC-verified real estate agents.
              Vetted before they list, so you start every search with
              a registered company.
            </p>
            <div className="mt-8 flex items-center gap-4 text-sm">
              <SocialLink href="https://wa.me/" label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12 0a12 12 0 0 0-9.9 18.7L0 24l5.4-1.4A12 12 0 1 0 12 0Zm6.9 16.9c-.3.8-1.7 1.6-2.4 1.6-.6.1-1.4.1-2.2-.2a17.1 17.1 0 0 1-6.5-5.6c-.5-.7-1.5-2-1.5-3.7 0-1.8.9-2.7 1.2-3.1.4-.4.8-.5 1-.5h.7c.2 0 .5 0 .8.6l1.1 2.7c.1.2.1.5 0 .7l-.4.6c-.2.3-.5.6-.2 1 .3.6.9 1.6 2 2.5 1.3 1.1 2.4 1.5 2.7 1.6.4.1.6.1.9-.1l1-1.1c.2-.3.5-.2.8-.1l2.4 1.2c.4.2.6.3.7.5.1.2.1 1-.2 1.9Z"/>
                </svg>
              </SocialLink>
              <SocialLink href="https://instagram.com/" label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                </svg>
              </SocialLink>
              <SocialLink href="https://linkedin.com/" label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM0 8h5v15H0V8Zm7.5 0H12v2.1c.6-1.1 2.2-2.3 4.5-2.3 4.8 0 5.5 3.1 5.5 7.1V23h-5v-7.5c0-1.8 0-4.1-2.5-4.1s-3 2-3 4V23h-5V8Z"/>
                </svg>
              </SocialLink>
            </div>
          </div>
          {NAV.map((col) => (
            <div key={col.heading} className="lg:col-span-3">
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

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-canvas/20 text-canvas/85 transition-colors hover:border-canvas hover:text-canvas"
    >
      {children}
    </Link>
  );
}
