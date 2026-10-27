"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useTrailBack } from "@/components/layout/route-memory";
import { DottedArrow } from "@/components/ui/dotted-arrow";
import { cn } from "@/lib/cn";

type CaseStudyBackProps = {
  /** The way home, and its label. */
  home: { href: string; label: string };
  /** Every case study, to name a step back along the trail. */
  projects: readonly { slug: string; title: string }[];
};

/** The top of the screen the back button keeps to, px. */
const CLEAR_TOP = 76;

/**
 * A phone's way back from a case study: a 36px glass button, its arrow 12px
 * across, pinned to the
 * top left. It steps back along the visitor's trail (as the pager's previous
 * arrow does) — home, where the page was left, or the case study before —
 * and home when there is no trail. It stands down once the "Thanks for
 * reading" pager comes into view, which has its own way on, and while a
 * case study's own tab bar is pinned at the top (Elements), so they never
 * overlap. From md up it isn't drawn.
 */

export function CaseStudyBack({ home, projects }: CaseStudyBackProps) {
  const back = useTrailBack();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const pager = document.querySelector("[data-pager]");
      const bar = document.querySelector("[data-section-nav] nav");
      const reached =
        !!pager && pager.getBoundingClientRect().top < window.innerHeight;
      const rect = bar?.getBoundingClientRect();
      const barPinned = !!rect && rect.top < CLEAR_TOP && rect.bottom > 0;
      setHidden(reached || barPinned);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const step = projects.find((project) => `/projects/${project.slug}` === back);
  const href = step ? `/projects/${step.slug}` : home.href;
  const label = step ? `Previous case study: ${step.title}` : home.label;

  return (
    <Link
      href={href}
      aria-label={label}
      data-page-transition="curtain"
      data-page-transition-home={step ? undefined : true}
      data-press
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={cn(
        "group/play fixed top-4 left-4 z-50 transition-opacity duration-300 md:hidden",
        hidden && "pointer-events-none opacity-0",
      )}
    >
      {/* The glass sits on its own element: it positions itself. */}
      <span
        aria-hidden
        className="glass-bar flex size-9 items-center justify-center rounded-full"
      >
        <span className="flex -scale-x-100 items-center justify-center">
          <DottedArrow pulse="hover" className="rotate-45 back-glyph" />
        </span>
      </span>
    </Link>
  );
}
