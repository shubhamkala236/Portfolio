import type { Project } from "@/content/types";

/**
 * ELEMENTS — case study.
 * Source: Figma node 4134:4412 (Portfolio / ol3LIQ7aCBwvRt99OTzI8k).
 *
 * Block order, nesting and gaps mirror the Figma frame tree, and each top-level
 * block notes the frame it came from. Copy is reproduced verbatim from the file.
 *
 * Everything above the Introduction follows the revised page 4286:6937: a
 * full-bleed hero render, then the title and meta row opening the body.
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
  // 4286:9106 — full-bleed, no title (the title opens the body instead)
  heroRender: {
    src1x: "/case-studies/elements/hero@1x.png",
    src2x: "/case-studies/elements/hero@2x.png",
    alt: "A hand holding a phone open on the Elements wardrobe screen, against an orange gradient",
    width: 1512,
    height: 851,
  },
  blocks: [
    // 4286:6961 — title 64px above the meta row
    {
      type: "group",
      gap: 64,
      blocks: [
        {
          type: "page-title",
          title: "ELEMENTS",
          subtitle: ["Fashion, Simplified: Organize, Style, and Shop Smarter"],
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
      ],
    },
    // 4286:6981 — 726px wide, centred
    {
      type: "heading",
      text: ["Nothing to wear?", "Look again."],
      lineGap: 20,
      maxWidth: 726,
      tone: "strong",
    },
    // 4286:6982 — inner stack at 100px
    {
      type: "group",
      gap: 100,
      blocks: [
        {
          type: "prose",
          eyebrow: "Introduction",
          paragraphs: [
            "I’d often look at my wardrobe and think, I have so many clothes, so why do I still have nothing to wear? I’d forget about things I already owned, wear the same outfits again, or buy something new because I didn’t know what else to wear.",
            "That’s what made me explore Elements, a way to keep track of what you own, put outfits together, and make better choices when shopping.",
          ],
        },
        // 4127:16370 — problem statement sits 40px above the cluster
        {
          type: "group",
          gap: 40,
          blocks: [
            {
              type: "prose",
              eyebrow: "Problem Statement",
              paragraphs: [
                "We forget what we own, repeat the same outfits, and keep buying more. The problem isn’t having too few clothes, but not making enough of what we already have.",
              ],
            },
            // 4127:16374 — cluster sits 80px above the question
            {
              type: "group",
              gap: 80,
              blocks: [
                {
                  type: "quote-cluster",
                  quotes: [
                    "What if this new piece doesn’t match anything I own?",
                    "Why do I always end up wearing the same 5 outfits?",
                    "I keep buying the same kind of shirt",
                    "Did I already wear this to the last party?",
                    "Do these pants go with anything?",
                    "I have no idea what to wear for this event",
                    "I didn’t even remember I had this dress",
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
            },
          ],
        },
      ],
    },
    // 4127:16414
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
          title: "Shopping & Virtual Try-ons",
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
      // Vectors 4127:16575 and 4127:16576, positioned from their exports.
      frame: { width: 1258, height: 1262 },
      decorations: [
        {
          src: "/case-studies/elements/solution-star-left.svg",
          x: -314.167,
          y: 668.28,
          width: 704.603,
          height: 640.309,
        },
        {
          src: "/case-studies/elements/solution-star-right.svg",
          x: 982.51,
          y: 254.51,
          width: 476.398,
          height: 425.305,
        },
      ],
    },
    // 4127:16577
    {
      type: "image-row",
      eyebrow: "Early Exploration",
      title: "From rough ideas to a Visual Direction",
      description:
        "I used quick sketches and low-fi screens to work through the structure, then refined the interface through different visual explorations, eventually landing on the light and dark direction for Elements.",
      items: [
        // 4127:17180 — image overfills the box and is bottom-aligned
        {
          box: { width: 612, height: 415 },
          radius: 17.207,
          border: { width: 1, tone: "frame" },
          position: "bottom",
          image: {
            src: "/case-studies/elements/exploration-wireframes.png",
            alt: "Board of low-fidelity wireframe sketches for the app",
            width: 2360,
            height: 1640,
          },
        },
        // 4127:17215
        {
          box: { width: 190.973, height: 414.018 },
          radius: 14.69,
          image: {
            src: "/case-studies/elements/exploration-ui-1.png",
            alt: "Early visual exploration of the app interface",
            width: 786,
            height: 1704,
          },
        },
        // 4127:17216
        {
          box: { width: 190.973, height: 414.018 },
          radius: 14.69,
          image: {
            src: "/case-studies/elements/exploration-ui-2.png",
            alt: "Second visual exploration of the app interface",
            width: 786,
            height: 1704,
          },
        },
        // 4127:17218
        {
          box: { width: 190.973, height: 414.999 },
          radius: 14.69,
          border: { width: 0.459, tone: "device" },
          image: {
            src: "/case-studies/elements/exploration-ui-3.png",
            alt: "The chosen dark visual direction for the app",
            width: 786,
            height: 1704,
          },
        },
      ],
    },
    // 4127:17258
    {
      type: "heading",
      text: ["The ideas took shape.", "Now, meet Elements."],
      figureGap: 16,
      // Group 50 (4127:17259): circle 4127:17260, sparkle 4127:17261
      mark: {
        box: { width: 134, height: 135 },
        circle: { size: 132, x: 2, y: 3 },
        sprite: {
          src: "/case-studies/elements/memoji-sprite-star-eyes.png",
          alt: "Illustrated avatar with star-struck eyes",
          crop: {
            insetTop: "14.79%",
            insetRight: "16.58%",
            insetBottom: "14.79%",
            insetLeft: "16.2%",
            imageLeft: "-146.25%",
            imageTop: "-10.3%",
            imageWidth: "394.09%",
            imageHeight: "120.61%",
          },
        },
        sparkle: {
          src: "/case-studies/elements/sparkle-34.svg",
          size: 34,
          canvas: 457.36,
          x: 0,
          y: 0,
        },
      },
    },
    // 4127:17571
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
    // 4127:17506
    {
      type: "annotated-figure",
      eyebrow: "Final Design",
      title: "Home Screen",
      description:
        "The Home screen brings today’s outfit, shopping updates and featured collections together, with quick access to key actions and sections.",
      image: {
        src: "/case-studies/elements/final-home-screen.png",
        alt: "Annotated Home screen showing the search bar, sale banners, featured collections, today’s outfit, floating action button and navigation bar",
        width: 2516,
        height: 1340,
      },
      image1x: "/case-studies/elements/final-home-screen@1x.png",
      annotations: [
        { title: "Search bar" },
        { title: "Sale & Banner Updates" },
        { title: "Featured Brands & Collections" },
        {
          title: "Today’s Outfit",
          text: "Quickly see and revisit what you’ve planned for the day.",
        },
        {
          title: "Floating button",
          text: "Add clothes, create outfits, get AI styling ideas, or edit your avatar.",
        },
        { title: "Navigation bar" },
      ],
    },
    // 4127:17534
    {
      type: "annotated-figure",
      eyebrow: "Final Design",
      title: "Shopping",
      description:
        "Shopping in Elements goes beyond browsing. Users can explore new pieces, see how they work with clothes they already own, try combinations on their avatar, and get styling ideas before deciding what to buy.",
      image: {
        src: "/case-studies/elements/final-shopping.png",
        alt: "Annotated shopping flow showing category browsing, wish list and try-on buttons, mix and match, and the Aura AI styling button",
        width: 2516,
        height: 3300,
      },
      annotations: [
        { text: "Browse through different clothing categories." },
        { text: "Like button adds it to the wish list" },
        { text: "Tag button to add it to try-on feature" },
        { text: "Try on button pops up when you tap the tag on the card" },
        {
          title: "Mix & Match",
          text: "Add pieces from your wardrobe to see how they work with something new before buying it.",
        },
        {
          title: "The Aura AI button",
          text: "Once Aura is used, its tab appears in the navigation for quick access to AI-generated outfits.",
        },
        {
          text: "Creates outfits around a selected piece by mixing clothes from your wardrobe or with new pieces from the store.",
        },
      ],
    },
    // 4127:17678 — two sub-figures 80px apart
    {
      type: "group",
      gap: 80,
      blocks: [
        {
          type: "annotated-figure",
          eyebrow: "Final Design",
          title: "Wardrobe",
          description:
            "Browse categorised items, track wear and outfit stats, and explore new ways to style your wardrobe with Aura and Flip.",
          subtitle: "Dashboard & Add Items",
          image: {
            src: "/case-studies/elements/final-wardrobe-dashboard.png",
            alt: "Annotated wardrobe dashboard showing category cards, streaks and points, saved outfits, and the add-item flow",
            width: 2200,
            height: 2892,
          },
          annotations: [
            {
              text: "Browse, sort and filter your wardrobe, with quick-add actions for new pieces.",
            },
            {
              title: "Streaks & Points",
              text: "Track outfit streaks and reward points, encouraging users to make more use of their wardrobe.",
            },
            {
              text: "Each card shows the category, item count and recently added pieces, with a quick + button to add more.",
            },
            {
              text: "Saved outfits show wear count and can be quickly added to your calendar or marked as worn.",
            },
            {
              text: "Shows all clothing categories in one place for easy browsing and organisation.",
            },
            {
              text: "Lets users add clothes and fill in or edit their details before saving them to the wardrobe.",
            },
            {
              text: "Shows all tops in the wardrobe, along with how many times each piece has been worn.",
            },
            {
              text: "Quickly add items to outfits or update their wear count.",
            },
          ],
        },
        {
          type: "annotated-figure",
          subtitle: "OOTD- Outfit of the day",
          image: {
            src: "/case-studies/elements/final-wardrobe-ootd.png",
            alt: "Annotated outfit-of-the-day flow showing the calendar, outfit canvas and Aura AI generation",
            width: 2200,
            height: 1072,
          },
          annotations: [
            {
              text: "Users can create a new outfit or tap a specific day to plan one directly on the calendar.",
            },
            {
              text: "A canvas opens to build the outfit, with a date bar below for quickly switching between days.",
            },
            { text: "Click on Aura AI button to generate outfits" },
          ],
        },
      ],
    },
    // 4127:18602
    {
      type: "annotated-figure",
      eyebrow: "Final Design",
      title: "Aura AI",
      description:
        "Aura creates personalised outfits based on the user’s mood, occasion and style preferences. Depending on their choices, it can style pieces from their wardrobe, suggest new pieces, or combine both. Users can answer as much or as little as they want and regenerate until they find a look they like.",
      image: {
        src: "/case-studies/elements/final-aura-ai.png",
        alt: "Annotated Aura AI flow showing the progress bar, preference questions, swappable cards and the generate button",
        width: 2516,
        height: 944,
      },
      annotations: [
        {
          text: "The progress bar updates with each selection, showing choices and current progress.",
        },
        {
          text: "Users answer a few questions to shape their outfit suggestions.",
        },
        { text: "Swappable cards let users visually select preferences" },
        {
          text: "The “Generate” button works anytime, even without answering questions.",
        },
      ],
    },
    // 4133:4193
    {
      type: "annotated-figure",
      eyebrow: "Final Design",
      title: "Flip",
      description:
        "Flip lets users swipe through different styles, saving outfits they like to their wishlist for later.",
      image: {
        src: "/case-studies/elements/final-flip.png",
        alt: "The Flip feature showing outfits being swiped through and saved to a wishlist",
        width: 2516,
        height: 910,
      },
      annotations: [],
    },
    // 4133:4255
    {
      type: "annotated-figure",
      eyebrow: "Final Design",
      title: "Virtual avatar & Statistics",
      image: {
        src: "/case-studies/elements/final-avatar-statistics.png",
        alt: "Annotated screens showing wardrobe statistics and the personalised virtual avatar",
        width: 2516,
        height: 1232,
      },
      annotations: [
        {
          title: "Wardrobe Statistics",
          text: "Shows your wardrobe value, usage, total items and outfit wear, giving a quick overview of how much of your wardrobe you actually use.",
        },
        {
          title: "Virtual Avatar",
          text: "It uses your measurements to create a personalised avatar, helping you visualise how clothes look and fit when styling outfits.",
        },
      ],
    },
    // 4133:4643
    {
      type: "heading",
      text: "Thanks for reading",
      size: "md",
      figureGap: 40,
      // circ kriti 4133:4644 at (69, 0) of the 458px frame; sparkle 4133:4646
      // at (293, 7) of the frame, i.e. (224, 7) relative to the circle.
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
        sparkle: {
          src: "/case-studies/elements/sparkle-40.svg",
          size: 40,
          canvas: 463.36,
          x: 224,
          y: 7,
        },
      },
    },
  ],
} satisfies Project;
