// Placeholder landing skeleton. Proves the Zain + Nunito + Inter font
// stack and the Warm Canvas + Forest Verification palette are wired
// correctly. Replaced once the Figma node 2621-275305 lands.

export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p
          className="text-xs uppercase tracking-[0.18em] text-secondary mb-6"
          style={{ fontFamily: "var(--font-interactive)" }}
        >
          Coming soon
        </p>
        <h1
          className="text-6xl md:text-7xl leading-[0.95] tracking-tight text-primary mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Terrain
        </h1>
        <p
          className="text-lg leading-relaxed text-secondary"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Verified land and property records, validated on the ground by a
          Terrain reviewer before they reach you.
        </p>
        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-verified">
          <span className="inline-block w-2 h-2 rounded-full bg-verified" />
          <span
            className="uppercase tracking-[0.16em]"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            Build in progress
          </span>
        </div>
      </div>
    </main>
  );
}
