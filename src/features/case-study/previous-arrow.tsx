"use client";

import { useTrailBack } from "@/components/layout/route-memory";
import { PagerArrow } from "@/features/case-study/pager-arrow";

type PreviousArrowProps = {
  /** The previous case study in the loop. */
  href: string;
  label: string;
  /** The way home, and its label. */
  home: { href: string; label: string };
  /** Every case study, to name a step back along the trail. */
  projects: readonly { slug: string; title: string }[];
};

/**
 * The pager's previous arrow: a step back along the visitor's trail (see
 * RouteMemory). Opened from the home page, the first case study's arrow
 * leads home — the curtain lands it where the home page was left; further
 * along, each one leads back to the case study before it, so stepping back
 * always ends at home. With no trail (a case study opened directly), it
 * follows the loop.
 */
export function PreviousArrow({
  href,
  label,
  home,
  projects,
}: PreviousArrowProps) {
  const back = useTrailBack();

  if (back === "/") {
    return (
      <PagerArrow
        href={home.href}
        label={home.label}
        direction="previous"
        returnHome
      />
    );
  }

  const step = projects.find((project) => `/projects/${project.slug}` === back);
  if (step) {
    return (
      <PagerArrow
        href={`/projects/${step.slug}`}
        label={`Previous case study: ${step.title}`}
        direction="previous"
      />
    );
  }

  return <PagerArrow href={href} label={label} direction="previous" />;
}
