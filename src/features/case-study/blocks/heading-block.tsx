import Image from "next/image";

import { cn } from "@/lib/cn";
import type { CaseStudyBlock } from "@/content/types";

type HeadingBlockProps = Extract<CaseStudyBlock, { type: "heading" }>;

const sizes = {
  lg: "text-title",
  md: "text-heading",
} as const;

/** A centred display line used as a chapter break, optionally over a figure. */
export function HeadingBlock({
  text,
  figure,
  figureSize = 134,
  figureGap = 16,
  maxWidth,
  size = "lg",
}: HeadingBlockProps) {
  return (
    <div
      className="flex flex-col items-center"
      style={{ gap: `calc(var(--gap-scale, 1) * ${figureGap}px)` }}
    >
      {figure && (
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
      <p
        className={cn(
          "text-center font-display text-balance text-fg",
          sizes[size],
        )}
        style={maxWidth ? { maxWidth } : undefined}
      >
        {text}
      </p>
    </div>
  );
}
