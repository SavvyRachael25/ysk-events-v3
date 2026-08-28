import type { Block } from "@/lib/blog";

const calloutBorderColor: Record<"mint" | "gold" | "coral", string> = {
  mint: "var(--color-gold)",
  gold: "var(--color-gold)",
  coral: "var(--color-gold-deep)",
};

const calloutAccentText: Record<"mint" | "gold" | "coral", string> = {
  mint: "!text-gold",
  gold: "!text-gold",
  coral: "!text-gold",
};

export function BlogBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={block.id}
                className="font-display uppercase text-ink pt-6"
                style={{
                  fontSize: "var(--text-step-3)",
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.005em",
                }}
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                id={block.id}
                className="font-display uppercase text-ink pt-4"
                style={{
                  fontSize: "var(--text-step-2)",
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: "0.005em",
                }}
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p
                key={i}
                className="text-ink/80 leading-relaxed"
                style={{ fontSize: "1.0625rem" }}
              >
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul
                key={i}
                className="ml-5 list-disc space-y-2 text-ink/80 marker:text-gold"
                style={{ fontSize: "1.0625rem" }}
              >
                {block.items.map((item, j) => (
                  <li key={j} className="leading-relaxed pl-1">
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol
                key={i}
                className="ml-5 list-decimal space-y-2 text-ink/80 marker:text-gold marker:font-bold"
                style={{ fontSize: "1.0625rem" }}
              >
                {block.items.map((item, j) => (
                  <li key={j} className="leading-relaxed pl-1">
                    {item}
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="rounded-lg border border-border bg-paper-2 p-6 md:p-7 my-2"
                style={{ borderLeft: "2px solid var(--color-gold)" }}
              >
                <p
                  className="font-lockup italic italic text-ink/85 leading-relaxed"
                  style={{ fontSize: "var(--text-step-1)" }}
                >
                  &ldquo;{block.text}&rdquo;
                </p>
                {block.cite && (
                  <footer className="eyebrow mt-3 !text-ink-faint">
                    — {block.cite}
                  </footer>
                )}
              </blockquote>
            );
          case "callout":
            return (
              <aside
                key={i}
                className="rounded-lg border border-border bg-paper-2 p-6 md:p-7 my-2"
                style={{ borderLeft: `2px solid ${calloutBorderColor[block.tone]}` }}
              >
                <p className={`eyebrow mb-2 ${calloutAccentText[block.tone]}`}>
                  {block.title}
                </p>
                <p
                  className="text-ink/85 leading-relaxed"
                  style={{ fontSize: "1.0625rem" }}
                >
                  {block.text}
                </p>
              </aside>
            );
        }
      })}
    </div>
  );
}
