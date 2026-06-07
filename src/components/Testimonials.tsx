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
      "I'd burned out on Instagram realtors. Terrain showed me a vetted agent in Abuja with a CAC-registered company. I visited the plot with him, ran the title check with my lawyer, and closed. First time it felt straightforward.",
  },
  {
    name: "Chidi Eze",
    role: "Real estate agent",
    city: "Abuja",
    quote:
      "Getting verified took a day. Within the first week I was getting inquiries from buyers who had already read up on my company. The Terrain leads are a different quality from WhatsApp.",
  },
  {
    name: "Fatima Ibrahim",
    role: "Diaspora buyer",
    city: "London / Abuja",
    quote:
      "I live abroad. Buying land back home used to mean trusting a cousin to walk a plot for me. With Terrain I watched the drone aerials and the walkthroughs myself, then dealt with a CAC-verified agent. I closed two plots without flying in.",
  },
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-canvas py-16 sm:py-24 lg:py-32 text-primary">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col items-center text-center sm:mb-16">
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
    <article className="flex h-full flex-col justify-between gap-8 rounded-[20px] border border-[--color-border-rule] bg-canvas p-7 text-primary sm:gap-10 sm:p-8">
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
        className="text-base leading-relaxed text-primary sm:text-lg"
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
          className="mt-1 text-[11px] uppercase tracking-[0.16em] text-secondary"
          style={{ fontFamily: "var(--font-interactive)" }}
        >
          {/* Dropped the "Verified {role}" prefix + Forest Verification
             dot. Terrain vets real estate agents and companies, not
             buyers; using the verification mark on every role would
             overclaim. The role + city alone carries the citation. */}
          {t.role}
          <span aria-hidden> · </span>
          {t.city}
        </p>
      </footer>
    </article>
  );
}
