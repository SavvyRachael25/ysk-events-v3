import { PSA_ANNOUNCEMENT } from "@/lib/press";

/**
 * Announcement band under the hero, added the day PSA published
 * (September 21, 2026). Points to the release on /press.
 */
export default function Announcement() {
  return (
    <section aria-labelledby="announce-heading" className="px-6 py-10 md:px-12 md:py-12 lg:px-20" style={{ background: "#fcfcf5", borderBottom: "2px solid #102822" }}>
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="eyebrow">Announced September 21, 2026 · PSA, World Squash and US Squash</p>
          <h2 id="announce-heading" className="mt-3 max-w-[26ch] font-display text-ink" style={{ fontSize: "var(--text-step-2)", lineHeight: 1.1 }}>
            It is official: the Squash Final Qualifier for LA28 comes to Seattle and Bellevue, <span className="text-gold">June 6 to 10, 2028.</span>
          </h2>
          <p className="body-copy mt-3 max-w-[64ch] text-[15px]">
            Twenty-four men and twenty-four women, two draws, and the winner of each goes to Los Angeles. Early rounds at PRO Club in Bellevue, finals on an all-glass court in Seattle.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          <a href="/press" className="btn-gold">Read the release</a>
          <a href={PSA_ANNOUNCEMENT} target="_blank" rel="noopener noreferrer" className="btn-outline">PSA announcement</a>
        </div>
      </div>
    </section>
  );
}
