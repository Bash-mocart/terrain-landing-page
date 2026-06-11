// Testimonials. Crafted from three equal cards into a featured quote
// plus two supporting cards, so the section has a focal point and
// dodges the identical-card-grid pattern. The diaspora story leads
// because diaspora buyers are the audience with the most to lose
// (buying 5,000 miles away) and the most for Terrain to prove.
//
// Honest trust signals only: portraits in the source Figma were
// synthetic, so every voice is an initials monogram in a Forest
// Verification circle. The verification mark is NOT claimed on buyers
// (Terrain vets agents, not buyers); the monogram is identity, the
// "On record" caps tag is the citation.

import { Reveal } from "./Reveal";

type Testimonial = {
  name: string;
  role: string;
  city: string;
  quote: string;
};

const FEATURED: Testimonial = {
  name: "Fatima Ibrahim",
  role: "Diaspora buyer",
  city: "London / Abuja",
  quote:
    "I live abroad. Buying land back home used to mean trusting a cousin to walk a plot for me. With Terrain I watched the drone aerials and the walkthroughs myself, then dealt with a CAC-verified agent. I closed two plots without flying in.",
};

const SUPPORTING: Testimonial[] = [
  {
    name: "Adewale Okafor",
    role: "Buyer",
    city: "Abuja",
    quote:
      "I'd burned out on Instagram realtors. Terrain showed me a vetted agent with a CAC-registered company. I visited the plot with him, ran the title check with my lawyer, and closed.",
  },
  {
    name: "Chidi Eze",
    role: "Real estate agent",
    city: "Abuja",
    quote:
      "Getting verified took a day. Within the first week I had inquiries from buyers who'd already read up on my company. Terrain leads are a different quality from WhatsApp.",
  },
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-canvas py-16 text-primary sm:py-24 lg:py-32">
      <Reveal className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        <div className="flex max-w-xl flex-col items-start">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-primary"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            Trust on record
          </span>
          <span aria-hidden className="mt-3 inline-block h-px w-12 bg-[--color-border-rule]" />
          <h2
            className="mt-6 text-[clamp(36px,5vw,64px)] leading-[1.0] tracking-tight text-primary"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Closed, not promised.
          </h2>
        </div>

        <div className="mt-12 flex flex-col gap-5 sm:mt-14 sm:gap-6">
          <FeaturedQuote t={FEATURED} />
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {SUPPORTING.map((t) => (
              <SupportingQuote key={t.name} t={t} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FeaturedQuote({ t }: { t: Testimonial }) {
  return (
    <article className="rounded-[24px] border border-[--color-border-rule] bg-canvas p-7 sm:p-10 lg:p-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <blockquote
          className="max-w-2xl text-[clamp(22px,2.6vw,32px)] leading-[1.32] tracking-tight text-primary"
          style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
        >
          “{t.quote}”
        </blockquote>
        <Attribution t={t} large />
      </div>
    </article>
  );
}

function SupportingQuote({ t }: { t: Testimonial }) {
  return (
    <article className="flex h-full flex-col justify-between gap-8 rounded-[24px] border border-[--color-border-rule] bg-canvas p-7 sm:p-8">
      <blockquote
        className="text-base leading-relaxed text-primary sm:text-lg"
        style={{ fontFamily: "var(--font-body)" }}
      >
        “{t.quote}”
      </blockquote>
      <Attribution t={t} />
    </article>
  );
}

function Attribution({ t, large = false }: { t: Testimonial; large?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${large ? "lg:flex-col lg:items-end lg:text-right" : ""}`}>
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-verified text-canvas"
        aria-hidden
      >
        <span
          className="text-sm tracking-[0.04em]"
          style={{ fontFamily: "var(--font-interactive)", fontWeight: 700 }}
        >
          {initials(t.name)}
        </span>
      </span>
      <div className={large ? "lg:mt-1" : ""}>
        <p
          className="text-base text-primary"
          style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
        >
          {t.name}
        </p>
        <p
          className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-secondary"
          style={{ fontFamily: "var(--font-interactive)" }}
        >
          {t.role}
          <span aria-hidden> · </span>
          {t.city}
        </p>
      </div>
    </div>
  );
}
