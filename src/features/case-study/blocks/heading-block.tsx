import Image from "next/image";
import { Fragment, type CSSProperties } from "react";

import { cn } from "@/lib/cn";
import type { CaseStudyBlock } from "@/content/types";
import { MemojiMark } from "@/features/case-study/memoji-mark";

type HeadingBlockProps = Extract<CaseStudyBlock, { type: "heading" }>;

const sizes = {
  display: { lg: "text-title", md: "text-heading" },
  brand: { lg: "text-brand-heading", md: "text-brand-signoff" },
} as const;

/**
 * A centred display line used as a chapter break, optionally over a figure or
 * a memoji mark.
 *
 * On a phone the figure or mark sits 8px above the text.
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
  face = "display",
  tone = "default",
  leading = "tight",
  tracking,
  description,
}: HeadingBlockProps) {
  const lines = typeof text === "string" ? [text] : text;
  const explicitLines = lines.length > 1;
  // With a description this opens a section, so it is a real heading.
  const Title = description ? "h2" : "p";

  return (
    <div
      className="flex flex-col items-center"
      style={
        {
          "--figure-gap": `calc(var(--gap-scale, 1) * ${figureGap}px)`,
        } as CSSProperties
      }
    >
      {(mark || figure) && (
        <div className="mb-(--figure-gap) max-w-full max-md:mb-2">
          {mark ? (
            <MemojiMark mark={mark} />
          ) : (
            figure && (
              <Image
                src={figure.src}
                alt={figure.alt}
                width={figure.width}
                height={figure.height}
                sizes={`${figureSize}px`}
                style={{ width: figureSize, height: figureSize }}
                className="max-w-full"
              />
            )
          )}
        </div>
      )}
      {/* `relative` keeps the text above the mark's glow, as in the file's
          layer order. */}
      <Title
        className={cn(
          "relative flex flex-col text-center",
          face === "brand" ? "font-brand font-opsz-40" : "font-display",
          tone === "strong" ? "text-fg-strong" : "text-fg",
          // A Figma width or explicit lines already fix the breaks; balancing
          // would move them. Otherwise, balance.
          !maxWidth && !explicitLines && "text-balance",
          sizes[face][size],
          leading === "normal" && "leading-brand-normal",
          // On a phone, 8px more room under the figure.
          (mark || figure) && "max-md:mt-2",
        )}
        style={{
          maxWidth,
          gap: `calc(var(--gap-scale, 1) * ${lineGap}px)`,
          letterSpacing: tracking === undefined ? undefined : `${tracking}em`,
        }}
      >
        {lines.map((line) => (
          // The large Gloock size is tracked; see `trim-tracking-end`.
          <span
            key={line}
            className={cn(
              face === "display" && size === "lg" && "trim-tracking-end",
              // Figma centres a line with its trailing space, which shifts it
              // left by half a space; keep the space so the line does too.
              line.endsWith(" ") && "whitespace-break-spaces",
            )}
          >
            {line}
          </span>
        ))}
      </Title>
      {description && (
        <p
          className="relative mt-(--figure-gap) text-center text-fg-strong"
          style={{ maxWidth }}
        >
          {typeof description === "string"
            ? description
            : description.map((line, i) => (
                <Fragment key={line}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
        </p>
      )}
    </div>
  );
}
