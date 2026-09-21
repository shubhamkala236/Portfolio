import type { CaseStudyBlock } from "@/content/types";

type PageTitleBlockProps = Extract<CaseStudyBlock, { type: "page-title" }>;

/**
 * A left-aligned title over lead-size subtitle lines (Hotstuff 4253:22705),
 * used when the hero is a full-bleed visual with no title of its own. It is
 * the page's `<h1>`.
 */
export function PageTitleBlock({ title, subtitle }: PageTitleBlockProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display text-display text-fg">{title}</h1>
      <p className="flex flex-col text-lead text-muted">
        {subtitle.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </div>
  );
}
