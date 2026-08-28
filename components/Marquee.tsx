import { MARQUEE_ITEMS } from "@/lib/content";

/** Thin ink band with rolling gold event facts — an editorial ticker. */
export default function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-border bg-ink-2 py-3.5"
    >
      <div className="animate-marquee flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {MARQUEE_ITEMS.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center gap-8 pr-8 font-sans text-[10.5px] font-semibold uppercase tracking-[0.28em] text-gold-bright"
              >
                {item}
                <span className="text-gold-bright/50">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
