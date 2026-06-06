"use client";

import { useState } from "react";
import Link from "next/link";

// Common questions accordion. Client component because the open
// state lives in React. Single-open behavior — opening question N
// closes question N-1 — keeps the scroll honest.
type Q = { q: string; a: string };

const FAQS: Q[] = [
  {
    q: "How can I purchase land through the platform without an agent?",
    a:
      "Browse listings on the live map, tap a plot, then tap Make Offer. Terrain holds your funds in escrow while a verified realtor walks the boundary with you and confirms the survey plan. No agency in the middle.",
  },
  {
    q: "Are there any hidden agency fees or commissions?",
    a:
      "No. Terrain charges a flat platform fee disclosed on the listing detail before you commit. There are no buyer-side commissions, no broker spreads, and no surprise fees at closing.",
  },
  {
    q: "How do I schedule a physical site inspection?",
    a:
      "Every verified listing surfaces a Book Site Visit option. The verified realtor for that plot coordinates the trip — date, transport, and a guided walk-through of the beacons against the survey plan.",
  },
  {
    q: "How does the platform ensure that the land titles are genuine?",
    a:
      "Every plot is reviewed by a Terrain officer who pulls the Certificate of Occupancy or Governor's Consent at the relevant state Lands Bureau, cross-checks the survey plan, and confirms the seller's identity via KYC before the listing goes live.",
  },
  {
    q: "Who do I make payments to when I buy a plot?",
    a:
      "Funds move into Terrain Trustees Ltd., a regulated escrow account, never directly to the seller. Funds release to the seller only when the title transfer is confirmed at the Lands Registry. If the deed doesn't land, the escrow refunds automatically.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-primary py-24 lg:py-32 text-canvas">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span
            className="rounded-full bg-canvas/12 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-canvas/80"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            FAQ
          </span>
          <h2
            className="mt-6 text-[clamp(36px,5vw,64px)] leading-[1.0] tracking-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Common
            <br />
            Questions.
          </h2>
          <p
            className="mt-6 max-w-md text-base text-canvas/70"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Can&rsquo;t find what you&rsquo;re looking for?
          </p>
          <Link
            href="mailto:support@terrain.ng"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-canvas/30 px-5 py-2.5 text-sm text-canvas transition-colors hover:border-canvas"
            style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
          >
            Contact Support
          </Link>
        </div>
        <ul className="flex flex-col lg:col-span-7">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li
                key={item.q}
                className="border-b border-canvas/15 last:border-b-0"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:text-verified/90"
                >
                  <span
                    className="text-lg leading-snug text-canvas"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-canvas/30 text-canvas transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p
                      className="pb-6 pr-12 text-base leading-relaxed text-canvas/75"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
