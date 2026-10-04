import { VerifiedCompanies } from "./Companies";

// What stands between a buyer and fraud on Terrain: four plain facts, each
// something the app does today, then the real verified companies as proof.
const POINTS = [
  {
    title: "Only verified companies can sell.",
    body: "Every company is checked against the CAC register before it can list, and carries a gold check.",
  },
  {
    title: "Every listing is checked.",
    body: "Title documents and the land itself are checked before a listing goes live.",
  },
  {
    title: "The chat is the record.",
    body: "You talk to the company inside Terrain. Messages, offer letters and receipts can’t be edited or deleted.",
  },
  {
    title: "No one holds your money.",
    body: "You pay the company directly, as agreed. Terrain never asks you to send money anywhere else.",
  },
] as const;

export function Protection() {
  return (
    <section id="protection" aria-labelledby="protection-title" className="bg-canvas pb-16 sm:pb-24">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-10">
        <div className="border-t border-border-rule pt-14 sm:pt-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
            <h2
              id="protection-title"
              className="text-[clamp(32px,5vw,52px)] leading-[1] tracking-[-0.02em] text-primary"
              style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
            >
              Terrain is built to protect you from fraud.
            </h2>
            <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {POINTS.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <CheckMark />
                  <div>
                    <p
                      className="text-xl leading-snug text-primary"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
                    >
                      {p.title}
                    </p>
                    <p
                      className="mt-1.5 text-base leading-relaxed text-secondary"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <VerifiedCompanies />
        </div>
      </div>
    </section>
  );
}

function CheckMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden className="mt-0.5 shrink-0">
      <circle cx="14" cy="14" r="14" fill="#1A5C38" />
      <path d="M8.5 14.5l3.5 3.5 7.5-8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
