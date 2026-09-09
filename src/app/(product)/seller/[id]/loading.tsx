export default function SellerLoading() {
  return (
    <main className="bg-canvas" aria-busy="true" aria-label="Loading seller">
      <div className="mx-auto max-w-[1280px] px-6 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div className="h-5 w-40 animate-pulse rounded bg-border-rule/70" />
        <div className="mt-6 min-h-44 animate-pulse rounded-3xl bg-border-rule/60" />
        <div className="mt-12 h-10 w-64 animate-pulse rounded bg-border-rule/70" />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="overflow-hidden rounded-3xl border border-border-rule bg-white">
              <div className="aspect-[4/3] animate-pulse bg-border-rule/70" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-2/5 animate-pulse rounded bg-border-rule/70" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-border-rule/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
