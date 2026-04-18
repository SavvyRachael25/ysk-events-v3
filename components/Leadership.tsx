import SquashBallCanvas from "./SquashBallCanvas";
import { KHAN_FAMILY, BOARD, type TeamMember } from "@/lib/content";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

function TeamCard({ member, featured }: { member: TeamMember; featured?: boolean }) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-fg/[0.04] p-7 transition-all duration-base ease-[var(--ease-out-expo)] md:p-8",
        member.featured || featured
          ? "border-border-strong bg-fg/[0.06]"
          : "border-border hover:border-mint/40 hover:bg-fg/[0.08]",
      )}
    >
      {/* Top accent — always on featured, hover-in on others */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-px origin-left transition-transform duration-slow ease-[var(--ease-out-expo)]",
          member.memorial
            ? "bg-fg/30"
            : "bg-gradient-to-r from-mint via-gold to-coral",
          member.featured ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />

      <div className="flex items-start gap-5">
        {/* Monogram */}
        <div
          className={cn(
            "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2",
            member.memorial
              ? "border-fg/30 bg-fg/[0.06]"
              : member.featured
                ? "border-mint/45 bg-fg/[0.1]"
                : "border-border-strong bg-fg/[0.08]",
          )}
        >
          <span
            className={cn(
              "font-display uppercase leading-none",
              member.memorial ? "text-fg/50" : "text-fg/80",
            )}
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              letterSpacing: "0.03em",
            }}
          >
            {initials(member.name)}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <header className="mb-1 flex flex-wrap items-center gap-2.5">
            <h3
              className="font-display uppercase text-fg"
              style={{
                fontSize: "1.15rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              {member.name}
            </h3>
            {member.memorial && (
              <span className="rounded-full bg-fg/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-fg-faint">
                In memoriam
              </span>
            )}
          </header>
          <p
            className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-mint"
          >
            {member.role}
          </p>
          <p className="mb-4 text-[13.5px] leading-relaxed text-fg/72">
            {member.bio}
          </p>

          {member.accolades && member.accolades.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {member.accolades.map((a) => (
                <li
                  key={a}
                  className="rounded-full border border-border bg-fg/[0.06] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-fg/65"
                >
                  {a}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Leadership() {
  const yusuf = KHAN_FAMILY[0];
  const shabanaLatasha = KHAN_FAMILY.slice(1, 3);
  const muradAzam = KHAN_FAMILY.slice(3);

  return (
    <section
      id="leadership"
      aria-labelledby="leadership-heading"
      className="relative overflow-hidden px-6 py-24 md:px-12 lg:px-20 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 60% 60% at 20% 30%,
              hsl(262 52% 32% / 0.35) 0%,
              transparent 60%
            )
          `,
        }}
      />
      <SquashBallCanvas
        balls={[
          { size: 180, position: "top-[6%] right-[4%]",      animation: "animate-ball-2", speed: "pro", depth: "back" },
          { size: 110, position: "top-[40%] left-[-30px]",   animation: "animate-ball-1", speed: "progress", depth: "back", delay: "-4s" },
          { size: 90,  position: "bottom-[10%] right-[14%]", animation: "animate-ball-3", speed: "junior", depth: "mid", delay: "-2s" },
        ]}
      />

      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* Header */}
        <header className="mx-auto mb-14 max-w-[720px] text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-mint/70" />
            <span className="eyebrow">Who we are</span>
            <span className="h-px w-8 bg-mint/70" />
          </div>
          <h2
            id="leadership-heading"
            className="font-display uppercase text-fg"
            style={{
              fontSize: "var(--text-step-4)",
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: "-0.005em",
            }}
          >
            The{" "}
            <span
              className="font-editorial italic text-mint"
              style={{ fontWeight: 500 }}
            >
              Khan
            </span>{" "}
            family
          </h2>
          <p className="mt-6 text-fg/78 leading-relaxed">
            A multigenerational squash dynasty rooted in Seattle since 1968.
            From All-India championships to Pan American Gold, from hosting the
            Men&rsquo;s World Championship to building the next generation — the
            Khan family <em className="text-fg">is</em> Pacific Northwest
            squash.
          </p>
        </header>

        {/* Family */}
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="eyebrow !text-fg-faint">The family</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="mb-5">
          <TeamCard member={yusuf} />
        </div>

        <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          {shabanaLatasha.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>

        <div className="mb-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {muradAzam.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>

        {/* Board */}
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="eyebrow !text-fg-faint">Board &amp; operations</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="mb-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {BOARD.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>

        {/* Legacy callout */}
        <aside
          className="glass rounded-lg p-10 text-center md:p-14"
          style={{ borderTop: "2px solid hsl(var(--color-mint))" }}
        >
          <p className="eyebrow mb-4 !text-mint">The legacy</p>
          <p
            className="mb-5 font-display uppercase text-fg"
            style={{
              fontSize: "var(--text-step-3)",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.005em",
            }}
          >
            Three generations.{" "}
            <span className="font-editorial italic text-mint" style={{ fontWeight: 500 }}>
              one
            </span>{" "}
            mission.
          </p>
          <p className="mx-auto max-w-2xl text-fg/75 leading-relaxed">
            From Yusuf Khan bringing squash to Seattle in 1968, to his daughters
            Shabana and Latasha dominating U.S. national championships, to sons
            Murad and Azam building world-class programs and events — the Khan
            family continues to shape the future of squash in the Pacific
            Northwest and beyond.
          </p>
        </aside>
      </div>
    </section>
  );
}
