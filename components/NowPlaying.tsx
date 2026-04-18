/**
 * Small "NOW PLAYING" media chip — bottom-right of hero.
 * Makes the Shabana background feel curated, not decorative.
 */
export default function NowPlaying() {
  return (
    <div className="glass glass-hover inline-flex items-center gap-3 rounded-full px-4 py-2 text-fg">
      {/* Live dot */}
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
        <span className="relative inline-flex h-2 w-2 animate-live-dot rounded-full bg-mint" />
      </span>
      <span
        className="text-[10px] font-semibold uppercase text-fg/85"
        style={{ letterSpacing: "0.22em", fontFamily: "var(--font-sans)" }}
      >
        Now playing
      </span>
      <span
        className="text-[10px] text-fg-faint"
        style={{ letterSpacing: "0.06em", fontFamily: "var(--font-sans)" }}
      >
        Shabana Khan · PRO Club, Bellevue
      </span>
    </div>
  );
}
