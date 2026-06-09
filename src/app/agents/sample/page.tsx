import Link from "next/link";
import type { Metadata } from "next";

// Agent profile preview, post-critique iteration.
//
// Translates the UXPilot mock into Terrain's five-token system
// (Warm Canvas / Late-Night Boardroom / Forest Verification /
// Survey Gray / Border Rule) with Zain display, Nunito body, Inter
// caps grammar (0.14em letter-spacing). Lagos Estate Registry voice.
//
// Round 1 shipped the atom-level translation but scored 19/36 on the
// impeccable critique. Three of the skill's absolute bans were
// firing — side-stripe accent on every section label, identical card
// grid, and hero-metric stat chip row. The verification shield
// appeared seven times across the page, diluting the trust mark to
// noise. This file rewrites the composition to honour the page's
// claim of registry-document voice instead of dressing a marketplace
// template in brand colours.
//
// Notable composition changes:
//   - Section labels are caps eyebrows over Border Rule hairlines,
//     same pattern used by the homepage Ledger; no decorative
//     vertical bars before headings.
//   - Property listings are NOT three identical cards. The lead
//     listing keeps a tall hero image; the other two collapse into
//     compact rows (96x96 thumbnail + content right). Two layouts,
//     three items, breaks the grid monotony.
//   - The three stat chips are replaced by a single Nunito sentence
//     under the agent's name. Data is preserved, dashboard widget
//     vocabulary is dropped.
//   - The Forest Verification shield appears exactly once: over the
//     agent's avatar, signalling Terrain attestation of the agent.
//     Per-card "VERIFIED" badges use caps text on a Forest
//     Verification fill (no shield). Credential rows attest with a
//     caps "ATTESTED" label, not a repeated shield.
//   - Action bar uses primary + secondary weighting: Message is
//     full-width filled; Request call is a quieter text link beneath.

export const metadata: Metadata = {
  title: "Chidi Okafor · Terrain",
  description:
    "Verified real estate agent on Terrain. CAC-registered, vetted before listing.",
};

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

const AGENT = {
  name: "Chidi Okafor",
  company: "Lagos Luxury Realty",
  initials: "CO",
  bio: "Specialises in land acquisition, diaspora clients, luxury property, and C of O titles. Twelve years in Lagos markets, helping clients secure tangible, appreciating assets back home with full legal transparency and CAC-registered transactions.",
  rating: 4.8,
  reviews: 63,
  cacNumber: "RC·1247893",
  activeListings: 24,
  responseTime: "~2h",
  location: { lat: 6.5244, lng: 3.3792, label: "Lagos, NG" },
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
    title: "Lekki Phase 2 · Dry land plot",
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
    title: "Ibeju-Lekki waterfront parcel",
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
    title: "Maitama district · Corner plot",
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
    icon: "columns" as const,
  },
  {
    label: "NIESV licensed",
    sub: "Reg. F/2847 · Lagos Branch",
    icon: "id" as const,
  },
  {
    label: "Identity verified",
    sub: "NIN + BVN · Terrain KYC 2024",
    icon: "shield" as const,
  },
];

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

const capsStyle: React.CSSProperties = {
  fontFamily: "var(--font-interactive)",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
};

const displayStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
};

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
        style={{ fontFamily: "var(--font-interactive)", fontWeight: 500 }}
      >
        <span aria-hidden>←</span> Terrain
      </Link>
    </nav>
  );
}

function Hero() {
  // Static Mapbox streets-v12 of the agent's coordinates. Continuity
  // with the live hero map on /. Single overlay element (the location
  // stamp top-right); the bottom-centre coordinates pill from round 1
  // was decorative theatre and is gone.
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
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(9, 5, 3, 0) 0%, rgba(9, 5, 3, 0.28) 100%)",
          }}
          aria-hidden
        />
        <div className="absolute right-4 top-4">
          <LocationStamp label={AGENT.location.label.toUpperCase()} />
        </div>
      </div>
    </header>
  );
}

function LocationStamp({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border border-canvas/30 bg-primary/85 px-3 py-1.5 text-[10px] font-semibold text-canvas backdrop-blur-sm"
      style={capsStyle}
    >
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full bg-verified"
      />
      {label}
    </span>
  );
}

