"use client";

import { useEffect, useState } from "react";

/**
 * Days until June 2028. No hours, minutes, or seconds until YSK publishes
 * a start date: a ticking clock implies a day nobody has announced, and an
 * official will ask which day it is. Counts to the first of the month.
 * Server renders a dash; client fills in after hydration.
 */
const TARGET = new Date("2028-06-01T00:00:00-07:00");

export default function Countdown() {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setDays(Math.max(0, Math.ceil((TARGET.getTime() - Date.now()) / 86_400_000)));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return (
    <div role="timer" aria-label="Days until the qualifier, June 2028" className="flex items-end gap-5 md:gap-7">
      <div className="flex flex-col items-center">
        <span className="font-lockup leading-none text-black" style={{ fontSize: "clamp(3.2rem, 7vw, 6rem)" }}>
          {days === null ? "---" : days.toLocaleString("en-US")}
        </span>
        <span className="mt-2 font-sans text-[11px] uppercase tracking-[0.14em] text-black" style={{ fontWeight: 800 }}>
          Days
        </span>
      </div>
      <div className="mb-6 flex flex-col">
        <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-black/60" style={{ fontWeight: 800 }}>until</span>
        <span className="font-lockup leading-none text-black" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.2rem)" }}>June 2028</span>
      </div>
    </div>
  );
}
