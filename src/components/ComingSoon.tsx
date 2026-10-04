import Link from "next/link";
import { StoreButtons } from "@/components/StoreButtons";

// Shown where listings will live (/browse, /explore) until launch.
export function ComingSoon() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-canvas px-6 py-16">
      <div className="max-w-md text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full bg-verified px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white"
          style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
        >
          <span className="size-1.5 rounded-full bg-white" aria-hidden />
          Coming soon
        </span>
        <h1
          className="mt-5 text-4xl leading-tight tracking-tight text-primary"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          Verified listings are almost here.
        </h1>
        <p
          className="mt-4 leading-relaxed text-secondary"
          style={{ fontFamily: "var(--font-body)" }}
        >
          We check every company and every plot before it goes live. Get the
          app to see them first.
        </p>
        <div className="mt-8 flex justify-center [&>div]:justify-center">
          <StoreButtons />
        </div>
        <Link href="/" className="mt-6 inline-block text-sm font-semibold text-verified">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
