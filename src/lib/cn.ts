import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's built-in font sizes. Without this, a
 * custom size like `text-label` is mistaken for a colour, so `text-label
 * text-muted` "conflicts" and the size is silently dropped. Keep this list in
 * step with the `--text-*` tokens in globals.css.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "title",
            "lead",
            "lead-md",
            "heading",
            "statement",
            "section-title",
            "figure-title",
            "card-title",
            "body",
            "label",
            "chip",
            "kicker",
            "tab",
            "flow-lg",
            "flow",
            "body-lg",
            "quote",
            "footer-name",
            "footer-tagline",
            "footer-button",
            "home-title",
            "home-work",
            "home-about",
            "home-link",
            "home-index",
          ],
        },
      ],
    },
  },
});

/** Merge conditional class names, with later Tailwind utilities winning. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