function Identity() {
  // One-sentence summary replaces the three-chip stat row. Data is
  // preserved (24 active listings, ~2h response, CAC RC number) but
  // expressed as typographic prose, in line with the registry voice.
  return (
    <section className="relative px-5 pb-5">
      <div className="-mt-12 flex flex-col items-center">
        <Avatar />
        <h1
          className="mt-4 text-2xl tracking-tight text-primary"
          style={displayStyle}
        >
          {AGENT.name}
        </h1>
        <p className="mt-1 text-sm text-secondary" style={bodyStyle}>
          {AGENT.company}
        </p>
        <Rating value={AGENT.rating} reviews={AGENT.reviews} />
        <p
          className="mt-4 max-w-md text-center text-sm leading-relaxed text-secondary"
          style={bodyStyle}
        >
          {AGENT.activeListings} active listings on file. Replies in roughly{" "}
          {AGENT.responseTime}. Registered {AGENT.cacNumber}.
        </p>
      </div>
    </section>
  );
}

function Avatar() {
  return (
    <div className="relative">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border-[3px] border-canvas bg-canvas shadow-[0_8px_24px_rgba(9,5,3,0.18)]">
        <div className="flex h-full w-full items-center justify-center rounded-full border border-border-rule bg-canvas">
          <span className="text-2xl text-primary" style={displayStyle}>
            {AGENT.initials}
          </span>
        </div>
      </div>
      {/* Sole instance of the Forest Verification shield on the
         page. Signals: Terrain attested THIS AGENT was vetted. Round
         1 used the same glyph seven times across the page; reducing
         to one restores its weight. */}
      <span
        aria-label="Verified by Terrain"
        className="absolute -bottom-1 -right-1 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-canvas bg-canvas"
      >
        <VerifiedShield size={20} />
      </span>
    </div>
  );
}

function Rating({ value, reviews }: { value: number; reviews: number }) {
  // Stars in Survey Gray, not Forest Verification. Reviews are
  // buyer opinion, not Terrain attestation; using the trust colour
  // here overloaded its meaning. The single rating-stars-are-just-
  // information shift lets Forest Verification keep its trust role.
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
  const gray = "#717171";
  const rule = "#ebebeb";
  if (fill === "full") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill={gray} aria-hidden>
        <path d="M12 2l3 6.7 7.3.7-5.5 5 1.7 7.2L12 17.8 5.5 21.6 7.2 14.4 1.7 9.4l7.3-.7L12 2z" />
      </svg>
    );
  }
  if (fill === "half") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
        <defs>
          <linearGradient id="halfStar" x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor={gray} />
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

