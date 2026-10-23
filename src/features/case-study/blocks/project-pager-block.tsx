import { getProjectBySlug } from "@/content/projects";
import type { CaseStudyBlock } from "@/content/types";
import { HeadingBlock } from "@/features/case-study/blocks/heading-block";
import { PagerArrow } from "@/features/case-study/pager-arrow";

type ProjectPagerBlockProps = Extract<
  CaseStudyBlock,
  { type: "project-pager" }
>;

/**
 * The sign-off flanked by arrows to the previous and next case studies
 * (Figma 4506:82921): one row, the arrows centred on the heading's height.
 *
 * Figma draws only the desktop row. Where the three no longer fit side by
 * side, the heading takes its own line and the arrows sit below it, at the
 * row's two ends.
 */
export function ProjectPagerBlock({
  previous,
  next,
  width,
  heading,
}: ProjectPagerBlockProps) {
  const before = getProjectBySlug(previous);
  const after = getProjectBySlug(next);

  return (
    <div
      className="mx-auto flex w-full flex-wrap items-center justify-between gap-y-10 md:flex-nowrap"
      style={{ maxWidth: width }}
    >
      {before && (
        <PagerArrow
          href={`/projects/${before.slug}`}
          label={`Previous case study: ${before.title}`}
          direction="previous"
        />
      )}
      <div className="order-first w-full md:order-0 md:w-auto">
        <HeadingBlock type="heading" {...heading} />
      </div>
      {after && (
        <PagerArrow
          href={`/projects/${after.slug}`}
          label={`Next case study: ${after.title}`}
          direction="next"
        />
      )}
    </div>
  );
}
