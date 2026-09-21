import type { CaseStudyBlock } from "@/content/types";

type StatementBlockProps = Extract<CaseStudyBlock, { type: "statement" }>;

/**
 * Centred pull-quote: muted eyebrow above a display-serif line.
 * Figma 4127:16390 — 20px untracked eyebrow, 20px gap, 28px Gloock at 786px.
 *
 * No `text-balance`: the fixed measure alone reproduces the file's line
 * breaks, and balancing would move them.
 */
export function StatementBlock({ eyebrow, text }: StatementBlockProps) {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      {eyebrow && <p className="text-kicker text-muted uppercase">{eyebrow}</p>}
      <p className="max-w-statement font-display text-statement text-fg">
        {text}
      </p>
    </div>
  );
}
