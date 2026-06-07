// Three buyer / seller testimonials. Cards keep the Figma's 44px-
// rounded shape on the Forest Verification section, but the AI-
// generated portrait photographs and dark gradient overlays are gone.
// Each card is now a typeset citation on Warm Canvas with a hairline
// border, an initials monogram in a Forest Verification circle, a
// Nunito quote, and a Late-Night Boardroom attribution row with the
// verified-role dot.
//
// Honest trust signals: the photos in the Figma were synthetic; an
// initials monogram is the same visual rhythm without claiming a face
// that does not exist.

type Testimonial = {
  name: string;
  role: string;
  city: string;
  quote: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Adewale Okafor",
    role: "Buyer",
    city: "Abuja",
    quote:
      "I was skeptical at first. Buying land remotely felt risky. Terrain's escrow held my funds until I physically confirmed the beacons matched the survey plan. First time I felt safe doing this.",
  },
  {
    name: "Chidi Eze",
    role: "Seller",
    city: "Abuja",
    quote:
      "I listed a plot on a Thursday. The reviewer came on Friday. By the next Saturday I had a verified buyer, and the title transfer was done in 12 days.",
  },
  {
    name: "Fatima Ibrahim",
    role: "Repeat buyer",
    city: "Port Harcourt",
    quote:
      "The C of O verification and KYC process gives me confidence that every listing is legitimate. I've completed three purchases through Terrain and I won't go back to the old way.",
  },
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-canvas py-24 lg:py-32 text-primary">
      <div className="mx-auto max-w-[1440px] px-10">
        <div className="mb-16 flex flex-col items-center text-center">
          {/* Section flipped from Forest Verification background to Warm
             Canvas so the Forest accent INSIDE each card (the verified
             dot) regains its semantic punch — when the whole section was
             Forest, the dot disappeared into the wallpaper. */}
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-primary"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            Trust on record
          </span>
          <span
            aria-hidden
            className="mt-3 inline-block h-px w-12 bg-[--color-border-rule]"
          />
          <h2
            className="mt-6 text-[clamp(36px,5vw,64px)] leading-[1.0] tracking-tight text-primary"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Trustable Buyers and
            <br />
            Sellers Alike.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="flex h-full flex-col justify-between gap-10 rounded-[20px] border border-[--color-border-rule] bg-canvas p-8 text-primary">
      <div className="flex items-start justify-between gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-verified text-canvas"
          aria-hidden
        >
          <span
            className="text-sm tracking-[0.04em]"
            style={{
              fontFamily: "var(--font-interactive)",
              fontWeight: 700,
            }}
          >
            {initials(t.name)}
          </span>
        </div>
        <span
          className="mt-2 text-[10px] uppercase tracking-[0.18em] text-secondary"
          style={{ fontFamily: "var(--font-interactive)" }}
        >
          On record
        </span>
      </div>
      <blockquote
        className="text-lg leading-relaxed text-primary"
        style={{ fontFamily: "var(--font-body)" }}
      >
        “{t.quote}”
      </blockquote>
      <footer className="border-t border-[--color-border-rule] pt-5">
        <p
          className="text-base text-primary"
          style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
        >
          {t.name}
        </p>
        <p
          className="mt-1 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-secondary"
          style={{ fontFamily: "var(--font-interactive)" }}
        >
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-verified"
          />
          Verified {t.role.toLowerCase()}
          <span aria-hidden> · </span>
          {t.city}
        </p>
      </footer>
    </article>
  );
}
