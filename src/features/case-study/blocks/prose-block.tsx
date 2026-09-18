import { Eyebrow } from "@/components/ui/eyebrow";
import type { CaseStudyBlock } from "@/content/types";

type ProseBlockProps = Extract<CaseStudyBlock, { type: "prose" }>;

export function ProseBlock({ eyebrow, paragraphs }: ProseBlockProps) {
  return (
    <div className="flex flex-col gap-4">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <div className="flex flex-col gap-6 text-fg-strong">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-pretty">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
