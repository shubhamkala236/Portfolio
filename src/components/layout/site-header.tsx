import Link from "next/link";

import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-2">
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-pill px-4 py-2 text-sm text-muted transition-colors hover:bg-surface-hover hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ThemeToggle />
          <MobileNav items={siteConfig.nav} />
        </div>
      </Container>
    </header>
  );
}
