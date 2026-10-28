import { WebNotice } from "@/components/layout/web-notice";
import { siteConfig } from "@/content/site";

/**
 * The home page has no site header: as in Figma, its own pill nav sits over
 * the hero. Opened on a phone, it first shows the web notice.
 */
export default function HomeLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <WebNotice message={siteConfig.webNotice} />
      <main id="main" className="flex-1">
        {children}
      </main>
    </>
  );
}
