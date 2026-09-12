/**
 * Solid multicolour ribbon band, our own artwork in the LA28 colour family.
 *
 * Four stacked filled waves that cover the band edge to edge (no white
 * showing through), built from a tile that is mathematically periodic so the
 * two-tile drift loop has no seam. Drifts slowly; static under
 * prefers-reduced-motion via the animate-ribbon utility.
 */
const W = 1600; // tile width in viewBox units
const H = 80;   // band height
const K = 2;    // whole wave periods per tile, so the tile repeats seamlessly
const COLORS = ["#009ed6", "#3fc6ea", "#3adfa8", "#ff018f"];
const PHASES = [0, 0.9, 1.7, 2.6];
const AMP = 11;

function boundary(j: number, x: number) {
  // inner boundaries wave; the outer two sit outside the band so it is always filled
  if (j === 0) return -AMP * 2;
  if (j === COLORS.length) return H + AMP * 2;
  const base = (H / COLORS.length) * j;
  return base + AMP * Math.sin((2 * Math.PI * K * x) / W + PHASES[j % PHASES.length]);
}

function bandPath(j: number, ox: number) {
  const steps = 64;
  const top: string[] = [];
  const bot: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (W * i) / steps;
    top.push(`${(ox + x).toFixed(1)} ${boundary(j, x).toFixed(2)}`);
    bot.push(`${(ox + x).toFixed(1)} ${boundary(j + 1, x).toFixed(2)}`);
  }
  return `M ${top[0]} L ${top.slice(1).join(" L ")} L ${bot.reverse().join(" L ")} Z`;
}

export default function Ribbon({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative w-full overflow-hidden bg-la-blue ${className}`} style={{ height: "clamp(56px, 6vw, 80px)" }}>
      <svg
        className="animate-ribbon absolute left-0 top-0 h-full"
        style={{ width: "200%" }}
        viewBox={`0 0 ${W * 2} ${H}`}
        preserveAspectRatio="none"
        shapeRendering="geometricPrecision"
      >
        {[0, W].map((ox) =>
          COLORS.map((c, j) => <path key={`${ox}-${j}`} d={bandPath(j, ox)} fill={c} />),
        )}
      </svg>
    </div>
  );
}
