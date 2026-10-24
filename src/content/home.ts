import { siteConfig } from "@/content/site";
import type { FigmaRender, HomeContent, LayeredRender } from "@/content/types";

/**
 * Home page copy, verbatim from Figma 4512:101365.
 *
 * The tab bar drops the file's Explore tab and adds About Me between Work
 * and Connect, as asked.
 *
 * Link targets the file doesn't define (Resume, the connect rows)
 * point at the site's placeholders in site.ts, so there is one place to set
 * the real ones.
 */

const link = (label: string) =>
  siteConfig.footer.links.find((item) => item.label === label)?.href ?? "#";

const work = (name: string, alt: string): FigmaRender => ({
  src1x: `/home/works/${name}@1x.png`,
  src2x: `/home/works/${name}@2x.png`,
  alt,
  width: 1258,
  height: 800,
});

/** A card frame (4497:68350, 4497:72840): 1258 × 800, corners 40. */
const CARD = { width: 1258, height: 800, radius: 40 };

/**
 * The full background texture, 1513.94 × 852 at (-128, -26.45) in the card
 * — larger than the card, since its hover zooms it out. One source serves
 * both densities: it is Figma's own image (2772px wide).
 */
const background = (name: string, x: number, y: number, hoverScale: number) => {
  const src = `/home/works/${name}-bg.png`;
  return {
    src1x: src,
    src2x: src,
    x,
    y,
    width: 1513.94,
    height: 852,
    hoverScale,
  };
};

/**
 * HOTSTUFF's card (4506:83474 → 4497:68352 on hover): the texture zooms out
 * (1513.94 → 1420.9 wide) while the laptop grows (980 → 1000 wide). In the
 * hover variant the texture is a different, softer image, which Figma
 * dissolves to as it zooms. The laptop layer includes its drop shadow,
 * 20.9px past its frame each side.
 */
const hotstuffCard: LayeredRender = {
  ...CARD,
  alt: "A tablet showing the Hotstuff invest dashboard, on a pale green textured background",
  layers: [
    background("hotstuff", -127.97, -26, 1420.9 / 1513.94),
    {
      ...background("hotstuff", -127.97, -26, 1420.9 / 1513.94),
      src1x: "/home/works/hotstuff-bg-hover.jpg",
      src2x: "/home/works/hotstuff-bg-hover.jpg",
      hoverOnly: true,
    },
    {
      src1x: "/home/works/hotstuff-device@1x.png",
      src2x: "/home/works/hotstuff-device@2x.png",
      x: 139.44 - 20.9,
      y: 110.41 - 20.9,
      width: 1021.51,
      height: 621.33,
      hoverScale: 1000 / 980,
    },
  ],
};

/**
 * SISTEM EXPENSE's card (4506:83488 → 4497:72842 on hover): the texture
 * zooms out (1513.94 → 1423.14 wide) while the phone grows (480 → 500
 * wide). The phone is Figma's own image (400 × 804), which it scales up too.
 */
const sistemCard: LayeredRender = {
  ...CARD,
  alt: "A phone showing the Sistem home screen with total spendings, on a lilac textured background",
  layers: [
    background("sistem-expense", -128, -26.45, 1423.14 / 1513.94),
    {
      src1x: "/home/works/sistem-expense-phone.png",
      src2x: "/home/works/sistem-expense-phone.png",
      x: 388.5,
      y: 217.73,
      width: 480,
      height: 964.64,
      hoverScale: 500 / 480,
    },
  ],
};

export const home = {
  nav: {
    label: "Home sections",
    items: [
      { label: "Home", href: "/" },
      { label: "Work", href: "#work" },
      { label: "About Me", href: "#about" },
      { label: "Connect", href: "#connect" },
      { label: "Resume", href: link("RESUME") },
    ],
    current: "Home",
  },
  hero: {
    greeting: "HI, I’M KRITI",
    headline: "PRODUCT DESIGNER WITH AN ARTIST’S EYE",
    pathText: "too many ideas. good decisions. lachimolala energy.",
  },
  works: {
    title: "SELECTED WORKS.",
    items: [
      {
        slug: "hotstuff",
        title: "HOTSTUFF",
        description:
          "A trading platform bringing trading, investing and rewards together. Led end-to-end product design, the design system and visual identity as the sole designer.",
        render: hotstuffCard,
      },
      {
        slug: "elements",
        title: "ELEMENTS",
        description:
          "A fashion app connecting your wardrobe, outfit planning and shopping. Designed the complete experience, from user research and flows to final screens.",
        render: work(
          "elements",
          "A phone showing the Elements wardrobe screen, on a peach textured background",
        ),
      },
      {
        slug: "sistem-expense",
        title: "SISTEM EXPENSE TRACKER",
        description:
          "An expense tracker for personal spending, group expenses and budgets. Conducted competitor research and created end-to-end flows and wireframes.",
        render: sistemCard,
      },
      {
        slug: "miss-bliss",
        // Verbatim from the file (4506:101362), which repeats the previous
        // card's title here.
        title: "SISTEM EXPENSE TRACKER",
        description:
          "A platform for adult creators to share content and connect with their audience. Created custom illustrations for the product experience.",
        render: work(
          "miss-bliss",
          "A tablet showing the Miss Bliss chat room with its illustration, on a lilac textured background",
        ),
      },
    ],
  },
  about: {
    title: "ABOUT ME.",
    lines: [
      "Usually drawing, replaying a favourite song, or getting excited about another idea.",
      "A little quiet until I’m comfortable, then I have a lot to say. Too many ideas.",
      "A little Lachimolala energy.",
    ],
    bio: "Hi, I’m Kriti, a product and visual designer with a background in architecture. At Hotstuff, I was the sole designer, working across the product, design system and visual identity. I enjoy figuring out how things fit together, from a complicated flow to the smallest visual detail.",
    // In the order Figma stacks them (4506:83551 … 4506:83626).
    photos: [
      { src: "/home/about/photo-1.jpg", alt: "Portrait among plants" },
      {
        src: "/home/about/photo-2.jpg",
        alt: "Portrait holding a bowl of food",
      },
      { src: "/home/about/photo-3.jpg", alt: "A red folded-paper form" },
      { src: "/home/about/photo-4.jpg", alt: "Portrait in a white top" },
      {
        src: "/home/about/photo-5.jpg",
        alt: "Illustration of a character surrounded by flowers",
      },
      {
        src: "/home/about/photo-6.png",
        alt: "Illustration of a character with red lightning",
      },
    ],
  },
  connect: {
    title: "LET’S CONNECT.",
    links: [
      { index: "01", label: "Email", href: link("EMAIL") },
      { index: "02", label: "Linkedin", href: link("LINKEDIN") },
      { index: "03", label: "Behance", href: link("BEHANCE") },
    ],
  },
} satisfies HomeContent;
