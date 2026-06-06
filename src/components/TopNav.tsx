import Link from "next/link";

// Top nav, registry-document style. Two affordances: the wordmark
// (returns to the entry beat) and a small "List your plot" link
// (sellers' way in). No mid-page nav, no Get Started CTA chrome —
// the hero carries the store buttons. Sits inline with content, not
// floating, so the document reads top-to-bottom without overlap.
export function TopNav() {
  return (
    <nav
      className="border-b border-[#ebebeb]"
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-[1200px] items-baseline justify-between px-6 py-6 sm:px-10">
        <Link
          href="/"
          className="text-2xl tracking-tight text-[#090503]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          TERRAIN
        </Link>
        <Link
          href="mailto:sellers@terrain.ng"
          className="text-[11px] uppercase tracking-[0.18em] text-[#717171] transition-colors hover:text-[#090503]"
          style={{ fontFamily: "var(--font-interactive)" }}
        >
          List your plot{" "}
          <span aria-hidden className="ml-1">
            →
          </span>
        </Link>
      </div>
    </nav>
  );
}
