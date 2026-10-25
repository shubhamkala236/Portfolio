import { NotFoundMessage } from "@/features/not-found/not-found-message";

/**
 * Unmatched URLs. This renders inside the root layout only (no route-group
 * layout), so it brings its own <main>. The site has no header: the page is
 * the message, then the footer.
 */
export default function NotFound() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <NotFoundMessage />
    </main>
  );
}
