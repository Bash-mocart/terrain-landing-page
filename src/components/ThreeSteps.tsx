import Image from "next/image";

// "Three Steps to Verified Ownership" section. Three side-by-side
// cards. The Figma uses a peach card + a dark card + an image card
// to differentiate; we keep that three-beat rhythm but in Terrain's
// restrained palette: Warm Canvas, Late-Night Boardroom, and a
// topographic-pattern card. No peach — the palette stays five-token.
type Step = {
  eyebrow: string;
  title: string;
  body: string;
  background: "canvas" | "boardroom" | "topo";
  topoImage?: string;
};

const STEPS: Step[] = [
  {
    eyebrow: "01",
    title: "Walk the Plot\nFrom Home.",
    body:
      "Every listing comes with videos, drone aerials, and 3D virtual tours where available, so you experience the property before you step on it. Filter by city, price, and property type on a live map. Every listing is from a CAC-verified real estate agent we have vetted.",
    background: "canvas",
  },
  {
    eyebrow: "02",
    title: "Connect With\nthe Agent.",
    body:
      "Tap any plot or house to see the agent who listed it. You get their company name, contact details, and other listings on file. Terrain does not sit between you and the agent.",
    background: "boardroom",
  },
  {
    eyebrow: "03",
    title: "Visit and Buy\nDirectly.",
    body:
      "Arrange a site visit with the agent. Inspect the property in person, run your own title due diligence, and buy directly on their terms. Terrain takes no commission and is not a party to the transaction.",
    background: "topo",
    topoImage: "/figma/step-3.png",
  },
];

export function ThreeSteps() {
  return (
    <section id="how-it-works" className="relative bg-canvas py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col items-center text-center sm:mb-16">
          {/* Eyebrow without the rounded-pill chrome — caps Inter with
             a hairline rule beneath, matching the Flutter app's
             section-label pattern. */}
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-primary"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            How a purchase works
          </span>
          <span
            aria-hidden
            className="mt-3 inline-block h-px w-12 bg-[--color-border-rule]"
          />
          <h2
            className="mt-6 text-[clamp(36px,5vw,64px)] leading-[1.0] tracking-tight text-primary"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Three Steps to
            <br />
            Verified Ownership.
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <StepCard key={step.eyebrow} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step }: { step: Step }) {
  const isDark = step.background === "boardroom" || step.background === "topo";
  return (
    <article
      className={`relative flex min-h-[420px] flex-col justify-between gap-10 overflow-hidden rounded-[20px] p-7 sm:gap-12 sm:p-8 lg:h-[560px] lg:min-h-0 lg:gap-0 ${
        step.background === "canvas"
          ? "bg-canvas border border-[--color-border-rule]"
          : step.background === "boardroom"
            ? "bg-primary"
            : "bg-primary"
      }`}
    >
      {step.background === "topo" && step.topoImage && (
        <Image
          src={step.topoImage}
          alt=""
          fill
          className="absolute inset-0 object-cover opacity-50"
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
      )}
      <div className="relative z-10">
        {/* Step number as a typeset numeral, not a pill. */}
        <span
          className={`text-[11px] uppercase tracking-[0.18em] ${
            isDark ? "text-canvas/70" : "text-secondary"
          }`}
          style={{ fontFamily: "var(--font-interactive)" }}
        >
          Step {step.eyebrow}
        </span>
        <h3
          className={`mt-6 whitespace-pre-line text-[clamp(28px,3.5vw,44px)] leading-[1.0] tracking-tight ${
            isDark ? "text-canvas" : "text-primary"
          }`}
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          {step.title}
        </h3>
      </div>
      <p
        className={`relative z-10 max-w-xs text-base leading-relaxed ${
          isDark ? "text-canvas/85" : "text-secondary"
        }`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        {step.body}
      </p>
    </article>
  );
}
