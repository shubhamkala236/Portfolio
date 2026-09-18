import Image from "next/image";

import type { CaseStudyBlock } from "@/content/types";

type HeadingBlockProps = Extract<CaseStudyBlock, { type: "heading" }>;

/** A large centred display line used as a chapter break. */
export function HeadingBlock({ text, figure }: HeadingBlockProps) {
  return (
    <div className="flex flex-col items-center gap-10">
      {figure && (
        <Image
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          sizes="134px"
          className="size-[134px]"
        />
      )}
      <p className="max-w-[46rem] text-center font-display text-title text-balance text-fg">
        {text}
      </p>
    </div>
  );
}
