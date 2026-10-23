import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's built-in font sizes. Without this, a
 * custom size like `text-label` is mistaken for a colour, so `text-label
 * text-muted` "conflicts" and the size is silently dropped. Keep this list in
 * step with the `--text-*` tokens in globals.css.
 */
const twMerge = extendTailwindMerge<"font-optical-size">({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "brand-title",
            "brand-heading",
            "brand-signoff",
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
      // The custom `font-opsz-14` utility (globals.css) sets the optical
      // size, not the family; as an unknown `font-*` it would otherwise be
      // read as a font family and knock out `font-brand`.
      "font-optical-size": ["font-opsz-14", "font-opsz-40"],
    },
  },
});

/** Merge conditional class names, with later Tailwind utilities winning. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
