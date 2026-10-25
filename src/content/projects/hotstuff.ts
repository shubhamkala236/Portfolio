import type { FigmaRender, MemojiMark, Project } from "@/content/types";

/**
 * HOTSTUFF — case study.
 * Source: Figma node 4253:22698 (Portfolio / ol3LIQ7aCBwvRt99OTzI8k).
 *
 * Block order, nesting and gaps mirror the frame tree; each block notes the
 * frame it came from, and copy is verbatim from the file. Gaps vary between
 * chapters in the file (80 vs 120px under a header, 80 vs 160px between
 * visuals) and are reproduced per chapter.
 *
 * Visuals are Figma's own renders. Several have floating badges that hang
 * outside their frame; those renders are larger than the frame, and `bleed`
 * places them — offsets found by locating each frame's device mockup inside
 * its render.
 *
 * Type follows 4506:86237: the title is DM Sans SemiBold, tightened 4%, and
 * every other heading DM Sans Regular, untracked (`headings: "brand"`).
 */

const dir = "/case-studies/hotstuff";

/** Most visuals share one frame: 1258 × 650.49. */
const FRAME = { width: 1258, height: 650.49 };

const render = (
  name: string,
  alt: string,
  size: { width: number; height: number } = FRAME,
  bleed?: FigmaRender["bleed"],
): FigmaRender => ({
  src1x: `${dir}/${name}@1x.png`,
  src2x: `${dir}/${name}@2x.png`,
  alt,
  ...size,
  bleed,
});

// Renders with overhanging badges; bleed = where the render sits vs its frame.
const trade = render(
  "trade",
  "Hotstuff's trading screen with live chart, orderbook and order entry",
);
const investOverview = render(
  "invest-1",
  "Invest explore screen with featured stocks",
);
const expeditions = render(
  "expeditions",
  "Expeditions screen with streaks and milestone progress, surrounded by collectible tier cards",
  FRAME,
  { x: -55, y: -81, width: 1326, height: 732 },
);
const competitions = render(
  "competitions-2",
  "Competition leaderboard with multiplier cards floating around it",
  FRAME,
  { x: -38, y: -78, width: 1296, height: 729 },
);
const portfolio = render(
  "portfolio",
  "Portfolio overview of account health, balances and positions",
);
const points = render(
  "points",
  "Points dashboard with tier badges floating around it",
  FRAME,
  { x: -41, y: -107, width: 1305, height: 809 },
);
const vaultsOverview = render(
  "vaults-1",
  "Vaults overview with vault performance",
);
const referrals = render(
  "referrals-2",
  "Referral dashboard with reward badges floating around it",
  FRAME,
  { x: -20, y: -75, width: 1296, height: 815 },
);

/** Group 50 — the star-eyes badge with its sparkle, as in ELEMENTS. */
const starEyesMark: MemojiMark = {
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
};

