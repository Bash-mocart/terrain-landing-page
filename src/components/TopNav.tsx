import Link from "next/link";

// Floating top navigation. Wordmark + sparse anchor links only. The
// "Get Started" pill was dropped because the hero already shows App
// Store + Google Play CTAs; a third install path competed for the
// click without earning conversion. The nav is now purely navigation.
export function TopNav() {
  return (
    <nav
      id="top"
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
          Customers
        </Link>
      </div>
      {/* Spacer to balance the right side so the anchor links stay
         centred relative to the wordmark. Matches the wordmark's
         approximate width. */}
      <span aria-hidden className="w-[112px]" />
    </nav>
  );
}
