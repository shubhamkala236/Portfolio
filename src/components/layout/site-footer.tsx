import type { CSSProperties } from "react";

import { Chamfer } from "@/components/ui/chamfer";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";
import { newTabProps } from "@/lib/links";

/** The footer frame (Figma 4506:83007), 721 tall in the 1512 page. */
const FRAME = { width: 1512, height: 721 };
/** Where the content starts (4506:83422), and the room left below it. */
const CONTENT_TOP = 231.64;
const CONTENT_BOTTOM = 147.94;
/** A button's box (4506:83427). */
const BUTTON_HEIGHT = 115.424;
/** The chrome layers' offsets inside a button, Figma px. */
const SHADOW = { top: 8.88, right: 0, bottom: 0.42, left: 8.88 };
const EDGE = { top: 0, right: 8.88, bottom: 9.3, left: 0 };
const FACE = { top: 8.88, right: 17.76, bottom: 18.18, left: 8.88 };
/** The label sits 4.26px right of and below the face's centre. */
const LABEL_NUDGE = 4.26;
/**
 * Hovered (Figma 4397:59221) the button presses into its shadow: the edge
 * moves 5 × 4.58px and the face 5.12 × 4.70px down-right, the shadow goes.
 */
const PRESS = { edge: { x: 5, y: 4.58 }, face: { x: 5.12, y: 4.7 } };

/** Scale a Figma length with the frame once the page is wider than it. */
const scaled = (px: number) =>
  `max(${px}px, ${((px / FRAME.width) * 100).toFixed(4)}vw)`;

/**
 * The site footer (Figma 4506:83007): a red field with a dry-brush top edge
 * and a dot texture, the name and status, and four chunky chamfered buttons.
 *
 * Hovered or keyboard-focused, a button presses into its shadow, its edge
 * turning white with a soft dark shadow (Figma 4397:59221) — at once, as the
 * file's hover sets no transition.
 *
 * The field is Figma's own render in two layers. The dots are black at 17%
 * in `overlay` mode in the file, so they are blended here the same way
 * rather than flattened — they darken the red and the page behind the brush
 * strokes exactly as Figma does. The field is drawn at the frame's 1512px
 * (cropped from the centre on narrower screens, scaled up on wider ones),
 * with plain red below it if the content outgrows it.
 */
export function SiteFooter() {
  const { footer } = siteConfig;

  return (
    <footer
      className="relative mt-auto overflow-hidden"
      style={{ minHeight: scaled(FRAME.height) }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex flex-col items-center"
      >
        <div
          className="relative w-full shrink-0"
          style={{
            minWidth: FRAME.width,
            aspectRatio: `${FRAME.width} / ${FRAME.height}`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- Figma's 1x/2x pair, served as is */}
          <img
            src="/ui/footer/brush@1x.png"
            srcSet="/ui/footer/brush@1x.png 1x, /ui/footer/brush@2x.png 2x"
            alt=""
            className="absolute inset-0 size-full"
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- Figma's 1x/2x pair, served as is */}
          <img
            src="/ui/footer/dots@1x.png"
            srcSet="/ui/footer/dots@1x.png 1x, /ui/footer/dots@2x.png 2x"
            alt=""
            className="absolute inset-0 size-full mix-blend-overlay"
          />
        </div>
        <div className="w-full flex-1 bg-footer-red" />
      </div>

      <Container
        data-reveal-group
        className="relative flex flex-col gap-16 text-fg-strong"
        style={{
          paddingTop: scaled(CONTENT_TOP),
          paddingBottom: CONTENT_BOTTOM,
        }}
      >
        <div className="flex flex-col gap-6 font-brand font-opsz-14">
          <p className="text-footer-name">{footer.name}</p>
          <p className="text-footer-tagline">{footer.tagline}</p>
        </div>

        <ul
          data-reveal-group
          className="grid grid-cols-2 gap-4 lg:flex lg:justify-between"
        >
          {footer.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...newTabProps(link.href)}
                className="group/button relative block w-full lg:w-footer-button"
                style={
                  {
                    height: BUTTON_HEIGHT,
                    "--edge-x": `${PRESS.edge.x}px`,
                    "--edge-y": `${PRESS.edge.y}px`,
                    "--face-x": `${PRESS.face.x}px`,
                    "--face-y": `${PRESS.face.y}px`,
                  } as CSSProperties
                }
              >
                <Chamfer
                  tone="face"
                  inset={SHADOW}
                  trim={0.12}
                  className="group-hover/button:invisible group-focus-visible/button:invisible"
                />
                <Chamfer
                  tone="edge"
                  inset={EDGE}
                  trim={0.12}
                  className="group-hover/button:invisible group-focus-visible/button:invisible"
                />
                {/* The hovered edge: white, pressed, with its soft shadow.
                    Pressed layers move by position, not transform, so their
                    pieces snap to whole pixels as at rest (no seams). */}
                <span className="invisible absolute top-(--edge-y) left-(--edge-x) size-full group-hover/button:visible group-focus-visible/button:visible">
                  <Chamfer
                    tone="highlight"
                    inset={EDGE}
                    trim={0.12}
                    className="drop-shadow-footer-button"
                  />
                </span>
                <span className="absolute top-0 left-0 size-full group-hover/button:top-(--face-y) group-hover/button:left-(--face-x) group-focus-visible/button:top-(--face-y) group-focus-visible/button:left-(--face-x)">
                  <Chamfer tone="face" inset={FACE} trim={0.36}>
                    <span
                      className="absolute -translate-1/2 font-button text-footer-button font-bold whitespace-nowrap"
                      style={{
                        left: `calc(50% + ${LABEL_NUDGE}px)`,
                        top: `calc(50% + ${LABEL_NUDGE}px)`,
                      }}
                    >
                      {link.label}
                    </span>
                  </Chamfer>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
