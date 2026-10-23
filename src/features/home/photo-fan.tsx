import Image from "next/image";
import type { CSSProperties } from "react";

import type { HomeContent } from "@/content/types";
import { a } from "@/features/home/stage";

/** The strip (4506:83538): 1258 × 360.359. */
const STRIP = { height: 360.359 };
/** Every card (e.g. 4506:83551): 201.301 × 256.746, white 0.921px edge. */
const CARD = { width: 201.301, height: 256.746, border: 0.921, radius: 19.98 };

type Placement =
  /** Offset from the card's top-left. */
  | { left: number; top: number }
  /** Offset of its centre from the card's centre. */
  | { dx: number; dy: number };

type Card = {
  /** The turned card's bounding box in the strip. */
  box: { left: number; top: number; width: number; height: number };
  /** The card's turn in the fan, ° (the file's resting state). */
  tilt: number;
  /** The photo's crop box in the card, its counter-turn and the image size. */
  photo: Placement & {
    width: number;
    height: number;
    tilt: number;
    image: { width: number; height: number };
  };
  /** Where it waits in the stack before the fan opens. */
  stacked: { x: number; y: number; visible: boolean };
  /** The leftmost card throws a longer, darker shadow. */
  deep?: boolean;
};

/** In the file's stacking order, 4506:83551 … 4506:83626. */
const cards: readonly Card[] = [
  {
    box: { left: 611.86, top: 73.67, width: 213.357, height: 266.085 },
    tilt: 2.743,
    photo: {
      dx: 15.69,
      dy: -94.62,
      width: 377.472,
      height: 490.581,
      tilt: -2.63,
      image: { width: 356.052, height: 474.735 },
    },
    stacked: { x: -97.386, y: -17.575, visible: true },
  },
  {
    box: { left: 204.8, top: 72.85, width: 242.419, height: 287.514 },
    tilt: 9.893,
    photo: {
      left: -4.1,
      top: -10.71,
      width: 208.547,
      height: 276.156,
      tilt: 0.68,
      image: { width: 205.294, height: 273.725 },
    },
    stacked: { x: 277.855, y: -16.75, visible: false },
  },
  {
    box: { left: 403.1, top: 29.39, width: 229.853, height: 278.458 },
    tilt: -6.693,
    photo: {
      dx: 0.28,
      dy: -0.2,
      width: 288.781,
      height: 362.25,
      tilt: 6.69,
      image: { width: 251.424, height: 335.232 },
    },
    stacked: { x: 123.662, y: 3.246, visible: false },
  },
  {
    box: { left: 987.91, top: 23.91, width: 270.094, height: 305.957 },
    tilt: -17.782,
    photo: {
      left: -19.33,
      top: -49.01,
      width: 246.492,
      height: 325.086,
      tilt: 1.09,
      image: { width: 240.416, height: 320.555 },
    },
    stacked: { x: -461.143, y: -29.289, visible: false },
  },
  {
    box: { left: 0, top: 18.9, width: 232.909, height: 280.693 },
    tilt: -7.454,
    photo: {
      left: -137.53,
      top: -243.47,
      width: 524.055,
      height: 695.961,
      tilt: -0.39,
      image: { width: 519.303, height: 692.404 },
    },
    stacked: { x: 526.763, y: 11.081, visible: false },
    deep: true,
  },
  {
    box: { left: 803.03, top: 0, width: 228.634, height: 277.561 },
    tilt: 6.392,
    photo: {
      dx: -23.3,
      dy: -0.64,
      width: 258.792,
      height: 258.792,
      tilt: 0,
      image: { width: 258.792, height: 258.792 },
    },
    stacked: { x: -304.848, y: 56.096, visible: false },
  },
];

const shadow = (deep?: boolean) =>
  deep
    ? `${a(6.447)} ${a(4.605)} ${a(30.392)} ${a(-27.629)} var(--home-shadow-deep)`
    : `${a(-6.447)} ${a(4.605)} ${a(10.683)} ${a(-1.842)} var(--home-shadow)`;

const placement = (photo: Card["photo"]): CSSProperties =>
  "dx" in photo
    ? {
        left: `calc(50% + ${a(photo.dx)})`,
        top: `calc(50% + ${a(photo.dy)})`,
        translate: "-50% -50%",
      }
    : { left: a(photo.left), top: a(photo.top) };

/**
 * The about-me photo strip (Figma 4506:83538): six cards fanned across the
 * column, each a white-edged card cropping a turned photo, as built in the
 * file.
 *
 * On the 12s loop the cards wait stacked on the fourth one until 2.5s, then
 * spring out to their places in 1.15s and hold (`animate-photo-fan`; each
 * card passes its stacked offset as CSS variables). Drawn in Figma px of
 * the 1258px strip (`--a`), so the fan keeps its shape at any width.
 * Reduced motion shows the fan at rest.
 */
export function PhotoFan({
  photos,
}: {
  photos: HomeContent["about"]["photos"];
}) {
  return (
    <div className="@container w-full">
      <div
        className="relative"
        style={
          {
            "--a": "calc(100cqw / 1258)",
            height: a(STRIP.height),
          } as CSSProperties
        }
      >
        {cards.map((card, index) => {
          const photo = photos[index];
          return (
            <div
              key={photo.src}
              className="absolute flex animate-photo-fan items-center justify-center motion-reduce:animate-none"
              style={
                {
                  left: a(card.box.left),
                  top: a(card.box.top),
                  width: a(card.box.width),
                  height: a(card.box.height),
                  "--fan-x": a(card.stacked.x),
                  "--fan-y": a(card.stacked.y),
                  "--fan-r": `${-card.tilt}deg`,
                  "--fan-o": card.stacked.visible ? 1 : 0,
                } as CSSProperties
              }
            >
              <div
                className="relative flex-none overflow-clip border-solid border-fg-strong bg-home-card"
                style={{
                  width: a(CARD.width),
                  height: a(CARD.height),
                  borderWidth: a(CARD.border),
                  borderRadius: a(CARD.radius),
                  boxShadow: shadow(card.deep),
                  rotate: `${card.tilt}deg`,
                }}
              >
                <div
                  className="absolute flex items-center justify-center"
                  style={{
                    ...placement(card.photo),
                    width: a(card.photo.width),
                    height: a(card.photo.height),
                  }}
                >
                  <div
                    className="relative flex-none"
                    style={{
                      width: a(card.photo.image.width),
                      height: a(card.photo.image.height),
                      rotate: `${card.photo.tilt}deg`,
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes={`${Math.ceil(card.photo.image.width)}px`}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
