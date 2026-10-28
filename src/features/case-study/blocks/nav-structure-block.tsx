import { DotList } from "@/components/ui/dot-list";
import { SectionHeader } from "@/components/ui/section-header";
import type { CaseStudyBlock } from "@/content/types";

type NavStructureBlockProps = Extract<
  CaseStudyBlock,
  { type: "nav-structure" }
>;

/** Gap between items, with the "•" centred in it (Figma 4106:5366). */
const SEPARATOR_WIDTH = 31;

/**
 * The app's four core sections as staggered cards (Figma 4106:5357).
 *
 * Each card is as wide as its content and indented by its Figma offset
 * (0 / 126 / 0 / 176px), 24px apart, with a "•" between items. Below `lg`
 * the cards drop the indent and let their items wrap; on a phone commas
 * separate them.
 */
export function NavStructureBlock({
  eyebrow,
  description,
  rows,
  width = 1100,
}: NavStructureBlockProps) {
  return (
    <div data-reveal-group className="flex flex-col items-center gap-16">
      <SectionHeader
        eyebrow={eyebrow}
        description={description}
        descriptionWeight="medium"
      />

      <div
        data-reveal-group
        className="flex w-full flex-col gap-6"
        style={{ maxWidth: width }}
      >
        {rows.map((row) => (
          <section
            key={row.title}
            className="flex flex-col gap-4 rounded-card bg-surface px-8 py-6 lg:ml-(--row-offset) lg:h-[108px] lg:w-max lg:flex-row lg:items-end lg:gap-20"
            style={{ ["--row-offset" as string]: `${row.offset}px` }}
          >
            <div className="flex shrink-0 flex-col items-start gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- 24px static SVG icon */}
              <img src={row.icon} alt="" width={24} height={24} />
              {/* `capitalize` as in Figma: "profile" renders "Profile". */}
              <h3 className="font-display text-card-title whitespace-nowrap text-fg-strong capitalize">
                {row.title}
              </h3>
            </div>

            <DotList
              items={row.items}
              gap={SEPARATOR_WIDTH}
              phoneCommas
              className="font-medium text-muted lg:flex-nowrap lg:whitespace-nowrap"
            />
          </section>
        ))}
      </div>
    </div>
  );
}
