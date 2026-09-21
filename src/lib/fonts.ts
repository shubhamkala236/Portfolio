import { Gloock, Nunito, Quicksand } from "next/font/google";

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

export const fontVariables = `${fontDisplay.variable} ${fontSans.variable} ${fontQuote.variable}`;
