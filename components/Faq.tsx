import Reveal from "./Reveal";
import { HOMEPAGE_FAQ } from "@/lib/content";

/**
 * Visible FAQ.
 *
 * These questions were already powering FAQPage structured data but were
 * never rendered, which wastes them: answer engines weight visible, crawlable
 * copy far more heavily than schema alone, and humans landing from the
 * announcement have exactly these questions. Rendering them serves both.
 *
 * Plain <details> so it works without JavaScript and stays crawlable.
 */
export default function Faq() {
  return (
    <section id="faq" className="paper-grain bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[900px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="section-no">04</span>
            <span aria-hidden="true" className="rule-tricolor h-[3px] w-12" />
            <p className="eyebrow">The qualifier, explained</p>
          </div>
          <h2
            className="mt-5 font-display text-ink"
            style={{ fontSize: "var(--text-step-3)" }}
          >
            Questions about <span className="text-gold">the qualifier.</span>
          </h2>
        </Reveal>

        <div className="mt-12 border-t border-border">
          {HOMEPAGE_FAQ.map((item, i) => (
            <Reveal key={item.question} delay={i * 60}>
              <details className="group border-b border-border py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <h3
                    className="font-sans text-[15px] font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-gold"
                  >
                    {item.question}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 font-lockup text-xl leading-none text-gold transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="body-copy mt-4 max-w-[720px] pr-10 text-[15px]">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
