export default function ListingLoading() {
  return (
    <main className="bg-canvas" aria-busy="true" aria-label="Loading listing">
      <div className="mx-auto max-w-[1280px] px-6 py-8 sm:px-8 sm:py-12 lg:px-10">
        <div className="h-5 w-40 animate-pulse rounded bg-border-rule/70" />
        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
          <div className="min-h-[460px] animate-pulse rounded-3xl bg-border-rule/70" />
          <div className="min-h-[360px] animate-pulse rounded-3xl bg-border-rule/60" />
        </div>
      </div>
    </main>
  );
}
