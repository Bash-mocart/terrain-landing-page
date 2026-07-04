import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TopNav } from "@/components/TopNav";
import { TrustStrip } from "@/components/TrustStrip";
import { ProblemSolution } from "@/components/ProblemSolution";
import { Verification } from "@/components/Verification";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { SignupForm } from "@/components/smoke/SignupForm";
import { MetaPixel } from "@/components/smoke/MetaPixel";

// Smoke-test variant pages (terra-backend docs/product_validation_field_kit.md).
// Three promises, one layout: only the hero copy + CTA differ, so signup-rate
// differences read as evidence about the PROMISE, not the page. The hero is
// deliberately static (no LiveMap) — ad traffic pays per click, so LCP is
// part of the experiment's unit economics; the homepage keeps the map.
//
//   /v/verified  trust-led        (assumption A1)
//   /v/plans     affordability-led
//   /v/abroad    diaspora check-led
//
// Same section arc below the fold for all three: TrustStrip, the old-way/
// Terrain-way contrast, the verification artefact, FAQ.

const VARIANTS = {
  verified: {
    eyebrow: "Nigeria’s property registry",
    headline: "Every property verified. Every company CAC-checked.",
    subhead:
      "Buy land and homes without fear. Terrain checks the title, the boundary, and the company behind every listing before you ever see it.",
    cta: "Browse verified properties",
  },
  plans: {
    eyebrow: "Own property in instalments",
    headline: "Own land and homes with interest-free payment plans.",
    subhead:
      "Verified plots and homes with instalment plans from trusted companies. Pay a deposit, spread the rest — no interest, no middlemen.",
    cta: "See payment plans",
  },
  abroad: {
    eyebrow: "For Nigerians abroad",
    headline: "Buying from abroad? We stand on the land for you.",
    subhead:
      "A Terrain-accredited lawyer and surveyor check the title at the registry and the beacons on the ground — photo evidence in your hands before you send a kobo.",
    cta: "Request a check",
  },
} as const;

type VariantKey = keyof typeof VARIANTS;

export function generateStaticParams() {
  return Object.keys(VARIANTS).map((variant) => ({ variant }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ variant: string }>;
}): Promise<Metadata> {
  const { variant } = await params;
  const copy = VARIANTS[variant as VariantKey];
  if (!copy) return {};
  return {
    title: `Terrain — ${copy.headline}`,
    description: copy.subhead,
    robots: { index: false }, // experiment pages stay out of search
  };
}

export default async function VariantPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant } = await params;
  const copy = VARIANTS[variant as VariantKey];
  if (!copy) notFound();

  return (
    <>
      <MetaPixel />
      <TopNav />
      <section className="bg-canvas px-6 pb-16 pt-28 sm:px-10 sm:pt-36 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-verified">
            {copy.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-primary sm:text-5xl lg:text-6xl">
            {copy.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-secondary sm:text-lg">
            {copy.subhead}
          </p>
          <div className="mt-8">
            <SignupForm variant={variant as VariantKey} cta={copy.cta} />
          </div>
        </div>
      </section>
      <TrustStrip />
      <ProblemSolution />
      <Verification />
      <FAQ />
      <Footer />
    </>
  );
}
