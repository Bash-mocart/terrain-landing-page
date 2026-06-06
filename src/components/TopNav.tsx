import Link from "next/link";

// Floating top navigation. Stays at the top of the viewport on the
// hero (no scroll-shadow chrome yet — the design's nav sits cleanly
// over the satellite map). Wordmark left, primary CTA right, sparse
// in the middle so the hero copy below carries the arrival weight.
export function TopNav() {
  return (
    <nav
      className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-10 py-6"
      aria-label="Primary"
    >
      <Link
        href="/"
        className="text-2xl tracking-tight text-primary"
        style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
      >
        TERRAIN
      </Link>
      <div
        className="hidden md:flex items-center gap-8 text-sm text-primary"
        style={{ fontFamily: "var(--font-interactive)" }}
      >
        <Link href="#how-it-works" className="hover:text-verified transition-colors">
          How it Works
        </Link>
        <Link href="#listings" className="hover:text-verified transition-colors">
          Available Plots
        </Link>
        <Link href="#testimonials" className="hover:text-verified transition-colors">
          Trust
        </Link>
      </div>
      <Link
        href="#download"
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-canvas text-sm transition-opacity hover:opacity-90"
        style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
      >
        Get Started
      </Link>
    </nav>
  );
}
