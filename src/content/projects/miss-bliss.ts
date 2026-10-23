import type { FigmaRender, Project } from "@/content/types";

/**
 * MISS BLISS — case study.
 * Source: Figma node 4506:82809 (Portfolio / ol3LIQ7aCBwvRt99OTzI8k).
 *
 * Block order and gaps mirror the frame: a full-bleed hero, then the body
 * (4506:82852) with every section 200px apart. Copy is verbatim from the
 * file, and every visual is Figma's own 1x/2x render.
 */

const dir = "/case-studies/miss-bliss";

/** The device mockups share one frame: 1258 × 650.49. */
const SCREEN = { width: 1258, height: 650.49 };

const render = (
  name: string,
  alt: string,
  size: { width: number; height: number } = SCREEN,
  bleed?: FigmaRender["bleed"],
): FigmaRender => ({
  src1x: `${dir}/${name}@1x.png`,
  src2x: `${dir}/${name}@2x.png`,
  alt,
  ...size,
  bleed,
});

export const missBliss = {
  slug: "miss-bliss",
  title: "MISS BLISS",
  subtitle: "A platform for adult creators to connect, express, and grow",
  summary:
    "Custom UI illustrations for the empty states and notifications of a social platform for adult content creators.",
  year: 2024,
  role: "Product Design Intern",
  stack: ["Illustrations"],
  featured: true,
  links: {},
  cover: null,
  heroMedia: null,
  // 4506:82846 — full-bleed, no title (the title opens the body instead)
  heroRender: render(
    "hero",
    "A tablet showing the Miss Bliss messages screen with its chat-room illustration, on a lilac textured background",
    { width: 1512, height: 800 },
  ),
  blocks: [
    // 4506:82853 — title 64px above the meta row
    {
      type: "group",
      gap: 64,
      blocks: [
        {
          type: "page-title",
          title: "MISS BLISS",
          // 4506:82855 — DM Sans SemiBold, not the Gloock of the others.
          titleStyle: "brand",
          subtitle: [
            "A platform for adult creators to connect, express, and grow",
          ],
          subtitleSize: "md",
          subtitleGap: 20,
        },
        {
          type: "meta",
          items: [
            { label: "Client", value: "Miss Bliss" },
            { label: "Role", value: "Product Design Intern" },
            { label: "Timeline", value: "1 Week" },
            { label: "Scope", value: "Illustrations" },
          ],
        },
      ],
    },
    // 4506:82873 — 726px wide, centred
    {
      type: "heading",
      text: ["Bringing personality", "to empty states"],
      lineGap: 20,
      maxWidth: 726,
      tone: "strong",
    },
    // 4506:82875
    {
      type: "prose",
      eyebrow: "Introduction",
      paragraphs: [
        "Miss Bliss is a social platform for adult content creators and their audiences. I created custom UI illustrations for empty states, notifications, and other in-app experiences, adding personality to functional screens while keeping the interface clear and consistent.",
      ],
    },
    // 4506:82878 — six illustration cards across the full 1512px frame. Its
    // render starts 4px above the 380.93px frame and hangs 12px below it.
    {
      type: "render",
      render: render(
        "illustrations",
        "Six tilted cards, each with a line illustration from the set: figures with a phone, photo frames, a sofa, a stretch, a box and a cocktail",
        { width: 1258, height: 380.93 },
        { x: -127, y: -4, width: 1512, height: 397 },
      ),
    },
    // 4506:82891
    {
      type: "render",
      render: render(
        "no-results",
        "Collab search with no results: an illustration of a figure with an open box above “No Results Found!”",
      ),
    },
    // 4506:82896
    {
      type: "render",
      render: render(
        "chat-room",
        "The messages screen with an empty chat pane, illustrated with two figures on a sofa above “Miss Bliss Chat Room”",
      ),
    },
    // 4506:82901
    {
      type: "render",
      render: render(
        "link-expired",
        "An expired project link, illustrated with a figure holding a cocktail above “Oops, this link has expired!”",
      ),
    },
    // 4506:82906
    {
      type: "render",
      render: render(
        "no-followers",
        "An empty followers list on a creator profile, illustrated with a figure taking a selfie above “No followers yet!”",
      ),
    },
    // 4506:82911
    {
      type: "render",
      render: render(
        "caught-up",
        "The notifications panel ending with an illustration above “You are all caught up!”",
      ),
    },
    // 4506:82916
    {
      type: "render",
      render: render(
        "no-posts",
        "A profile with no posts, illustrated with four photo frames above “No Posts Yet!”",
      ),
    },
    // 4506:82921 — the sign-off between arrows to the neighbouring case
    // studies; the row is 1254px wide, 2px in from each side.
    {
      type: "project-pager",
      previous: "hotstuff",
      next: "elements",
      width: 1254,
      heading: {
        text: "Thanks for reading",
        size: "md",
        figureGap: 40,
        // 4506:82964 — the same badge as SISTEM EXPENSE's sign-off.
        mark: {
          box: { width: 320, height: 320 },
          circle: { size: 320, x: 0, y: 0 },
          sprite: {
            src: "/case-studies/elements/memoji-sprite-fist-bump.png",
            alt: "Illustrated avatar giving a fist bump",
            crop: {
              insetTop: "14.79%",
              insetRight: "16.58%",
              insetBottom: "14.79%",
              insetLeft: "16.2%",
              imageLeft: "-2.97%",
              imageTop: "-14.85%",
              imageWidth: "118.64%",
              imageHeight: "126.97%",
            },
          },
        },
      },
    },
  ],
} satisfies Project;
