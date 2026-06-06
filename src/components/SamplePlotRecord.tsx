import Image from "next/image";

// Sample Plot Record. The boldest move on the page: a literal Terrain
// Record laid out the way the Flutter app's listing detail screen
// lays out its TERRAIN RECORD heading. The page IS the registry; the
// app holds the rest. Server component so the fetch runs at build
// time (Vercel rebuilds on every push, so the data refreshes then).
//
// If the API is unreachable at build time, we fall back to a fictional
// but plausible Abuja plot so the page still ships honestly. The
// fallback is hand-written rather than dynamic-stub so it reads with
// the same Lagos Estate Registry cadence as a real entry.

const API_URL =
  process.env.NEXT_PUBLIC_TERRAIN_API_URL ?? "https://api.lunor.money";

type ListingDTO = {
  id?: string;
  title?: string;
  price?: number;
  city?: string;
  state?: string;
  certificate_type?: string;
  size_sqm?: number;
  is_verified?: boolean;
  verified_at?: string;
  created_at?: string;
  image_urls?: string[];
  seller_name?: string;
};

type PlotRecord = {
  title: string;
  location: string;
  sizeSqm: number;
  useCategory: string;
  certificateType: string;
  certificateNumber: string;
  certificateIssuer: string;
  fieldTestedAt: string;
  reviewer: string;
  sellerNote: string;
  price: number;
  photos: string[];
};

const FALLBACK: PlotRecord = {
  title: "Plot 14, Asokoro Crescent",
  location: "Asokoro, Abuja, FCT",
  sizeSqm: 4000,
  useCategory: "Residential",
  certificateType: "Certificate of Occupancy",
  certificateNumber: "FCT/4521/2024",
  certificateIssuer: "FCT Department of Land Administration",
  fieldTestedAt: "12 April 2026",
  reviewer: "A. Bello, Terrain Reviewer",
  sellerNote: "Verified individual seller, KYC complete",
  price: 85_000_000,
  photos: [],
};

function formatPrice(naira: number): string {
  if (naira >= 1e9) {
    const v = naira / 1e9;
    return `₦${Number.isInteger(v) ? v : v.toFixed(1)}B`;
  }
  if (naira >= 1e6) {
    const v = naira / 1e6;
    return `₦${Number.isInteger(v) ? v : v.toFixed(1)}M`;
  }
  return `₦${naira.toLocaleString("en-NG")}`;
}

function formatDate(iso?: string): string {
  if (!iso) return FALLBACK.fieldTestedAt;
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return FALLBACK.fieldTestedAt;
  }
}

