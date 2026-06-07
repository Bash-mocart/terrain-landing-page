"use client";

import { useState } from "react";
import Link from "next/link";

// Common questions accordion. Client component because the open
// state lives in React. Single-open behaviour (opening question N
// closes question N-1) keeps the scroll honest.
type Q = { q: string; a: string };

const FAQS: Q[] = [
  {
    q: "Do I need to go through a real estate agent?",
    a:
      "Yes. Terrain is built around verified real estate agents. Every plot and house on the platform is listed by an agent or company we have CAC-verified and vetted before approving them to publish. You browse their listings and contact the agent directly through the app.",
  },
  {
    q: "Does Terrain charge any fees to buyers?",
    a:
      "No. Using Terrain is free for buyers. We do not take a commission on transactions. The agent or company you buy from may charge their own fees according to their own terms; Terrain does not add to those.",
  },
  {
    q: "How do I view a property in person?",
    a:
      "Every listing shows the agent's contact details. Reach out directly through call or message in the app to arrange a site visit. The visit is between you and the agent; Terrain does not coordinate it.",
  },
  {
    q: "How does Terrain decide which agents are allowed to list?",
    a:
      "Every agent or company applies to join Terrain. We confirm their CAC (Corporate Affairs Commission) registration, verify the business is operating, and review their company before approving them to publish on the platform. Agents that fail vetting are not allowed to list.",
  },
  {
    q: "Who do I make payments to when I buy?",
    a:
      "Directly to the agent or company that listed the property, according to their own payment process. Terrain does not hold funds, does not act as escrow, and is not a party to the transaction. We are the marketplace that introduces you to vetted agents; the deal happens between you and them.",
  },
  {
    q: "What protects me if a deal goes wrong?",
    a:
      "Terrain's protection is upstream of the deal. We only allow CAC-registered, vetted real estate companies on the platform, so you start from a position of dealing with a legitimate business. Once you and the agent agree on a price, follow standard practice: visit the property, run your own title due diligence (or hire a lawyer), and document the transaction.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-primary py-16 sm:py-24 lg:py-32 text-canvas">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 sm:gap-12 sm:px-8 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          {/* Eyebrow without pill chrome: caps Inter + Border Rule
             hairline above the headline. Same pattern across every
             section so the rhythm reads as registry-document, not
             marketing-template. */}
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-canvas/70"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            FAQ
          </span>
          <span
            aria-hidden
            className="mt-3 inline-block h-px w-12 bg-canvas/30 align-middle"
          />
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
                  className="flex w-full items-center justify-between gap-3 py-5 text-left transition-colors hover:text-verified/90 sm:gap-4 sm:py-6"
                >
                  <span
                    className="text-base leading-snug text-canvas sm:text-lg"
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
                      className="pb-5 pr-4 text-[15px] leading-relaxed text-canvas/75 sm:pb-6 sm:pr-12 sm:text-base"
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
