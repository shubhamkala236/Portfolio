import { SiteHeader } from "@/components/layout/site-header";

/** The home page and project index: the sticky site header over the page. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
    </>
  );
}
