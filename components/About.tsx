import SquashBallCanvas from "./SquashBallCanvas";
import { PILLARS, PRESS_OUTLETS } from "@/lib/content";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden px-6 py-24 md:px-12 lg:px-20 lg:py-32"
    >
      {/* Section-scoped purple wash, subtle */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 60% at 80% 20%,
              hsl(262 52% 32% / 0.45) 0%,
              transparent 70%
            ),
            radial-gradient(
              ellipse 60% 70% at 10% 80%,
              hsl(292 70% 28% / 0.35) 0%,
              transparent 65%
            )
          `,
        }}
      />

      {/* Ambient balls — sparse, edge-hugging */}
      <SquashBallCanvas
        balls={[
          { size: 200, position: "top-[-40px] right-[6%]",   animation: "animate-ball-1", speed: "pro", depth: "back" },
          { size: 140, position: "top-[28%] right-[32%]",    animation: "animate-ball-2", speed: "competition", depth: "back", delay: "-3s" },
          { size: 90,  position: "bottom-[14%] left-[8%]",   animation: "animate-ball-3", speed: "junior", depth: "mid", delay: "-2s" },
          { size: 120, position: "bottom-[-30px] left-[32%]",animation: "animate-ball-4", speed: "training", depth: "back", delay: "-5s" },
        ]}
      />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* LEFT: mission statement */}
          <div className="lg:col-span-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-mint/70" />
              <span className="eyebrow">The mission</span>
            </div>

            <h2
              id="about-heading"
              className="font-display uppercase text-fg"
              style={{
                fontSize: "var(--text-step-4)",
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: "-0.005em",
              }}
            >
              Squash is the vehicle.{" "}
              <span className="font-editorial italic text-mint" style={{ fontWeight: 500 }}>
                The kids
              </span>{" "}
              are the destination.
            </h2>

            <p
              className="mt-8 max-w-[560px] font-editorial italic text-fg/75 leading-relaxed"
              style={{ fontSize: "var(--text-step-1)" }}
            >
              Founded in 2013 by national champion{" "}
              <strong className="text-fg">Shabana Khan</strong>, YSK Events is a
              501(c)(3) nonprofit harnessing the power of squash to build focus,
              resilience, and opportunity for young people across the Pacific
              Northwest.
            </p>

            <p className="mt-5 max-w-[560px] text-fg/70 leading-relaxed">
              Squash is making its Olympic debut at LA28. We&rsquo;re building
              the pipeline to get Pacific Northwest youth there — and preparing
              them for life beyond the court.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#programs"
                className="group inline-flex items-center gap-2 rounded-md border border-border-strong bg-fg/5 px-7 py-3.5 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-fg transition-all duration-base ease-[var(--ease-out-expo)] hover:bg-fg/10"
              >
                See our programs
                <span
                  aria-hidden="true"
                  className="transition-transform duration-base ease-[var(--ease-spring)] group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href="#donate"
                className="group inline-flex items-center gap-2 rounded-md bg-mint px-7 py-3.5 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-mint-ink transition-all duration-base ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow-mint)]"
              >
                Fund a scholar
                <span
                  aria-hidden="true"
                  className="transition-transform duration-base ease-[var(--ease-spring)] group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </div>

          {/* RIGHT: credibility card + pillars */}
          <div className="space-y-5 lg:col-span-5">
            {/* Press credibility */}
            <article
              className="glass rounded-lg p-7 md:p-8"
              style={{ borderLeft: "2px solid hsl(var(--color-gold))" }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="eyebrow !text-gold">As featured in</span>
                <span className="eyebrow !text-fg-faint">Press</span>
              </div>
              <ul className="mb-6 flex flex-wrap gap-x-5 gap-y-2">
                {PRESS_OUTLETS.map((outlet) => (
                  <li
                    key={outlet}
                    className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-fg/60"
                  >
                    {outlet}
                  </li>
                ))}
              </ul>
              <div className="mb-5 h-px bg-border" />
              <blockquote>
                <p
                  className="font-editorial italic text-fg/80 leading-relaxed"
                  style={{ fontSize: "var(--text-step-1)" }}
                >
                  &ldquo;What the Andretti family is to auto racing, the local
                  Khan family is to squash. There have been seven Khans ranked
                  No.&nbsp;1 in the world.&rdquo;
                </p>
                <footer className="eyebrow mt-3 !text-fg-faint">
                  — The Seattle Times
                </footer>
              </blockquote>
            </article>

            {/* Pillars */}
            <ol className="space-y-3">
              {PILLARS.map((p) => (
                <li
                  key={p.num}
                  className="group flex items-start gap-5 rounded-md border border-border bg-fg/[0.04] p-5 transition-all duration-base ease-[var(--ease-out-expo)] hover:border-mint/40 hover:bg-fg/[0.08]"
                >
                  <span
                    className="flex-shrink-0 font-display text-mint leading-none transition-transform duration-base group-hover:scale-110"
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {p.num}
                  </span>
                  <div>
                    <h3
                      className="mb-1 font-display uppercase text-fg"
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-fg/65">
                      {p.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
