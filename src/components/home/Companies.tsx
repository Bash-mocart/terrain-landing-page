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
        <span
          className="inline-flex items-center gap-1.5 rounded-full bg-[#1a5c38]/10 px-2.5 py-0.5 text-[12px] text-[#1a5c38]"
          style={{ fontWeight: 700 }}
        >
          <span className="size-1.5 rounded-full bg-[#1a5c38]" aria-hidden />
          Coming soon
        </span>
      </p>
      <p className="mt-2 text-base text-secondary" style={{ fontFamily: "var(--font-body)" }}>
        The companies you’ll buy from appear here at launch.
      </p>
    </div>
  );
}
