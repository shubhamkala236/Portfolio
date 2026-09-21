import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import type { CaseStudyBlock } from "@/content/types";

type ProseBlockProps = Extract<CaseStudyBlock, { type: "prose" }>;

/**
 * A labelled run of paragraphs, optionally with a display title.
 *
 * Without a title the paragraphs sit 16px under the eyebrow. With one, Figma
 * nests them like a section header: 16px under the eyebrow, then 12px between
 * title and text.
 */
export function ProseBlock({
  eyebrow,
  title,
  paragraphs,
  size = "body",
  paragraphGap = 25,
}: ProseBlockProps) {
  const body = (
    <div
      className={cn(
        "flex flex-col text-fg-strong",
        size === "lg" ? "text-body-lg" : "text-body",
      )}
      style={{ gap: paragraphGap }}
    >
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title ? (
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-section-title text-fg">{title}</h2>
          {body}
        </div>
      ) : (
        body
      )}
    </div>
  );
}
