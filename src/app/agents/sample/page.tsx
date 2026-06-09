import Link from "next/link";
import type { Metadata } from "next";

// Agent profile preview. Translates the UXPilot mock structure into
// Terrain's five-token system (Warm Canvas / Late-Night Boardroom /
// Forest Verification / Survey Gray / Border Rule) with Zain display,
// Nunito body, Inter caps grammar. Lagos Estate Registry voice.
//
// Mock anatomy preserved:
//   masthead (banner + geo coords)
//   identity block (avatar + name + company + rating + stat chips)
//   action bar (Message + Request Call)
//   about (paragraph + specialty chips)
//   active listings (tabs + property cards)
//   credentials (CAC / NIESV / KYC rows)
//   colophon footer
//
// Mock atoms re-expressed in Terrain's chrome:
//   ochre → dropped (replaced with Forest Verification where it
//     signals trust, Survey Gray where it's metadata)
//   Fraunces → Zain display
//   Hanken Grotesk → Nunito body
//   Courier mono → Inter caps with 0.14em letter-spacing
//   CAC ochre seal → Forest Verification shield overlay
//   Aerial photo hero → Mapbox streets-v12 static map of the agent's
//     coordinates (continuity with the live hero map on /)

export const metadata: Metadata = {
  title: "Chidi Okafor · Terrain",
  description:
    "Verified real estate agent on Terrain. CAC-registered, vetted before listing.",
};

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

// Sample agent. Fabricated for the preview; flagged as illustrative
// in the masthead caps stamp so it never reads as a live record.
const AGENT = {
  name: "Chidi Okafor",
  company: "Lagos Luxury Realty",
  initials: "CO",
  bio: "Specialising in premium land acquisition and houses for the Nigerian diaspora. Twelve years in Lagos markets, helping clients secure tangible, appreciating assets back home with full legal transparency and CAC-registered transactions.",
  rating: 4.8,
  reviews: 63,
  cacNumber: "RC·1247893",
  activeListings: 24,
  responseTime: "~2h",
  location: { lat: 6.5244, lng: 3.3792, label: "Lagos, NG" },
  specialties: [
    "Land acquisition",
    "Diaspora clients",
    "Luxury property",
    "C of O titles",
  ],
};

type Plot = {
  id: string;
  title: string;
  location: string;
  price: string;
  priceNote: string;
  sizeSqm: number;
  doc: string;
  shape: string;
  postedAgo: string;
  lat: number;
  lng: number;
};

const LISTINGS: Plot[] = [
  {
    id: "lekki-phase-2",
    title: "Lekki Phase 2 — Dry Land Plot",
    location: "Lekki, Lagos State",
    price: "₦85M",
    priceNote: "Negotiable",
    sizeSqm: 2400,
    doc: "C of O",
    shape: "Rect · 60×40m",
    postedAgo: "3d ago",
    lat: 6.4281,
    lng: 3.4219,
  },
  {
    id: "ibeju-lekki",
    title: "Ibeju-Lekki Waterfront Parcel",
    location: "Ibeju-Lekki, Lagos",
    price: "₦220M",
    priceNote: "Fixed",
    sizeSqm: 5000,
    doc: "Govt Alloc",
    shape: "100×50m",
    postedAgo: "1w ago",
    lat: 6.3897,
    lng: 3.6512,
  },
  {
    id: "maitama",
    title: "Maitama District — Corner Plot",
    location: "Maitama, Abuja FCT",
    price: "₦150M",
    priceNote: "Negotiable",
    sizeSqm: 1200,
    doc: "R of O",
    shape: "Corner · 40×30m",
    postedAgo: "2w ago",
    lat: 9.0579,
    lng: 7.4951,
  },
];

const CREDENTIALS = [
  {
    label: "CAC registered business",
    sub: "RC·1247893 · Active since 2011",
    icon: "columns",
  },
  {
    label: "NIESV licensed",
    sub: "Reg. F/2847 · Lagos Branch",
    icon: "id",
  },
  {
    label: "Identity verified",
    sub: "NIN + BVN · Terrain KYC 2024",
    icon: "shield",
  },
] as const;