export const hotstuff = {
  slug: "hotstuff",
  title: "HOTSTUFF",
  subtitle: "Home for all capital that actually trades and invests.",
  summary:
    "A crypto trading platform bringing trading, investing, portfolios, vaults, competitions, rewards and referrals into one product.",
  year: 2026,
  role: "Product Designer (Sole)",
  stack: [
    "UX/UI",
    "Design System",
    "Branding",
    "Visual Design",
    "Interaction Design",
  ],
  featured: true,
  links: {},
  cover: null,
  heroMedia: null,
  headings: "brand",
  // 4506:86236 — full-bleed, no title (the title opens the body instead)
  heroRender: render(
    "hero",
    "A tablet showing Hotstuff's Invest explore screen with top movers and newly added assets, on a pale green textured background",
    { width: 1512, height: 800 },
  ),
  blocks: [
    // 4253:22704 — title 64px above the meta row
    {
      type: "group",
      gap: 64,
      blocks: [
        {
          type: "page-title",
          title: "HOTSTUFF",
          // 4506:86240 — DM Sans SemiBold, -4%; the subtitle is 40px, 20px under.
          titleStyle: "brand",
          subtitle: ["Home for all capital that actually trades and invests."],
          subtitleSize: "md",
          subtitleGap: 20,
        },
        {
          type: "meta",
          layout: "spread",
          rule: "centred",
          items: [
            { label: "Project", value: "Hotstuff" },
            { label: "Role", value: "Product Designer (Sole)" },
            { label: "Timeline", value: "Jan, 2025- Aug, 2026" },
            {
              label: "Scope",
              value:
                "UX/UI, Design System, Branding, Visual Design, Interaction Design",
            },
          ],
        },
      ],
    },
    // 4506:86259
    {
      type: "heading",
      text: "Trade. Invest. Bank.",
      maxWidth: 726,
      tone: "strong",
    },
    // 4253:22726
    {
      type: "prose",
      eyebrow: "Introduction",
      paragraphs: [
        "Hotstuff is a crypto trading platform that brings trading, investing, portfolio management, vaults, competitions, rewards and referrals into one product.",
      ],
      quote:
        "I worked across the product as it grew, from the core financial experiences to the design system, visual identity and responsive experience across desktop and mobile.",
    },
    // 4253:22732
    {
      type: "heading",
      text: "THE PRODUCT",
      maxWidth: 932,
      figureGap: 16,
      // Figma's normal line box (64 -> 83), not the tight one
      leading: "normal",
      mark: starEyesMark,
      description:
        "Hotstuff grew into several connected experiences. I worked across the product, from its core financial tools to the more playful systems around progression and rewards.",
    },
    // 4253:22738 — the animated sequence sits 120px under its header
    {
      type: "group",
      gap: 120,
      blocks: [
        {
          type: "chapter",
          eyebrow: "Product Thinking",
          title: "One product, Built for different needs",
          paragraphGap: 0,
          paragraphs: [
            "Trade needed to handle complex information without feeling overwhelming. Invest needed to make entering the market feel simpler. Portfolio brought everything together, while Expeditions, Competitions and Points could be more playful and expressive.",
            "Each experience had its own purpose, but they all needed to feel like part of the same product.",
          ],
        },
        // 4253:22744 — 8 screens, 1.2s each, hard cuts, looping (9.6s)
        {
          type: "sequence",
          frameMs: 1200,
          label:
            "Hotstuff's screens cycling one after another: Trade, Expeditions, Invest, Competitions, Portfolio, Points, Vaults and Referrals",
          frames: [
            trade,
            expeditions,
            investOverview,
            competitions,
            portfolio,
            points,
            vaultsOverview,
            referrals,
          ],
        },
      ],
    },
    // 4253:22854
    {
      type: "chapter",
      eyebrow: "01",
      title: "TRADE & PERPS",
      keywords: [
        "FAST MOVING",
        "ACTION FOCUSED",
        "LIVE MARKET DATA",
        "BUILT FOR QUICK DECISIONS",
      ],
      paragraphs: [
        "Trade was designed for users already familiar with trading, so the goal wasn't to introduce a new way of doing things. Keeping familiar patterns meant users could rely on what they already knew and focus on the trade itself.",
        "The challenge was making all that information work together: live market data, charts, the orderbook, order placement and positions, while keeping the experience quick to scan and predictable as values changed.",
      ],
      visuals: [{ render: trade }],
    },
    // 4253:22874
    {
      type: "chapter",
      eyebrow: "02",
      title: "INVEST",
      keywords: ["DISCOVER", "UNDERSTAND", "INVEST", "TRACK"],
      paragraphs: [
        "Invest was designed with newer users in mind. Rather than bringing the complexity of Perps into the experience, it gives more room to discover stocks, follow what’s in the news and understand an asset before taking action.",
        "Explore, individual stock pages and Holdings create a simpler path from finding an opportunity to investing and keeping track of it.",
      ],
      visuals: [
        { render: investOverview },
        {
          render: render("invest-2", "Individual stock pages for Invest", {
            width: 1258,
            height: 1490.51,
          }),
        },
        { render: render("invest-3", "Invest holdings screen") },
      ],
    },
    // 4253:22920
    {
      type: "chapter",
      eyebrow: "03",
      title: "PORTFOLIO",
      keywords: ["OVERVIEW", "PERFORMANCE", "POSITIONS", "HISTORY"],
      paragraphs: [
        "Trading creates a lot of information across positions, orders, balances and account performance. Portfolio needed to turn all of that into a view that could be understood at a glance without losing the underlying detail.",
        "So the experience starts with the overall health of the account, then lets users move deeper into balances, positions, open orders and trading history when they need to.",
      ],
      visuals: [{ render: portfolio }],
    },
    // 4253:22940
    {
      type: "chapter",
      eyebrow: "04",
      title: "VAULTS",
      keywords: ["ACCOUNT", "POSITIONS", "PERFORMANCE", "HISTORY"],
      paragraphs: [
        "Vaults bring together performance, deposits and the activity behind them. The challenge was deciding what users needed to see at a glance and what could sit deeper in the experience.",
        "The overview keeps the vault and its performance easy to scan, while the detailed view brings in deposits, equity, performance data and positions without overwhelming the main view.",
      ],
      visuals: [
        { render: vaultsOverview },
        {
          render: render(
            "vaults-2",
            "Vault detail view with deposits, equity and positions",
          ),
        },
      ],
    },
    // 4253:22965 — first visual 120px under the header
    {
      type: "chapter",
      eyebrow: "05",
      title: "EXPEDITIONS",
      keywords: ["TRADE", "RETURN", "PROGRESS", "COLLECT"],
      paragraphs: [
        "Expeditions added a gamified layer to Hotstuff through milestones, streaks and collectible cards. Trading Streaks encouraged users to trade daily, while GM Streaks encouraged them to return to Expeditions and check in.",
        "Progress unlocked collectible tier cards, designed to be saved and shared on X, extending the experience beyond the product.",
      ],
      headerGap: 120,
      visuals: [
        {
          render: expeditions,
          // image 654 (4253:22990) sits on the section, 32px above the visual.
          overlays: [
            {
              render: render("expeditions-badge", "Collectible tier badge", {
                width: 103.057,
                height: 103.057,
              }),
              x: 178,
              y: -32.079,
            },
          ],
        },
      ],
    },
    // 4253:22991 — two visuals 160px apart
    {
      type: "chapter",
      eyebrow: "06",
      title: "COMPETITIONS",
      keywords: ["JOIN", "TRADE", "CLIMB", "WIN"],
      paragraphs: [
        "Competitions introduced a new layer around trading, built around volume, leaderboard rankings and prizes. I designed the experience from discovering and entering a competition to tracking rank, trading volume, time remaining and rewards as it progressed.",
        "I also designed the multiplier cards and supporting visuals, which gave users temporary boosts to the trading points they earned and brought a more playful visual layer to the experience.",
      ],
      visualGap: 160,
      visuals: [
        {
          render: render(
            "competitions-1",
            "Competitions overview for discovering and entering a competition",
          ),
        },
        { render: competitions },
      ],
    },
    // 4253:23023 — first visual 120px under the header
    {
      type: "chapter",
      eyebrow: "07",
      title: "POINTS",
      keywords: ["POINTS", "PROGRESS", "TIERS"],
      paragraphs: [
        "Points turned activity across Hotstuff into visible progress. As users earned more points, they moved through different tiers, each represented by its own badge and visual identity.",
        "The dashboard brought together total points, current tier, progress and points history, making it easy to see where users stood and what came next.",
      ],
      headerGap: 120,
      visuals: [{ render: points }],
    },
    // 4253:23046 — two visuals 160px apart
    {
      type: "chapter",
      eyebrow: "08",
      title: "REFERRALS",
      keywords: ["UNLOCK", "REFER", "TRACK", "EARN"],
      paragraphs: [
        "Referrals let users invite others to Hotstuff and earn from their activity, but first they had to unlock access by reaching a trading target. A progress bar made that requirement clear and showed exactly how far they had to go.",
        "Once unlocked, the dashboard brought everything together: generating and sharing referral codes, tracking referred users and volume, earnings, and progressing through referral tiers.",
      ],
      visualGap: 160,
      visuals: [
        {
          render: render(
            "referrals-1",
            "Locked referrals screen with progress towards the trading target",
          ),
        },
        { render: referrals },
      ],
    },
    // 4253:23077
    {
      type: "heading",
      text: "BEYOND THE FEATURES",
      maxWidth: 932,
      figureGap: 16,
      // Figma's normal line box (64 -> 83), not the tight one
      leading: "normal",
      mark: starEyesMark,
      // 4506:86616 — Figma's first line stops short of "systems,": at 932px
      // it just misses fitting, where the browser fits it.
      description: [
        "The individual features were only one part of the work. Across Hotstuff, I also worked on the",
        "systems, interactions and visual layers that connected the product together.",
      ],
    },
    // 4253:23083
    {
      type: "chapter",
      eyebrow: "01",
      title: "GAMIFICATION",
      paragraphs: [
        "Gamification ran across Hotstuff through tiers, badges, streaks, milestones, collectible cards and leaderboards. Each gave progress a different form, from personal milestones and daily activity to competing against other traders.",
        "I also created the visual language around these systems, designing the tier badges, collectible cards and reward assets so progress felt recognisable and worth reaching.",
      ],
      visuals: [
        {
          render: render(
            "gamification",
            "Tier badges, collectible cards and reward assets",
            { width: 1258, height: 635.5 },
          ),
        },
      ],
    },
    // 4253:23091
    {
      type: "chapter",
      eyebrow: "02",
      title: "Built to be shared",
      uppercase: true,
      paragraphs: [
        "Some moments in Hotstuff were designed to live beyond the product. PnL, Points, competition wins and progress could be turned into shareable cards, taking information from the interface and giving it a more expressive visual treatment.",
        "The challenge was keeping the result instantly understandable, while making each card feel strong enough to stand on its own when shared.",
      ],
      visuals: [
        {
          render: render(
            "shareable",
            "Shareable PnL, points and competition cards",
            { width: 1258, height: 872 },
          ),
        },
      ],
    },
    // 4253:23100
    {
      type: "chapter",
      eyebrow: "03",
      title: "THE DETAILS",
      uppercase: true,
      paragraphs: [
        "A lot of the work happened between the main screens. Wallet connections, dropdowns, tooltips, confirmations, modals, empty states and errors all needed to work as clearly as the primary flows.",
        "These smaller interactions and states helped make Hotstuff feel complete and consistent across the product.",
      ],
      visuals: [
        {
          render: render(
            "details",
            "Wallet connection, dropdown, tooltip, modal and empty-state components",
            { width: 1258, height: 1014 },
          ),
        },
      ],
    },
    // 4253:23739
    {
      type: "chapter",
      eyebrow: "04",
      title: "RESPONSIVE DESIGN",
      size: "lg",
      paragraphs: [
        "Every major part of Hotstuff was designed for mobile. A dense desktop product couldn’t simply be scaled down. Content had to be prioritised, layouts reworked and interactions adapted for much less space, while keeping the most important actions easy to reach.",
        "The goal was to keep the same product and functionality, without making mobile feel like a compressed version of desktop.",
      ],
      visuals: [
        {
          render: render("responsive", "Hotstuff's mobile screens", {
            width: 1258,
            height: 1031,
          }),
        },
      ],
    },
    // 4253:23748
    {
      type: "chapter",
      eyebrow: "rEFLECTION",
      title: "More than designing screens",
      uppercase: true,
      size: "lg",
      paragraphs: [
        "Working across Hotstuff taught me how different designing a real, evolving product is from designing in isolation. I had to think beyond individual screens and consider how features connected, how the system could scale, and how decisions held up as the product changed.",
        "Being the sole designer also pushed me to become faster, more independent and more confident in making decisions, while balancing product thinking with the visual side of design.",
        "Hotstuff shaped the way I work today: think through the details, build for change, and never lose the craft.",
      ],
    },
    // 4512:102263 — the sign-off between arrows to the neighbouring case
    // studies; the row is 1254px wide, 2px in from each side.
    {
      type: "project-pager",
      // The loop: HOTSTUFF → ELEMENTS → SISTEM EXPENSE → MISS BLISS → HOTSTUFF
      // (the home page's order). From the home page, "previous" goes back
      // home instead (ProjectPagerBlock).
      previous: "miss-bliss",
      next: "elements",
      width: 1254,
      // 4512:102350 — the arrows centre on the badge; the DM Sans line sits
      // 40px below that row.
      heading: {
        text: "Thanks for reading",
        size: "md",
        face: "brand",
        figureGap: 40,
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
