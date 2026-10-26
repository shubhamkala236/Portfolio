"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import type { HomeContent } from "@/content/types";
import {
  scrollTabIntoView,
  useGlassLens,
  useSelectionHold,
} from "@/components/ui/use-glass-lens";
import { TabIcon } from "@/components/ui/tab-icon";
import { cn } from "@/lib/cn";
import { newTabProps, opensNewTab } from "@/lib/links";

type HomeNavProps = HomeContent["nav"];

/** How far past its anchor line a section may sit and still count as reached. */
const REACHED_SLACK = 2;

/**
 * The home page's pill tab bar (Figma 4506:84854): 12px between tabs, drawn
 * as liquid glass in the file's own colours, the selected tab on a glass
 * lens that glides from tab to tab (`glass-bar`, `useGlassLens`).
 *
 * It sticks to the top of the page while it scrolls. The bar is a
 * zero-height sticky strip at the top of the page, so it takes no room:
 * from md up its pill hangs at Figma's 45px over the hero, below md over
 * the hero. Only the pill takes clicks. On a phone the bar sits at the foot
 * of the screen, 24px clear of it, each tab drawn as a 20px icon (its label
 * kept for screen readers); should the pill still not fit, its tabs scroll
 * sideways inside it (by swipe; no scrollbar), the raised tab kept in
 * view.
 *
 * The raised tab follows the page, as in the case studies' section nav: it
 * is the last `#section` tab whose section has reached its scroll-margin
 * line under the bar (where a tab click lands it), or the last one once the
 * page is scrolled to the end. Above the first, it is `current` (Home).
 * Links out (Resume) are never raised.
 */
export function HomeNav({ label, items, current }: HomeNavProps) {
  const [active, setActive] = useState(current);
  const tabRefs = useRef(new Map<string, HTMLAnchorElement>());
  const listRef = useGlassLens<HTMLUListElement>(active);
  // A clicked tab is raised at once and kept while the page scrolls to it.
  const recheck = useRef(() => {});
  const { hold, held } = useSelectionHold(() => recheck.current());
  const select = (label: string) => {
    hold();
    setActive(label);
  };

  useEffect(() => {
    const sections = items.filter((item) => item.href.startsWith("#"));
    let frame = 0;

    function update() {
      frame = 0;
      if (held.current) return;
      let next = current;
      const root = document.documentElement;
      const atEnd =
        window.scrollY + window.innerHeight >= root.scrollHeight - 2;
      sections.forEach((item) => {
        const section = document.getElementById(item.href.slice(1));
        if (!section) return;
        const line = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
        const top = section.getBoundingClientRect().top;
        if (
          top - line <= REACHED_SLACK ||
          (atEnd && top < window.innerHeight)
        ) {
          next = item.label;
        }
      });
      setActive(next);
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
  }, [items, current, held]);

  // Where the bar scrolls sideways (phones), keep the raised tab in it.
  useEffect(() => {
    scrollTabIntoView(listRef.current, tabRefs.current.get(active));
  }, [active, listRef]);

  return (
    <div
      data-zoom-nav
      // On a phone the bar sits at the foot of the screen instead.
      className="@container pointer-events-none sticky top-0 z-10 h-0 max-md:fixed max-md:inset-x-0 max-md:top-auto max-md:bottom-0 max-md:h-auto"
    >
      <div
        className="flex justify-center md:home-nav-drop"
        style={{ "--u": "calc(100cqw / 1512)" } as CSSProperties}
      >
        <nav
          aria-label={label}
          className="pointer-events-auto max-w-full px-4 py-2 max-md:nav-bottom-safe md:px-6"
        >
          <ul
            ref={listRef}
            className="glass-bar flex w-max max-w-full items-center gap-1 rounded-round p-2 max-md:scrollbar-none max-md:overflow-x-auto md:gap-3"
          >
            <li aria-hidden className="glass-lens" />
            {items.map((item) => {
              const raised = item.label === active;
              // No hover change: the lens marks the selection, as in Figma.
              const className = cn(
                "flex items-center justify-center rounded-round px-3 pt-1.5 pb-2 text-tab font-medium whitespace-nowrap transition-colors duration-300 md:min-w-18 md:px-4",
                raised
                  ? "text-fg drop-shadow-tab-active"
                  : "text-tab-idle drop-shadow-tab",
              );
              // On a phone the tab shows its icon; the label stays for
              // screen readers. From md up, the label as in Figma.
              const face = item.icon ? (
                <>
                  <TabIcon name={item.icon} className="size-5 md:hidden" />
                  <span className="max-md:sr-only">{item.label}</span>
                </>
              ) : (
                item.label
              );
              const ref = (element: HTMLAnchorElement | null) => {
                if (element) tabRefs.current.set(item.label, element);
                else tabRefs.current.delete(item.label);
              };
              return (
                <li key={item.label} className="relative">
                  {item.href.startsWith("/") && !opensNewTab(item.href) ? (
                    // Home: back to the top of the page. Next doesn't scroll
                    // for a link to the page it is on, so do it here (the
                    // page's `scroll-behavior` keeps it smooth) and drop the
                    // section's #hash from the address.
                    <Link
                      ref={ref}
                      href={item.href}
                      aria-current={raised ? "page" : undefined}
                      className={className}
                      onClick={(event) => {
                        if (window.location.pathname !== item.href) return;
                        event.preventDefault();
                        select(current);
                        window.history.replaceState(null, "", item.href);
                        window.scrollTo({ top: 0 });
                      }}
                    >
                      {face}
                    </Link>
                  ) : (
                    // Sections scroll natively (smoothly, via the page's
                    // `scroll-behavior`); links out and the résumé open in
                    // a new tab.
                    <a
                      ref={ref}
                      href={item.href}
                      {...newTabProps(item.href)}
                      aria-current={raised ? "true" : undefined}
                      className={className}
                      onClick={
                        item.href.startsWith("#")
                          ? () => select(item.label)
                          : undefined
                      }
                    >
                      {face}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
