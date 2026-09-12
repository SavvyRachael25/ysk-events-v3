import { MARQUEE_ITEMS } from "@/lib/content";

/** Black ticker in heavy caps, the LA28 announcement-strip voice. */
export default function Marquee() {
  return (
    <div aria-hidden="true" className="relative overflow-hidden bg-black py-4">
      <div className="animate-marquee flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {MARQUEE_ITEMS.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center gap-8 pr-8 font-sans text-sm font-800 uppercase tracking-[0.1em] text-white" style={{ fontWeight: 800 }}>
                {item}
                <span className="inline-block h-2 w-2 rounded-full bg-la-green" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
