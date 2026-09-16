import { Fraunces } from "next/font/google";
import ReviewPill from "@/components/ReviewPill";

/**
 * Pacific Motion, the direction chosen on 2026-09-16. Every public page
 * lives in this route group so the variant tokens (see globals.css) and the
 * serif display face apply site-wide. /mock/* sits outside it on purpose:
 * those routes show the other two directions for comparison.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-variant="v3" className={`${fraunces.variable} flex min-h-full flex-1 flex-col`}>
      {children}
      {process.env.VERCEL_GIT_COMMIT_REF === "mockups" && <ReviewPill label="Option 3 · all three" />}
    </div>
  );
}
