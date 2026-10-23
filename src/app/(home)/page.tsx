import { Container } from "@/components/ui/container";
import { home } from "@/content/home";
import { AboutSection } from "@/features/home/about-section";
import { ConnectSection } from "@/features/home/connect-section";
import { HeroSection } from "@/features/home/hero-section";
import { WorksSection } from "@/features/home/works-section";

/**
 * The home page (Figma 4512:101365): the hero, then the work, about and
 * connect sections 200px apart in the 1258px column, 200px above the
 * footer.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection hero={home.hero} nav={home.nav} />
      <Container className="flex flex-col gap-hero py-hero">
        <WorksSection {...home.works} />
        <AboutSection {...home.about} />
        <ConnectSection {...home.connect} />
      </Container>
    </>
  );
}
