// The green "Coming soon" status pill used before launch.
export function ComingSoonPill() {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-[#1a5c38]/10 px-2.5 py-0.5 text-[12px] text-[#1a5c38]"
      style={{ fontWeight: 700 }}
    >
      <span className="size-1.5 rounded-full bg-[#1a5c38]" aria-hidden />
      Coming soon
    </span>
  );
}
