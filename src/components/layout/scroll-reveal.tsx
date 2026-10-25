"use client";

import { useEffect } from "react";

/**
 * Reveal items: the direct children of a `data-reveal-group`, except nested
 * groups (whose own children reveal instead), `data-reveal-skip` children
 * and inline style/script tags. Keep in step with the rules in globals.css.
 */
const ITEMS =
  "[data-reveal-group] > :not([data-reveal-group], [data-reveal-skip], style, script)";
/** Between items that come into view together, ms (apple.com/mac's). */
const STEP_MS = 150;
/** The stagger stops growing after this many steps. */
const MAX_STEPS = 6;

/**
 * Site-wide scroll reveal, modelled on apple.com/mac: every reveal item
 * rises and fades into place the first time it scrolls into view, and
 * stays. Items that arrive together —
 * a page's opening blocks, a row of cards — stagger, in reading order.
 *
 * CSS hides items only while scripting is on (`@media (scripting:
 * enabled)`), so nothing flashes before this mounts, and pages without
 * JavaScript simply show. This marks the page `data-reveal="ready"` (or
 * "off" under reduced motion, which shows everything), watches new content
 * as client navigation renders it, and sets `data-revealed` with a
 * `--reveal-delay` on each item it reveals. Renders nothing.
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.dataset.reveal = "off";
      return;
    }
    root.dataset.reveal = "ready";

    const observer = new IntersectionObserver(
      (entries) => {
        const arriving = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => ({
            item: entry.target as HTMLElement,
            box: entry.boundingClientRect,
          }))
          .sort((p, q) => p.box.top - q.box.top || p.box.left - q.box.left);
        arriving.forEach(({ item }, step) => {
          item.style.setProperty(
            "--reveal-delay",
            `${Math.min(step, MAX_STEPS) * STEP_MS}ms`,
          );
          item.dataset.revealed = "";
          observer.unobserve(item);
        });
      },
      // An item reveals once its top is 10% up from the screen's bottom.
      { rootMargin: "0px 0px -10% 0px" },
    );

    const watched = new WeakSet<Element>();
    const watch = () => {
      document.querySelectorAll(ITEMS).forEach((item) => {
        if (watched.has(item)) return;
        watched.add(item);
        observer.observe(item);
      });
    };

    let frame = 0;
    const mutations = new MutationObserver(() => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          watch();
        });
      }
    });

    watch();
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
