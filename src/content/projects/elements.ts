import type { Project } from "@/content/types";

/**
 * ELEMENTS — case study.
 * Source: Figma node 4134:4412 (Portfolio / ol3LIQ7aCBwvRt99OTzI8k).
 *
 * The hero and several section visuals are still empty frames in Figma. They
 * are `null` here on purpose: the page renders a visible placeholder until a
 * real export is dropped into /public/case-studies/elements/.
 */
export const elements = {
  slug: "elements",
  title: "ELEMENTS",
  subtitle: "Fashion, Simplified: Organize, Style, and Shop Smarter",
  summary:
    "A wardrobe app that helps people get more out of the clothes they already own.",
  year: 2025,
  role: "UX/UI Designer",
  stack: ["Research", "User Flows", "Prototyping"],
  featured: true,
  links: {},
  cover: null,
  heroMedia: null,
  blocks: [
    {
      type: "meta",
      items: [
        { label: "Project", value: "Self-Initiated" },
        { label: "Role", value: "UX/UI Designer" },
        { label: "Timeline", value: "3-4 Weeks" },
        { label: "Scope", value: "Research, User Flows, Prototyping" },
      ],
    },
    {
      type: "prose",
      eyebrow: "Introduction",
      paragraphs: [
        "I\u2019d often look at my wardrobe and think, I have so many clothes, so why do I still have nothing to wear? I\u2019d forget about things I already owned, wear the same outfits again, or buy something new because I didn\u2019t know what else to wear.",
        "That\u2019s what made me explore Elements, a way to keep track of what you own, put outfits together, and make better choices when shopping.",
      ],
    },
    {
      type: "prose",
      eyebrow: "Problem Statement",
      paragraphs: [
        "We forget what we own, repeat the same outfits, and keep buying more. The problem isn\u2019t having too few clothes, but not making enough of what we already have.",
      ],
    },
    {
      type: "quote-cluster",
      quotes: [
        "What if this new piece doesn\u2019t match anything I own?",
        "Why do I always end up wearing the same 5 outfits?",
        "I keep buying the same kind of shirt",
        "Did I already wear this to the last party?",
        "Do these pants go with anything?",
        "I have no idea what to wear for this event",
        "I didn\u2019t even remember I had this dress",
      ],
      figure: {
        src: "/case-studies/elements/persona-angry.png",
        alt: "Illustrated avatar looking frustrated",
        width: 396,
        height: 405,
      },
    },
    {
      type: "statement",
      eyebrow: "So I started with one question",
      text: "How might we make it easier for people to get more out of the clothes they already own?",
    },
  ],
} satisfies Project;
