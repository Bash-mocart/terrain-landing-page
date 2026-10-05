import Link from "next/link";
import { TopNav } from "./TopNav";
import { Footer } from "./Footer";

// Shared shell for the Privacy policy and Terms: the site nav, a readable
// single column, and the footer. Body copy is styled here once so each page
// is just headings and paragraphs.
export function LegalPage({
  title,
  lede,
  children,
}: {
  title: string;
  lede: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav />
      <main className="bg-canvas pb-20 pt-32 sm:pb-28 sm:pt-40">
        <article
          className="mx-auto max-w-[44rem] px-6 text-base leading-relaxed text-primary sm:px-10 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-verified [&_h2]:mt-12 [&_h2]:text-[28px] [&_h2]:leading-tight [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_li]:mt-2 [&_p]:mt-4 [&_strong]:font-bold [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <h1
            className="text-[clamp(40px,7vw,64px)] leading-[1] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          >
            {title}
          </h1>
          <p className="text-lg text-secondary">{lede}</p>
          {children}
          <p className="border-t border-border-rule pt-6 text-sm text-secondary !mt-16">
            See also our <Link href="/privacy">Privacy policy</Link> and{" "}
            <Link href="/terms">Terms</Link>.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}

// Section headings use the display face, like the rest of the site.
export function LegalHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
      {children}
    </h2>
  );
}
