import Link from "next/link";

type Props = { page: number; total: number; pageSize: number; searchParams: Record<string, string> };

export function BrowsePagination({ page, total, pageSize, searchParams }: Props) {
  const pages = Math.ceil(total / pageSize);
  if (pages <= 1) return null;
  const href = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (nextPage > 1) params.set("page", String(nextPage));
    else params.delete("page");
    return `/browse?${params.toString()}`;
  };
  return <nav aria-label="Browse pages" className="mt-8 flex items-center justify-between gap-4">
    {page > 1 ? <Link href={href(page - 1)} className="rounded-full border border-border-rule px-4 py-2.5 text-sm font-semibold text-primary">Previous</Link> : <span />}
    <p className="text-sm text-secondary">Page {page} of {pages}</p>
    {page < pages ? <Link href={href(page + 1)} className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-canvas">Next</Link> : <span />}
  </nav>;
}
