import type { ReactNode } from "react";

import type { CaseStudyBlock } from "@/content/types";
import { SectionNav } from "@/features/case-study/section-nav";

type SectionNavBlockProps = Pick<
  Extract<CaseStudyBlock, { type: "section-nav" }>,
  "label" | "sections"
> & {
  /** Gap in Figma px between the bar and each section, scaled by --gap-scale. */
  gap: number;
  /** The rendered sections, each an element carrying its anchor id. */
  children: ReactNode;
};

/**
 * The tab bar (Figma 4286:7185) and the sections it links to, in one column.
 *
 * The bar is `sticky` inside this column, so it floats at the top of the screen
 * while the sections scroll past and lets go when the column ends, i.e. with
 * the last section. No scroll handling is needed for that; the client part
 * only highlights the section in view.
 *
 * The full-width sticky row ignores pointer events so it never blocks the
 * content beside the pill; the nav itself takes them back.
 */
export function SectionNavBlock({
  label,
  sections,
  gap,
  children,
}: SectionNavBlockProps) {
  return (
    <div
      data-reveal-group
      className="flex flex-col"
      style={{ gap: `calc(var(--gap-scale) * ${gap}px)` }}
    >
      <div
        data-reveal-skip
        data-section-nav
        className="pointer-events-none sticky top-section-nav z-40"
      >
        <SectionNav
          label={label}
          items={sections.map(({ id, label: text, icon }) => ({
            id,
            label: text,
            icon,
          }))}
        />
      </div>
      {children}
    </div>
  );
}
