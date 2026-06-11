"use client";

import { useState } from "react";
import Image from "next/image";

// "Own. Build. Grow." pillars — the three Terrain product features,
// adapted from the TERRA Figma (node 2845:18) into Terrain's existing
// five-token system (Warm Canvas / Late-Night Boardroom / Forest
// Verification / Survey Gray / Border Rule) with Zain display, Nunito
// body, Inter caps grammar.
//
// The Figma rendered this in a cream + terracotta + Fraunces serif
// aesthetic; that palette is deliberately NOT carried over. The page
// stays on the restrained Terrain tokens we use everywhere else, the
// same call we made dropping the ochre from the agent profile.
//
// Accordion: one pillar open at a time, "Own" open by default. Each
// header toggles; the open pillar reveals body copy, a verified
// checklist, a deep link, and (for Own) a supporting image.
//
// Copy integrity note: the Figma's Own checklist claimed "Escrow-
// protected payment processing" and "Multi-party legal review before
// purchase." Both contradict what Terrain actually does (it holds no
// funds, runs no legal review, and is not a party to the
// transaction). Those lines are replaced here with accurate claims
// rooted in the agent-vetting + immersive-media value props. Build
// and Grow were collapsed in the Figma with no specced body; their
// expanded content is written to match the philosophy without
// overclaiming.

type Pillar = {
  number: string;
  name: string;
  tagline: string;
  body: string;
  checklist: string[];
  linkLabel: string;
  linkHref: string;
  icon: "own" | "build" | "grow";
  image?: { src: string; alt: string };
};

const PILLARS: Pillar[] = [
  {
    number: "01",
    name: "Own",
    tagline: "Secure verified land ownership across Nigeria",
    body: "Land in Nigeria is more than an asset. It is heritage, identity, and security. Terrain helps you find and secure land through agents we have vetted, with the documentation surfaced so nothing about a plot stays hidden.",
    checklist: [
      "CAC-registered agents, vetted before they list",
      "Title documents surfaced for your lawyer's review",
      "Immersive media on every plot: photos, video, drone aerials, 3D tours",
      "Contact and transact with the agent directly, no middle layer",
    ],
    linkLabel: "Browse verified plots",
    linkHref: "#listings",
    icon: "own",
    image: {
      src: "/figma/own-pillar.png",
      alt: "A landowner holding their land document on a verified plot",
    },
  },
  {
    number: "02",
    name: "Build",
    tagline: "Turn your land into a home or an income property",
    body: "Owning the ground is the first step. Terrain carries house listings beside the land, so you can move from a bare plot to a finished home, or buy one already standing, through the same vetted agents.",
    checklist: [
      "Houses and land listed side by side",
      "Filter by bedrooms, condition, and price",
      "Walk finished homes through video and 3D tours before you visit",
      "Every listing from a CAC-verified agent",
    ],
    linkLabel: "See houses on Terrain",
    linkHref: "#listings",
    icon: "build",
  },
  {
    number: "03",
    name: "Grow",
    tagline: "Generate income and watch your investment appreciate",
    body: "Land in the right corridor appreciates. When you are ready, Terrain helps you reach the buyers most likely to act, including the diaspora browsing from abroad, with the media and documents that let them buy with confidence.",
    checklist: [
      "List your plot for resale to vetted buyers",
      "Reach diaspora buyers browsing from abroad",
      "Showcase with drone aerials and 3D virtual tours",
      "Transparent, agent-led negotiations",
    ],
    linkLabel: "List as an agent",
    linkHref: "mailto:agents@terrain.ng",
    icon: "grow",
  },
];

