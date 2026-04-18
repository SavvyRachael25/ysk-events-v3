/**
 * SignatureBall — the ONE hero ball. Anchor element, bigger than canvas balls,
 * with an ambient mint ring pulse. Always has the pro-level double-yellow dot.
 */

type Props = {
  /** Pixel size */
  size?: number;
  /** Tailwind position classes, e.g. "top-[20%] right-[-60px]" */
  position?: string;
  /** Ring glow visible */
  withRing?: boolean;
  className?: string;
};

export default function SignatureBall({
  size = 240,
  position = "top-[18%] right-[-40px]",
  withRing = true,
  className,
}: Props) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${position} ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      {/* Mint ambient ring */}
      {withRing && (
        <div
          className="absolute inset-0 animate-ring-pulse rounded-full"
          style={{
            background:
              "radial-gradient(circle, transparent 58%, hsl(152 72% 70% / 0.22) 62%, transparent 72%)",
            filter: "blur(0.5px)",
          }}
        />
      )}

      {/* The ball itself */}
      <div
        className="absolute inset-4 rounded-full animate-ball-1"
        style={{
          background: `
            radial-gradient(
              ellipse at 28% 24%,
              hsl(0 0% 14% / 0.95) 0%,
              hsl(0 0% 4%) 55%,
              hsl(0 0% 2%) 100%
            )
          `,
          boxShadow: `
            0 0 ${size * 0.25}px ${size * 0.05}px hsl(152 72% 70% / 0.22),
            0 0 ${size * 0.5}px ${size * 0.08}px hsl(268 62% 54% / 0.28),
            inset 0 0 ${size * 0.35}px hsl(0 0% 0% / 0.6),
            inset ${size * 0.06}px ${size * 0.06}px ${size * 0.12}px hsl(0 0% 100% / 0.06)
          `,
        }}
      >
        {/* top-left rubber highlight */}
        <div
          className="absolute rounded-full"
          style={{
            inset: "4%",
            background:
              "radial-gradient(ellipse at 28% 22%, hsl(0 0% 100% / 0.18) 0%, transparent 50%)",
          }}
        />
        {/* mint rim kiss */}
        <div
          className="absolute rounded-full"
          style={{
            inset: "2%",
            background:
              "radial-gradient(ellipse at 78% 80%, hsl(152 72% 70% / 0.14) 0%, transparent 45%)",
          }}
        />
        {/* Pro double-yellow dot */}
        <div
          className="absolute rounded-full"
          style={{
            width: size * 0.06,
            height: size * 0.06,
            background: "#facc15",
            top: "46%",
            left: "43%",
            boxShadow: `0 0 ${size * 0.04}px #facc15, 0 0 ${size * 0.1}px #facc1599`,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: size * 0.06,
            height: size * 0.06,
            background: "#facc15",
            top: "46%",
            left: "53%",
            boxShadow: `0 0 ${size * 0.04}px #facc15, 0 0 ${size * 0.1}px #facc1599`,
          }}
        />
      </div>
    </div>
  );
}
