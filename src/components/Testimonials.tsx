import Image from "next/image";

// Three buyer testimonials. Photo-backed cards over a Forest
// Verification wash; quotes match the Figma's copy verbatim apart
// from the TERRA -> Terrain rename.
type Testimonial = {
  name: string;
  role: string;
  quote: string;
  image: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Adewale Okafor",
    role: "First-time buyer · Lagos",
    quote:
      "I was skeptical at first — buying land remotely felt risky. But Terrain's escrow held my funds until I physically confirmed the beacon numbers matched. First time I've felt safe doing this.",
    image: "/figma/testimonial-1.png",
  },
  {
    name: "Chidi Eze",
    role: "Land seller · Abuja",
    quote:
      "I listed my plot on a Thursday, had a verified buyer by Saturday, and the title transfer was done in 12 days. The fastest land transaction I've ever done in Nigeria.",
    image: "/figma/testimonial-2.png",
  },
  {
    name: "Fatima Ibrahim",
    role: "Repeat buyer · Port Harcourt",
    quote:
      "The C of O verification and KYC process gives me confidence that every listing is legitimate. I've completed three purchases through Terrain and I won't go back to the old way.",
    image: "/figma/testimonial-3.png",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-verified py-24 lg:py-32 text-canvas">
      <div className="mx-auto max-w-[1440px] px-10">
        <div className="mb-16 flex flex-col items-center text-center">
          <span
            className="rounded-full bg-canvas/15 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-canvas"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            Trust on record
          </span>
          <h2
            className="mt-6 text-[clamp(36px,5vw,64px)] leading-[1.0] tracking-tight"
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
    <article className="relative flex h-[540px] flex-col justify-between overflow-hidden rounded-[44px] bg-primary p-8">
      <Image
        src={t.image}
        alt=""
        fill
        className="absolute inset-0 object-cover opacity-55"
        sizes="(min-width: 768px) 33vw, 100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/60 to-primary/90"
        aria-hidden
      />
      <blockquote
        className="relative z-10 text-lg leading-relaxed text-canvas"
        style={{ fontFamily: "var(--font-body)" }}
      >
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <footer className="relative z-10">
        <p
          className="text-base text-canvas"
          style={{
            fontFamily: "var(--font-interactive)",
            fontWeight: 700,
          }}
        >
          {t.name}
        </p>
        <p
          className="mt-1 text-sm text-canvas/70"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {t.role}
        </p>
      </footer>
    </article>
  );
}
