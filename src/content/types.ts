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
  /** The site footer (Figma 4506:83007). */
  footer: {
    name: string;
    tagline: string;
    links: readonly SocialLink[];
  };
};

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * A frame exported from Figma at 1x and 2x, served untouched as a density
 * pair. `width`/`height` are CSS px — the 1x render's pixel size.
 */
export type FigmaRender = {
  src1x: string;
  src2x: string;
  alt: string;
  width: number;
  height: number;
  /**
   * When content hangs outside the frame (floating badges, say), the render
   * is larger than the frame. `bleed` places it: `x`/`y` is the render's
   * top-left relative to the frame's (so usually negative), `width`/`height`
   * its size — all CSS px. The frame box keeps `width`×`height` for layout.
   */
  bleed?: { x: number; y: number; width: number; height: number };
};

/** A chapter visual: a render, plus any separately placed renders over it. */
export type ChapterVisual = {
  render: FigmaRender;
  /** Positioned in the visual's frame coordinates, in CSS px. */
  overlays?: readonly { render: FigmaRender; x: number; y: number }[];
};

/** A callout on an annotated figure. Each needs at least one of the two. */
export type Annotation = { title?: string; text?: string };

/** One flow of a walkthrough: a titled run of annotated steps. */
export type WalkthroughFlow = {
  title?: string;
  /** "lg" = 40px untracked, "md" = 36px tracked. Defaults to "lg". */
  titleSize?: "lg" | "md";
  description?: string;
  /** Column width in Figma px (1100 for the flows, 1258 full width). */
  width: number;
  /** Figma gap between steps, in px. */
  stepGap: number;
  /** Numbered list titles ("1. …"). Defaults to true. */
  numbered?: boolean;
  steps: readonly {
    title: string;
    figure: FigmaRender;
    /** Text under the canvas, optionally led by a bold phrase. */
    note?: { lead?: string; text: string };
    annotations: readonly Annotation[];
  }[];
};

/**
 * The "circ kriti" memoji badge, described with Figma's own geometry so it can
 * be rebuilt exactly. All px values are Figma px.
 */
