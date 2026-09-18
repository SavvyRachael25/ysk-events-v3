"use client";

import { usePathname } from "next/navigation";

/**
 * "Back to the three options" pill. Only rendered on the mockups preview
 * (Vercel sets VERCEL_GIT_COMMIT_REF at build), never on production.
 */
export default function ReviewPill({ label }: { label?: string }) {
  const pathname = usePathname();
  if (pathname === "/options") return null;
  return (
    <a
      href="/options"
      className="fixed bottom-4 left-4 z-[70] flex items-center gap-2 border-2 border-black bg-white px-3.5 py-2 font-sans text-[11px] font-extrabold uppercase tracking-[0.14em] text-black shadow-[0_12px_30px_-12px_rgb(0_0_0/0.5)] transition-transform hover:-translate-y-0.5"
    >
      <span aria-hidden="true">←</span> {label ?? "All three options"}
    </a>
  );
}
