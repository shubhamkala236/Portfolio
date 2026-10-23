import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { getProjectBySlug, getProjectSlugs } from "@/content/projects";
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
    <article
      className="overflow-x-clip pb-hero"
      data-headings={project.headings ?? "display"}
    >
      <CaseStudyHero
        title={project.title}
        subtitle={project.subtitle}
        media={project.heroMedia}
        render={project.heroRender}
      />

      <Container className="pt-hero">
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
