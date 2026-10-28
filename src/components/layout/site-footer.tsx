import type { CSSProperties } from "react";

import { Chamfer } from "@/components/ui/chamfer";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";
import { newTabProps } from "@/lib/links";

/** The footer frame (Figma 4506:83007), 721 tall in the 1512 page. */
const FRAME = { width: 1512, height: 721 };
/**
 * The brush's last stroke ends 146 down the frame: below it the field is
 * solid red. On a phone the field is drawn whole across the screen and the
 * content starts PHONE_GAP below the brush, with `footer-bottom` below it
 * (less on a case study); from md up the content is centred in the solid
 * red (`footer-centred`, globals.css).
 */
const BRUSH_BOTTOM = 146;
const PHONE_GAP = "3rem";
/** A button's box (4506:83427). */
const BUTTON_HEIGHT = 115.424;
/** The chrome layers' offsets inside a button, Figma px. */
const SHADOW = { top: 8.88, right: 0, bottom: 0.42, left: 8.88 };
const EDGE = { top: 0, right: 8.88, bottom: 9.3, left: 0 };
const FACE = { top: 8.88, right: 17.76, bottom: 18.18, left: 8.88 };
/**
 * The dot texture (4506:84864): 1522.09 × 1116.06, drawn upside down at
 * (-5, -3) in the frame — taller than the frame, so on narrow screens, where
 * the content outgrows the frame, the dots carry on down as in the file.
 */
const DOTS = { x: -5, y: -3, width: 1522.09, height: 1116.06 };
/**
 * The dots sit on a regular grid — rows 45.48 apart, every other row half a
 * step across — so ten of its 90.96 periods, from 169.8 down the frame,
 * repeat seamlessly. On a phone, where the dots shrink with the art, this
 * band carries them on below the layer's own end, from 1079.4 down.
 */
const DOT_BAND = { top: 169.8, height: 909.6 };
const DOT_BAND_END = DOT_BAND.top + DOT_BAND.height;
/**
 * Where the band takes over, as a share of the layer from its (unrotated)
 * top: the layer is cut there on a phone (`footer-dots-trim`).
 */
const DOTS_TRIM = (DOTS.height - (DOT_BAND_END - DOTS.y)) / DOTS.height;
/** The band's edges in the layer, as shares from its (unrotated) top. */
const BAND_CLIP = {
  top: DOTS_TRIM,
  bottom: (DOT_BAND.top - DOTS.y) / DOTS.height,
};
/** Copies of the band below the layer: enough for the tallest phone footer. */
const BAND_COPIES = [1, 2, 3, 4];
/** The label sits 4.26px right of and below the face's centre. */
const LABEL_NUDGE = 4.26;
/**
 * Hovered (Figma 4397:59221) the button presses into its shadow: the edge
 * moves 5 × 4.58px and the face 5.12 × 4.70px down-right, the shadow goes.
 */
const PRESS = { edge: { x: 5, y: 4.58 }, face: { x: 5.12, y: 4.7 } };

const percent = (value: number, of: number) => `${(value / of) * 100}%`;

/** Scale a Figma length with the frame once the page is wider than it. */
const scaled = (px: number) =>
  `max(${px}px, ${((px / FRAME.width) * 100).toFixed(4)}vw)`;

/**
 * The site footer (Figma 4506:83007): a red field with a dry-brush top edge
 * and a dot texture, the name and status, and four chunky chamfered buttons.
 *
 * On a phone each button is drawn whole at 65% (`footer-button-compact`),
 * so the chunky edges and labels keep their proportions in half a row.
 *
 * Hovered or keyboard-focused, a button presses into its shadow, its edge
 * turning white with a soft dark shadow (Figma 4397:59221) — at once, as the
 * file's hover sets no transition.
 *
 * The field is Figma's own art in two layers: the red with its brush edge
 * (a render), and the dots (the file's vector). The dots are black at 17%
 * in `overlay` mode in the file, so they are blended here the same way
 * rather than flattened — they darken the red and the page behind the brush
 * strokes exactly as Figma does. The field is drawn at the frame's 1512px
 * (cropped from the centre on narrower screens, scaled up on wider ones);
 * if the content outgrows it, the red carries on below and the dots with it.
 * On a phone the whole field shrinks to the screen's width instead, as the
 * hero's does — the full wave and its dots — and the dots' own grid carries
 * on down to the foot of the footer: copies of the layer, each cut to its
 * regular band (DOT_BAND), stacked below it.
 */
