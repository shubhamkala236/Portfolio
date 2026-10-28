"use client";

import { useEffect, useRef } from "react";

/** How long the red shows on its own under reduced motion, ms. */
const HOLD_MS = 800;

const nextFrames = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );

/** Resolves once the element's running CSS animations have finished. */
const settled = (element: Element | null) =>
  Promise.all(
    (element?.getAnimations() ?? []).map((animation) => animation.finished),
  ).catch(() => undefined);

type WebNoticeProps = {
  message: string;
};

/**
 * The phone notice: the home page opened on a phone opens on its hero's
 * red and polka dots with `message`; after 800ms the pager arrows' black
 * curtain rises over it and, once the page is ready, lifts off onto it
 * (CSS: `.web-notice`).
 * The head script decides whether it shows (`data-web-notice` on <html>);
 * this plays it out and clears the mark. The page's scroll reveals wait
 * under it. Under reduced motion the red shows for its moment, then goes.
 */
export function WebNotice({ message }: WebNoticeProps) {
  const curtain = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.webNotice !== "cover") return;
    let cancelled = false;
    let timer = 0;
    const clear = () => {
      if (!cancelled) delete root.dataset.webNotice;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = window.setTimeout(clear, HOLD_MS);
      return () => {
        cancelled = true;
        window.clearTimeout(timer);
      };
    }

    void (async () => {
      // The curtain is up (it may have risen before the page was ready).
      await settled(curtain.current);
      await nextFrames();
      if (cancelled) return;
      root.dataset.webNotice = "reveal";
      await settled(curtain.current);
      clear();
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div aria-hidden className="web-notice">
      <div className="web-notice-field">
        <p className="center-tight-tracking text-center font-brand text-web-notice text-balance text-fg-strong uppercase">
          {message}
        </p>
      </div>
      <div ref={curtain} className="web-notice-curtain" />
    </div>
  );
}
