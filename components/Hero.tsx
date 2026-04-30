import HeroVideo from "./HeroVideo";
import SquashBallCanvas from "./SquashBallCanvas";
import SignatureBall from "./SignatureBall";
import NowPlaying from "./NowPlaying";

const STATS = [
  { value: "3", label: "Generations" },
  { value: "7", label: "World #1s" },
  { value: "LA28", label: "Olympic debut" },
  { value: "10K+", label: "Youth served" },
] as const;

export default function Hero() {
  return (
    <section
      id="home"
      className="film-grain relative flex min-h-[100svh] flex-col overflow-hidden px-6 pt-24 pb-10 md:px-12 lg:px-20"
    >
      {/* Shabana looping / poster */}
      <HeroVideo />

      {/* Depth wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              95deg,
              hsl(264 65% 7% / 0.88) 0%,
              hsl(264 65% 7% / 0.58) 42%,
              hsl(264 65% 7% / 0.18) 72%,
              hsl(264 65% 7% / 0.55) 100%
            ),
            radial-gradient(
              ellipse 80% 60% at 15% 60%,
              hsl(262 52% 32% / 0.5) 0%,
              transparent 70%
            )
          `,
        }}
      />

      {/* Vertical running edge marker — left edge, editorial print detail */}
      <div
        aria-hidden="true"
        className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 md:block"
      >
        <div className="flex flex-col items-center gap-6">
          <span
            className="h-12 w-px origin-top animate-draw-line bg-mint/60"
            style={{ animationDelay: "700ms" }}
          />
          <div
            className="flex flex-col items-center gap-4 text-fg-faint"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
            }}
          >
            <span>YSK · Est. 2013</span>
            <span>·</span>
            <span>501(c)(3)</span>
          </div>
          <span
            className="h-12 w-px origin-top animate-draw-line bg-mint/60"
            style={{ animationDelay: "900ms" }}
          />
        </div>
      </div>

      {/* Scattered small balls + signature anchor ball */}
      <SquashBallCanvas />
      <SignatureBall size={280} position="top-[14%] right-[-60px]" />

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center md:pl-10">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          {/* LEFT: headline + quote + CTAs */}
          <div className="lg:col-span-8 lg:col-start-1">
            {/* Eyebrow */}
            <div
              className="mb-6 flex items-center gap-3 animate-fade-up"
              style={{ animationDelay: "0ms" }}
            >
              <span className="h-px w-10 bg-mint/70" />
              <span className="eyebrow">
                Pacific Northwest · Youth Development · LA28 Pathway
              </span>
            </div>

            {/* Display headline — magazine-cover hierarchy:
                RAISING + CHAMPIONS as the statement, editorial italic coda below. */}
            <h1 className="text-fg">
              <span
                className="block font-display uppercase animate-stencil-fill"
                style={{
                  fontSize: "var(--text-step-5)",
                  fontWeight: 700,
                  lineHeight: 0.92,
                  letterSpacing: "-0.005em",
                  textShadow: "0 6px 60px hsl(264 65% 4% / 0.6)",
                  animationDelay: "200ms",
                  WebkitTextStrokeColor: "hsl(var(--color-fg))",
                  color: "hsl(var(--color-fg))",
                }}
              >
                Raising
              </span>
              <span
                className="block font-display uppercase animate-fade-up"
                style={{
                  fontSize: "var(--text-step-5)",
                  fontWeight: 700,
                  lineHeight: 0.92,
                  letterSpacing: "-0.005em",
                  textShadow: "0 6px 60px hsl(264 65% 4% / 0.6)",
                  animationDelay: "500ms",
                }}
              >
                Champions.
              </span>
              <span
                className="mt-5 flex items-baseline gap-3 pl-[0.2em] animate-fade-up"
                style={{ animationDelay: "760ms" }}
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-px bg-mint/70"
                  style={{ width: "2.5rem", marginBottom: "0.35em" }}
                />
                <span
                  className="font-editorial italic text-mint"
                  style={{
                    fontSize: "var(--text-step-3)",
                    fontWeight: 500,
                    fontStyle: "italic",
                    lineHeight: 1,
                    letterSpacing: "0.005em",
                  }}
                >
                  on &amp; off the court.
                </span>
              </span>
            </h1>

            {/* Pull quote */}
            <blockquote
              className="mt-10 max-w-[540px] animate-fade-up"
              style={{ animationDelay: "1100ms" }}
            >
              <p
                className="font-editorial text-fg/85 leading-relaxed"
                style={{ fontSize: "var(--text-step-1)", fontStyle: "italic" }}
              >
                &ldquo;What the Andretti family is to auto racing, the Khan
                family is to squash.&rdquo;
              </p>
              <footer className="eyebrow mt-3 !text-fg-faint">
                — The Seattle Times
              </footer>
            </blockquote>

            {/* CTAs */}
            <div
              className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up"
              style={{ animationDelay: "1260ms" }}
            >
              <a
                href="mailto:hello@yskevents.com?subject=I%20want%20to%20support%20YSK%20Events"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-mint px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-mint-ink transition-all duration-base ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow-mint)]"
              >
                <span className="relative z-10">Fund the mission</span>
                <span
                  aria-hidden="true"
                  className="relative z-10 transition-transform duration-base ease-[var(--ease-spring)] group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href="#programs"
                className="group inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-fg/80 transition-colors duration-base hover:text-mint"
              >
                Explore programs
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-base ease-[var(--ease-spring)] group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </div>

          {/* RIGHT: stats — posterized media box */}
          <aside
            className="lg:col-span-4 lg:col-start-9 lg:self-end animate-fade-up"
            style={{ animationDelay: "1400ms" }}
          >
            <div
              className="glass rounded-lg p-7 md:p-8"
              style={{
                borderLeft: "2px solid hsl(var(--color-mint))",
              }}
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="eyebrow !text-mint">The scoreboard</span>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-border"
                />
                <span
                  className="font-sans text-[10px] font-semibold uppercase text-fg-faint"
                  style={{ letterSpacing: "0.2em" }}
                >
                  Since 2013
                </span>
              </div>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-7">
                {STATS.map((stat, i) => (
                  <div key={stat.label} className="group cursor-default">
                    <dt
                      className="font-display text-fg uppercase leading-none transition-colors duration-base group-hover:text-mint"
                      style={{
                        fontSize: "var(--text-step-3)",
                        fontWeight: 700,
                        letterSpacing: "0.01em",
                      }}
                    >
                      {stat.value}
                    </dt>
                    <dd
                      className="mt-1 text-fg-muted"
                      style={{
                        fontSize: "0.6875rem",
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                      }}
                    >
                      {stat.label}
                    </dd>
                    {/* underline ticker on hover */}
                    <div
                      className="mt-2 h-px w-6 origin-left scale-x-0 bg-mint transition-transform duration-slow ease-[var(--ease-out-expo)] group-hover:scale-x-[6]"
                    />
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom strip: scroll indicator (left) + now-playing pill (right) */}
      <div className="relative z-10 mt-8 flex items-end justify-between gap-4">
        <div
          className="flex items-center gap-3 text-fg-faint animate-fade-up"
          style={{ animationDelay: "1500ms" }}
        >
          <span
            className="text-[10px] font-semibold uppercase"
            style={{ letterSpacing: "0.3em", fontFamily: "var(--font-sans)" }}
          >
            Scroll
          </span>
          <span className="h-[1px] w-12 origin-left animate-draw-line bg-fg-faint" />
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "1600ms" }}>
          <NowPlaying />
        </div>
      </div>
    </section>
  );
}
