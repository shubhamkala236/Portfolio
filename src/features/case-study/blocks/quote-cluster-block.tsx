import Image from "next/image";

import { Eyebrow } from "@/components/ui/eyebrow";
import type { CaseStudyBlock } from "@/content/types";

type QuoteClusterBlockProps = Extract<
  CaseStudyBlock,
  { type: "quote-cluster" }
>;

/**
 * Quote chips arranged around a central figure.
 *
 * Figma lays the chips out in three rows with deliberately uneven gaps
 * (27 / 271 / 388px) so they open up around the figure, which is positioned
 * absolutely over them. Those exact gaps are reproduced from `lg` up; below
 * that the chips simply wrap and the figure sits inline above them, since the
 * arrangement depends on a width that is not there.
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

  return (
    <div className="flex flex-col gap-10">
      {(eyebrow || intro) && (
        <div className="flex flex-col gap-4">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {intro && <p className="text-pretty text-fg-strong">{intro}</p>}
        </div>
      )}

      <div className="relative flex flex-col items-center gap-7 py-6">
        <div className="relative z-10 size-40 shrink-0 overflow-hidden rounded-round border border-border bg-surface-sunken lg:absolute lg:top-[124px] lg:left-1/2 lg:h-[240px] lg:w-[243px] lg:-translate-x-1/2">
          <Image
            src={figure.src}
            alt={figure.alt}
            fill
            sizes="243px"
            className="scale-125 object-contain"
          />
        </div>

        {groupedRows.map((row, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-center gap-7 lg:flex-nowrap lg:gap-0"
            style={{ ["--row-gap" as string]: `${rowGaps[index] ?? 27}px` }}
          >
            {row.map((quote) => (
              <p
                key={quote}
                className="w-full max-w-[272px] rounded-chip bg-surface px-6 py-4 text-label font-medium text-fg sm:w-[272px] not-first:lg:ml-[var(--row-gap)]"
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
