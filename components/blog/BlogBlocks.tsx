import type { Block } from "@/lib/blog";

const calloutBorderColor: Record<"mint" | "gold" | "coral", string> = {
  mint: "hsl(var(--color-mint))",
  gold: "hsl(var(--color-gold))",
  coral: "hsl(var(--color-coral))",
};

const calloutAccentText: Record<"mint" | "gold" | "coral", string> = {
  mint: "!text-mint",
  gold: "!text-gold",
  coral: "!text-coral",
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
                className="font-display uppercase text-fg pt-6"
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
                className="font-display uppercase text-fg pt-4"
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
                className="text-fg/80 leading-relaxed"
                style={{ fontSize: "1.0625rem" }}
              >
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul
                key={i}
                className="ml-5 list-disc space-y-2 text-fg/80 marker:text-mint"
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
                className="ml-5 list-decimal space-y-2 text-fg/80 marker:text-mint marker:font-bold"
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
                className="glass rounded-lg p-6 md:p-7 my-2"
                style={{ borderLeft: "2px solid hsl(var(--color-gold))" }}
              >
                <p
                  className="font-editorial italic text-fg/85 leading-relaxed"
                  style={{ fontSize: "var(--text-step-1)" }}
                >
                  &ldquo;{block.text}&rdquo;
                </p>
                {block.cite && (
                  <footer className="eyebrow mt-3 !text-fg-faint">
                    — {block.cite}
                  </footer>
                )}
              </blockquote>
            );
          case "callout":
            return (
              <aside
                key={i}
                className="glass rounded-lg p-6 md:p-7 my-2"
                style={{ borderLeft: `2px solid ${calloutBorderColor[block.tone]}` }}
              >
                <p className={`eyebrow mb-2 ${calloutAccentText[block.tone]}`}>
                  {block.title}
                </p>
                <p
                  className="text-fg/85 leading-relaxed"
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
