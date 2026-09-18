import { Eyebrow } from "@/components/ui/eyebrow";
import type { CaseStudyBlock } from "@/content/types";

type StatementBlockProps = Extract<CaseStudyBlock, { type: "statement" }>;

/** Centred pull-quote: muted eyebrow above a display-serif line. */
export function StatementBlock({ eyebrow, text }: StatementBlockProps) {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      {eyebrow && <Eyebrow className="text-xl">{eyebrow}</Eyebrow>}
      <p className="max-w-[49rem] font-display text-statement text-balance text-fg">
        {text}
      </p>
    </div>
  );
}
