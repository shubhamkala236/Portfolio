import Image from "next/image";

import { Eyebrow } from "@/components/ui/eyebrow";
import type { CaseStudyBlock } from "@/content/types";

type QuoteClusterBlockProps = Extract<
  CaseStudyBlock,
  { type: "quote-cluster" }
>;

/**
 * Quote chips orbiting a central figure.
 *
 * Figma positions each chip absolutely. That does not survive a narrow
 * viewport, so the chips are laid out in rows that spread apart as space
 * allows and simply stack on small screens; the figure sits in the middle of
 * the cluster on large screens and above it on small ones.
 */
export function QuoteClusterBlock({
  eyebrow,
  intro,
  quotes,
  figure,
}: QuoteClusterBlockProps) {
  // The design groups the chips 3 / 2 / 2 around the figure.
  const rows = [quotes.slice(0, 3), quotes.slice(3, 5), quotes.slice(5)].filter(
    (row) => row.length > 0,
  );

  return (
    <div className="flex flex-col gap-10">
      {(eyebrow || intro) && (
        <div className="flex flex-col gap-4">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {intro && <p className="text-pretty text-fg-strong">{intro}</p>}
        </div>
      )}

      <div className="relative flex flex-col items-center gap-7 py-6">
        <div className="relative z-10 size-40 shrink-0 overflow-hidden rounded-round border border-border bg-surface-sunken lg:absolute lg:top-[124px] lg:left-1/2 lg:size-60 lg:-translate-x-1/2">
          <Image
            src={figure.src}
            alt={figure.alt}
            fill
            sizes="240px"
            className="scale-125 object-contain"
          />
        </div>

        {rows.map((row, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-center gap-7 lg:w-full lg:flex-nowrap lg:justify-between"
          >
            {row.map((quote) => (
              <p
                key={quote}
                className="w-full max-w-[17rem] rounded-chip bg-surface px-6 py-4 text-label font-medium text-fg sm:w-[17rem]"
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
