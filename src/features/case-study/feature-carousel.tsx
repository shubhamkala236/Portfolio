"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { ImageAsset } from "@/content/types";

type FeatureCarouselProps = {
  /** The section's title: the carousel's name for screen readers. */
  label?: string;
  items: readonly { title: string; description: string; image: ImageAsset }[];
};

/** The centre card's share of the screen's width; the rest frames it. */
const CARD_SHARE = 0.72;
/** The cards behind the centre one: dimmed and slightly out of focus. */
const BEHIND = "brightness(0.75) blur(2px)";

/** How long each card holds the centre before the next slides in, ms. */
const HOLD_MS = 2600;
/** A swipe this long (px) moves the stack on. */
const SWIPE_PX = 40;

/**
 * Where a card sits for its distance from the centre card: 0 in front at
 * full size, ±1 peeking out behind either side, the rest tucked away.
 */
const SLOTS = {
  0: { x: "0%", scale: 1, z: 3, opacity: 1 },
  1: { x: "46%", scale: 0.78, z: 2, opacity: 1 },
  far: { x: "70%", scale: 0.6, z: 1, opacity: 0 },
} as const;

/**
 * A phone's take on the ELEMENTS feature cards, after the stacked carousel
 * the designer pointed to (pinterest.com/pin/1135470124824311744): one card
 * large in front, its neighbours smaller behind it either side, and every
 * few seconds the next one slides in from the right, growing into the
 * centre as the last shrinks away to the left; the cards behind are dimmed
 * and slightly blurred. The centre card's title and description fade in
 * under it, aligned with its edges (24px below, 4px apart). A swipe, or
 * a tap on a side card, moves it — and stops it moving on its own; so does
 * reduced motion. It only runs while on screen.
 */
export function FeatureCarousel({ label, items }: FeatureCarouselProps) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const start = useRef<number | null>(null);
  const count = items.length;
  const first = items[0]?.image;

  // Run only while on screen, and never under reduced motion.
  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    // Under reduced motion it never counts as on screen: it holds still.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !visible || count < 2) return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % count),
      HOLD_MS,
    );
    return () => window.clearInterval(timer);
  }, [auto, visible, count]);

  const go = (index: number) => {
    setAuto(false);
    setActive(((index % count) + count) % count);
  };

  /** A card's signed distance from the centre card, the short way round. */
  const distance = (index: number) => {
    let d = (index - active) % count;
    if (d > count / 2) d -= count;
    if (d < -count / 2) d += count;
    return d;
  };

  const current = items[active];

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      className="flex flex-col gap-6 md:hidden"
    >
      <div
        ref={stage}
        className="relative left-1/2 w-screen -translate-x-1/2 touch-pan-y overflow-hidden"
        style={{
          aspectRatio: first
            ? `${first.width / CARD_SHARE} / ${first.height}`
            : undefined,
        }}
        onPointerDown={(event) => {
          start.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (start.current === null) return;
          const dx = event.clientX - start.current;
          start.current = null;
          if (Math.abs(dx) >= SWIPE_PX) go(active + (dx < 0 ? 1 : -1));
        }}
        onPointerCancel={() => {
          start.current = null;
        }}
      >
        {items.map((item, index) => {
          const d = distance(index);
          const slot =
            d === 0 ? SLOTS[0] : Math.abs(d) === 1 ? SLOTS[1] : SLOTS.far;
          const side = d < 0 ? "-" : "";
          return (
            <button
              key={item.title}
              type="button"
              aria-label={`${index + 1} of ${count}: ${item.title}`}
              aria-current={d === 0 || undefined}
              tabIndex={Math.abs(d) <= 1 ? 0 : -1}
              onClick={() => d !== 0 && go(index)}
              className="absolute top-0 duration-700 ease-card"
              style={{
                filter: d === 0 ? "none" : BEHIND,
                left: `${((1 - CARD_SHARE) / 2) * 100}%`,
                width: `${CARD_SHARE * 100}%`,
                transitionProperty: "translate, scale, opacity, filter",
                translate: d === 0 ? "0" : `${side}${slot.x} 0`,
                scale: slot.scale,
                zIndex: slot.z,
                opacity: slot.opacity,
              }}
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                sizes="72vw"
                className="h-auto w-full"
              />
            </button>
          );
        })}
      </div>

      {current && (
        <div
          key={current.title}
          aria-live={auto ? "off" : "polite"}
          // As wide as the centre card and under it, edges aligned.
          className="flex animate-caption-in flex-col gap-1 self-center motion-reduce:animate-none"
          style={{ width: `${CARD_SHARE * 100}vw` }}
        >
          {/* `capitalize` as in Figma: "Try-ons" renders "Try-Ons". */}
          <h3 className="font-display text-card-title text-fg capitalize">
            {current.title}
          </h3>
          <p className="text-muted">{current.description}</p>
        </div>
      )}
    </div>
  );
}
