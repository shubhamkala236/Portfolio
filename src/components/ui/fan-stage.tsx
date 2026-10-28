"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";

/** How much of the strip must be on screen before the fan opens. */
const IN_VIEW = 0.35;

type FanStageProps = {
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
};

/**
 * The photo fan's stage: it closes the fan into its stack once mounted, and
 * opens it, once, when the strip scrolls into view — then leaves it open.
 * A reload starts it closed again. The motion itself is CSS keyed off
 * `data-fan` (globals.css).
 *
 * Until it mounts (and under reduced motion, where it never arms) there is
 * no `data-fan`, so the fan simply shows open.
 */
export function FanStage({ style, className, children }: FanStageProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = ref.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Set on the element, not through React: nothing else renders from it.
    stage.dataset.fan = "closed";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        stage.dataset.fan = "open";
        observer.disconnect();
      },
      { threshold: IN_VIEW },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
