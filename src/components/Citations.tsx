import Image from "next/image";

// Citations. Replaces the photo-card testimonials with a Warm Canvas
// list of quotes separated by hairlines. Each row: small circular
// portrait + typeset quote + attribution (name, role, city) carrying
// a small Forest Verification check. Treated as citations on a public
// record, not as marketing cards. No photo backgrounds, no gradient
// overlays, no section-wide accent wash.
type Citation = {
  name: string;
  role: string;
  city: string;
  quote: string;
  portrait: string;
};

const CITATIONS: Citation[] = [
  {
    name: "Adewale Okafor",
    role: "Buyer",
    city: "Abuja",
    quote:
      "I was skeptical at first. Buying land remotely felt risky. Terrain's escrow held my funds until I physically confirmed the beacons matched the survey plan. First time I felt safe doing this.",
    portrait: "/figma/testimonial-1.png",
  },
  {
    name: "Chidi Eze",
    role: "Seller",
    city: "Abuja",
    quote:
      "I listed a plot on a Thursday. The reviewer came on Friday. By the next Saturday I had a verified buyer, and the title transfer was done in 12 days.",
    portrait: "/figma/testimonial-2.png",
  },
  {
    name: "Fatima Ibrahim",
    role: "Repeat buyer",
    city: "Port Harcourt",
    quote:
      "The C of O verification and KYC process gives me confidence that every listing is legitimate. I've completed three purchases through Terrain and I won't go back to the old way.",
    portrait: "/figma/testimonial-3.png",
  },
];

export function Citations() {
  return (
    <section className="border-b border-[#ebebeb]">
      <div className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 lg:py-32">
        <div className="flex flex-col gap-4">
          <p
            className="text-[11px] uppercase tracking-[0.18em] text-[#090503]"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            <span className="tabular-nums">04</span>
            <span aria-hidden> &nbsp;·&nbsp; </span>
            Citations
          </p>
          <span className="block h-px w-full bg-[#ebebeb]" aria-hidden />
        </div>
        <p
          className="mt-6 max-w-[60ch] text-base leading-relaxed text-[#717171]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          What buyers and sellers said after closing. Each citation reviewed
          before the transaction released from escrow.
        </p>
        <ul className="mt-12 flex flex-col">
          {CITATIONS.map((c, i) => (
            <li
              key={c.name}
              className={`grid grid-cols-12 gap-6 py-10 lg:gap-12 ${i > 0 ? "border-t border-[#ebebeb]" : ""}`}
            >
              <div className="col-span-12 flex items-start gap-4 lg:col-span-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#ebebeb] bg-[#fdfcfb]">
                  <Image
                    src={c.portrait}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p
                    className="text-base leading-tight text-[#090503]"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 700,
                    }}
                  >
                    {c.name}
                  </p>
                  <p
                    className="mt-1 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-[#717171]"
                    style={{ fontFamily: "var(--font-interactive)" }}
                  >
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rounded-full bg-[#4a7c59]"
                    />
                    Verified {c.role.toLowerCase()}
                    <span aria-hidden> · </span>
                    {c.city}
                  </p>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-9">
                <blockquote
                  className="max-w-[62ch] text-lg leading-relaxed text-[#090503]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {c.quote}
                </blockquote>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
