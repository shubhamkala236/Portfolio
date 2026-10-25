import type { CaseStudyBlock } from "@/content/types";
import { cn } from "@/lib/cn";

type PageTitleBlockProps = Extract<CaseStudyBlock, { type: "page-title" }>;

/**
 * A left-aligned title over lead-size subtitle lines (Hotstuff 4253:22705),
 * used when the hero is a full-bleed visual with no title of its own. It is
 * the page's `<h1>`.
 */
export function PageTitleBlock({
  title,
  titleStyle = "display",
  subtitle,
  subtitleSize = "lg",
  subtitleGap = 16,
}: PageTitleBlockProps) {
  return (
    <div
      data-reveal-group
      className="flex flex-col"
      style={{ gap: subtitleGap }}
    >
      <h1
        className={cn(
          "text-fg",
          titleStyle === "brand"
            ? "font-brand text-brand-title font-opsz-14"
            : "font-display text-display",
        )}
      >
        {title}
      </h1>
      <p
        className={cn(
          "flex flex-col text-muted",
          subtitleSize === "md" ? "text-lead-md" : "text-lead",
        )}
      >
        {subtitle.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </div>
  );
}
