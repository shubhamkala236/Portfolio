/**
 * Case studies have no site header: as in Figma, each opens straight onto
 * its full-bleed hero.
 */
export default function CaseStudyLayout({ children }: LayoutProps<"/">) {
  return (
    <main id="main" className="flex-1">
      {children}
    </main>
  );
}
