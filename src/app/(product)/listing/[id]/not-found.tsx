import Link from "next/link";

export default function ListingNotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-canvas px-6">
      <div className="max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-verified">
          Property not found
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-primary">
          This listing is no longer available.
        </h1>
        <Link
          href="/browse"
          className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-canvas"
        >
          Browse properties
        </Link>
      </div>
    </main>
  );
}
