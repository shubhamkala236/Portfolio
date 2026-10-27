import { eyebrowStyles } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import type { CaseStudyBlock } from "@/content/types";

type MetaBlockProps = Extract<CaseStudyBlock, { type: "meta" }>;

/**
 * PROJECT / ROLE / TIMELINE / SCOPE between gradient hairline rules.
 * Figma: 1px rules, content 40px from each rule. Columns are either 80px
 * apart ("gap") or spread across the full width ("spread", Hotstuff), and the
 * rule gradient differs per file.
 */
export function MetaBlock({
  items,
  layout = "gap",
  rule = "default",
}: MetaBlockProps) {
  return (
    <dl
      data-reveal-group
      className={cn(
        "grid gap-x-20 gap-y-8 py-ruled sm:grid-cols-2 lg:flex",
        rule === "centred" ? "border-y-gradient-centred" : "border-y-gradient",
        layout === "spread"
          ? "lg:flex-nowrap lg:justify-between lg:gap-x-0"
          : "lg:flex-wrap",
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-3">
          <dt className={eyebrowStyles}>{item.label}</dt>
          <dd className="text-body text-fg-strong max-md:text-case-meta-sm lg:whitespace-nowrap">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
