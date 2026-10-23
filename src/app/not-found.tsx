import { SiteHeader } from "@/components/layout/site-header";
import { NotFoundMessage } from "@/features/not-found/not-found-message";

/**
 * Unmatched URLs. This renders inside the root layout only, so it brings the
 * header and <main> the route-group layouts would otherwise supply.
 */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <NotFoundMessage />
      </main>
    </>
  );
}
