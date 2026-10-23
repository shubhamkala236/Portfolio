/**
 * Figma px on the home page's scaled compositions. `--u` is one px of the
 * 1512px hero frame and `--a` one px of the 1258px about strip, each set as
 * a share of its container's width (see globals.css), so these drawings
 * keep Figma's proportions at any width.
 */
export const u = (px: number) => `calc(${px} * var(--u))`;
export const a = (px: number) => `calc(${px} * var(--a))`;
