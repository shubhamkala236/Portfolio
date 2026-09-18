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

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * A case study is a sequence of blocks rather than a fixed template, because
 * every project tells its story in a different order. Adding a section to a
 * write-up means adding an entry to `blocks` — not editing a page component.
 *
 * To support a new kind of section: add a variant here, then add a matching
 * case to the switch in `src/features/case-study/case-study-blocks.tsx`.
 * TypeScript will flag the missing case for you.
 */
export type CaseStudyBlock =
  /** The PROJECT / ROLE / TIMELINE / SCOPE row, framed by hairline rules. */
  | {
      type: "meta";
      items: readonly { label: string; value: string }[];
    }
  /** A labelled run of paragraphs — the workhorse block. */
  | {
      type: "prose";
      eyebrow?: string;
      paragraphs: readonly string[];
    }
  /** Scattered quote chips orbiting a central figure. */
  | {
      type: "quote-cluster";
      eyebrow?: string;
      intro?: string;
      quotes: readonly string[];
      figure: ImageAsset;
    }
  /** Centred pull-quote: muted eyebrow above a large display line. */
  | {
      type: "statement";
      eyebrow?: string;
      text: string;
    }
  /**
   * A full-width visual. `image: null` renders the grey placeholder box that
   * is still sitting in the Figma file, so unfinished slots are visible rather
   * than silently collapsing.
   */
  | {
      type: "media";
      image: ImageAsset | null;
      /** Aspect ratio as width / height. Defaults to the Figma proportions. */
      ratio?: number;
      caption?: string;
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
  /** The line under the title in the hero. */
  subtitle: string;
  /** One line, shown on cards and in search results. */
  summary: string;
  year: number;
  role: string;
  stack: readonly string[];
  featured: boolean;
  links: ProjectLinks;
  /** Card image for the listings. */
  cover: ImageAsset | null;
  /** Full-bleed image under the case study title. */
  heroMedia: ImageAsset | null;
  blocks: readonly CaseStudyBlock[];
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
