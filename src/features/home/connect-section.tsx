import { DottedArrow } from "@/components/ui/dotted-arrow";
import type { HomeContent } from "@/content/types";

type ConnectSectionProps = HomeContent["connect"];

/** The list's width (4506:83702) and the letters' stagger (4506:83774). */
const LIST_WIDTH = 667;
const LETTER_STEP_MS = 102;

/**
 * Let's connect (Figma 4506:83700): the title on the left, the numbered
 * links on the right between hairline rules — index, label, then the pixel
 * arrow.
 *
 * Each row plays the file's animation (4506:83774, drawn on Email) while it
 * is hovered or keyboard-focused: its letters rise into place one after
 * another and its arrow pulses tail to head. At rest every row is still.
 * Reduced motion keeps them still.
 */
export function ConnectSection({ title, links }: ConnectSectionProps) {
  return (
    <section
      id="connect"
      aria-labelledby="connect-title"
      className="flex scroll-mt-home-anchor flex-col items-start justify-between gap-10 lg:flex-row"
    >
      <h2
        id="connect-title"
        className="font-brand text-home-title text-fg-strong font-opsz-14"
      >
        {title}
      </h2>
      <ul
        className="w-full border-t border-home-rule"
        style={{ maxWidth: LIST_WIDTH }}
      >
        {links.map((link) => {
          const external = link.href.startsWith("http");
          return (
            <li key={link.label} className="border-b border-home-rule">
              <a
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer noopener" : undefined}
                aria-label={link.label}
                className="group/play flex items-center gap-5 py-6 text-fg-strong"
              >
                <span aria-hidden className="text-home-index">
                  {link.index}
                </span>
                <span aria-hidden className="flex-1 text-home-link">
                  {[...link.label].map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block motion-safe:group-hover/play:animate-letter-rise motion-safe:group-focus-visible/play:animate-letter-rise"
                      style={{ animationDelay: `${index * LETTER_STEP_MS}ms` }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
                <DottedArrow pulse="hover" />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
