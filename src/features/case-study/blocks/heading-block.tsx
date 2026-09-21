import Image from "next/image";

import { cn } from "@/lib/cn";
import type { CaseStudyBlock } from "@/content/types";
import { MemojiMark } from "@/features/case-study/memoji-mark";

type HeadingBlockProps = Extract<CaseStudyBlock, { type: "heading" }>;

const sizes = {
  lg: "text-title",
  md: "text-heading",
} as const;

/**
 * A centred display line used as a chapter break, optionally over a figure or
 * a memoji mark.
 *
 * Where Figma breaks the text explicitly (one paragraph per line), `text` is
 * an array and each line is its own block, so the breaks hold at every width
 * the line fits in.
 */
export function HeadingBlock({
  text,
  lineGap = 0,
  figure,
  mark,
  figureSize = 134,
  figureGap = 16,
  maxWidth,
  size = "lg",
  tone = "default",
}: HeadingBlockProps) {
  const lines = typeof text === "string" ? [text] : text;
  const explicitLines = lines.length > 1;

  return (
    <div
      className="flex flex-col items-center"
      style={{ gap: `calc(var(--gap-scale, 1) * ${figureGap}px)` }}
    >
      {mark && <MemojiMark mark={mark} />}
      {!mark && figure && (
        <Image
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          sizes={`${figureSize}px`}
          style={{ width: figureSize, height: figureSize }}
          className="max-w-full"
        />
      )}
      {/* `relative` keeps the text above the mark's glow, as in the file's
          layer order. */}
      <p
        className={cn(
          "relative flex flex-col text-center font-display",
          tone === "strong" ? "text-fg-strong" : "text-fg",
          // A Figma width or explicit lines already fix the breaks; balancing
          // would move them. Otherwise, balance.
          !maxWidth && !explicitLines && "text-balance",
          sizes[size],
        )}
        style={{
          maxWidth,
          gap: `calc(var(--gap-scale, 1) * ${lineGap}px)`,
        }}
      >
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </div>
  );
}
