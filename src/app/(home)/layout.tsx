/**
 * The home page has no site header: as in Figma, its own pill nav sits over
 * the hero.
 */
export default function HomeLayout({ children }: LayoutProps<"/">) {
  return (
    <main id="main" className="flex-1">
      {children}
    </main>
  );
}
