# Portfolio

Personal portfolio built with Next.js 16 (App Router), React 19, TypeScript and
Tailwind CSS v4.

```bash
npm run dev          # http://localhost:3000
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run format       # prettier --write .
```

## How the code is organised

```
src/
  app/            Routes only. Pages compose sections; they hold no markup of their own.
    layout.tsx      Fonts, metadata, header/footer
    page.tsx        Home — composes the feature sections
    projects/       Project index + [slug] case study page (static at build time)
    sitemap.ts      Generated from the content layer
    robots.ts
    globals.css     Design tokens (see below)
  components/
    ui/           Design-system primitives: Container, Section, Button, Tag, Eyebrow
    layout/       Site chrome: header, footer, mobile nav
  features/
    case-study/   Case study hero + one renderer per content block
    hero/ about/ projects/ experience/ contact/
  content/        All editable copy and data, typed
    types.ts        Shapes every content file is checked against
    site.ts         Name, role, nav, socials, email
    projects/       One file per case study, plus the index and query helpers
    experience.ts   Roles and skill groups
  lib/            cn(), fonts, SEO metadata builder, formatters
```

Three rules keep it maintainable:

1. **Content never lives in components.** Everything editable sits in
   `src/content/` and is checked with `satisfies` against `types.ts`, so a
   missing field is a compile error, not a blank space on the live site.
2. **Components never hard-code colours, fonts or spacing.** They use semantic
   tokens (`bg-surface`, `text-muted`, `rounded-chip`, `py-block`) defined once
   in `globals.css`.
3. **Routes only compose.** Markup belongs to a feature or a UI primitive.

## Case studies are data, not pages

A case study is a sequence of typed blocks, not a fixed template — every project
tells its story in a different order. `/projects/[slug]` renders whatever blocks
the content file lists:

```ts
blocks: [
  { type: "meta", items: [{ label: "Role", value: "UX/UI Designer" }] },
  { type: "prose", eyebrow: "Introduction", paragraphs: ["..."] },
  { type: "statement", eyebrow: "So I started with one question", text: "..." },
];
```

Available blocks: `meta`, `prose`, `quote-cluster`, `statement`, `media`.

**To add a project:** write `src/content/projects/<slug>.ts` and list it in
`src/content/projects/index.ts`. That creates the route, the listing card and the
sitemap entry.

**To add a new kind of section:** add a variant to the `CaseStudyBlock` union in
`src/content/types.ts`, then add a case to the switch in
`src/features/case-study/case-study-blocks.tsx`. The `never` default means
forgetting the second step breaks the build instead of silently rendering
nothing.

Visuals that are still empty frames in Figma are `null` in the content and render
as the grey placeholder box from the design, so an unfinished slot stays visible
rather than collapsing.

## Applying the Figma design

Tokens in `globals.css` mirror the Figma variables, with the Figma name in a
comment beside each one:

| Figma variable                      | Token              |
| ----------------------------------- | ------------------ |
| Text colour/Off white, Dark primary | `--fg`             |
| Text colour/Dark Secondary          | `--fg-muted`       |
| Background/dark Bg II               | `--surface-raised` |
| Neutrals/Colour 400                 | `--border`         |
| Icon colours/Accent                 | `--accent`         |

Type sizes use `clamp()` with the Figma desktop value as the upper bound, so one
declaration covers mobile through the 1512px frame. Tracking is a uniform 0.06em
across the design.

Typefaces (Gloock for display, Quicksand for body) are set in
`src/lib/fonts.ts`; the 1258px content width in
`src/components/ui/container.tsx`.

## Theming

The design is dark-only, so there is a single palette and no theme toggle. The
token structure supports adding a light theme later: define light values on
`:root` and move the current ones under a `[data-theme="dark"]` selector.
