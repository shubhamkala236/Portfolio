import { Geist, Geist_Mono } from "next/font/google";

/**
 * Swap these for the typefaces in the Figma file. The CSS variable names are
 * consumed by globals.css, so only this file changes.
 */
export const fontSans = Geist({
  variable: "--font-sans-var",
  subsets: ["latin"],
  display: "swap",
});

export const fontMono = Geist_Mono({
  variable: "--font-mono-var",
  subsets: ["latin"],
  display: "swap",
});

export const fontVariables = `${fontSans.variable} ${fontMono.variable}`;
