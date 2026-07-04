// Trust strip. The quiet proof band directly under the hero: four
// facts a wary buyer needs before they read another word. Hairline
// rules top and bottom, caps grammar, no cards, no icons competing
// with the map above. Reads as the stamp line on a document.
const FACTS = [
  { lead: "CAC-verified", rest: "companies only" },
  { lead: "Checked in person", rest: "before it lists" },
  { lead: "No buyer fees", rest: "no commission" },
  { lead: "6 cities", rest: "Lagos to Kano" },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Why buyers trust Terrain"
      className="border-y border-[--color-border-rule] bg-canvas"
    >
      <ul className="mx-auto grid max-w-[1200px] grid-cols-2 lg:grid-cols-4">
        {FACTS.map((f, i) => (
          <li
            key={f.lead}
            className={`flex flex-col gap-1 px-6 py-5 sm:px-8 sm:py-6 ${
              i % 2 === 1 ? "border-l border-[--color-border-rule]" : ""
            } ${i >= 2 ? "border-t border-[--color-border-rule] lg:border-t-0" : ""} ${
              i > 0 ? "lg:border-l lg:border-[--color-border-rule]" : ""
            }`}
          >
            <span
              className="text-[12px] uppercase tracking-[0.16em] text-primary"
              style={{ fontFamily: "var(--font-interactive)", fontWeight: 700 }}
            >
              {f.lead}
            </span>
            <span
              className="text-sm text-secondary"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {f.rest}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
