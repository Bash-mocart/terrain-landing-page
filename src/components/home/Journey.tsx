import Image from "next/image";

// Your journey: a buyer far from home, from finding a property to owning it,
// following the app's deal steps (message, offer letter, pay, recorded).
// The optional lawyer + surveyor check stays off the site until the owner
// has agreed its terms. The sequence is the content, so
// the chapters are numbered. Photos are real (Unsplash, provenance embedded
// in each file); the people in them are not presented as customers.
const CHAPTERS = [
  {
    photo: "/photos/plot.webp",
    alt: "Marked-out estate plots and a new road, seen from above",
    title: "Far from home, you find the right property.",
    body: "Browse land and homes across Nigeria from your phone, wherever you are.",
  },
  {
    photo: "/photos/message.webp",
    alt: "Two people reading a message on a phone together",
    position: "60% 25%",
    title: "You message a verified company.",
    body: "Every company on Terrain is CAC-registered and checked before it can list. Your chat stays in Terrain, and nothing in it can be edited or deleted.",
  },
  {
    photo: "/photos/sign.webp",
    alt: "A hand signing paperwork at a desk",
    title: "You both sign the offer letter.",
    body: "The company sends the offer letter in your chat. You sign it before any money moves.",
  },
  {
    photo: "/photos/site.webp",
    alt: "A half-built house on a marked-out plot, seen from above",
    title: "You pay the company, as agreed.",
    body: "Straight to the company, in instalments if they offer them. Terrain never holds your money.",
  },
  {
    photo: "/photos/home.webp",
    alt: "Finished homes with green roofs along an estate road",
    title: "Every document stays on record.",
    body: "The offer letter, receipts and documents stay in your chat, protecting both sides. It’s yours.",
  },
] as const;

export function Journey() {
  return (
    <section id="how-it-works" aria-labelledby="journey-title" className="bg-canvas pb-16 pt-4 sm:pb-24 sm:pt-6">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-10">
        <h2
          id="journey-title"
          className="max-w-xl text-[clamp(32px,5vw,52px)] leading-[1] tracking-[-0.02em] text-primary"
          style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
        >
          Buy property in Nigeria without flying home.
        </h2>
        <ol className="mt-10 space-y-12 sm:mt-12 sm:space-y-20">
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
                  style={"position" in c ? { objectPosition: c.position } : undefined}
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
