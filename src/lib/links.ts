/**
 * Whether a link opens in a new tab: anything off the site, and files on
 * it (the résumé PDF). Mail links and in-page anchors stay in place.
 */
export function opensNewTab(href: string): boolean {
  return /^https?:\/\//.test(href) || /\.pdf$/i.test(href);
}

/** `target`/`rel` for a link, set only where it opens a new tab. */
export function newTabProps(href: string) {
  return opensNewTab(href)
    ? ({ target: "_blank", rel: "noreferrer noopener" } as const)
    : {};
}
