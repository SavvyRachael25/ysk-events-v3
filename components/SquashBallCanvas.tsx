/**
 * SquashBallCanvas — ambient animated squash balls.
 *
 * Not "generic AI blobs." These are actual squash balls with the real
 * speed-dot codes used in the sport:
 *   - Double yellow = Pro      (slowest, least bounce)
 *   - Single yellow = Competition
 *   - Red            = Progress (more bounce, for improvers)
 *   - Blue           = Junior / Intro
 *   - Green          = Super slow / training
 *
 * That detail is the thing that makes this on-brand, not decorative.
 */

import { cn } from "@/lib/utils";

type BallSpeed = "pro" | "competition" | "progress" | "junior" | "training";

type Ball = {
  size: number;
  /** Tailwind positional classes (top/left/right/bottom) */
  position: string;
  animation:
    | "animate-ball-1"
    | "animate-ball-2"
    | "animate-ball-3"
    | "animate-ball-4"
    | "animate-ball-arc";
  speed: BallSpeed;
  delay?: string;
  opacity?: number;
  /** darker = deeper in field */
  depth?: "fore" | "mid" | "back";
};

type SquashBallCanvasProps = {
  balls?: Ball[];
  className?: string;
};

// Real squash ball speed dots
const DOT: Record<BallSpeed, { primary: string; secondary?: string }> = {
  pro:         { primary: "#facc15", secondary: "#facc15" }, // double yellow
  competition: { primary: "#facc15" },
  progress:    { primary: "#ef4444" },
  junior:      { primary: "#60a5fa" },
  training:    { primary: "#22c55e" },
};

const DEPTH_OPACITY: Record<NonNullable<Ball["depth"]>, number> = {
  fore: 0.85,
  mid: 0.55,
  back: 0.32,
};

const DEFAULT_BALLS: Ball[] = [
  // Scattered around edges, smaller, staying out of the main text column
  { size: 110, position: "top-[6%] right-[14%]",      animation: "animate-ball-1",   speed: "pro",         depth: "mid" },
  { size: 80,  position: "top-[20%] right-[40%]",     animation: "animate-ball-2",   speed: "competition", depth: "back", delay: "-2s" },
  { size: 70,  position: "bottom-[18%] right-[22%]",  animation: "animate-ball-4",   speed: "junior",      depth: "mid", delay: "-1s" },
  { size: 130, position: "bottom-[8%] right-[42%]",   animation: "animate-ball-arc", speed: "training",    depth: "back", delay: "-6s" },
  { size: 60,  position: "top-[70%] right-[8%]",      animation: "animate-ball-2",   speed: "pro",         depth: "back", delay: "-3s" },
  { size: 90,  position: "bottom-[32%] right-[6%]",   animation: "animate-ball-1",   speed: "competition", depth: "mid", delay: "-5s" },
];

export default function SquashBallCanvas({
  balls = DEFAULT_BALLS,
  className,
}: SquashBallCanvasProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {balls.map((ball, i) => {
        const dot = DOT[ball.speed];
        const opacity =
          ball.opacity ??
          (ball.depth ? DEPTH_OPACITY[ball.depth] : DEPTH_OPACITY.mid);

        return (
          <div
            key={i}
            className={cn("absolute rounded-full", ball.position, ball.animation)}
            style={{
              width: ball.size,
              height: ball.size,
              opacity,
              animationDelay: ball.delay ?? "0s",
              // rubber-matte ball body
              background: `
                radial-gradient(
                  ellipse at 30% 28%,
                  hsl(0 0% 12% / 0.95) 0%,
                  hsl(0 0% 4%) 55%,
                  hsl(0 0% 2%) 100%
                )
              `,
              boxShadow: `
                0 0 ${ball.size * 0.4}px ${ball.size * 0.06}px hsl(268 62% 54% / 0.25),
                inset 0 0 ${ball.size * 0.35}px hsl(0 0% 0% / 0.6),
                inset ${ball.size * 0.08}px ${ball.size * 0.08}px ${ball.size * 0.15}px hsl(0 0% 100% / 0.04)
              `,
            }}
          >
            {/* Soft top-left rubber highlight */}
            <div
              className="absolute rounded-full"
              style={{
                inset: "4%",
                background:
                  "radial-gradient(ellipse at 28% 22%, hsl(0 0% 100% / 0.14) 0%, transparent 45%)",
              }}
            />
            {/* Bottom-right rim light */}
            <div
              className="absolute rounded-full"
              style={{
                inset: "2%",
                background:
                  "radial-gradient(ellipse at 72% 78%, hsl(268 62% 64% / 0.1) 0%, transparent 45%)",
              }}
            />

            {/* Speed dot(s) — the actual squash-ball code */}
            {dot.secondary ? (
              <>
                <SpeedDot color={dot.primary} size={ball.size} left="42%" />
                <SpeedDot color={dot.secondary} size={ball.size} left="54%" />
              </>
            ) : (
              <SpeedDot color={dot.primary} size={ball.size} left="48%" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function SpeedDot({
  color,
  size,
  left,
}: {
  color: string;
  size: number;
  left: string;
}) {
  const dotSize = size * 0.065;
  return (
    <div
      className="absolute rounded-full"
      style={{
        width: dotSize,
        height: dotSize,
        background: color,
        top: "46%",
        left,
        boxShadow: `
          0 0 ${dotSize * 0.8}px ${color},
          0 0 ${dotSize * 2}px ${color}55
        `,
      }}
    />
  );
}
