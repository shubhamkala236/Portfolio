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
  /**
   * A tighter cluster of blocks, mirroring a nested frame in Figma.
   * `gap` is the Figma gap in px; it scales down with the rest of the page.
   */
  | {
      type: "group";
      gap: number;
      blocks: readonly CaseStudyBlock[];
    }
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
      /** How many chips sit in each row. Figma: 3 / 2 / 2. */
      rows?: readonly number[];
      /** Gap between chips within each row, in px. Figma: 27 / 271 / 388. */
      rowGaps?: readonly number[];
    }
  /** A large centred display line used as a chapter break. */
  | {
      type: "heading";
      text: string;
      figure?: ImageAsset;
      /** Rendered size of the figure in px. Defaults to 134. */
      figureSize?: number;
      /** Figma gap between figure and text, in px. Defaults to 16. */
      figureGap?: number;
      /** Figma text width in px, so line breaks fall where they do in the file. */
      maxWidth?: number;
      size?: "lg" | "md";
    }
  /**
   * A still of the app's own tab bar, naming the sections the walkthrough
   * steps through. Illustrative, not navigation.
   */
  | {
      type: "tab-bar";
      items: readonly string[];
      activeIndex?: number;
    }
  /**
   * Feature cards on a three-column grid. Pairs of cards alternate across the
   * grid and flip their caption above/below the art — see the renderer.
   */
  | {
      type: "feature-grid";
      eyebrow?: string;
      title?: string;
      description?: string;
      items: readonly {
        title: string;
        description: string;
        image: ImageAsset;
      }[];
    }
  /**
   * A bottom-aligned row of visuals kept at their Figma proportions.
   * Widths are expressed as a share of `frameWidth` (the design frame).
   */
  | {
      type: "image-row";
      eyebrow?: string;
      title?: string;
      description?: string;
      frameWidth?: number;
      items: readonly { image: ImageAsset; bordered?: boolean }[];
    }
  /**
   * An annotated screen walkthrough. The figure is a single exported image
   * because the callouts are hand-placed; `annotations` repeats their text so
   * it stays readable on small screens and available to assistive tech.
   */
  | {
      type: "annotated-figure";
      eyebrow?: string;
      title?: string;
      description?: string;
      /** Optional heading for one figure within a larger section. */
      subtitle?: string;
      image: ImageAsset;
      /** Each callout needs at least one of the two. */
      annotations: readonly { title?: string; text?: string }[];
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
