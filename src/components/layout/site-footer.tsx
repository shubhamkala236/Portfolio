import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border py-10">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-subtle">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <ul className="flex flex-wrap gap-6">
          {siteConfig.socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
