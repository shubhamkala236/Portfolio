"use client";

import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

/**
 * Session keys: the page on screen, the trail of pages the visitor walked
 * through (JSON), and the home page's last scroll position.
 */
const CURRENT = "route:current";
const TRAIL = "route:trail";
const HOME_Y = "route:home-y";

const read = (key: string) => {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
};

const write = (key: string, value: string) => {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Storage off (private mode, say): the arrows simply keep their defaults.
  }
};

const readTrail = (): string[] => {
  try {
    const trail: unknown = JSON.parse(read(TRAIL) ?? "[]");
    return Array.isArray(trail)
      ? trail.filter((x) => typeof x === "string")
      : [];
  } catch {
    return [];
  }
};

/**
 * The breadcrumb trail after arriving at `pathname` from `from`: the home
 * page starts a trail; a step back along it (the previous arrow, or Back)
 * drops its end; a step on from its end (the next arrow, or a card from
 * home) extends it; arriving any other way starts a new one. A reload
 * leaves it as it is.
 */
function nextTrail(
  trail: readonly string[],
  from: string | null,
  pathname: string,
): readonly string[] {
  if (pathname === "/") return ["/"];
  if (trail.at(-1) === pathname) return trail;
  if (trail.length >= 2 && trail.at(-2) === pathname) return trail.slice(0, -1);
  if (from !== null && trail.at(-1) === from) return [...trail, pathname];
  return [pathname];
}

/** The home page's scroll position when it was last left, or null. */
export function readHomeScroll(): number | null {
  const y = Number(read(HOME_Y));
  return Number.isFinite(y) && read(HOME_Y) !== null ? y : null;
}

/** How long Back/Forward keeps smooth scrolling off while it restores. */
const RESTORE_MS = 1000;

/**
 * Remembers, for this tab, the trail of pages the visitor walked through
 * (root layout) — so a case study's previous arrow can step back along it,
 * all the way home — and where the home page was scrolled to. A reload
 * keeps both.
 *
 * It also makes Back/Forward land at once. The page scrolls smoothly for
 * in-page links, and the browser applies that to the position it restores
 * on Back too — the page would glide there, revealing everything it passed.
 * (`data-scroll-behavior` on <html> covers Next's own scrolling, not this.)
 * Clicking a link to a section of the page fires the same `popstate` in
 * Chrome; that one keeps its smooth scroll.
 * Renders nothing.
 */
export function RouteMemory() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    let timer = 0;
    // Set while a click on an in-page link is being handled (its popstate
    // fires during the click), cleared right after.
    let sectionClick = false;

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement) || !link.hash) return;
      if (link.pathname !== window.location.pathname) return;
      sectionClick = true;
      window.setTimeout(() => {
        sectionClick = false;
      }, 0);
    };

    const onPopState = () => {
      if (sectionClick) return;
      root.style.scrollBehavior = "auto";
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        root.style.removeProperty("scroll-behavior");
      }, RESTORE_MS);
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const current = read(CURRENT);
    write(TRAIL, JSON.stringify(nextTrail(readTrail(), current, pathname)));
    write(CURRENT, pathname);
  }, [pathname]);

  // On the home page, keep its scroll position for the way back.
  useEffect(() => {
    if (pathname !== "/") return;
    let frame = 0;
    const save = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        // Leaving home resets the scroll before this listener goes: only
        // record while home is still the page on screen.
        if (window.location.pathname !== "/") return;
        write(HOME_Y, String(Math.round(window.scrollY)));
      });
    };
    window.addEventListener("scroll", save, { passive: true });
    return () => {
      window.removeEventListener("scroll", save);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}

const noSubscription = () => () => {};

/**
 * Where this page's previous arrow steps back to along the trail — "/" for
 * the home page, a case study's path, or null (nothing behind it: a fresh
 * visit, or on the server). Read during render, so it also works on a new
 * page's first render, before RouteMemory has recorded the step.
 */
export function useTrailBack(): string | null {
  const pathname = usePathname();
  return useSyncExternalStore(
    noSubscription,
    () => nextTrail(readTrail(), read(CURRENT), pathname).at(-2) ?? null,
    () => null,
  );
}
