import type { Metadata } from "next";

import { ScrollReveal } from "@/components/layout/scroll-reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { siteConfig } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import { buildMetadata } from "@/lib/seo";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata(),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVariables} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <a
          href="#main"
          className="sr-only rounded-round bg-accent text-accent-fg focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        {/* Each route group's layout supplies the header (or not) and <main>. */}
        {children}
        <SiteFooter />
        <ScrollReveal />
      </body>
    </html>
  );
}
