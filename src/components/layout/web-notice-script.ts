/**
 * Runs in <head> before the page paints (root layout): the home page opened
 * on a phone marks <html> `data-web-notice="cover"`, which shows WebNotice
 * at once, so the page never flashes before it. Only a full page load —
 * a visitor already on the site moves between pages with the usual
 * transitions. Keep the width in step with Tailwind's `md` (48rem).
 */
export const webNoticeScript = `try{if(location.pathname==="/"&&matchMedia("(max-width: 47.99rem)").matches)document.documentElement.dataset.webNotice="cover"}catch(e){}`;
