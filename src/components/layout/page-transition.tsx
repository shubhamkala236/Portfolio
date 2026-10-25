"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * The blob's three shapes (centred on 0,0, about 45px across each way),
 * drawn with the same commands so they morph into one another.
 */
const BLOBS = [
  "M0 -44 C25.5 -44 47 -28.6 47 0 C47 28.6 23.2 42 0 42 C-23.2 42 -45 26.8 -45 0 C-45 -26.8 -25.5 -44 0 -44 Z",
  "M0 -38 C26.2 -38 52 -27.3 52 0 C52 27.3 28.6 45 0 45 C-28.6 45 -40 26.5 -40 0 C-40 -26.5 -26.2 -38 0 -38 Z",
  "M0 -47 C24.7 -47 41 -27.2 41 0 C41 27.2 27.3 38 0 38 C-27.3 38 -50 27.1 -50 0 C-50 -27.1 -24.7 -47 0 -47 Z",
];
/** The morph loops through the shapes and back, this long. */
const MORPH = "2.4s";
/** The blob's smallest radius: the window must grow by (half-diagonal / this). */
const BLOB_MIN_RADIUS = 38;

/** Keep in step with the page-transition timings in globals.css. */
const COVER_MS = 350;
/** The blob shows at least this long before the window opens. */
const HOLD_MS = 650;
const REVEAL_MS = 1100;

type Phase = "idle" | "cover" | "reveal";

/**
 * A page transition after hyperfoundation.org's intro: a link marked
 * `data-page-transition` covers the screen with the page colour and a
 * morphing red blob; the new page loads behind it; then the blob becomes a
 * window that grows until the new page fills the screen.
 *
 * It takes over the click (so `Link` stands down — it ignores a click that
 * is already handled), navigates once the cover is up, and opens when the
 * new route has rendered. The new page's scroll reveals wait under the
 * cover and play as it opens (`data-page-transition` on <html>). Modified
 * clicks, and reduced motion, navigate as usual.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const target = useRef<string | null>(null);
  const coveredAt = useRef(0);
  const overlay = useRef<HTMLDivElement>(null);

  // Take over marked links.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        "a[data-page-transition]",
      );
      if (!link || link.target === "_blank") return;
      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      // Same page (an anchor, say): nothing to transition to.
      if (url.pathname === window.location.pathname) return;

      event.preventDefault();
      const href = url.pathname + url.search + url.hash;
      target.current = href;
      router.prefetch(href);

      // How far the window must grow to clear the screen's corners.
      overlay.current?.style.setProperty(
        "--hole-scale",
        String(
          Math.ceil(
            Math.hypot(window.innerWidth, window.innerHeight) /
              2 /
              BLOB_MIN_RADIUS,
          ) + 2,
        ),
      );
      coveredAt.current = performance.now();
      setPhase("cover");
      window.setTimeout(() => router.push(href), COVER_MS);
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [router]);

  // Open once the new route has rendered (and the blob has had its moment).
  useEffect(() => {
    if (phase !== "cover" || !target.current) return;
    if (pathname !== new URL(target.current, window.location.href).pathname) {
      return;
    }
    let frame = 0;
    const wait = Math.max(
      0,
      coveredAt.current + COVER_MS + HOLD_MS - performance.now(),
    );
    const timer = window.setTimeout(() => {
      // Two frames: let the new page paint under the cover first.
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => setPhase("reveal"));
      });
    }, wait);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [pathname, phase]);

  // Finish.
  useEffect(() => {
    if (phase !== "reveal") return;
    const timer = window.setTimeout(() => {
      target.current = null;
      setPhase("idle");
    }, REVEAL_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  // Let the rest of the page know (the scroll reveal waits under the cover).
  useEffect(() => {
    const root = document.documentElement;
    if (phase === "idle") delete root.dataset.pageTransition;
    else root.dataset.pageTransition = phase;
  }, [phase]);

  const morph = (
    <animate
      attributeName="d"
      dur={MORPH}
      repeatCount="indefinite"
      values={[...BLOBS, BLOBS[0]].join(";")}
      calcMode="spline"
      keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
    />
  );

  return (
    <div
      ref={overlay}
      aria-hidden
      data-phase={phase}
      className="page-transition"
    >
      <svg width="100%" height="100%">
        <defs>
          <mask id="page-transition-window">
            <rect width="100%" height="100%" fill="white" />
            <svg x="50%" y="50%" overflow="visible">
              <path className="page-transition-hole" d={BLOBS[0]} fill="black">
                {morph}
              </path>
            </svg>
          </mask>
        </defs>
        <rect
          className="page-transition-cover"
          width="100%"
          height="100%"
          mask="url(#page-transition-window)"
        />
        <svg x="50%" y="50%" overflow="visible">
          <path className="page-transition-blob" d={BLOBS[0]}>
            {morph}
          </path>
        </svg>
      </svg>
    </div>
  );
}
