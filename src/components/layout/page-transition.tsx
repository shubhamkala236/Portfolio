"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { zoomFromCard, zoomSuitsScreen } from "@/components/layout/card-zoom";
import { readHomeScroll } from "@/components/layout/route-memory";

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

/**
 * Each kind's timings, ms — keep in step with globals.css. `hold`: how long
 * the cover stays up at least before it opens (the blob gets its moment).
 */
const TIMING = {
  blob: { cover: 350, hold: 650, reveal: 1100 },
  curtain: { cover: 600, hold: 0, reveal: 700 },
} as const;

type Phase = "idle" | "cover" | "reveal";
type Kind = keyof typeof TIMING | "zoom";

const nextFrames = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );

/** The case-study hero's image, once it has loaded (or null). */
async function heroImage() {
  const img = document.querySelector<HTMLImageElement>("[data-zoom-hero] img");
  if (img) await img.decode().catch(() => undefined);
  return img;
}

/**
 * Page transitions for links marked `data-page-transition`, in three kinds:
 *
 * - `="zoom"`, after dsnikhil.com's: a home work card grows into its case
 *   study's hero while the home page fades to the page colour; the case
 *   study loads underneath and the copy hands over to its hero (card-zoom).
 *   The home page's project cards. On a phone held upright, where the hero
 *   is a short strip and the zoom wouldn't read, they play the curtain
 *   instead.
 * - (default) the blob, after hyperfoundation.org's intro: the page colour
 *   covers the screen with a morphing red blob; the new page loads behind
 *   it; then the blob becomes a window that grows until the new page fills
 *   the screen. Not in use at the moment.
 * - `="curtain"`, after arunkumarrs.com's: a black curtain rises from below
 *   to cover the screen (0.6s), the new page loads behind it, and it carries
 *   on up and off the top (0.7s), both on a strong ease in-out. The case
 *   studies' "Thanks for reading" arrows, the way home included.
 *
 * A link marked `data-page-transition-home` returns to the home page where
 * the visitor left it: the page is scrolled there under the cover.
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
  const [kind, setKind] = useState<Kind>("blob");
  const target = useRef<string | null>(null);
  const timing = useRef<(typeof TIMING)[keyof typeof TIMING]>(TIMING.blob);
  /** Where to scroll the arriving page under the cover, if anywhere. */
  const landAt = useRef<number | null>(null);
  const coveredAt = useRef(0);
  const overlay = useRef<HTMLDivElement>(null);
  const zoomRoot = useRef<HTMLDivElement>(null);
  /** A zoom runs its own steps; the cover/reveal timers stand aside. */
  const zooming = useRef(false);
  /** Resolves when the given page is on screen. */
  const arrival = useRef<{ path: string; resolve: () => void } | null>(null);

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
      const toHome = link.hasAttribute("data-page-transition-home");
      const arrive = (path: string) =>
        new Promise<void>((resolve) => {
          arrival.current = { path, resolve };
        });

      // Zoom: a card into its hero — where the hero is big enough on the
      // screen for it to read. Elsewhere (a phone held upright) the cards
      // play the curtain, below.
      if (
        link.dataset.pageTransition === "zoom" &&
        zoomRoot.current &&
        zoomSuitsScreen()
      ) {
        const art = link.querySelector<HTMLElement>("[data-zoom-art]");
        // While the zoom is over the home page it passes under the home tab
        // bar, which fades with the page (`data-card-zoom` on <html>).
        const html = document.documentElement;
        if (art) {
          zooming.current = true;
          html.dataset.cardZoom = "leave";
          setKind("zoom");
          setPhase("cover");
          router.prefetch(href);
          const zoom = zoomFromCard(zoomRoot.current, art);
          void (async () => {
            await zoom.covered;
            const arrived = arrive(url.pathname);
            router.push(href);
            await arrived;
            delete html.dataset.cardZoom;
            await zoom.landed;
            await heroImage();
            await nextFrames();
            setPhase("reveal");
            await zoom.finish();
            zooming.current = false;
            setPhase("idle");
          })();
          return;
        }
      }

      // A bare `data-page-transition` is the blob; "curtain", and a zoom
      // that doesn't suit the screen, the curtain.
      const nextKind: keyof typeof TIMING = link.dataset.pageTransition
        ? "curtain"
        : "blob";
      // Home goes to the page itself, scrolled to where it was left.
      const destination = toHome ? url.pathname : href;
      target.current = destination;
      timing.current = TIMING[nextKind];
      landAt.current = toHome ? readHomeScroll() : null;
      router.prefetch(destination);

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
      setKind(nextKind);
      setPhase("cover");
      window.setTimeout(
        () => router.push(destination, { scroll: landAt.current === null }),
        timing.current.cover,
      );
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [router]);

  // A zoom waiting for its page: let it know.
  useEffect(() => {
    if (arrival.current?.path !== pathname) return;
    arrival.current.resolve();
    arrival.current = null;
  }, [pathname]);

  // Open once the new route has rendered (and the blob has had its moment).
  useEffect(() => {
    if (zooming.current) return;
    if (phase !== "cover" || !target.current) return;
    if (pathname !== new URL(target.current, window.location.href).pathname) {
      return;
    }
    let frame = 0;
    const { cover, hold } = timing.current;
    const wait = Math.max(
      0,
      coveredAt.current + cover + hold - performance.now(),
    );
    const timer = window.setTimeout(() => {
      if (landAt.current !== null) {
        window.scrollTo({ top: landAt.current, behavior: "instant" });
        landAt.current = null;
      }
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
    if (zooming.current) return;
    if (phase !== "reveal") return;
    const timer = window.setTimeout(() => {
      target.current = null;
      setPhase("idle");
    }, timing.current.reveal);
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
    <>
      <div
        ref={zoomRoot}
        aria-hidden
        data-phase={phase}
        className="card-zoom"
      />
      <div
        ref={overlay}
        aria-hidden
        data-phase={phase}
        data-kind={kind}
        className="page-transition"
      >
        <div className="page-curtain" />
        <svg width="100%" height="100%">
          <defs>
            <mask id="page-transition-window">
              <rect width="100%" height="100%" fill="white" />
              <svg x="50%" y="50%" overflow="visible">
                <path
                  className="page-transition-hole"
                  d={BLOBS[0]}
                  fill="black"
                >
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
    </>
  );
}
