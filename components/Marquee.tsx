import { MARQUEE_ITEMS } from "@/lib/content";

export default function Marquee() {
  return (
    <div
      className="relative z-10 overflow-hidden border-y border-border-strong"
      style={{
        background: "hsl(264 65% 12% / 0.6)",
      }}
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap animate-marquee py-4">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-7 px-7 font-sans text-sm font-semibold uppercase text-fg/85"
            style={{ letterSpacing: "0.28em" }}
          >
            {t}
            {/* squash ball divider — mint dot inside dark circle */}
            <span
              aria-hidden="true"
              className="inline-flex h-3 w-3 items-center justify-center rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 28%, hsl(0 0% 14%), hsl(0 0% 3%))",
                boxShadow: "inset 0 0 4px hsl(0 0% 0% / 0.8)",
              }}
            >
              <span
                className="h-[3px] w-[3px] rounded-full bg-mint"
                style={{ boxShadow: "0 0 4px hsl(152 72% 70%)" }}
              />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
