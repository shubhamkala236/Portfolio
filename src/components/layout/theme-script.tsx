/**
 * Applies the stored (or system) theme before first paint so the page never
 * flashes the wrong colours. Kept tiny and inline on purpose.
 */
const script = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme =
      stored === 'light' || stored === 'dark' ? stored : prefersDark ? 'dark' : 'light';
  } catch (e) {
    document.documentElement.dataset.theme = 'light';
  }
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
