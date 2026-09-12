import Countdown from "./Countdown";
import LogoVideo from "./LogoVideo";

/**
 * The countdown band, in the exact la28.org arrangement: official mark on
 * the left, giant black numerals on the right, white field, ribbons above
 * and below (rendered by the page).
 *
 * The LA28 mark is used under clearance held by YSK Events. It is rendered
 * unaltered on white with clear space and never overlaid. Do not crop,
 * recolour, or animate it further.
 */
export default function OlympicBand() {
  return (
    <section aria-labelledby="countdown-heading" className="bg-white py-10 md:py-12">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-8 px-6 md:px-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex shrink-0 items-center justify-center lg:w-[300px]">
          <LogoVideo className="h-auto w-[220px] lg:w-[260px]" />
        </div>
        <div className="flex flex-col items-center lg:items-end">
          <p id="countdown-heading" className="eyebrow mb-3 text-center lg:text-right">
            The last Olympic places for squash are decided in
          </p>
          <Countdown />
        </div>
      </div>
    </section>
  );
}
