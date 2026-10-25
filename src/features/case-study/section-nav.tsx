"use client";

import { useEffect, useRef, useState } from "react";

import { useGlassLens } from "@/components/ui/use-glass-lens";
import { cn } from "@/lib/cn";

type SectionNavProps = {
  label: string;
  items: readonly { id: string; label: string }[];
};

/** How far past its anchor line a section may sit and still count as reached. */
const REACHED_SLACK = 2;

/**
 * The tab bar's links. Each tab is a plain `#id` anchor, so clicking scrolls
 * to its section natively — smoothly, via the page's `scroll-behavior`, and
 * instantly under reduced motion — and works before hydration.
 *
 * What needs JavaScript is the highlight: the active tab follows the last
 * section whose top has reached its scroll-margin line under the bar (the
 * line a tab click lands it on). Before the first section, Home stays active,
 * as drawn.
 *
 * Styling is Figma's layout — tabs flush against each other — as liquid
 * glass: the bar is tinted glass and the selected tab sits on a glass lens
 * that glides from tab to tab (`glass-bar`, `useGlassLens`).
 */
export function SectionNav({ label, items }: SectionNavProps) {
  const [active, setActive] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const listRef = useGlassLens<HTMLUListElement>(active);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      let current = 0;
      items.forEach(({ id }, index) => {
        const section = document.getElementById(id);
        if (!section) return;
        const line = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
        if (section.getBoundingClientRect().top - line <= REACHED_SLACK) {
          current = index;
        }
      });
      setActive(current);
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  // Where the bar scrolls sideways (narrow screens), keep the active tab in it.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const tab = tabRefs.current[active];
    if (!scroller || !tab || scroller.scrollWidth <= scroller.clientWidth) {
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    scroller.scrollTo({
      left: tab.offsetLeft - (scroller.clientWidth - tab.offsetWidth) / 2,
      behavior: reduce.matches ? "auto" : "smooth",
    });
  }, [active]);

  return (
    <nav aria-label={label} className="pointer-events-auto">
      {/* Padding only while it scrolls, so the scroller doesn't clip the shadow. */}
      <div
        ref={scrollerRef}
        className="relative -mx-6 overflow-x-auto px-6 py-2 lg:mx-0 lg:overflow-visible lg:p-0"
      >
        <ul
          ref={listRef}
          className="glass-bar mx-auto flex w-max items-center rounded-round p-2"
        >
          <li aria-hidden className="glass-lens" />
          {items.map((item, index) => (
            <li key={item.id} className="relative">
              <a
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                href={`#${item.id}`}
                aria-current={index === active ? "true" : undefined}
                // No hover change: the lens marks the selection, as in Figma.
                className={cn(
                  "flex min-w-18 justify-center rounded-round px-4 pt-1.5 pb-2 text-tab font-medium whitespace-nowrap transition-colors duration-300",
                  index === active
                    ? "text-fg drop-shadow-tab-active"
                    : "text-subtle drop-shadow-tab",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
