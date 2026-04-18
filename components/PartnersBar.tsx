import { PARTNERS } from "@/lib/content";

export default function PartnersBar() {
  return (
    <section
      aria-labelledby="partners-heading"
      className="relative z-10 border-y border-border bg-fg/[0.03] px-6 py-14 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-border-strong" />
          <p
            id="partners-heading"
            className="eyebrow !text-fg-faint"
          >
            Trusted by &amp; partnered with
          </p>
          <span className="h-px w-8 bg-border-strong" />
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {PARTNERS.map((p) => (
            <li
              key={p.name}
              className="flex flex-col items-center gap-1.5 text-center transition-opacity duration-base hover:opacity-100"
              style={{ opacity: 0.72 }}
            >
              <span
                className="font-display uppercase text-fg"
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                }}
              >
                {p.name}
              </span>
              <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-fg-faint">
                {p.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