export function OwnBuildGrow() {
  // Single-open accordion. Own (index 0) is open on arrival so the
  // section never lands fully collapsed.
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="the-terrain-way" className="relative bg-canvas py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1040px] px-6 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col items-center text-center sm:mb-16">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-secondary"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            The Terrain way
          </span>
          <span
            aria-hidden
            className="mt-3 inline-block h-px w-12 bg-[--color-border-rule]"
          />
          <h2
            className="mt-6 text-[clamp(36px,5vw,64px)] leading-[1.0] tracking-tight text-primary"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Own. Build. Grow.
          </h2>
          <p
            className="mt-5 max-w-xl text-base leading-relaxed text-secondary sm:text-lg"
            style={{ fontFamily: "var(--font-body)" }}
          >
            A three-step philosophy rooted in generations of African wisdom
            about land ownership and building wealth that lasts.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {PILLARS.map((pillar, i) => (
            <PillarItem
              key={pillar.name}
              pillar={pillar}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarItem({
  pillar,
  isOpen,
  onToggle,
}: {
  pillar: Pillar;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `pillar-panel-${pillar.number}`;
  const buttonId = `pillar-button-${pillar.number}`;
  return (
    <div
      className={`overflow-hidden rounded-[20px] border bg-canvas transition-colors duration-200 ${
        isOpen ? "border-primary" : "border-[--color-border-rule]"
      }`}
    >
      <button
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-7"
      >
        <span className="flex items-center gap-4 sm:gap-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-primary text-canvas sm:h-14 sm:w-14">
            <PillarGlyph icon={pillar.icon} />
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="flex items-center gap-3">
              <span
                className="text-[11px] tracking-[0.14em] text-secondary"
                style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
              >
                {pillar.number}
              </span>
              <span
                className="text-[clamp(22px,3vw,30px)] leading-none tracking-tight text-primary"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                {pillar.name}
              </span>
            </span>
            <span
              className="text-sm text-secondary"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {pillar.tagline}
            </span>
          </span>
        </span>
        <span
          aria-hidden
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
            isOpen
              ? "border-primary bg-primary text-canvas"
              : "border-[--color-border-rule] bg-canvas text-primary"
          }`}
        >
          <PlusMinus isOpen={isOpen} />
        </span>
      </button>

      {isOpen && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="border-t border-[--color-border-rule] p-5 sm:p-7"
        >
          <div
            className={`grid gap-8 ${
              pillar.image ? "lg:grid-cols-2 lg:items-center" : "lg:grid-cols-1"
            }`}
          >
            <div className="flex flex-col gap-6">
              <p
                className="max-w-prose text-base leading-relaxed text-primary/85"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {pillar.body}
              </p>
              <ul className="flex flex-col gap-3">
                {pillar.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "rgba(74, 124, 89, 0.14)" }}
                    >
                      <CheckGlyph />
                    </span>
                    <span
                      className="text-sm leading-relaxed text-primary/85"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={pillar.linkHref}
                className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-primary transition-colors hover:text-verified"
                style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
              >
                {pillar.linkLabel}
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </div>

            {pillar.image && (
              <div className="relative h-[220px] w-full overflow-hidden rounded-[16px] border border-[--color-border-rule] bg-[--color-border-rule] lg:h-[288px]">
                <Image
                  src={pillar.image.src}
                  alt={pillar.image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 480px, 100vw"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PlusMinus({ isOpen }: { isOpen: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <line
        x1="1"
        y1="7"
        x2="13"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {!isOpen && (
        <line
          x1="7"
          y1="1"
          x2="7"
          y2="13"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.5 6.2l2.2 2.2 4.8-4.8"
        stroke="#4a7c59"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PillarGlyph({ icon }: { icon: "own" | "build" | "grow" }) {
  if (icon === "own") {
    // Key — ownership.
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M14.5 3a6.5 6.5 0 00-6.3 8.2L3 16.4V21h4.6v-2.3h2.3v-2.3h2.3l1.2-1.2A6.5 6.5 0 1014.5 3zm2.5 5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    );
  }
  if (icon === "build") {
    // Trowel / build.
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M3 3h8l-1.2 6.4a3 3 0 01-.86 1.62l-1.1 1.1 4.04 4.04a1.5 1.5 0 010 2.12l-.71.71a1.5 1.5 0 01-2.12 0l-4.04-4.04-1.1 1.1a3 3 0 01-1.62.86L3 18z" />
      </svg>
    );
  }
  // Sprout / grow.
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 22v-7m0 0c0-3 2-5 5-5h3v1c0 3-2 5-5 5h-3zm0 0c0-3.3-2.2-6-5-6H4v1c0 3.3 2.2 5 5 5h3z" />
    </svg>
  );
}
