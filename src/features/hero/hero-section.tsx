import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";

export function HeroSection() {
  return (
    <section className="py-block">
      <Container>
        <p className="mb-6 text-label text-muted uppercase">
          {siteConfig.location}
        </p>
        <h1 className="max-w-4xl text-display font-semibold text-balance">
          {siteConfig.role} building fast, accessible web products.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted">
          {siteConfig.description}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/#work" size="lg">
            View work
          </ButtonLink>
          <ButtonLink href="/#contact" size="lg" variant="secondary">
            Get in touch
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