export type MemojiMark = {
  /** Layout size of the group. */
  box: { width: number; height: number };
  /** The dark circle, positioned inside the group. */
  circle: { size: number; x: number; y: number };
  /** A sprite sheet, and the crop Figma applies to show one frame of it. */
  sprite: {
    src: string;
    alt: string;
    crop: {
      insetTop: string;
      insetRight: string;
      insetBottom: string;
      insetLeft: string;
      imageLeft: string;
      imageTop: string;
      imageWidth: string;
      imageHeight: string;
    };
  };
  /**
   * A glowing sparkle. `size` is the glyph's box, `canvas` the exported SVG's
   * box (glyph plus glow), centred on it.
   */
  sparkle?: { src: string; size: number; canvas: number; x: number; y: number };
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
      /**
       * "gap" puts 80px between columns; "spread" spaces them across the full
       * width (justify-between), as Hotstuff's row does. Defaults to "gap".
       */
      layout?: "gap" | "spread";
      /** Rule gradient: the ELEMENTS/Sistem one, or Hotstuff's centred one. */
      rule?: "default" | "centred";
    }
  /** A left-aligned page title: display-size title over lead-size lines. */
  | {
      type: "page-title";
      title: string;
      /**
       * "display" is Gloock, tracked (the default); "brand" is DM Sans
       * SemiBold, tightened (Miss Bliss 4506:82855).
       */
      titleStyle?: "display" | "brand";
      /** One entry per line, where Figma breaks the subtitle explicitly. */
      subtitle: readonly string[];
      /** "lg" is 44px (the default); "md" 40px, as on Miss Bliss. */
      subtitleSize?: "lg" | "md";
      /** Figma px between title and subtitle. Defaults to 16. */
      subtitleGap?: number;
    }
  /** One of Figma's own renders on its own, at the content width. */
  | {
      type: "render";
      render: FigmaRender;
    }
  /**
   * The sign-off between round arrow links to the neighbouring case studies
   * (Miss Bliss 4506:82921).
   */
  | {
      type: "project-pager";
      /** Slugs of the case studies the arrows lead to. */
      previous: string;
      next: string;
      /** Row width in Figma px, centred. Defaults to the content width. */
      width?: number;
      heading: Omit<Extract<CaseStudyBlock, { type: "heading" }>, "type">;
    }
  /**
   * A numbered chapter: eyebrow, title, optional keyword row and paragraphs,
   * then its visuals. Every gap is the Figma value in px.
   */
  | {
      type: "chapter";
      eyebrow?: string;
      title: string;
      /** Figma sets `text-transform: uppercase` on some titles. */
      uppercase?: boolean;
      keywords?: readonly string[];
      paragraphs: readonly string[];
      size?: "body" | "lg";
      /** Between paragraphs. Defaults to 12 (Figma's column gap). */
      paragraphGap?: number;
      visuals?: readonly ChapterVisual[];
      /** From the header to the first visual. Defaults to 80. */
      headerGap?: number;
      /** Between visuals. Defaults to 80. */
      visualGap?: number;
    }
  /**
   * Frames shown one at a time on a loop with hard cuts, from Figma's
   * keyframes: each frame holds for `frameMs`, then the next replaces it.
   */
  | {
      type: "sequence";
      frames: readonly FigmaRender[];
      frameMs: number;
      label: string;
    }
  /** A labelled run of paragraphs — the workhorse block. */
  | {
      type: "prose";
      eyebrow?: string;
      /** Optional display title between eyebrow and paragraphs. */
      title?: string;
      paragraphs: readonly string[];
      /** "lg" is 24px copy; the default is the 20px body size. */
      size?: "body" | "lg";
      /** Figma gap between paragraphs in px. Defaults to 25 (one empty line). */
      paragraphGap?: number;
      /** A pull quote after the paragraphs, set in the quote face. */
      quote?: string;
    }
  /** Equal cards, each an illustration over a title and description. */
  | {
      type: "solution-cards";
      eyebrow?: string;
      title?: string;
      description?: string;
      /** Row width in Figma px. Defaults to 1100. */
      width?: number;
      items: readonly {
        icon: FigmaRender;
        title: string;
        description: string;
      }[];
    }
  /** The app's core sections as staggered, content-width cards. */
  | {
      type: "nav-structure";
      eyebrow?: string;
      description?: string;
      width?: number;
      rows: readonly {
        /** A 24px SVG icon. */
        icon: string;
        title: string;
        items: readonly string[];
        /** Indent from the column's left edge, in Figma px. */
        offset: number;
      }[];
    }
  /** A multi-step, multi-flow screen walkthrough. */
  | {
      type: "walkthrough";
      eyebrow?: string;
      title?: string;
      description?: string;
      descriptionTone?: "strong" | "muted";
      /** Figma gap between flows, in px. Defaults to 148. */
      flowGap?: number;
      flows: readonly WalkthroughFlow[];
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
      /** One string, or one per line where Figma breaks the text explicitly. */
      text: string | readonly string[];
      /** Extra space between explicit lines, in Figma px. */
      lineGap?: number;
      figure?: ImageAsset;
      /** A rebuilt memoji badge, used instead of `figure`. */
      mark?: MemojiMark;
      /** Rendered size of the figure in px. Defaults to 134. */
      figureSize?: number;
      /** Figma gap between figure and text, in px. Defaults to 16. */
      figureGap?: number;
      /** Figma text width in px, so line breaks fall where they do in the file. */
      maxWidth?: number;
      size?: "lg" | "md";
      /** "strong" is pure white; the default is the off-white text colour. */
      tone?: "default" | "strong";
      /** A centred paragraph under the heading, 16px below it. */
      description?: string;
    }
  /**
   * The app's tab bar as in-page navigation: it floats under the site header
   * while its sections scroll past, links to each, and highlights the one in
   * view. It stops floating once the last section ends.
   */
  | {
      type: "section-nav";
      /** Accessible name for the nav landmark. */
      label: string;
      sections: readonly {
        /** Anchor id, used in the URL hash. */
        id: string;
        /** Tab text, verbatim from the file. */
        label: string;
        block: CaseStudyBlock;
      }[];
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
      /**
       * Decorative art drawn over the section at `lg` and up. Coordinates are
       * Figma px relative to the section frame, whose size is `frame`.
       */
      decorations?: readonly {
        src: string;
        x: number;
        y: number;
        width: number;
        height: number;
      }[];
      frame?: { width: number; height: number };
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
      items: readonly {
        /** The exported asset, at its real pixel size. */
        image: ImageAsset;
        /** The Figma box the image is shown in, in px. */
        box: { width: number; height: number };
        /** Corner radius in px. */
        radius: number;
        /** Inside stroke, as in Figma. */
        border?: { width: number; tone: "frame" | "device" };
        /** CSS object-position when the image is cropped to its box. */
        position?: string;
      }[];
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
      descriptionTone?: "strong" | "muted";
      /** Optional heading for one figure within a larger section. */
      subtitle?: string;
      /**
       * The file styles these headings two ways: "md" is 28px untracked,
       * "lg" 36px tracked (as the flow titles). Defaults to "md".
       */
      subtitleSize?: "md" | "lg";
      /**
       * Width of the figure column in Figma px, centred in the page — for a
       * frame narrower than the 1258px content width. The subtitle sits
       * inside it, as in the file.
       */
      width?: number;
      /** Figma's 2x export of the frame. */
      image: ImageAsset;
      /**
       * Figma's 1x export of the same frame. When set, the figure is served as
       * Figma's own 1x/2x renders, losslessly, instead of being resampled.
       */
      image1x?: string;
      /**
       * The frame's true size in Figma px, when its render rounded up a pixel.
       * Defaults to half the 2x export's size.
       */
      frame?: { width: number; height: number };
      /** Where a render larger than its frame sits (see `FigmaRender`). */
      bleed?: FigmaRender["bleed"];
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
  /**
   * A full-bleed Figma render used as the whole hero, with no title above it
   * (the title then lives in the blocks, as a `page-title`). Overrides the
   * default title-over-media hero.
   */
  heroRender?: FigmaRender;
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

/** The home page (Figma 4512:101365). Copy only; geometry lives with the
 * components that draw it. */
export type HomeContent = {
  nav: {
    label: string;
    items: readonly NavItem[];
    /** The item drawn as the current one. */
    current: string;
  };
  hero: {
    greeting: string;
    headline: string;
    /** The line set along the curve, read as one sentence. */
    pathText: string;
  };
  works: {
    title: string;
    items: readonly {
      /** Case study the card opens. */
      slug: string;
      title: string;
      description: string;
      render: FigmaRender;
    }[];
  };
  about: {
    title: string;
    /** The short lines, each on its own line as drawn. */
    lines: readonly string[];
    bio: string;
    photos: readonly { src: string; alt: string }[];
  };
  connect: {
    title: string;
    links: readonly { index: string; label: string; href: string }[];
  };
};
