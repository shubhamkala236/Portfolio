"use client";

import { useEffect } from "react";

/** How long the pressed look stays after the finger lifts, ms. */
const HOLD_MS = 600;

/**
 * Touch screens never hover, so a tap on an element marked `data-press`
 * (the footer buttons, the case-study pager arrows) shows its hover look
 * instead: it is marked `data-pressed` while the finger is down and a
 * moment after (styled with `data-pressed:` / `group-data-pressed/…:`).
 * A mouse hovers as usual. Root layout; renders nothing.
 */
export function TapPress() {
  useEffect(() => {
    const timers = new WeakMap<HTMLElement, number>();

    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        "[data-press]",
      );
      if (!target) return;
      window.clearTimeout(timers.get(target));
      target.dataset.pressed = "";
      const release = () => {
        timers.set(
          target,
          window.setTimeout(() => {
            delete target.dataset.pressed;
          }, HOLD_MS),
        );
      };
      target.addEventListener("pointerup", release, { once: true });
      target.addEventListener("pointercancel", release, { once: true });
    };

    document.addEventListener("pointerdown", onDown, { passive: true });
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  return null;
}
