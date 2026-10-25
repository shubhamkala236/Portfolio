import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/** The 404 copy, shared by the site-wide and the case-study not-found pages. */
export function NotFoundMessage() {
  return (
    <Container data-reveal-group className="py-section text-center">
      <h1 className="text-title font-semibold">Page not found</h1>
      <p className="mt-4 text-muted">
        That link does not point anywhere on this site.
      </p>
      <ButtonLink href="/" className="mt-8">
        Back home
      </ButtonLink>
    </Container>
  );
}
