import { eyebrowStyles } from "@/components/ui/eyebrow";
import type { CaseStudyBlock } from "@/content/types";

type MetaBlockProps = Extract<CaseStudyBlock, { type: "meta" }>;

/**
 * PROJECT / ROLE / TIMELINE / SCOPE between hairline rules.
 * Figma: 0.5px rules, 40px of padding inside them, 80px between columns.
 */
export function MetaBlock({ items }: MetaBlockProps) {
  return (
    <dl className="grid gap-x-20 gap-y-8 border-y-[0.5px] border-border py-10 sm:grid-cols-2 lg:flex lg:flex-wrap">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-3">
          <dt className={eyebrowStyles}>{item.label}</dt>
          <dd className="text-xl text-fg-strong">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
