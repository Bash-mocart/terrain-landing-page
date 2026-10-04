import Link from "next/link";
import { getVerifiedCompanies } from "@/lib/company";

const SHOWN = 8;

// Real verified companies, each opening its public page: the proof under
// "Only verified companies can sell". Renders nothing when there are none.
export async function VerifiedCompanies() {
  const companies = (await getVerifiedCompanies()).slice(0, SHOWN);
  if (companies.length === 0) return null;

  return (
    <div id="companies" className="mt-12 border-t border-border-rule pt-8">
      <p className="text-base text-primary" style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}>
        Verified companies on Terrain
      </p>
      <ul className="mt-4 flex flex-wrap gap-3">
        {companies.map((c) => (
          <li key={c.id}>
            <Link
              href={`/company/${encodeURIComponent(c.id)}`}
              className="flex items-center gap-3 rounded-full border border-border-rule bg-white py-2 pl-2 pr-5 transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verified"
            >
              <Logo url={c.logo_url} name={c.name} />
              <span className="min-w-0">
                <span
                  className="flex items-center gap-1.5 text-[15px] text-primary"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
                >
                  <span className="max-w-[16rem] truncate">{c.name}</span>
                  <GoldCheck />
                </span>
                {c.count_label && (
                  <span className="block text-[13px] text-secondary" style={{ fontFamily: "var(--font-body)" }}>
                    {c.count_label}
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Logo({ url, name }: { url: string; name: string }) {
  const valid = /^https?:\/\//.test(url);
  return (
    <span
      className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-border-rule bg-cover bg-center text-sm font-bold text-primary"
      style={valid ? { backgroundImage: `url(${JSON.stringify(url)})` } : undefined}
      role={valid ? "img" : undefined}
      aria-label={valid ? `${name} logo` : undefined}
    >
      {!valid && name.charAt(0).toUpperCase()}
    </span>
  );
}

function GoldCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-label="Verified" role="img" className="shrink-0">
      <path
        fill="#B8860B"
        d="M12 1.5l2.6 2.1 3.3-.4.9 3.2 2.9 1.7-1.1 3.1 1.1 3.1-2.9 1.7-.9 3.2-3.3-.4L12 22.5l-2.6-2.1-3.3.4-.9-3.2-2.9-1.7 1.1-3.1-1.1-3.1 2.9-1.7.9-3.2 3.3.4z"
      />
      <path d="M8 12.3l2.7 2.7L16.2 9.5" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
