import { eyebrowStyles } from "@/components/ui/eyebrow";
import type { CaseStudyBlock } from "@/content/types";

type MetaBlockProps = Extract<CaseStudyBlock, { type: "meta" }>;

/**
 * PROJECT / ROLE / TIMELINE / SCOPE between gradient hairline rules.
 * Figma: 1px rules, content 40px from each rule, 80px between columns.
 */
export function MetaBlock({ items }: MetaBlockProps) {
  return (
    <dl className="grid gap-x-20 gap-y-8 border-y-gradient py-ruled sm:grid-cols-2 lg:flex lg:flex-wrap">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-3">
          <dt className={eyebrowStyles}>{item.label}</dt>
          <dd className="text-body text-fg-strong">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
