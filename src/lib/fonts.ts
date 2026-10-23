import {
  DM_Sans,
  Gloock,
  Josefin_Sans,
  Nunito,
  Quicksand,
} from "next/font/google";

/**
 * The typefaces in the Figma file. The CSS variable names are consumed by
 * globals.css, so swapping a typeface only touches this file.
 */
export const fontDisplay = Gloock({
  variable: "--font-display-var",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const fontSans = Quicksand({
  variable: "--font-sans-var",
  subsets: ["latin"],
  display: "swap",
});

/** Pull quotes (Hotstuff 4253:22731): Nunito ExtraLight Italic only. */
export const fontQuote = Nunito({
  variable: "--font-quote-var",
  subsets: ["latin"],
  weight: "200",
  style: "italic",
  display: "swap",
});

/** The footer's name and tagline (4506:83424): DM Sans, optical size 14. */
export const fontBrand = DM_Sans({
  variable: "--font-brand-var",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

/** The footer's button labels (4506:83427): Josefin Sans Bold only. */
export const fontButton = Josefin_Sans({
  variable: "--font-button-var",
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

export const fontVariables = [
  fontDisplay,
  fontSans,
  fontQuote,
  fontBrand,
  fontButton,
]
  .map((font) => font.variable)
  .join(" ");
