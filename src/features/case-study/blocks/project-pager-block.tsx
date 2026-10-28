import type { CSSProperties } from "react";

import { getProjectBySlug, projects } from "@/content/projects";
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
 * Figma draws only the desktop row. On a phone the row keeps its order,
 * smaller: 44px arrows either side of the badge, drawn at 134px, and the
 * heading 20px below.
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
      // data-pager: where the phone's back button stands down (CaseStudyBack).
      data-pager
      className="mx-auto flex w-full flex-wrap items-center justify-between gap-y-(--pager-gap) max-md:gap-y-5"
      style={
        { maxWidth: width, "--pager-gap": `${figureGap}px` } as CSSProperties
      }
    >
      {before && (
        <div>
          <PreviousArrow
            href={`/projects/${before.slug}`}
            label={`Previous case study: ${before.title}`}
            home={{ href: "/#work", label: "Back to the home page" }}
            projects={projects.map(({ slug, title }) => ({ slug, title }))}
          />
        </div>
      )}
      {mark && (
        <div className="flex justify-center max-md:pager-mark-compact">
          <MemojiMark mark={mark} />
        </div>
      )}
      {after && (
        <div>
          <PagerArrow
            href={`/projects/${after.slug}`}
            label={`Next case study: ${after.title}`}
            direction="next"
          />
        </div>
      )}
      <div className="w-full">
        <HeadingBlock type="heading" {...text} />
      </div>
    </div>
  );
}
