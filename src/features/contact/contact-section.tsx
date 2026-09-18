import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/content/site";

export function ContactSection() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's work together"
      description="The fastest way to reach me is email. I reply to everything that isn't a cold pitch."
    >
      <ButtonLink href={`mailto:${siteConfig.email}`} size="lg">
        {siteConfig.email}
      </ButtonLink>
    </Section>
  );
}