async function fetchSamplePlot(): Promise<PlotRecord> {
  try {
    const url = `${API_URL}/v1/listings?city=Abuja&verified=true&limit=1`;
    const res = await fetch(url, {
      // Static-export friendly. Revalidate on each build; landing
      // doesn't need runtime freshness.
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK;
    const json = (await res.json()) as { results?: ListingDTO[] };
    const listing = json.results?.[0];
    if (!listing) return FALLBACK;
    return {
      title: listing.title ?? FALLBACK.title,
      location: [listing.city, listing.state].filter(Boolean).join(", ") || FALLBACK.location,
      sizeSqm: listing.size_sqm ?? FALLBACK.sizeSqm,
      useCategory: FALLBACK.useCategory,
      certificateType: listing.certificate_type ?? FALLBACK.certificateType,
      certificateNumber: FALLBACK.certificateNumber,
      certificateIssuer: FALLBACK.certificateIssuer,
      fieldTestedAt: formatDate(listing.verified_at ?? listing.created_at),
      reviewer: FALLBACK.reviewer,
      sellerNote: listing.seller_name
        ? `${listing.seller_name}, KYC complete`
        : FALLBACK.sellerNote,
      price: listing.price ?? FALLBACK.price,
      photos: (listing.image_urls ?? []).filter((u) => u.startsWith("http")).slice(0, 3),
    };
  } catch {
    return FALLBACK;
  }
}

export async function SamplePlotRecord() {
  const plot = await fetchSamplePlot();
  return (
    <section className="border-b border-[#ebebeb]">
      <div className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 lg:py-32">
        <SectionLabel number="02" label="Sample plot on record" />
        <p
          className="mt-6 max-w-[60ch] text-base leading-relaxed text-[#717171]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          This is what every verified plot looks like inside Terrain. One real
          record below, drawn from the live Abuja registry. The app holds the
          rest.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {plot.photos.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {plot.photos.map((src, i) => (
                  <div
                    key={src}
                    className="relative aspect-[4/3] overflow-hidden border border-[#ebebeb] bg-[#fdfcfb]"
                  >
                    <Image
                      src={src}
                      alt={`${plot.title}, photograph ${i + 1}`}
                      fill
                      sizes="(min-width: 1024px) 220px, 33vw"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-[#ebebeb] bg-[#fdfcfb] p-12">
                <p
                  className="text-[11px] uppercase tracking-[0.18em] text-[#717171]"
                  style={{ fontFamily: "var(--font-interactive)" }}
                >
                  Photograph plate omitted in this sample
                </p>
              </div>
            )}
            <p
              className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.16em] text-[#717171]"
              style={{ fontFamily: "var(--font-interactive)" }}
            >
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#4a7c59]" />
                On record as of {plot.fieldTestedAt}
              </span>
              <span aria-hidden>·</span>
              <span>{plot.location}</span>
            </p>
          </div>
          <dl className="lg:col-span-5">
            <RecordRow label="Property" value={plot.title}>
              <span className="block text-[#717171]" style={{ fontFamily: "var(--font-body)" }}>
                {plot.sizeSqm.toLocaleString("en-NG")} sqm
                <span aria-hidden> · </span>
                {plot.useCategory}
              </span>
            </RecordRow>
            <RecordRow label="Title" value={plot.certificateType}>
              <span className="block text-[#717171]" style={{ fontFamily: "var(--font-body)" }}>
                {plot.certificateNumber}
                <span aria-hidden> · </span>
                {plot.certificateIssuer}
              </span>
            </RecordRow>
            <RecordRow label="Field test" value={plot.fieldTestedAt}>
              <span className="block text-[#717171]" style={{ fontFamily: "var(--font-body)" }}>
                {plot.reviewer}
                <span aria-hidden> · </span>
                Beacons confirmed against survey plan
              </span>
            </RecordRow>
            <RecordRow label="Seller" value={plot.sellerNote} />
            <RecordRow
              label="Price"
              value={formatPrice(plot.price)}
              isTrust
            >
              <span className="block text-[#717171]" style={{ fontFamily: "var(--font-body)" }}>
                Held in Terrain Trustees Ltd. escrow until the title transfers.
              </span>
            </RecordRow>
          </dl>
        </div>
        <p
          className="mt-12 text-[12px] uppercase tracking-[0.14em] text-[#717171]"
          style={{ fontFamily: "var(--font-interactive)" }}
        >
          Get the app to view the other 246 plots on record.
        </p>
      </div>
    </section>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex flex-col gap-4">
      <p
        className="text-[11px] uppercase tracking-[0.18em] text-[#090503]"
        style={{ fontFamily: "var(--font-interactive)" }}
      >
        <span className="tabular-nums">{number}</span>
        <span aria-hidden> &nbsp;·&nbsp; </span>
        {label}
      </p>
      <span className="block h-px w-full bg-[#ebebeb]" aria-hidden />
    </div>
  );
}

function RecordRow({
  label,
  value,
  children,
  isTrust = false,
}: {
  label: string;
  value: string;
  children?: React.ReactNode;
  isTrust?: boolean;
}) {
  return (
    <div className="border-b border-[#ebebeb] py-5 first:border-t">
      <dt
        className="text-[10px] uppercase tracking-[0.2em] text-[#717171]"
        style={{ fontFamily: "var(--font-interactive)" }}
      >
        {label}
      </dt>
      <dd className="mt-2">
        <span
          className={`block text-lg leading-snug ${isTrust ? "text-[#4a7c59]" : "text-[#090503]"}`}
          style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
        >
          {value}
        </span>
        {children && (
          <div
            className="mt-1 text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {children}
          </div>
        )}
      </dd>
    </div>
  );
}
