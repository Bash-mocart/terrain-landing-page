"use client";

import { useState } from "react";

// Common questions. Single-open accordion, first row open by default so
// the section reads as a real Q+A on first paint. Registry chrome:
// inline section label with hairline rule, no eyebrow chip, no dark
// section wash, no card backgrounds. Hairlines between rows.

const FAQS: { q: string; a: string }[] = [
  {
    q: "How can I purchase land through the platform without an agent?",
    a: "Browse listings on the live map, tap a plot, then tap Make Offer in the app. Terrain holds your funds in escrow while a verified realtor walks the boundary with you and confirms the survey plan. No agency in the middle.",
  },
  {
    q: "Are there hidden agency fees or commissions?",
    a: "No. Terrain charges a flat platform fee, disclosed on the listing detail before you commit. No buyer-side commissions, no broker spreads, no surprise fees at closing.",
  },
  {
    q: "How do I schedule a physical site inspection?",
    a: "Every verified listing surfaces a Book Site Visit option in the app. The verified realtor for that plot coordinates date, transport, and a guided walk-through of the beacons against the survey plan.",
  },
  {
    q: "How does the platform confirm that land titles are genuine?",
    a: "A Terrain officer pulls the Certificate of Occupancy, Right of Occupancy, or Governor's Consent at the relevant state Lands Bureau, cross-checks the survey plan, and confirms the seller's identity via KYC before the listing goes live.",
  },
  {
    q: "Who do I make payments to when I buy a plot?",
    a: "Funds move into Terrain Trustees Ltd., a regulated escrow account. Funds release to the seller only when the title transfer is confirmed at the Lands Registry. If the deed does not land, the escrow refunds automatically.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-b border-[#ebebeb]">
      <div className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 lg:py-32">
        <div className="flex flex-col gap-4">
          <p
            className="text-[11px] uppercase tracking-[0.18em] text-[#090503]"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            <span className="tabular-nums">05</span>
            <span aria-hidden> &nbsp;·&nbsp; </span>
            Common questions
          </p>
          <span className="block h-px w-full bg-[#ebebeb]" aria-hidden />
        </div>
        <ul className="mt-8 flex flex-col">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li
                key={item.q}
                className={`${i > 0 ? "border-t border-[#ebebeb]" : ""}`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="grid w-full grid-cols-[1fr_auto] items-baseline gap-6 py-6 text-left transition-colors hover:text-[#4a7c59]"
                >
                  <span
                    className="text-lg leading-snug text-[#090503]"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className={`text-[11px] uppercase tracking-[0.16em] text-[#717171] transition-opacity ${
                      isOpen ? "opacity-100" : "opacity-70"
                    }`}
                    style={{ fontFamily: "var(--font-interactive)" }}
                  >
                    {isOpen ? "Close" : "Read"}
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
                      className="max-w-[62ch] pb-6 pr-12 text-base leading-relaxed text-[#090503]"
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
        <p
          className="mt-10 text-[12px] uppercase tracking-[0.14em] text-[#717171]"
          style={{ fontFamily: "var(--font-interactive)" }}
        >
          Still stuck?{" "}
          <a
            href="mailto:support@terrain.ng"
            className="text-[#4a7c59] hover:underline"
          >
            support@terrain.ng
          </a>
        </p>
      </div>
    </section>
  );
}
