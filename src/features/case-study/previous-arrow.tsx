"use client";

import { useRouter } from "next/navigation";

import { useCameFrom } from "@/components/layout/route-memory";
import { PagerArrow } from "@/features/case-study/pager-arrow";

type PreviousArrowProps = {
  /** The previous case study in the loop. */
  href: string;
  label: string;
  /** Where "back" goes when the visitor came from there. */
  home: { href: string; label: string };
};

/**
 * The pager's previous arrow. It leads to the previous case study in the
 * loop — unless the visitor opened this one from the home page, in which
 * case it leads back home: back through history where it can (so the home
 * page returns to where they were), else as a plain link.
 */
export function PreviousArrow({ href, label, home }: PreviousArrowProps) {
  const router = useRouter();
  const cameFrom = useCameFrom();

  const canGoBack = typeof window !== "undefined" && window.history.length > 1;

  if (cameFrom !== home.href) {
    return <PagerArrow href={href} label={label} direction="previous" />;
  }

  return (
    <PagerArrow
      href={home.href}
      label={home.label}
      direction="previous"
      // With history to go back through, the curtain transition goes back
      // (keeping the home page's scroll); under reduced motion, which skips
      // the transition, this click does.
      back={canGoBack}
      onClick={(event) => {
        if (event.defaultPrevented || !canGoBack) return;
        event.preventDefault();
        router.back();
      }}
    />
  );
}
