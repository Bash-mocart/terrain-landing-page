import Image from "next/image";

// Her journey: one buyer, far from home, from finding a plot to owning it,
// with Terrain's checks inside the story. The sequence is the content, so
// the chapters are numbered. Photos are real (Unsplash, provenance embedded
// in each file); the people in them are not presented as customers.
const CHAPTERS = [
  {
    photo: "/photos/finds.webp",
    alt: "Hands holding a phone above a laptop",
    title: "Far from home, she finds a plot.",
    body: "She browses checked land and homes in Abuja from her phone, wherever she is.",
  },
  {
    photo: "/photos/messages.webp",
    alt: "A man at an office desk taking a call",
    title: "She messages a verified company.",
    body: "Every company on Terrain is CAC-registered and checked before it can list. The chat stays in Terrain, and nothing in it can be edited or deleted.",
  },
  {
    photo: "/photos/checks.webp",
    alt: "A surveyor working with a total station on cleared land",
    title: "Terrain checks the title and the land.",
    body: "Title documents and survey boundaries are checked before she commits.",
  },
  {
    photo: "/photos/pays.webp",
    alt: "A woman at home using a laptop",
    title: "She pays the company, as agreed.",
    body: "Straight to the company, in instalments if they offer them. Terrain never holds her money.",
  },
  {
    photo: "/photos/hers.webp",
    alt: "Rooftops of a neighbourhood with hills behind",
    title: "Terrain keeps watch. It’s hers.",
    body: "The offer letter, receipts and documents stay on record in the chat, and the sale is recorded at the registry.",
  },
] as const;

export function Journey() {
  return (
    <section id="how-it-works" aria-labelledby="journey-title" className="bg-canvas py-16 sm:py-24">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-10">
        <h2
          id="journey-title"
          className="max-w-xl text-[clamp(32px,5vw,52px)] leading-[1] tracking-[-0.02em] text-primary"
          style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
        >
          How she bought land in Abuja without flying home.
        </h2>
        <ol className="mt-12 space-y-12 sm:mt-16 sm:space-y-20">
          {CHAPTERS.map((c, i) => (
            <li
              key={c.photo}
              className="terrain-chapter grid gap-5 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-10 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]"
            >
              <div className="sm:pt-6">
                <span
                  className="terrain-chapter-num block text-2xl text-[#1a5c38]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="mt-3 text-[26px] leading-[1.1] text-primary sm:text-[28px]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
                >
                  <span className="sr-only">Step {i + 1}: </span>
                  {c.title}
                </h3>
                <p
                  className="mt-3 max-w-[34ch] text-base leading-relaxed text-secondary"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {c.body}
                </p>
              </div>
              <div className="terrain-chapter-photo relative aspect-[16/10] overflow-hidden rounded-3xl bg-border-rule sm:aspect-[16/7]">
                <Image
                  src={c.photo}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 1240px) 900px, (min-width: 640px) 70vw, 100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
