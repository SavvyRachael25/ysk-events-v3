import Reveal from "./Reveal";
import { PARTNER, PARTNER_TIERS, CONTACT_INTERESTS } from "@/lib/content";
import { CONTACT_EMAIL } from "@/lib/constants";

/**
 * "Partner With Us" — dark ink band: sponsorship tiers + contact,
 * the one deliberately dark moment on the page.
 */
export default function Partner() {
  return (
    <section id="partner" className="bg-ink-2 py-24 text-paper md:py-36" style={{ borderTop: "1px solid var(--color-gold)" }}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          {/* LEFT: pitch */}
          <Reveal className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <span className="section-no !text-gold-bright">04</span>
              <span aria-hidden="true" className="h-px w-8 bg-gold-bright/50" />
              <p className="eyebrow !text-gold-bright">{PARTNER.eyebrow}</p>
            </div>
            <h2 className="mt-5">
              <span
                className="block font-display text-paper"
                style={{ fontSize: "var(--text-step-3)" }}
              >
                {PARTNER.headline}
              </span>
              <span
                className="block font-display text-gold-bright"
                style={{ fontSize: "var(--text-step-3)" }}
              >
                {PARTNER.headlineAccent}
              </span>
            </h2>
            <span
              aria-hidden="true"
              className="mt-7 block h-px w-14 bg-gold-bright/60"
            />
            <p
              className="mt-7 max-w-[480px] font-sans leading-[1.72] text-paper/70"
              style={{ fontSize: "var(--text-step-0)" }}
            >
              {PARTNER.body}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Road to LA Partnership Inquiry")}`}
                className="btn-gold"
              >
                Start the Conversation
              </a>
            </div>
            <p className="mt-5 font-sans text-xs text-paper/50">
              Or write to us directly:{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-gold-bright underline-offset-4 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </Reveal>

          {/* RIGHT: tiers */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-5">
              {PARTNER_TIERS.map((tier, i) => (
                <Reveal
                  key={tier.name}
                  delay={i * 130}
                  className="group rounded-lg border border-paper/12 bg-paper/[0.04] p-7 transition-colors duration-300 hover:border-gold-bright/50 md:p-8"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3
                      className="font-display text-paper transition-colors duration-300 group-hover:text-gold-bright"
                      style={{ fontSize: "1.1rem", letterSpacing: "0.12em" }}
                    >
                      {tier.name}
                    </h3>
                    <span className="font-lockup text-lg text-gold-bright/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-3 max-w-[560px] font-sans text-sm leading-relaxed text-paper/60">
                    {tier.desc}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={420} className="mt-8">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/40">
                Also welcome
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {CONTACT_INTERESTS.filter(
                  (i) => !i.includes("Partnership"),
                ).map((interest) => (
                  <li
                    key={interest}
                    className="rounded-full border border-paper/15 px-4 py-1.5 font-sans text-xs text-paper/60"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
