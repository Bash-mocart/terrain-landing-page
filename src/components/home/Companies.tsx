import { ComingSoonPill } from "../ComingSoonPill";

// Verified companies stay off the page until launch, so the home page
// lists no companies or listings yet. The live list (company logos linking
// to their pages) is in git history before this commit: restore it at launch.
export function VerifiedCompanies() {
  return (
    <div id="companies" className="mt-12 border-t border-border-rule pt-8">
      <p
        className="flex flex-wrap items-center gap-2 text-base text-primary"
        style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
      >
        Verified companies on Terrain
        <ComingSoonPill />
      </p>
      <p className="mt-2 text-base text-secondary" style={{ fontFamily: "var(--font-body)" }}>
        The companies you’ll buy from appear here at launch.
      </p>
    </div>
  );
}