function staticMapUrl(
  lng: number,
  lat: number,
  zoom = 14,
  w = 800,
  h = 320,
) {
  if (!MAPBOX_TOKEN) return null;
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${lng},${lat},${zoom},0/${w}x${h}@2x?access_token=${MAPBOX_TOKEN}`;
}

export default function AgentSamplePage() {
  return (
    <main className="bg-canvas min-h-screen">
      <PageTopNav />
      <div className="mx-auto w-full max-w-[640px]">
        <Hero />
        <Identity />
        <ActionBar />
        <About />
        <Listings />
        <Credentials />
      </div>
      <PageFooter />
    </main>
  );
}

function PageTopNav() {
  return (
    <nav
      className="sticky top-0 z-30 flex items-center justify-between border-b border-border-rule bg-canvas/90 px-5 py-4 backdrop-blur-sm"
      aria-label="Agent profile navigation"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-primary"
        style={{ fontFamily: "var(--font-interactive)" }}
      >
        <span aria-hidden>←</span> Terrain
      </Link>
      <p
        className="text-[11px] text-secondary"
        style={{
          fontFamily: "var(--font-interactive)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        Agent profile
      </p>
      <span aria-hidden className="w-[60px]" />
    </nav>
  );
}

function Hero() {
  const mapUrl = staticMapUrl(AGENT.location.lng, AGENT.location.lat, 11);
  return (
    <header className="relative">
      <div className="relative h-[220px] w-full overflow-hidden border-b border-border-rule bg-border-rule">
        {mapUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mapUrl}
            alt={`Map of ${AGENT.location.label}`}
            className="h-full w-full object-cover"
          />
        )}
        {/* Forest Verification fade — replaces the mock's deep-green
           overlay. Restrained at 22% bottom so the streets stay
           readable beneath. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(74, 124, 89, 0) 0%, rgba(9, 5, 3, 0.32) 100%)",
          }}
          aria-hidden
        />
        {/* Caps stamp top-right — registry voice signature */}
        <div className="absolute right-4 top-4">
          <GeoPill label={AGENT.location.label.toUpperCase()} dotted />
        </div>
        {/* Coordinates pill centred at the bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <GeoPill
            label={`${AGENT.location.lat}° N, ${AGENT.location.lng}° E`}
          />
        </div>
      </div>
    </header>
  );
}

function GeoPill({ label, dotted = false }: { label: string; dotted?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border border-canvas/30 bg-primary/85 px-3 py-1.5 text-canvas backdrop-blur-sm"
      style={{
        fontFamily: "var(--font-interactive)",
        fontSize: 10,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        fontWeight: 600,
      }}
    >
      {dotted && (
        <span
          aria-hidden
          className="inline-block h-1.5 w-1.5 rounded-full bg-verified"
        />
      )}
      {label}
    </span>
  );
}

function Identity() {
  return (
    <section className="relative px-5 pb-4">
      <div className="-mt-12 flex flex-col items-center">
        {/* Avatar — Warm Canvas circle with Border Rule ring + Late-
           Night Boardroom initials. No external photo URLs in the
           preview; initials read as the typographic placeholder
           Terrain would surface before a real seller uploads media. */}
        <div className="relative">
          <div
            className="flex h-24 w-24 items-center justify-center rounded-full border-[3px] border-canvas bg-canvas shadow-[0_8px_24px_rgba(9,5,3,0.18)]"
          >
            <div
              className="flex h-full w-full items-center justify-center rounded-full border border-border-rule bg-canvas"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-2xl font-bold text-primary">
                {AGENT.initials}
              </span>
            </div>
          </div>
          {/* Verified shield overlay — same glyph used elsewhere on
             the page to indicate Terrain attestation. */}
          <span
            aria-label="CAC-verified"
            className="absolute -bottom-1 -right-1 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-canvas bg-canvas"
          >
            <VerifiedShield size={20} />
          </span>
        </div>

        <h1
          className="mt-4 text-2xl tracking-tight text-primary"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          {AGENT.name}
        </h1>
        <p
          className="mt-1 text-sm text-secondary"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {AGENT.company}
        </p>

        <Rating value={AGENT.rating} reviews={AGENT.reviews} />

        <div className="mt-5 grid w-full grid-cols-3 gap-2">
          <StatChip label="CAC No." value={AGENT.cacNumber} mono />
          <StatChip label="Listings" value={String(AGENT.activeListings)} />
          <StatChip label="Response" value={AGENT.responseTime} />
        </div>
      </div>
    </section>
  );
}

function Rating({ value, reviews }: { value: number; reviews: number }) {
  // Five-star scale rendered in Forest Verification. Half-star drawn
  // via a clipped overlay over a Border Rule outline, so the rating
  // glyph stays inside the brand's restrained palette.
  const fullStars = Math.floor(value);
  const hasHalf = value - fullStars >= 0.4;
  return (
    <div className="mt-2 flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars) return <Star key={i} fill="full" />;
        if (i === fullStars && hasHalf) return <Star key={i} fill="half" />;
        return <Star key={i} fill="empty" />;
      })}
      <span
        className="ml-1 text-xs text-secondary"
        style={{ fontFamily: "var(--font-interactive)" }}
      >
        {value.toFixed(1)} · {reviews} reviews
      </span>
    </div>
  );
}

function Star({ fill }: { fill: "full" | "half" | "empty" }) {
  const verified = "#4a7c59";
  const rule = "#ebebeb";
  if (fill === "full") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill={verified} aria-hidden>
        <path d="M12 2l3 6.7 7.3.7-5.5 5 1.7 7.2L12 17.8 5.5 21.6 7.2 14.4 1.7 9.4l7.3-.7L12 2z" />
      </svg>
    );
  }
  if (fill === "half") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
        <defs>
          <linearGradient id="halfStar" x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor={verified} />
            <stop offset="50%" stopColor={rule} />
          </linearGradient>
        </defs>
        <path
          fill="url(#halfStar)"
          d="M12 2l3 6.7 7.3.7-5.5 5 1.7 7.2L12 17.8 5.5 21.6 7.2 14.4 1.7 9.4l7.3-.7L12 2z"
        />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={rule} aria-hidden>
      <path d="M12 2l3 6.7 7.3.7-5.5 5 1.7 7.2L12 17.8 5.5 21.6 7.2 14.4 1.7 9.4l7.3-.7L12 2z" />
    </svg>
  );
}

function StatChip({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  // Hairlined chip in Terrain's eyebrow grammar. Caps label up top,
  // Zain display value beneath. The original mock split this between
  // ochre labels + deep-green numbers; we drop the ochre and let the
  // Forest Verification hairline carry the trust signal.
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-border-rule bg-canvas px-2 py-3">
      <span
        className="text-[10px] text-secondary"
        style={{
          fontFamily: "var(--font-interactive)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 700,
        }}
      >
        {label}
      </span>
      <span
        className={`mt-1 text-primary ${mono ? "text-[12px]" : "text-[17px]"}`}
        style={{
          fontFamily: mono ? "var(--font-interactive)" : "var(--font-display)",
          fontWeight: mono ? 700 : 700,
          letterSpacing: mono ? "0.02em" : "-0.01em",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function ActionBar() {
  return (
    <section className="px-5 pb-5">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-4 py-3 text-canvas transition-opacity hover:opacity-90"
          style={{
            fontFamily: "var(--font-interactive)",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          <MessageGlyph />
          Message
        </button>
        <button
          type="button"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-primary bg-canvas px-4 py-3 text-primary transition-colors hover:bg-primary/5"
          style={{
            fontFamily: "var(--font-interactive)",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          <PhoneGlyph />
          Request call
        </button>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="px-5 pb-5">
      <div className="rounded-xl border border-border-rule bg-canvas p-4">
        <SectionLabel>About</SectionLabel>
        <p
          className="mt-3 text-sm leading-relaxed text-primary/85"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {AGENT.bio}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {AGENT.specialties.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border-rule bg-canvas px-3 py-1 text-[11px] text-primary"
              style={{
                fontFamily: "var(--font-interactive)",
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span
        aria-hidden
        className="inline-block h-4 w-[3px] rounded-full bg-verified"
      />
      <h3
        className="text-base tracking-tight text-primary"
        style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
      >
        {children}
      </h3>
    </div>
  );
}

function Listings() {
  return (
    <section className="px-5 pb-8">
      <div className="mb-3 flex items-center justify-between">
        <SectionLabel>Active listings</SectionLabel>
        <Link
          href="#"
          className="inline-flex min-h-[44px] items-center text-[12px] text-primary"
          style={{
            fontFamily: "var(--font-interactive)",
            fontWeight: 600,
            letterSpacing: "0.04em",
            borderBottom: "1px solid rgba(9, 5, 3, 0.4)",
            paddingBottom: 2,
            alignSelf: "center",
          }}
        >
          View all
        </Link>
      </div>

      <Tabs />

      <div className="flex flex-col gap-4">
        {LISTINGS.map((plot) => (
          <PropertyCard key={plot.id} plot={plot} />
        ))}
      </div>
    </section>
  );
}

function Tabs() {
  // Static for the preview. In a real implementation these would
  // filter the listings array client-side.
  const tabs = [
    { label: "Land", active: true },
    { label: "Residential", active: false },
    { label: "Commercial", active: false },
  ];
  return (
    <div className="mb-4 flex gap-4 border-b border-border-rule">
      {tabs.map((t) => (
        <button
          key={t.label}
          type="button"
          aria-pressed={t.active}
          className={`min-h-[44px] px-1 pb-2.5 text-sm transition-colors ${
            t.active
              ? "border-b-[2px] border-primary text-primary"
              : "border-b-[2px] border-transparent text-secondary"
          }`}
          style={{
            fontFamily: "var(--font-interactive)",
            fontWeight: t.active ? 600 : 500,
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function PropertyCard({ plot }: { plot: Plot }) {
  const mapUrl = staticMapUrl(plot.lng, plot.lat, 15, 700, 360);
  return (
    <article className="overflow-hidden rounded-xl border border-border-rule bg-canvas">
      <div className="relative h-[180px] w-full overflow-hidden bg-border-rule">
        {mapUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mapUrl}
            alt={`Map of ${plot.location}`}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute left-3 top-3">
          <span
            className="inline-flex items-center gap-1.5 rounded bg-verified px-2 py-1 text-canvas"
            style={{
              fontFamily: "var(--font-interactive)",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            <VerifiedShield size={10} fill="#fdfcfb" />
            Verified
          </span>
        </div>
        <div className="absolute right-3 top-3">
          <span
            className="inline-block rounded border border-border-rule bg-canvas px-2 py-1 text-primary"
            style={{
              fontFamily: "var(--font-interactive)",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {plot.sizeSqm.toLocaleString("en-NG")} sqm
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <GeoPill label={`${plot.lat}° N · ${plot.lng}° E`} />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4
              className="text-base leading-snug tracking-tight text-primary"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              {plot.title}
            </h4>
            <div className="mt-1 flex items-center gap-1.5">
              <PinGlyph />
              <span
                className="text-xs text-secondary"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {plot.location}
              </span>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p
              className="text-lg text-primary"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              {plot.price}
            </p>
            <p
              className="mt-0.5 text-[10px] text-secondary"
              style={{ fontFamily: "var(--font-interactive)" }}
            >
              {plot.priceNote}
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3 border-t border-border-rule pt-3">
          <MetaCell label={plot.doc} />
          <Sep />
          <MetaCell label={plot.shape} />
          <Sep />
          <MetaCell label={plot.postedAgo} muted />
        </div>
      </div>
    </article>
  );
}

function MetaCell({ label, muted = false }: { label: string; muted?: boolean }) {
  return (
    <span
      className={muted ? "text-secondary" : "text-primary"}
      style={{
        fontFamily: "var(--font-interactive)",
        fontSize: 10,
        fontWeight: muted ? 500 : 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
    >
      {label}
    </span>
  );
}

function Sep() {
  return <span aria-hidden className="h-3 w-px bg-border-rule" />;
}

function Credentials() {
  return (
    <section className="px-5 pb-8">
      <div className="rounded-xl border border-border-rule bg-canvas p-4">
        <SectionLabel>Credentials & trust</SectionLabel>
        <ul className="mt-4 flex flex-col gap-3">
          {CREDENTIALS.map((c, i) => (
            <li key={c.label}>
              <CredentialRow {...c} />
              {i < CREDENTIALS.length - 1 && (
                <div className="mt-3 h-px w-full bg-border-rule" aria-hidden />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CredentialRow({
  label,
  sub,
  icon,
}: {
  label: string;
  sub: string;
  icon: "columns" | "id" | "shield";
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        style={{ background: "rgba(74, 124, 89, 0.12)" }}
      >
        <CredentialGlyph kind={icon} />
      </div>
      <div className="flex-1">
        <p
          className="text-sm text-primary"
          style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
        >
          {label}
        </p>
        <p
          className="mt-0.5 text-[11px] text-secondary"
          style={{ fontFamily: "var(--font-interactive)" }}
        >
          {sub}
        </p>
      </div>
      <VerifiedShield size={20} />
    </div>
  );
}

function PageFooter() {
  return (
    <footer className="bg-primary px-5 py-8 text-canvas">
      <div className="mx-auto flex w-full max-w-[640px] items-center justify-between">
        <div>
          <p
            className="text-xl tracking-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            TERRAIN
          </p>
          <p
            className="mt-1 text-[11px] text-canvas/55"
            style={{
              fontFamily: "var(--font-interactive)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            A record of verified agents
          </p>
        </div>
        <div className="flex gap-2">
          <SocialButton href="https://instagram.com" label="Instagram">
            <InstagramGlyph />
          </SocialButton>
          <SocialButton href="https://x.com" label="X">
            <XGlyph />
          </SocialButton>
          <SocialButton href="https://wa.me/" label="WhatsApp">
            <WhatsAppGlyph />
          </SocialButton>
        </div>
      </div>
      <div className="mx-auto mt-6 h-px w-full max-w-[640px] bg-canvas/10" />
      <p
        className="mx-auto mt-4 max-w-[640px] text-center text-[10px] text-canvas/40"
        style={{
          fontFamily: "var(--font-interactive)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        © {new Date().getFullYear()} Terrain · sample agent profile
      </p>
    </footer>
  );
}

function SocialButton({
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-canvas/20 text-canvas/65 transition-colors hover:border-canvas hover:text-canvas"
    >
      {children}
    </Link>
  );
}

// ── Glyphs ───────────────────────────────────────────────────────────

function VerifiedShield({
  size = 16,
  fill = "#4a7c59",
}: {
  size?: number;
  fill?: string;
}) {
  // Same shield-check shape used by the landing's ledger section.
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fill}
      aria-hidden
    >
      <path d="M12 1l9 4v6c0 5-3.5 9.6-9 11-5.5-1.4-9-6-9-11V5l9-4zm-1 14l6-6-1.4-1.4L11 12.2 8.4 9.6 7 11l4 4z" />
    </svg>
  );
}

function MessageGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="currentColor"
      aria-hidden
    >
      <path d="M4 4h16v12H7l-3 3V4zm3 4v2h10V8H7zm0 3v2h7v-2H7z" />
    </svg>
  );
}

function PhoneGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="currentColor"
      aria-hidden
    >
      <path d="M6.6 10.8c1.5 2.9 3.7 5.1 6.6 6.6l2.2-2.2c.3-.3.6-.4 1-.2 1.2.4 2.5.7 3.9.7.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.9 0-18-8.1-18-18 0-.6.4-1 1-1H6c.6 0 1 .4 1 1 0 1.4.2 2.7.7 3.9.1.4 0 .7-.2 1l-2.9 2.9z" />
    </svg>
  );
}

function PinGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={12} height={12} fill="#4a7c59" aria-hidden>
      <path d="M12 2c-4 0-7 3-7 7 0 5.3 7 13 7 13s7-7.7 7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
    </svg>
  );
}

function CredentialGlyph({ kind }: { kind: "columns" | "id" | "shield" }) {
  const fill = "#090503";
  if (kind === "columns") {
    return (
      <svg viewBox="0 0 24 24" width={16} height={16} fill={fill} aria-hidden>
        <path d="M12 2l10 5v2H2V7l10-5zm-7 9h2v8H5v-8zm5 0h2v8h-2v-8zm5 0h2v8h-2v-8zM2 20h20v2H2v-2z" />
      </svg>
    );
  }
  if (kind === "id") {
    return (
      <svg viewBox="0 0 24 24" width={16} height={16} fill={fill} aria-hidden>
        <path d="M3 4h18v16H3V4zm2 2v12h14V6H5zm3 7a3 3 0 116 0v1H8v-1zm3-5a2 2 0 110 4 2 2 0 010-4zm5 1h3v2h-3V9zm0 3h3v2h-3v-2z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill={fill} aria-hidden>
      <path d="M12 1l9 4v6c0 5-3.5 9.6-9 11-5.5-1.4-9-6-9-11V5l9-4z" />
    </svg>
  );
}

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function XGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor" aria-hidden>
      <path d="M17.5 3h3l-7 8 8 10h-6.4l-5-6.3L4 21H1l7.5-8.5L1 3h6.5l4.5 5.8L17.5 3z" />
    </svg>
  );
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor" aria-hidden>
      <path d="M12 0a12 12 0 0 0-9.9 18.7L0 24l5.4-1.4A12 12 0 1 0 12 0Zm6.9 16.9c-.3.8-1.7 1.6-2.4 1.6-.6.1-1.4.1-2.2-.2a17.1 17.1 0 0 1-6.5-5.6c-.5-.7-1.5-2-1.5-3.7 0-1.8.9-2.7 1.2-3.1.4-.4.8-.5 1-.5h.7c.2 0 .5 0 .8.6l1.1 2.7c.1.2.1.5 0 .7l-.4.6c-.2.3-.5.6-.2 1 .3.6.9 1.6 2 2.5 1.3 1.1 2.4 1.5 2.7 1.6.4.1.6.1.9-.1l1-1.1c.2-.3.5-.2.8-.1l2.4 1.2c.4.2.6.3.7.5.1.2.1 1-.2 1.9Z" />
    </svg>
  );
}
