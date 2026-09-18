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
      type: "heading",
      text: "Nothing to wear? Look again.",
    },
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
    {
      type: "feature-grid",
      eyebrow: "Solution",
      title: "Helping your wardrobe do more",
      description:
        "Elements brings your wardrobe into the way you actually get dressed. It helps you keep track of what you own, discover new ways to style it, plan what to wear, and see how something new fits into your wardrobe before you buy it.",
      items: [
        {
          title: "Wardrobe Management",
          description: "Keep your clothes organised and easy to find.",
          image: {
            src: "/case-studies/elements/solution-wardrobe-management.png",
            alt: "Clothing items arranged in a grid of wardrobe cards",
            width: 791,
            height: 758,
          },
        },
        {
          title: "Outfit Planning",
          description: "Put outfits together, save them and plan ahead.",
          image: {
            src: "/case-studies/elements/solution-outfit-planning.png",
            alt: "An outfit being assembled from saved garment cards",
            width: 791,
            height: 762,
          },
        },
        {
          title: "Shopping & Virtual Try-Ons",
          description:
            "See how new pieces work with your wardrobe before buying them.",
          image: {
            src: "/case-studies/elements/solution-shopping-tryon.png",
            alt: "A virtual try-on showing a new piece styled two ways",
            width: 791,
            height: 762,
          },
        },
        {
          title: "Styling",
          description: "Find new ways to wear what you already own.",
          image: {
            src: "/case-studies/elements/solution-styling.png",
            alt: "A styling grid suggesting outfits for an occasion",
            width: 791,
            height: 762,
          },
        },
      ],
    },
    {
      type: "image-row",
      eyebrow: "Early exploration",
      title: "From rough ideas to a Visual Direction",
      description:
        "I used quick sketches and low-fi screens to work through the structure, then refined the interface through different visual explorations, eventually landing on the light and dark direction for Elements.",
      items: [
        {
          bordered: true,
          image: {
            src: "/case-studies/elements/exploration-wireframes.png",
            alt: "Board of low-fidelity wireframe sketches for the app",
            width: 612,
            height: 415,
          },
        },
        {
          image: {
            src: "/case-studies/elements/exploration-ui-1.png",
            alt: "Early visual exploration of the app interface",
            width: 191,
            height: 414,
          },
        },
        {
          image: {
            src: "/case-studies/elements/exploration-ui-2.png",
            alt: "Second visual exploration of the app interface",
            width: 191,
            height: 414,
          },
        },
        {
          bordered: true,
          image: {
            src: "/case-studies/elements/exploration-ui-3.png",
            alt: "The chosen dark visual direction for the app",
            width: 191,
            height: 414,
          },
        },
      ],
    },
    {
      type: "heading",
      text: "The ideas took shape. Now, meet Elements.",
      figure: {
        src: "/case-studies/elements/meet-elements-mark.png",
        alt: "The Elements app mark",
        width: 1373,
        height: 1373,
      },
    },
    {
      type: "tab-bar",
      items: [
        "Home",
        "Shopping",
        "Wardrobe",
        "Aura",
        "Flip",
        "Virtual avatar & Statistics",
      ],
    },
  ],
} satisfies Project;
