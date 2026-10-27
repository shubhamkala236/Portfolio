import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import {
  getProjectBySlug,
  getProjectSlugs,
  projects,
} from "@/content/projects";
import { CaseStudyBack } from "@/features/case-study/case-study-back";
import { CaseStudyBlocks } from "@/features/case-study/case-study-blocks";
import { CaseStudyHero } from "@/features/case-study/case-study-hero";
import { buildMetadata } from "@/lib/seo";

/** Every project is known at build time, so all detail pages are static. */
export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return buildMetadata({ title: "Project not found" });

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    // The case study's hero: 1512 × 800, near the 1.91:1 a link card shows.
    image: project.heroRender && {
      url: project.heroRender.src1x,
      width: project.heroRender.width,
      height: project.heroRender.height,
      alt: project.heroRender.alt,
    },
  });
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const links = Object.entries(project.links).filter(([, href]) =>
    Boolean(href),
  );

  return (
    // overflow-x-clip: decorations bleed past the viewport edge as they do in
    // Figma; clip (not hidden) so no scroll container breaks the sticky nav.
    // pb-hero: the footer starts 200px under the last block, as in Figma.
    // data-case-study: on a phone its copy is set at 16px and its list
    // items at 12px (globals.css).
    <article
      className="overflow-x-clip pb-hero"
      data-case-study
      data-headings={project.headings ?? "display"}
    >
      {/* On a phone: a way back, pinned top left. */}
      <CaseStudyBack
        home={{ href: "/#work", label: "Back to the home page" }}
        projects={projects.map(({ slug, title }) => ({ slug, title }))}
      />
      <CaseStudyHero
        title={project.title}
        subtitle={project.subtitle}
        media={project.heroMedia}
        render={project.heroRender}
      />

      {/* On a phone the title sits 40px under the hero. */}
      <Container className="pt-hero max-md:pt-10">
        <CaseStudyBlocks blocks={project.blocks} />

        {links.length > 0 && (
          <ul className="mt-section flex flex-wrap gap-6">
            {links.map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-label text-accent underline underline-offset-4"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </article>
  );
}
