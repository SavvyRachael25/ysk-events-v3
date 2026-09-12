/**
 * Fluid multicolour ribbon band, the signature divider on la28.org.
 * Drawn here as our own SVG in the LA28 colour family, so it reads as part
 * of the qualifier family without reproducing any LA28-owned artwork.
 * Drifts slowly; static under prefers-reduced-motion.
 */
export default function Ribbon({ className = "" }: { className?: string }) {
  const bands = [
    { c: "#009ed6", y: 44, w: 26 },
    { c: "#3fc6ea", y: 62, w: 20 },
    { c: "#3adfa8", y: 80, w: 24 },
    { c: "#ff018f", y: 100, w: 14 },
    { c: "#009ed6", y: 116, w: 18 },
  ];
  // one 1600-wide tile of overlapping wave strokes, repeated twice for the drift loop
  const tile = (ox: number) =>
    bands.map((b, i) => (
      <path
        key={`${ox}-${i}`}
        d={`M${ox - 100} ${b.y} C ${ox + 250} ${b.y - 40}, ${ox + 450} ${b.y + 40}, ${ox + 800} ${b.y} S ${ox + 1350} ${b.y - 40}, ${ox + 1700} ${b.y}`}
        stroke={b.c}
        strokeWidth={b.w}
        strokeLinecap="round"
        fill="none"
        opacity={0.95}
      />
    ));
  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden bg-white ${className}`}
      style={{ height: 150 }}
    >
      <svg
        className="animate-ribbon absolute left-0 top-0 h-full"
        style={{ width: "200%" }}
        viewBox="0 0 3200 150"
        preserveAspectRatio="none"
      >
        {tile(0)}
        {tile(1600)}
      </svg>
    </div>
  );
}
