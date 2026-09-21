import Image from "next/image";
import type { CSSProperties } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import type { CaseStudyBlock } from "@/content/types";

type QuoteClusterBlockProps = Extract<
  CaseStudyBlock,
  { type: "quote-cluster" }
>;

/**
 * Geometry from Figma frame 4127:16375. Kept in one place and handed to the
 * markup as CSS variables, so the classes below stay free of magic numbers.
 */
const layout = {
  chipWidth: 272,
  /** The circle ("circ kriti", 4127:16389). */
  figureWidth: 243,
  figureHeight: 240,
  figureTop: 124,
  /**
   * Where the memoji sits inside the circle: an inset box that clips it, with
   * the image offset and oversized inside that box ("type=angry").
   */
  crop: {
    insetTop: "14.79%",
    insetRight: "16.58%",
    insetBottom: "14.79%",
    insetLeft: "16.2%",
    imageLeft: "-14.6%",
    imageTop: "-9.77%",
    imageWidth: "132.7%",
    imageHeight: "129.55%",
  },
} as const;

/**
 * Quote chips arranged around a central figure.
 *
 * Figma lays the chips out in three centred rows with deliberately uneven gaps
 * (27 / 271 / 388px) so they open up around the circle, which is positioned
 * absolutely over the middle of the frame. From `lg` up that is reproduced
 * exactly. Below it the arrangement depends on a width that is not there, so
 * the chips wrap and the circle sits in the flow above them.
 */
export function QuoteClusterBlock({
  eyebrow,
  intro,
  quotes,
  figure,
  rows = [3, 2, 2],
  rowGaps = [27, 271, 388],
}: QuoteClusterBlockProps) {
  // Slice the flat quote list into the rows the design groups them into.
  const groupedRows = rows.map((count, index) => {
    const start = rows.slice(0, index).reduce((sum, n) => sum + n, 0);
    return quotes.slice(start, start + count);
  });

  const vars = {
    "--chip-w": `${layout.chipWidth}px`,
    "--figure-w": `${layout.figureWidth}px`,
    "--figure-h": `${layout.figureHeight}px`,
    "--figure-top": `${layout.figureTop}px`,
  } as CSSProperties;

  return (
    <div className="flex flex-col gap-10">
      {(eyebrow || intro) && (
        <div className="flex flex-col gap-4">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {intro && <p className="text-pretty text-fg-strong">{intro}</p>}
        </div>
      )}

      <div
        className="relative flex flex-col items-center gap-7 py-6"
        style={vars}
      >
        <div className="relative h-(--figure-h) w-(--figure-w) shrink-0 rounded-round border border-border-faint bg-surface-sunken lg:absolute lg:top-(--figure-top) lg:left-1/2 lg:-translate-x-1/2">
          <div
            className="absolute overflow-hidden"
            style={{
              top: layout.crop.insetTop,
              right: layout.crop.insetRight,
              bottom: layout.crop.insetBottom,
              left: layout.crop.insetLeft,
            }}
          >
            <div
              className="absolute"
              style={{
                left: layout.crop.imageLeft,
                top: layout.crop.imageTop,
                width: layout.crop.imageWidth,
                height: layout.crop.imageHeight,
              }}
            >
              <Image src={figure.src} alt={figure.alt} fill sizes="220px" />
            </div>
          </div>
        </div>

        {groupedRows.map((row, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-center gap-7 lg:flex-nowrap lg:gap-(--row-gap)"
            style={
              { "--row-gap": `${rowGaps[index] ?? 27}px` } as CSSProperties
            }
          >
            {row.map((quote) => (
              <p
                key={quote}
                className="w-full max-w-(--chip-w) rounded-chip bg-surface px-6 py-4 text-chip font-medium text-fg sm:w-(--chip-w)"
              >
                {quote}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
