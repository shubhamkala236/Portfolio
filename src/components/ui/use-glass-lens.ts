import { useEffect, useRef } from "react";

/**
 * Places a liquid-glass tab bar's lens (`.glass-lens`, globals.css) under
 * its selected tab — the one marked `aria-current` — and keeps it there as
 * the selection, the fonts or the bar's size change. It writes the lens's
 * box onto the list as `--lens-x`/`--lens-w`, marks the list `data-lens`
 * once placed, and only then `data-lens-animate`, so the lens appears in
 * place and glides from then on. No React state: nothing re-renders.
 *
 * `selected` is any value that changes with the selection. Returns the ref
 * to put on the tab list.
 */
export function useGlassLens<T extends HTMLElement>(selected: unknown) {
  const list = useRef<T>(null);

  useEffect(() => {
    const bar = list.current;
    if (!bar) return;

    const place = () => {
      // The tab's list item: its offset is measured from the bar (the item
      // itself is positioned, so the link's own offset would be 0).
      const tab = bar
        .querySelector("[aria-current]")
        ?.closest<HTMLElement>("li");
      if (!tab) {
        delete bar.dataset.lens;
        return;
      }
      bar.style.setProperty("--lens-x", `${tab.offsetLeft}px`);
      bar.style.setProperty("--lens-w", `${tab.offsetWidth}px`);
      bar.dataset.lens = "";
    };

    place();
    // Glide only after the first placement has painted.
    const frame = requestAnimationFrame(() => {
      bar.dataset.lensAnimate = "";
    });
    const resize = new ResizeObserver(place);
    resize.observe(bar);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
    };
  }, [selected]);

  return list;
}

/**
 * Where a tab bar scrolls sideways (phones), centre the given tab in it.
 * Does nothing while the bar fits.
 */
export function scrollTabIntoView(
  bar: HTMLElement | null,
  tab: HTMLElement | null | undefined,
) {
  if (!bar || !tab || bar.scrollWidth <= bar.clientWidth) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const offset =
    tab.getBoundingClientRect().left -
    bar.getBoundingClientRect().left +
    bar.scrollLeft;
  bar.scrollTo({
    left: offset - (bar.clientWidth - tab.offsetWidth) / 2,
    behavior: reduce.matches ? "auto" : "smooth",
  });
}
