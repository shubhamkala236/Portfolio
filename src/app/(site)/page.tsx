import { featuredProjects } from "@/content/projects";
import { AboutSection } from "@/features/about/about-section";
import { ContactSection } from "@/features/contact/contact-section";
import { ExperienceSection } from "@/features/experience/experience-section";
import { HeroSection } from "@/features/hero/hero-section";
import { ProjectsSection } from "@/features/projects/projects-section";

/** The home page only composes sections — all markup lives in the features. */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection projects={featuredProjects} />
      <AboutSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
