import Image from "next/image";
import { Fragment, type CSSProperties } from "react";

import { cn } from "@/lib/cn";
import type { CaseStudyBlock } from "@/content/types";
import { MemojiMark } from "@/features/case-study/memoji-mark";

type HeadingBlockProps = Extract<CaseStudyBlock, { type: "heading" }>;

const sizes = {
  display: { lg: "text-title", md: "text-heading", sm: "text-title-sm" },
  brand: {
    lg: "text-brand-heading",
    md: "text-brand-signoff",
    sm: "text-title-sm",
  },
} as const;

/**
 * A centred display line used as a chapter break, optionally over a figure or
 * a memoji mark.
 *
 * On a phone the figure or mark sits 8px above the text (plus the title's
 * own 8px), the large sizes are 28px with lines 6px apart, and a caption
 * is the muted grey.
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
  markWebSize,
  figureSize = 134,
  figureGap = 16,
  maxWidth,
  size = "lg",
  face = "display",
  tone = "default",
  leading = "tight",
  tracking,
  description,
  descriptionGap,
  descriptionTone,
  phoneLines,
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
          "--description-gap":
            descriptionGap === undefined
              ? undefined
              : `calc(var(--gap-scale, 1) * ${descriptionGap}px)`,
        } as CSSProperties
      }
    >
      {(mark || figure) && (
        <div className="mb-(--figure-gap) max-w-full max-md:mb-2">
          {mark ? (
            // From md up, scaled to markWebSize (zoom keeps its layout box
            // in step); on a phone, its own size.
            <div
              className={cn(markWebSize !== undefined && "mark-web-zoom")}
              style={
                {
                  "--mark-zoom":
                    markWebSize === undefined
                      ? undefined
                      : markWebSize / mark.box.width,
                } as CSSProperties
              }
            >
              <MemojiMark mark={mark} />
            </div>
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
          // On a phone the headings are 28px ("Thanks for reading" too),
          // their lines 6px apart.
          "max-md:text-case-heading-sm",
          "gap-(--line-gap)",
          lineGap > 0 && "max-md:gap-1.5",
        )}
        style={
          {
            maxWidth,
            "--line-gap": `calc(var(--gap-scale, 1) * ${lineGap}px)`,
            letterSpacing: tracking === undefined ? undefined : `${tracking}em`,
          } as CSSProperties
        }
      >
        {lines.map((line) => (
          // The large Gloock size is tracked; see `trim-tracking-end`.
          <span
            key={line}
            className={cn(
              face === "display" && size !== "md" && "trim-tracking-end",
              // Figma centres a line with its trailing space, which shifts it
              // left by half a space; keep the space so the line does too.
              line.endsWith(" ") && "whitespace-break-spaces",
            )}
          >
            {phoneLines && !explicitLines
              ? phoneLines.map((part, i) => (
                  <Fragment key={part}>
                    {i > 0 && (
                      <>
                        <br className="md:hidden" />{" "}
                      </>
                    )}
                    {part}
                  </Fragment>
                ))
              : line}
          </span>
        ))}
      </Title>
      {description && (
        <p
          // On a phone the caption takes the muted grey (#b9b9b9).
          className={cn(
            "relative mt-(--figure-gap) text-center text-fg-strong max-md:text-muted",
            descriptionGap !== undefined && "md:mt-(--description-gap)",
            descriptionTone === "muted" && "text-muted",
          )}
          style={{ maxWidth }}
        >
          {typeof description === "string"
            ? description
            : description.map((line, i) => (
                <Fragment key={line}>
                  {/* Figma's breaks hold from md up; on a phone the lines
                      run on as one paragraph. */}
                  {i > 0 && (
                    <>
                      <br className="max-md:hidden" />{" "}
                    </>
                  )}
                  {line}
                </Fragment>
              ))}
        </p>
      )}
    </div>
  );
}
