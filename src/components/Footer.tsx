// Footer. Three typeset lines: entity name (real registry trust signal),
// contact email, copyright year. No nav columns, no social icons, no
// "Built in Lagos" pose. The hairline above terminates the document.
export function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-[1200px] px-6 py-10 sm:px-10">
        <div
          className="grid grid-cols-1 gap-4 text-[11px] uppercase tracking-[0.16em] text-[#717171] sm:grid-cols-3 sm:items-center"
          style={{ fontFamily: "var(--font-interactive)" }}
        >
          <p>Terrain Technologies Ltd. · RC pending</p>
          <p className="sm:text-center">
            <a
              href="mailto:support@terrain.ng"
              className="hover:text-[#090503]"
            >
              support@terrain.ng
            </a>
          </p>
          <p className="sm:text-right">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
