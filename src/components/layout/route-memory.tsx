"use client";

import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

/** Session keys: the page on screen, and the one before it. */
const CURRENT = "route:current";
const PREVIOUS = "route:previous";

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

/** How long Back/Forward keeps smooth scrolling off while it restores. */
const RESTORE_MS = 1000;

/**
 * Remembers, for this tab, which page the visitor came from (root layout).
 * A reload keeps the answer: only a move to a different page updates it.
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
    if (current === pathname) return;
    write(PREVIOUS, current ?? "");
    write(CURRENT, pathname);
  }, [pathname]);

  return null;
}

const noSubscription = () => () => {};

/**
 * The page the visitor came to this one from, or null (a fresh visit, or
 * on the server). Read during render, so it also works on the first render
 * of a new page — before RouteMemory has caught up, the page still
 * recorded as current is the one just left.
 */
export function useCameFrom(): string | null {
  const pathname = usePathname();
  return useSyncExternalStore(
    noSubscription,
    () => {
      const current = read(CURRENT);
      if (current && current !== pathname) return current;
      return read(PREVIOUS) || null;
    },
    () => null,
  );
}
