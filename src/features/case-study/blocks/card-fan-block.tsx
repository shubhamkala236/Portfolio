import Image from "next/image";
import type { CSSProperties } from "react";

import { FanStage } from "@/components/ui/fan-stage";
import type { CaseStudyBlock } from "@/content/types";

type CardFanBlockProps = Extract<CaseStudyBlock, { type: "card-fan" }>;

/** Between one card leaving the stack and the next, ms (as the home fan). */
const FAN_STEP_MS = 70;

/** A length in the frame's Figma px, scaled with the column (`--c`). */
const c = (px: number) => `calc(${px} * var(--c))`;

/**
 * A row of tilted illustration cards (MISS BLISS 4506:82878), played as the
 * home page's about-me photo fan (PhotoFan, FanStage): the cards wait
 * stacked, upright, on the front card until the row scrolls into view, then
 * spring out to their places in the file, nearest first, once, and stay.
 * Reduced motion shows them in place.
 *
 * Each card is built as in the file: a dark rounded card, turned, cropping
 * its illustration. Drawn in Figma px of the column (`--c` = 1/frame width),
 * the frame's own bleed past the column included, so the row keeps its
 * shape at any width.
 */
export function CardFanBlock({
  label,
  frame,
  bleed,
  card,
  cards,
  front = 0,
}: CardFanBlockProps) {
  const centre = (index: number) => {
    const box = cards[index].box;
    return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
  };
  const origin = centre(front);
  // Each card's reach from the front card: nearest leaves first.
  const reach = cards.map((_, index) => {
    const at = centre(index);
    return Math.hypot(origin.x - at.x, origin.y - at.y);
  });
  const rank = reach
    .map((value, index) => ({ value, index }))
    .sort((p, q) => p.value - q.value)
    .reduce<number[]>((order, { index }, place) => {
      order[index] = place;
      return order;
    }, []);

  return (
    <div className="@container w-full">
      <FanStage
        className="relative"
        style={
          {
            "--c": `calc(100cqw / ${frame.width})`,
            height: c(frame.height),
          } as CSSProperties
        }
      >
        <div role="img" aria-label={label} className="absolute inset-0">
          {cards.map((item, index) => {
            const at = centre(index);
            return (
              <div
                key={item.image.src}
                data-fan-card
                className="absolute flex items-center justify-center"
                style={
                  {
                    left: c(item.box.left + bleed.x),
                    top: c(item.box.top + bleed.y),
                    width: c(item.box.width),
                    height: c(item.box.height),
                    "--fan-x": c(origin.x - at.x),
                    "--fan-y": c(origin.y - at.y),
                    "--fan-r": `${-item.tilt}deg`,
                    "--fan-o": index === front ? 1 : 0,
                    "--fan-delay": `${rank[index] * FAN_STEP_MS}ms`,
                  } as CSSProperties
                }
              >
                <div
                  className="relative flex-none overflow-clip border-solid border-case-card-edge bg-case-card"
                  style={{
                    width: c(card.width),
                    height: c(card.height),
                    borderWidth: c(card.border),
                    borderRadius: c(card.radius),
                    boxShadow: `${c(-7)} ${c(5)} ${c(11.6)} ${c(-2)} var(--home-shadow)`,
                    rotate: `${item.tilt}deg`,
                  }}
                >
                  <div
                    className="absolute -translate-1/2 overflow-hidden"
                    style={{
                      left: `calc(50% + ${c(item.image.dx)})`,
                      top: `calc(50% + ${c(item.image.dy)})`,
                      width: c(item.image.width),
                      height: c(item.image.height),
                    }}
                  >
                    <Image
                      src={item.image.src}
                      alt=""
                      width={item.image.size}
                      height={item.image.size}
                      sizes="(min-width: 1024px) 480px, 160px"
                      className="absolute max-w-none"
                      style={{
                        left: item.image.crop.left,
                        top: item.image.crop.top,
                        width: item.image.crop.width,
                        height: item.image.crop.height,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </FanStage>
    </div>
  );
}
