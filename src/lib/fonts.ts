import { Gloock, Quicksand } from "next/font/google";

/**
 * The two typefaces in the Figma file. The CSS variable names are consumed by
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

export const fontVariables = `${fontDisplay.variable} ${fontSans.variable}`;