export function SiteFooter() {
  const { footer } = siteConfig;

  return (
    <footer
      className="relative mt-auto min-h-(--footer-min-h) overflow-hidden max-md:min-h-0"
      style={{ "--footer-min-h": scaled(FRAME.height) } as CSSProperties}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex flex-col items-center"
      >
        {/* The red and its brush edge: the frame's width, or the screen's
            on a phone. */}
        <div
          className="relative w-full min-w-(--footer-frame-w) shrink-0 max-md:min-w-0"
          style={
            {
              "--footer-frame-w": `${FRAME.width}px`,
              aspectRatio: `${FRAME.width} / ${FRAME.height}`,
            } as CSSProperties
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- Figma's 1x/2x pair, served as is */}
          <img
            src="/ui/footer/brush@1x.png"
            srcSet="/ui/footer/brush@1x.png 1x, /ui/footer/brush@2x.png 2x"
            alt=""
            className="absolute inset-0 size-full"
          />
        </div>
        <div className="w-full flex-1 bg-footer-red" />
        {/* The dots: the frame's size, centred; the screen's on a phone. */}
        <div
          className="absolute top-0 left-1/2 w-(--footer-dots-w) -translate-x-1/2 max-md:w-full"
          style={
            {
              "--footer-dots-w": `max(100%, ${FRAME.width}px)`,
              aspectRatio: `${FRAME.width} / ${FRAME.height}`,
            } as CSSProperties
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- Figma's own vector, served as is */}
          <img
            src="/ui/footer/dots.svg"
            alt=""
            className="absolute max-w-none rotate-180 mix-blend-overlay footer-dots-trim"
            style={
              {
                left: percent(DOTS.x, FRAME.width),
                top: percent(DOTS.y, FRAME.height),
                width: percent(DOTS.width, FRAME.width),
                height: percent(DOTS.height, FRAME.height),
                "--dots-trim": `${(DOTS_TRIM * 100).toFixed(4)}%`,
              } as CSSProperties
            }
          />
          {/* On a phone, the grid carried on down: the layer's band again
              and again, each copy one band lower. */}
          {BAND_COPIES.map((copy) => (
            // eslint-disable-next-line @next/next/no-img-element -- Figma's own vector, served as is
            <img
              key={copy}
              src="/ui/footer/dots.svg"
              alt=""
              className="absolute max-w-none rotate-180 mix-blend-overlay md:hidden"
              style={{
                left: percent(DOTS.x, FRAME.width),
                top: percent(DOTS.y + copy * DOT_BAND.height, FRAME.height),
                width: percent(DOTS.width, FRAME.width),
                height: percent(DOTS.height, FRAME.height),
                clipPath: `inset(${(BAND_CLIP.top * 100).toFixed(4)}% 0 ${(BAND_CLIP.bottom * 100).toFixed(4)}% 0)`,
              }}
            />
          ))}
        </div>
      </div>

      <Container
        data-reveal-group
        className="footer-centred relative flex flex-col gap-16 footer-bottom text-fg-strong max-md:pt-(--footer-top-phone)"
        style={
          {
            "--footer-brush": scaled(BRUSH_BOTTOM),
            "--footer-top-phone": `calc(${((BRUSH_BOTTOM / FRAME.width) * 100).toFixed(4)}vw + ${PHONE_GAP})`,
          } as CSSProperties
        }
      >
        {/* On a phone: a 40px name, 16px over the tagline. */}
        <div className="flex flex-col gap-6 font-brand font-opsz-14 max-md:gap-4">
          <p className="text-footer-name max-md:text-footer-name-sm">
            {footer.name}
          </p>
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
                // A tap shows the hover look too (TapPress).
                data-press
                className="group/button relative block w-full max-sm:footer-button-compact lg:w-footer-button"
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
                  className="group-hover/button:invisible group-focus-visible/button:invisible group-data-pressed/button:invisible"
                />
                <Chamfer
                  tone="edge"
                  inset={EDGE}
                  trim={0.12}
                  className="group-hover/button:invisible group-focus-visible/button:invisible group-data-pressed/button:invisible"
                />
                {/* The hovered edge: white, pressed, with its soft shadow.
                    Pressed layers move by position, not transform, so their
                    pieces snap to whole pixels as at rest (no seams). */}
                <span className="invisible absolute top-(--edge-y) left-(--edge-x) size-full group-hover/button:visible group-focus-visible/button:visible group-data-pressed/button:visible">
                  <Chamfer
                    tone="highlight"
                    inset={EDGE}
                    trim={0.12}
                    className="drop-shadow-footer-button"
                  />
                </span>
                <span className="absolute top-0 left-0 size-full group-hover/button:top-(--face-y) group-hover/button:left-(--face-x) group-focus-visible/button:top-(--face-y) group-focus-visible/button:left-(--face-x) group-data-pressed/button:top-(--face-y) group-data-pressed/button:left-(--face-x)">
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
