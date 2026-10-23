import { pathTextGlyphs } from "@/content/home-path-text";
import { u } from "@/features/home/stage";

/** Figma's type for the curve (4506:84182): DM Sans Black 19.314px at 1.2. */
const SIZE = 19.314;

/**
 * The line that runs along the hero's lower edge (Figma 4506:84181), set
 * glyph by glyph exactly where Figma's text-on-a-path put each one. The
 * glyphs are decorative; screen readers get the sentence once.
 */
export function PathText({ text }: { text: string }) {
  return (
    <>
      <p className="sr-only">{text}</p>
      <div aria-hidden className="absolute inset-0">
        {pathTextGlyphs.map((glyph, index) => (
          <span
            key={index}
            className="absolute flex items-center justify-center"
            style={{
              left: u(glyph.x - glyph.width / 2),
              top: u(glyph.y),
              width: u(glyph.width),
              height: u(glyph.height),
            }}
          >
            <span
              className="flex-none font-brand font-black whitespace-nowrap text-fg-strong font-opsz-14"
              style={{
                fontSize: u(SIZE),
                lineHeight: 1.2,
                rotate: `${glyph.rotate}deg`,
              }}
            >
              {glyph.char}
            </span>
          </span>
        ))}
      </div>
    </>
  );
}
