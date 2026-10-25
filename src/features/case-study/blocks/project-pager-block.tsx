import { getProjectBySlug } from "@/content/projects";
import type { CaseStudyBlock } from "@/content/types";
import { HeadingBlock } from "@/features/case-study/blocks/heading-block";
import { MemojiMark } from "@/features/case-study/memoji-mark";
import { PagerArrow } from "@/features/case-study/pager-arrow";
import { PreviousArrow } from "@/features/case-study/previous-arrow";

type ProjectPagerBlockProps = Extract<
  CaseStudyBlock,
  { type: "project-pager" }
>;

/**
 * The sign-off between arrows to the previous and next case studies (Figma
 * 4506:82963): a row of the two arrows and the badge, centred on the badge,
 * and the heading `figureGap` below it. The case studies loop; opened from
 * the home page, the previous arrow leads back home instead.
 *
 * Figma draws only the desktop row. Where the badge and both arrows no
 * longer fit side by side, the badge and heading come first and the arrows
 * sit below them, at the row's two ends.
 */
export function ProjectPagerBlock({
  previous,
  next,
  width,
  heading,
}: ProjectPagerBlockProps) {
  const before = getProjectBySlug(previous);
  const after = getProjectBySlug(next);
  const { mark, figureGap = 16, ...text } = heading;

  return (
    <div
      className="mx-auto flex w-full flex-wrap items-center justify-between"
      style={{ maxWidth: width, rowGap: figureGap }}
    >
      {before && (
        <div className="order-3 md:order-0">
          <PreviousArrow
            href={`/projects/${before.slug}`}
            label={`Previous case study: ${before.title}`}
            home={{ href: "/", label: "Back to the home page" }}
          />
        </div>
      )}
      {mark && (
        <div className="order-1 flex w-full justify-center md:order-0 md:w-auto">
          <MemojiMark mark={mark} />
        </div>
      )}
      {after && (
        <div className="order-4 md:order-0">
          <PagerArrow
            href={`/projects/${after.slug}`}
            label={`Next case study: ${after.title}`}
            direction="next"
            lifted
          />
        </div>
      )}
      <div className="order-2 w-full md:order-0">
        <HeadingBlock type="heading" {...text} />
      </div>
    </div>
  );
}
