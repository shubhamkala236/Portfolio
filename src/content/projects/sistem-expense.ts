import type { FigmaRender, Project } from "@/content/types";

/**
 * SISTEM EXPENSE — case study.
 * Source: Figma node 4106:5296 (Portfolio / ol3LIQ7aCBwvRt99OTzI8k).
 *
 * Block order, nesting and gaps mirror the Figma frame tree; each block notes
 * the frame it came from. Copy is verbatim from the file, including its
 * inconsistencies (the two flow titles are styled differently, and so are the
 * section descriptions) — those are reproduced, not tidied.
 *
 * Everything above the Introduction follows the revised page 4286:5920: a
 * full-bleed hero render, then the title and meta row opening the body.
 *
 * Type follows 4506:81328: the title is DM Sans SemiBold, tightened 4%, and
 * every other heading DM Sans Regular, untracked (`headings: "brand"`).
 */

const dir = "/case-studies/sistem-expense";

/** A Figma 1x/2x render pair; sizes are the 1x render's CSS px. */
const render = (
  name: string,
  width: number,
  height: number,
  alt: string,
): FigmaRender => ({
  src1x: `${dir}/${name}@1x.png`,
  src2x: `${dir}/${name}@2x.png`,
  width,
  height,
  alt,
});

export const sistemExpense = {
  slug: "sistem-expense",
  title: "SISTEM EXPENSE",
  subtitle: "Built around the way you actually manage your money",
  summary:
    "A personal finance app that brings expenses, budgets, shared payments and goals into one place.",
  year: 2024,
  role: "UX/Ui Intern",
  stack: ["UX Research", "User Flows", "Wireframes"],
  featured: true,
  links: {},
  cover: null,
  heroMedia: null,
  headings: "brand",
  // 4506:81327 — full-bleed, no title (the title opens the body instead)
  heroRender: render(
    "hero",
    1512,
    800,
    "A phone showing the Sistem home screen with total spendings, on a lilac textured background",
  ),
  blocks: [
    // 4286:5964 — title 64px above the meta row
    {
      type: "group",
      gap: 64,
      blocks: [
        {
          type: "page-title",
          title: "SISTEM EXPENSE",
          // 4506:81331 — DM Sans SemiBold, -4%; the subtitle is 40px, 12px under
          // (the file's 20).
          titleStyle: "brand",
          subtitle: ["Built around the way you actually manage your money"],
          subtitleSize: "md",
          subtitleGap: 12,
        },
        {
          type: "meta",
          items: [
            { label: "Client", value: "Sistem.app" },
            // As in the file on the web; on a phone, "UI" capitalised.
            {
              label: "Role",
              value: "UX/Ui Intern",
              phoneValue: "UX/UI Intern",
            },
            { label: "Timeline", value: "3 Weeks" },
            { label: "Scope", value: "UX Research, User Flows, Wireframes" },
          ],
        },
      ],
    },
    // 4286:5984
    {
      type: "heading",
      text: "A Simpler way to handle Money",
      // On a phone, in two lines.
      phoneLines: ["A Simpler way to", "handle Money"],
      maxWidth: 726,
      tone: "strong",
      // 4506:81349 reports 0% tracking, but Figma spaces its glyphs 0.5px
      // wider — measured: same letter widths, gaps 0.5px larger (line 1
      // 648px, "Money" 182px; 636/180 at 0).
      tracking: 0.0078,
    },
    // 4286:5985 — inner stack at 100px
    {
      type: "group",
      gap: 100,
      blocks: [
        {
          type: "prose",
          eyebrow: "Introduction",
          paragraphs: [
            "Sistem is a personal finance app that brings expenses, budgets, shared payments and financial goals into one place, helping people manage their money around how they actually live.",
          ],
        },
        {
          type: "prose",
          eyebrow: "Problem Statement",
          paragraphs: [
            "Managing money is spread across too many tools. Tracking cash and bank expenses, splitting costs and managing budgets often happen separately, making it harder to see where your money actually goes.",
          ],
        },
        // 4106:5327
        {
          type: "solution-cards",
          eyebrow: "Solution Overview",
          description:
            "We wanted Sistem to handle the different ways people manage money, without making the experience feel complicated.",
          items: [
            {
              icon: render("solution-track", 180, 120, "Stacked bank cards"),
              title: "Track everything",
              description: "Add expenses manually  or Connect a bank account.",
            },
            {
              icon: render(
                "solution-together",
                180,
                120,
                "Three overlapping member circles",
              ),
              title: "Manage Money Together",
              description:
                "Split bills, track shared expenses and manage group budgets.",
            },
            {
              icon: render(
                "solution-budget",
                180,
                120,
                "Stacked layers representing budget categories",
              ),
              title: "Budget Your Way",
              description:
                "Set monthly, yearly or category-based budgets with room for unexpected spending.",
            },
            {
              icon: render(
                "solution-simple",
                180,
                120,
                "A simple line graph on a card",
              ),
              title: "Keep it Simple",
              description:
                "Reduce unnecessary steps and make everyday money management quick and easy.",
            },
          ],
        },
        // 4106:5353
        {
          type: "nav-structure",
          eyebrow: "Navigation Structure",
          description:
            "The app was organised into four core sections, keeping everyday money management easy to navigate.",
          rows: [
            {
              icon: `${dir}/nav-home.svg`,
              title: "Home",
              offset: 0,
              items: [
                "Financial overview",
                "Recent Transactions",
                "Quick Expense Entry",
                "Account balance",
              ],
            },
            {
              icon: `${dir}/nav-transactions.svg`,
              title: "Transactions",
              offset: 126,
              items: [
                "Track Expenses",
                "Plan Budgets",
                "Split Costs",
                "Managed Shared Expenses",
              ],
            },
            {
              icon: `${dir}/nav-profile.svg`,
              title: "profile",
              offset: 0,
              items: [
                "Manage Budgets, Groups & Linked Accounts",
                "Preferences & Customisations",
              ],
            },
            {
              icon: `${dir}/nav-sistem-ai.svg`,
              title: "sistem aI",
              offset: 176,
              items: [
                "Ask questions about your finances and get personalised spending insights",
              ],
            },
          ],
        },
      ],
    },
    // 4106:5406
    {
      type: "walkthrough",
      eyebrow: "Wireframes",
      title: "Expense",
      description:
        "Expenses helps users keep track of everyday spending in one place, giving them a clearer picture of where their money goes and making transactions easier to manage.",
      flowGap: 148,
      flows: [
        // 4106:5413
        {
          title: "Add Transaction Flow",
          titleSize: "lg",
          description:
            "Transactions handles cash, bank, split, shared and recurring expenses, keeping everyday spending easy to add, manage and track.",
          width: 1100,
          stepGap: 80,
          steps: [
            {
              title: "Enter amount and date",
              figure: render(
                "expense-1-amount-date",
                1100,
                405,
                "Wireframes of the expense list and the add-expense screen, with callouts for the amount, currency and date fields",
              ),
              annotations: [
                { text: "Add transaction amount and choose the currency" },
                { text: "Add date" },
              ],
            },
            {
              title: "Add Category",
              figure: render(
                "expense-2-category",
                1100,
                404,
                "Wireframes of choosing a category for an expense",
              ),
              annotations: [
                {
                  text: "Categories and Sub-categories are colour-coded for quick identification.",
                },
              ],
            },
            {
              title: "Add Account",
              figure: render(
                "expense-3-account",
                1100,
                403,
                "Wireframes of choosing which account an expense is paid from",
              ),
              // 12px on a phone.
              note: {
                phoneSmall: true,
                lead: "Split Payments:",
                text: " A single expense can be paid using cash, bank, or both. Users can split the amount between payment methods, keeping transactions accurate and easy to track.",
              },
              annotations: [{ text: "Cash, bank, or both." }],
            },
            {
              title: "Recurring Payments",
              figure: render(
                "expense-4-recurring",
                1100,
                403,
                "Wireframes of setting up a recurring payment",
              ),
              annotations: [
                {
                  text: "Shows the date, duration and amount of recurring expenses.",
                },
              ],
            },
            {
              title: "Add and Split a Group Expense",
              figure: render(
                "expense-5-group-split",
                1100,
                895,
                "Wireframes of adding an expense to a group and splitting it between members",
              ),
              annotations: [
                {
                  text: "Tapping ‘Next’ takes users to the split screen to review and finalise the split.",
                },
                {
                  text: "Shows the selected group, with the option to change it.",
                },
                {
                  text: "Split expenses equally, by exact amount, percentage, or shares.",
                },
              ],
            },
            {
              title: "Transaction Details",
              figure: render(
                "expense-6-details",
                1100,
                576,
                "Wireframes of the transaction list and the transaction details page",
              ),
              annotations: [
                { text: "Tap ‘Edit’ to update the transaction details." },
                { text: "Check the attached images" },
                {
                  text: "The Transaction Details page brings all key information together for easy review and editing.",
                },
              ],
            },
          ],
        },
        // 4106:6114
        {
          title: "Group Expense Management Flow",
          titleSize: "md",
          description:
            "Groups helps users organise spending around a specific purpose, whether it’s a personal trip or shared expenses with others, keeping everything related together in one place.",
          width: 1100,
          stepGap: 40,
          steps: [
            {
              title: "Unified Group Dashboard",
              figure: render(
                "group-1-dashboard",
                1100,
                402,
                "Wireframe of the group dashboard with callouts",
              ),
              annotations: [
                { text: "Tab to switch between Transactions and Groups." },
                { text: "Quick overview of what’s owed and receivable." },
                { text: "Recent activity keeps group updates easy to track." },
                {
                  text: "Pay button is prioritised to make settling dues quick and effortless.",
                },
              ],
            },
            {
              title: "Create and Set-up a Group",
              figure: render(
                "group-2-create",
                1100,
                403,
                "Wireframes of creating a group, with its feature list",
              ),
              annotations: [
                { text: "Features that make group expenses easier to manage." },
                {
                  title: "Simplify Debts",
                  text: "Combines dues to reduce the number of repayments.",
                },
                {
                  title: "Default Split",
                  text: "Splits new expenses equally by default.",
                },
                {
                  title: "Set Budget",
                  text: "Set a spending limit to keep group expenses on track.",
                },
              ],
            },
            {
              title: "Group Chat and Transactions Overview",
              figure: render(
                "group-3-chat",
                1100,
                410,
                "Wireframe of a group's chat with its transactions tab",
              ),
              annotations: [
                {
                  text: "Shows the group name, members and total expenses at a glance.",
                },
                {
                  text: "Each expense shows the amount, payer, split and payment status.",
                },
                {
                  text: "Users can chat within the group, while the Add button lets them quickly add expenses or attachments.",
                },
                {
                  text: "I noticed transactions could get lost in busy group chats, so I added tabs to switch between chat and transactions without extra steps.",
                },
              ],
            },
            {
              title: "Track Split Status",
              figure: render(
                "group-4-split-status",
                1100,
                403,
                "Wireframes of an open and a settled split",
              ),
              annotations: [
                { text: "See who has paid and what’s still owed." },
                { text: "Once settled, the expense is marked as Closed." },
              ],
            },
          ],
        },
      ],
    },
    // 4106:6175 — its header frame is fixed at 132px (4506:82206)
    {
      type: "annotated-figure",
      phoneHeaderGap: 64,
      eyebrow: "Wireframes",
      title: "Budgeting",
      headerHeight: 132,
      description:
        "Budgeting helps users plan their spending before it happens, rather than simply tracking it afterwards. It gives them a clearer sense of where their money is going and how much they have left to spend.",
      descriptionTone: "muted",
      image: {
        src: `${dir}/budgeting@2x.png`,
        alt: "Wireframes of the budgeting flow, from profile to setting and splitting a budget",
        width: 2516,
        height: 2570,
      },
      image1x: `${dir}/budgeting@1x.png`,
      // 4106:6181 is 1284 tall; its render rounds up to 1285.
      frame: { width: 1258, height: 1284 },
      annotations: [
        {
          text: "Set monthly or yearly budgets for overall spending or specific categories.",
        },
        {
          text: "Split budgets across categories equally, by amount, percentage or shares.",
        },
        { text: "Any unallocated amount becomes a floating budget." },
        {
          text: "The floating budget automatically covers categories that exceed their limit.",
        },
      ],
    },
    // 4106:6196 — its header frame is fixed at 132px (4506:82227)
    {
      type: "walkthrough",
      eyebrow: "Wireframes",
      title: "Home Screen",
      headerHeight: 132,
      description:
        "The Home screen acts as a quick financial overview, bringing key spending, budget, group activity, reminders and recent transactions together so users can understand where they stand at a glance.",
      descriptionTone: "muted",
      flows: [
        {
          width: 1258,
          stepGap: 40,
          // The iterations 36px apart on a phone.
          phoneStepGap: 36,
          numbered: false,
          steps: [
            {
              title: "ITERATION 1",
              figure: render(
                "home-iteration-1",
                1258,
                660,
                "First iteration of the Home screen wireframe with callouts",
              ),
              annotations: [
                {
                  title: "Monthly Spending Overview",
                  text: "Gives users a quick view of spending, with monthly comparison and weekly breakdown.",
                },
                {
                  title: "Monthly Budget Spending",
                  text: "Shows budget progress and colour-coded category spending, making usage easy to understand.",
                },
                {
                  title: "Reminders",
                  text: "Keeps upcoming payments visible, so they’re less likely to be missed.",
                },
                {
                  title: "Tips",
                  text: "Provides useful guidance without interrupting key actions.",
                },
                {
                  title: "Today’s Expenses",
                  text: "Keeps daily spending visible, with Add for quick expense logging.",
                },
                {
                  title: "Money Owed",
                  text: "Shows how much the user owes and to which groups,",
                },
                {
                  title: "Pinned Group",
                  text: "Lets users pin a group for quick access and faster expense logging.",
                },
                {
                  title: "Latest Transactions",
                  text: "Keeps recent activity visible for quick review.",
                },
              ],
            },
            {
              title: "ITERATION 2",
              figure: render(
                "home-iteration-2",
                1258,
                612,
                "Second iteration of the Home screen wireframe with callouts",
              ),
              annotations: [
                {
                  title: "Combined Monthly Spending & Budget",
                  text: "Combined monthly spending and budget into one section. A gradient bar graph shows weekly spending, with colours representing categories and their spending amounts.",
                },
                {
                  title: "Reminders",
                  text: "Shows upcoming payments, with an option to dismiss completed or irrelevant reminders.",
                },
                {
                  title: "Tips",
                  text: "Provides useful guidance without interrupting key actions.",
                },
                {
                  title: "Three-Widget Row",
                  text: "Brought three useful actions into a compact row: Pinned Group: Shows the group, budget and category spending for quick expense logging. Groups: Highlights groups where the user owes money. Today’s Expense: Shows today’s spending with an Add button for quick logging.",
                },
                {
                  title: "Latest Transactions",
                  text: "Keeps recent activity visible for quick review.",
                },
              ],
            },
            {
              title: "ITERATION 3",
              figure: render(
                "home-iteration-3",
                1258,
                610,
                "Third iteration of the Home screen wireframe with callouts",
              ),
              annotations: [
                {
                  title: "Combined Monthly Spending & Budget",
                  text: "Uses 25 colour-coded circles, each representing 4%, to show spending distribution across categories.",
                },
                {
                  title: "Monthly Budget Overview",
                  text: "Uses a category-coloured gradient bar with exact amounts to show how much of the budget is used.",
                },
              ],
            },
          ],
        },
      ],
    },
    // 4106:6263
    {
      type: "prose",
      eyebrow: "Conclusion",
      title: "Outcome & Learnings",
      size: "lg",
      paragraphGap: 8,
      paragraphs: [
        "Working on Sistem made me realise that simplifying a product doesn’t mean making it less complex. It’s about organising that complexity so it feels easier to use.",
        "While working through transactions, groups, budgets and Home, I learned to think more carefully about what users need first, where extra steps can be removed, and how different flows connect. Wireframing helped me work through these decisions early and explore different approaches before moving into visual design.",
      ],
    },
    // 4512:102077 — the sign-off between arrows to the neighbouring case
    // studies, as on Miss Bliss: the arrows centre on the badge, the DM Sans
    // line sits 40px below; the row is 1254px wide, 2px in from each side.
    {
      type: "project-pager",
      // The loop: HOTSTUFF → ELEMENTS → SISTEM EXPENSE → MISS BLISS → HOTSTUFF
      // (the home page's order). From the home page, "previous" goes back
      // home instead (ProjectPagerBlock).
      previous: "elements",
      next: "miss-bliss",
      width: 1254,
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
