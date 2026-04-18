import SquashBallCanvas from "./SquashBallCanvas";
import { PROGRAMS, PROGRAM_STATS, type Program } from "@/lib/content";
import { cn } from "@/lib/utils";

const ACCENT_BG: Record<Program["accent"], string> = {
  mint: "bg-mint text-mint-ink",
  coral: "bg-coral text-ink",
  sun: "bg-sun text-ink",
};

function ProgramCard({ p }: { p: Program }) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border bg-fg/[0.04] p-7 transition-all duration-base ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:bg-fg/[0.08]",
        p.featured
          ? "border-border-strong bg-fg/[0.07]"
          : "border-border hover:border-mint/40",
      )}
    >
      {/* Top accent */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-[2px] origin-left transition-transform duration-slow ease-[var(--ease-out-expo)]",
          p.accent === "mint" && "bg-gradient-to-r from-mint to-mint/30",
          p.accent === "coral" && "bg-gradient-to-r from-coral to-coral/30",
          p.accent === "sun" && "bg-gradient-to-r from-sun to-sun/30",
          p.featured ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />

      {/* Tag + status */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "rounded-full px-2.5 py-[3px] font-sans text-[9px] font-bold uppercase tracking-[0.2em]",
            ACCENT_BG[p.accent],
          )}
        >
          {p.tag}
        </span>
        {p.status && (
          <span className="rounded-full border border-border bg-fg/5 px-2.5 py-[3px] font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-fg-faint">
            {p.status}
          </span>
        )}
      </div>

      <h3
        className="mb-1 font-display uppercase text-fg"
        style={{
          fontSize: "1.3rem",
          fontWeight: 700,
          letterSpacing: "0.01em",
          lineHeight: 1,
        }}
      >
        {p.name}
      </h3>
      <p className="mb-4 font-editorial italic text-fg/55" style={{ fontSize: "0.95rem" }}>
        {p.headline}
      </p>
      <p className="mb-6 flex-1 text-[13.5px] leading-relaxed text-fg/70">
        {p.desc}
      </p>

      <a
        href="#contact"
        className="group/cta inline-flex items-center gap-1.5 self-start font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-mint transition-colors duration-base hover:text-fg"
      >
        {p.cta}
        <span
          aria-hidden="true"
          className="transition-transform duration-base ease-[var(--ease-spring)] group-hover/cta:translate-x-1"
        >
          →
        </span>
      </a>
    </article>
  );
}

export default function Programs() {
  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="relative overflow-hidden px-6 py-24 md:px-12 lg:px-20 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 70% 50% at 90% 10%,
              hsl(292 70% 28% / 0.4) 0%,
              transparent 65%
            ),
            radial-gradient(
              ellipse 60% 70% at 5% 90%,
              hsl(262 52% 32% / 0.35) 0%,
              transparent 65%
            )
          `,
        }}
      />
      <SquashBallCanvas
        balls={[
          { size: 180, position: "top-[-40px] left-[8%]",     animation: "animate-ball-3", speed: "pro", depth: "back" },
          { size: 130, position: "top-[30%] right-[4%]",      animation: "animate-ball-1", speed: "competition", depth: "mid", delay: "-3s" },
          { size: 90,  position: "bottom-[8%] left-[22%]",    animation: "animate-ball-4", speed: "progress", depth: "back", delay: "-5s" },
          { size: 110, position: "bottom-[-20px] right-[18%]",animation: "animate-ball-2", speed: "junior", depth: "mid", delay: "-1s" },
        ]}
      />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        <header className="mx-auto mb-14 max-w-[720px] text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-mint/70" />
            <span className="eyebrow">Programs</span>
            <span className="h-px w-8 bg-mint/70" />
          </div>
          <h2
            id="programs-heading"
            className="font-display uppercase text-fg"
            style={{
              fontSize: "var(--text-step-4)",
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: "-0.005em",
            }}
          >
            Six programs.{" "}
            <span className="font-editorial italic text-mint" style={{ fontWeight: 500 }}>
              One
            </span>{" "}
            mission.
          </h2>
          <p className="mt-6 text-fg/78 leading-relaxed">
            Built on 12+ years of proven youth development, led by the Khan
            dynasty. We develop focus, resilience, and confidence — on and off
            the court.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p) => (
            <ProgramCard key={p.name} p={p} />
          ))}
        </div>

        {/* Stats strip — posterized */}
        <div className="mt-14 overflow-hidden rounded-lg border border-border">
          <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
            {PROGRAM_STATS.map((s) => (
              <div key={s.label} className="group cursor-default bg-ink-3 p-7 text-center transition-colors duration-base hover:bg-fg/[0.07]">
                <div
                  className="font-display text-fg leading-none transition-colors duration-base group-hover:text-mint"
                  style={{
                    fontSize: "clamp(2.5rem, 1.8rem + 2vw, 3.5rem)",
                    fontWeight: 700,
                    letterSpacing: "0.01em",
                  }}
                >
                  {s.big}
                </div>
                <div className="mt-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-fg-faint">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