function ActionBar() {
  // Message is the primary action — full-width Late-Night Boardroom.
  // Request call is secondary, expressed as a quiet text link with
  // a phone glyph beneath. Equal-weight CTAs in round 1 split the
  // buyer's attention; weighting them resolves the choice.
  return (
    <section className="px-5 pb-6">
      <button
        type="button"
        className="inline-flex w-full min-h-[52px] items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-4 py-3 text-canvas transition-opacity hover:opacity-90"
        style={{
          fontFamily: "var(--font-interactive)",
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        <MessageGlyph />
        Message {AGENT.name.split(" ")[0]}
      </button>
      <div className="mt-3 flex items-center justify-center">
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-primary"
          style={{ fontFamily: "var(--font-interactive)", fontWeight: 500 }}
        >
          <PhoneGlyph />
          or request a call
        </button>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="px-5 pb-6">
      <SectionLabel>About</SectionLabel>
      <p
        className="mt-4 text-[15px] leading-relaxed text-primary/85"
        style={bodyStyle}
      >
        {AGENT.bio}
      </p>
    </section>
  );
}

function SectionLabel({
  children,
  trailing,
}: {
  children: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  // Caps eyebrow + short Border Rule hairline beneath. Same pattern
  // used by the homepage Ledger section. No vertical Forest
  // Verification bar before the heading — that was a decorative
  // side-stripe accent and one of the skill's absolute bans.
  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <p
          className="text-[11px] font-semibold text-secondary"
          style={capsStyle}
        >
          {children}
        </p>
        <span
          aria-hidden
          className="mt-2 block h-px w-10 bg-border-rule"
        />
      </div>
      {trailing}
    </div>
  );
}

function Listings() {
  return (
    <section className="px-5 pb-8">
      <SectionLabel
        trailing={
          <Link
            href="#"
            className="text-[11px] font-semibold text-primary"
            style={capsStyle}
          >
            View all →
          </Link>
        }
      >
        Active listings
      </SectionLabel>

      <Tabs />

      <div className="mt-4">
        <PropertyFeatured plot={LISTINGS[0]} />
        <div className="my-5 h-px w-full bg-border-rule" aria-hidden />
        <PropertyRow plot={LISTINGS[1]} />
        <div className="my-5 h-px w-full bg-border-rule" aria-hidden />
        <PropertyRow plot={LISTINGS[2]} />
      </div>
    </section>
  );
}

function Tabs() {
  const tabs = [
    { label: "Land", active: true },
    { label: "Residential", active: false },
    { label: "Commercial", active: false },
  ];
  return (
    <div className="mt-4 flex gap-5 border-b border-border-rule">
      {tabs.map((t) => (
        <button
          key={t.label}
          type="button"
          aria-pressed={t.active}
          className={`min-h-[44px] px-0 pb-2.5 text-sm transition-colors ${
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

function PropertyFeatured({ plot }: { plot: Plot }) {
  // Lead listing — tall hero image with the buyer-grabbing chrome
  // (price + verified badge + size badge). Drops the geo pill from
  // round 1 (decorative coordinates theatre) and the shield from the
  // verified badge (kept only on the agent avatar).
  const mapUrl = staticMapUrl(plot.lng, plot.lat, 15, 700, 360);
  return (
    <article className="overflow-hidden rounded-xl border border-border-rule bg-canvas">
      <div className="relative h-[200px] w-full overflow-hidden bg-border-rule">
        {mapUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mapUrl}
            alt={`Map of ${plot.location}`}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute left-3 top-3">
          <VerifiedBadge />
        </div>
        <div className="absolute right-3 top-3">
          <SizeBadge sqm={plot.sizeSqm} />
        </div>
      </div>
      <div className="p-4">
        <p
          className="text-2xl text-primary"
          style={{ ...displayStyle, letterSpacing: "-0.01em" }}
        >
          {plot.price}
          <span
            className="ml-2 text-[11px] font-medium text-secondary"
            style={capsStyle}
          >
            {plot.priceNote}
          </span>
        </p>
        <h4
          className="mt-2 text-base text-primary"
          style={{ ...bodyStyle, fontWeight: 700 }}
        >
          {plot.title}
        </h4>
        <div className="mt-1 flex items-center gap-1.5">
          <PinGlyph />
          <span className="text-xs text-secondary" style={bodyStyle}>
            {plot.location}
          </span>
        </div>
        <div className="mt-4 flex items-center gap-3 border-t border-border-rule pt-3">
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

function PropertyRow({ plot }: { plot: Plot }) {
  // Compact row layout for listings 2 + 3. 96x96 Mapbox thumbnail
  // on the left, content stacked vertically on the right. Same data
  // as the featured card but the typography is tighter and there is
  // no over-image chrome. Breaks the identical-card-grid pattern.
  const mapUrl = staticMapUrl(plot.lng, plot.lat, 15, 200, 200);
  return (
    <article className="flex items-start gap-4">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-border-rule bg-border-rule">
        {mapUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mapUrl}
            alt={`Map of ${plot.location}`}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4
              className="truncate text-[15px] text-primary"
              style={{ ...bodyStyle, fontWeight: 700 }}
            >
              {plot.title}
            </h4>
            <div className="mt-0.5 flex items-center gap-1">
              <PinGlyph />
              <span
                className="truncate text-xs text-secondary"
                style={bodyStyle}
              >
                {plot.location}
              </span>
            </div>
          </div>
          <p
            className="shrink-0 text-lg text-primary"
            style={{ ...displayStyle, letterSpacing: "-0.01em" }}
          >
            {plot.price}
          </p>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <SmallVerifiedTag />
          <span className="text-secondary/40" aria-hidden>
            ·
          </span>
          <MetaCell label={`${plot.sizeSqm.toLocaleString("en-NG")} sqm`} />
          <span className="text-secondary/40" aria-hidden>
            ·
          </span>
          <MetaCell label={plot.doc} />
          <span className="text-secondary/40" aria-hidden>
            ·
          </span>
          <MetaCell label={plot.postedAgo} muted />
        </div>
      </div>
    </article>
  );
}

function VerifiedBadge() {
  // Caps text on Forest Verification fill. No shield glyph here —
  // the colour is the badge. The shield's job (Terrain attestation)
  // is already done at the avatar; the per-card "VERIFIED" is just
  // saying "this listing passed checks too."
  return (
    <span
      className="inline-block rounded bg-verified px-2 py-1 text-[10px] font-bold text-canvas"
      style={capsStyle}
    >
      Verified
    </span>
  );
}

function SmallVerifiedTag() {
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-bold text-verified"
      style={capsStyle}
    >
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full bg-verified"
      />
      Verified
    </span>
  );
}

function SizeBadge({ sqm }: { sqm: number }) {
  return (
    <span
      className="inline-block rounded border border-border-rule bg-canvas px-2 py-1 text-[10px] font-bold text-primary"
      style={capsStyle}
    >
      {sqm.toLocaleString("en-NG")} sqm
    </span>
  );
}

function MetaCell({ label, muted = false }: { label: string; muted?: boolean }) {
  return (
    <span
      className={`text-[10px] ${muted ? "text-secondary" : "text-primary/85"}`}
      style={{ ...capsStyle, fontWeight: muted ? 500 : 700 }}
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
    <section className="px-5 pb-10">
      <SectionLabel>Credentials</SectionLabel>
      <ul className="mt-5 flex flex-col divide-y divide-border-rule">
        {CREDENTIALS.map((c) => (
          <li key={c.label} className="py-4 first:pt-0 last:pb-0">
            <CredentialRow {...c} />
          </li>
        ))}
      </ul>
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
  // Right edge is a caps "ATTESTED" label, not a repeated shield.
  // Shield used to appear three times in this section alone (once
  // per row); the caps label conveys the same fact without diluting
  // the avatar's shield.
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        style={{ background: "rgba(74, 124, 89, 0.12)" }}
      >
        <CredentialGlyph kind={icon} />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-sm text-primary"
          style={{ ...bodyStyle, fontWeight: 700 }}
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
      <span
        className="text-[10px] font-bold text-verified"
        style={capsStyle}
      >
        Attested
      </span>
    </div>
  );
}

function PageFooter() {
  return (
    <footer className="bg-primary px-5 py-8 text-canvas">
      <div className="mx-auto flex w-full max-w-[640px] items-center justify-between">
        <div>
          <p className="text-xl tracking-tight" style={displayStyle}>
            TERRAIN
          </p>
          <p
            className="mt-1 text-[11px] text-canvas/55"
            style={capsStyle}
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
        style={capsStyle}
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
      width={14}
      height={14}
      fill="currentColor"
      aria-hidden
    >
      <path d="M6.6 10.8c1.5 2.9 3.7 5.1 6.6 6.6l2.2-2.2c.3-.3.6-.4 1-.2 1.2.4 2.5.7 3.9.7.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.9 0-18-8.1-18-18 0-.6.4-1 1-1H6c.6 0 1 .4 1 1 0 1.4.2 2.7.7 3.9.1.4 0 .7-.2 1l-2.9 2.9z" />
    </svg>
  );
}

function PinGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={11}
      height={11}
      fill="#717171"
      aria-hidden
    >
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
    <svg
      viewBox="0 0 24 24"
      width={14}
      height={14}
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.5 3h3l-7 8 8 10h-6.4l-5-6.3L4 21H1l7.5-8.5L1 3h6.5l4.5 5.8L17.5 3z" />
    </svg>
  );
}

function WhatsAppGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={14}
      height={14}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0a12 12 0 0 0-9.9 18.7L0 24l5.4-1.4A12 12 0 1 0 12 0Zm6.9 16.9c-.3.8-1.7 1.6-2.4 1.6-.6.1-1.4.1-2.2-.2a17.1 17.1 0 0 1-6.5-5.6c-.5-.7-1.5-2-1.5-3.7 0-1.8.9-2.7 1.2-3.1.4-.4.8-.5 1-.5h.7c.2 0 .5 0 .8.6l1.1 2.7c.1.2.1.5 0 .7l-.4.6c-.2.3-.5.6-.2 1 .3.6.9 1.6 2 2.5 1.3 1.1 2.4 1.5 2.7 1.6.4.1.6.1.9-.1l1-1.1c.2-.3.5-.2.8-.1l2.4 1.2c.4.2.6.3.7.5.1.2.1 1-.2 1.9Z" />
    </svg>
  );
}
