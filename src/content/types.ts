/**
 * Shapes for every piece of editable content.
 *
 * Content files use `satisfies` against these types, so a typo or a missing
 * field is a compile error rather than a blank space on the live site.
 */

export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  role: string;
  /** Absolute origin, no trailing slash. Used for canonical URLs and OG tags. */
  url: string;
  description: string;
  email: string;
  location: string;
  nav: readonly NavItem[];
  socials: readonly SocialLink[];
};

export type ProjectLinks = {
  live?: string;
  repo?: string;
  caseStudy?: string;
};

export type Project = {
  /** URL segment: /projects/<slug> */
  slug: string;
  title: string;
  /** One line, shown on cards and in search results. */
  summary: string;
  /** Paragraphs for the detail page. */
  body: readonly string[];
  year: number;
  role: string;
  stack: readonly string[];
  featured: boolean;
  links: ProjectLinks;
  cover: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export type ExperienceItem = {
  company: string;
  role: string;
  start: string;
  /** Omit for the current role. */
  end?: string;
  summary: string;
  highlights: readonly string[];
};

export type SkillGroup = {
  title: string;
  items: readonly string[];
};
