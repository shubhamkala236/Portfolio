"use client";

import { useEffect, useRef, useState } from "react";

import { TabIcon } from "@/components/ui/tab-icon";
import {
  scrollTabIntoView,
  useGlassLens,
  useSelectionHold,
} from "@/components/ui/use-glass-lens";
import type { TabIconName } from "@/content/types";
import { cn } from "@/lib/cn";

type SectionNavProps = {
  label: string;
  items: readonly { id: string; label: string; icon?: TabIconName }[];
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
 *
 * On a phone each tab is drawn as its icon (the label kept for screen
 * readers), as in the home tab bar.
 */
export function SectionNav({ label, items }: SectionNavProps) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const listRef = useGlassLens<HTMLUListElement>(active);
  // A clicked tab is raised at once and kept while the page scrolls to it.
  const recheck = useRef(() => {});
  const { hold, held } = useSelectionHold(() => recheck.current());

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      if (held.current) return;
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

    recheck.current = schedule;
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items, held]);

  // Where the bar scrolls sideways (phones), keep the active tab in it.
  useEffect(() => {
    scrollTabIntoView(listRef.current, tabRefs.current[active]);
  }, [active, listRef]);

  return (
    <nav aria-label={label} className="pointer-events-auto">
      {/* Below lg the bar keeps to the screen and its tabs scroll sideways
          inside it (by swipe; no scrollbar). The padding keeps its shadow. */}
      <div className="py-2 lg:p-0">
        <ul
          ref={listRef}
          className="glass-bar mx-auto flex w-max max-w-full items-center rounded-round p-2 max-lg:scrollbar-none max-lg:overflow-x-auto max-md:gap-1"
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
                onClick={() => {
                  hold();
                  setActive(index);
                }}
                // No hover change: the lens marks the selection, as in Figma.
                className={cn(
                  "flex items-center justify-center rounded-round px-3 pt-1.5 pb-2 text-tab font-medium whitespace-nowrap transition-colors duration-300 md:min-w-18 md:px-4",
                  index === active
                    ? "text-fg drop-shadow-tab-active"
                    : "text-tab-idle drop-shadow-tab",
                )}
              >
                {item.icon ? (
                  <>
                    <TabIcon name={item.icon} className="size-5 md:hidden" />
                    <span className="max-md:sr-only">{item.label}</span>
                  </>
                ) : (
                  item.label
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
