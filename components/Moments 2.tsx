import { TIMELINE } from "@/lib/content";

const ICON_FILE: Record<string, string> = { "2021 to 2023": "2021-2023" };

/**
 * Little Pacific Northwest moments above the hero: Brandon Palma's timeline
 * icons with the year and title from the history section, so the first thing
 * on the page after the nav is the road YSK has already travelled. Scrolls
 * sideways on phones; six across on desktop.
 */
export default function Moments() {
  return (
    <nav aria-label="YSK milestones" className="moments border-b pt-16 md:pt-[76px]" style={{ background: "var(--color-paper-2)", borderColor: "var(--color-border)" }}>
      <ol className="mx-auto flex max-w-[1280px] gap-8 overflow-x-auto px-6 py-3 md:px-12 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:px-12" style={{ scrollbarWidth: "none" }}>
        {TIMELINE.map((item) => (
          <li key={item.year} className="flex shrink-0 items-center gap-3 lg:shrink">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/pacific/icons/${ICON_FILE[item.year] ?? item.year}.png`} alt="" width={512} height={512} className="h-9 w-9 shrink-0" />
            <a href="#history" className="group leading-tight">
              <span className="block font-lockup text-[15px] text-ink" style={{ color: "var(--color-gold)" }}>{item.year}</span>
              <span className="block whitespace-nowrap font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-ink-faint transition-colors group-hover:text-ink lg:whitespace-normal">{item.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
