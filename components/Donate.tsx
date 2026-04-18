"use client";

import { useState } from "react";
import SquashBallCanvas from "./SquashBallCanvas";
import { DONATION_AMOUNTS, DONATION_IMPACTS } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function Donate() {
  const [selected, setSelected] = useState<string>("$100");

  return (
    <section
      id="donate"
      aria-labelledby="donate-heading"
      className="relative overflow-hidden px-6 py-24 md:px-12 lg:px-20 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              hsl(264 65% 5%) 0%,
              hsl(292 70% 10%) 50%,
              hsl(264 65% 5%) 100%
            ),
            radial-gradient(
              ellipse 80% 60% at 50% 0%,
              hsl(4 86% 66% / 0.2) 0%,
              transparent 60%
            )
          `,
        }}
      />
      <SquashBallCanvas
        balls={[
          { size: 220, position: "top-[-60px] right-[4%]",   animation: "animate-ball-2", speed: "pro", depth: "back" },
          { size: 100, position: "top-[40%] left-[8%]",      animation: "animate-ball-3", speed: "junior", depth: "mid", delay: "-3s" },
          { size: 150, position: "bottom-[-30px] left-[28%]",animation: "animate-ball-1", speed: "progress", depth: "back", delay: "-5s" },
          { size: 80,  position: "bottom-[18%] right-[24%]", animation: "animate-ball-4", speed: "training", depth: "fore", delay: "-1s" },
        ]}
      />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* LEFT: pitch + amount selector */}
          <div className="lg:col-span-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-mint/70" />
              <span className="eyebrow">Invest in futures</span>
            </div>
            <h2
              id="donate-heading"
              className="font-display uppercase text-fg"
              style={{
                fontSize: "var(--text-step-4)",
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: "-0.005em",
              }}
            >
              Every dollar builds{" "}
              <span className="font-editorial italic text-mint" style={{ fontWeight: 500 }}>
                a champion.
              </span>
            </h2>

            <p className="mt-6 max-w-[580px] text-fg/75 leading-relaxed">
              100% of contributions fund youth programs — court access,
              coaching, equipment, academic support, and tournament travel. No
              overhead. No middlemen.
            </p>
            <p
              className="mt-3 max-w-[580px] font-editorial italic text-fg-faint"
              style={{ fontSize: "0.95rem" }}
            >
              YSK Events is a registered 501(c)(3). Your donation is
              tax-deductible.
            </p>

            {/* Amount selector */}
            <fieldset className="mt-8">
              <legend className="sr-only">Select a donation amount</legend>
              <div className="flex flex-wrap gap-2.5" role="radiogroup">
                {DONATION_AMOUNTS.map((a) => {
                  const isSelected = selected === a;
                  return (
                    <button
                      key={a}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setSelected(a)}
                      className={cn(
                        "cursor-pointer rounded-md border-2 px-6 py-3 font-display text-lg transition-all duration-base ease-[var(--ease-out-expo)]",
                        isSelected
                          ? "border-mint bg-mint text-mint-ink shadow-[var(--shadow-glow-mint)]"
                          : "border-border-strong bg-fg/[0.06] text-fg hover:border-mint/50 hover:bg-fg/[0.1]",
                      )}
                      style={{ fontWeight: 700, letterSpacing: "0.01em" }}
                    >
                      {a}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-md bg-mint px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-mint-ink transition-all duration-base ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow-mint)]"
              >
                Donate {selected}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-base ease-[var(--ease-spring)] group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-fg/70 transition-colors duration-base hover:text-mint"
              >
                Corporate sponsorship
                <span
                  aria-hidden="true"
                  className="transition-transform duration-base ease-[var(--ease-spring)] group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </div>

          {/* RIGHT: impact breakdown */}
          <aside className="lg:col-span-5">
            <div
              className="glass rounded-lg p-8 md:p-10"
              style={{ borderLeft: "2px solid hsl(var(--color-mint))" }}
            >
              <div className="mb-6 flex items-center justify-between">
                <p className="eyebrow !text-mint">Your impact</p>
                <p className="eyebrow !text-fg-faint">100% to kids</p>
              </div>

              <ul className="space-y-4">
                {DONATION_IMPACTS.map((item) => {
                  const isSelected = selected === item.amount;
                  return (
                    <li
                      key={item.amount}
                      className={cn(
                        "flex items-start gap-4 rounded-md p-3 transition-colors duration-base",
                        isSelected ? "bg-mint/10" : "",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-1.5 h-2 w-2 flex-shrink-0 rounded-full transition-all duration-base",
                          isSelected
                            ? "scale-125 bg-mint shadow-[0_0_10px_hsl(152_72%_70%)]"
                            : "bg-mint/50",
                        )}
                      />
                      <p className="text-[13.5px] leading-relaxed text-fg/80">
                        <strong className="font-display text-fg" style={{ fontWeight: 700, letterSpacing: "0.01em" }}>
                          {item.amount}
                        </strong>{" "}
                        — {item.desc}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 border-t border-border pt-6">
                <p className="eyebrow mb-3 !text-fg-faint">Major giving</p>
                <p className="text-[13px] leading-relaxed text-fg/65">
                  Interested in Olympic glass court naming rights, title
                  sponsorship, or multi-year partnerships?{" "}
                  <a
                    href="#contact"
                    className="font-bold text-mint transition-colors hover:text-fg"
                  >
                    Let&rsquo;s talk →
                  </a>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
