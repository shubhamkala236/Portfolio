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
    layout.tsx      Fonts, metadata, header/footer, theme script
    page.tsx        Home — composes the feature sections
    projects/       Project index + [slug] detail page (static at build time)
    sitemap.ts      Generated from the content layer
    robots.ts
    globals.css     Design tokens (see below)
  components/
    ui/           Design-system primitives: Container, Section, Button, Tag
    layout/       Site chrome: header, footer, mobile nav, theme toggle
  features/       One folder per page section, self-contained
    hero/ about/ projects/ experience/ contact/
  content/        All editable copy and data, typed
    types.ts        Shapes every content file is checked against
    site.ts         Name, role, nav, socials, email
    projects.ts     Project data + query helpers
    experience.ts   Roles and skill groups
  lib/            cn(), fonts, SEO metadata builder, formatters
```

Three rules keep it maintainable:

1. **Content never lives in components.** Everything editable sits in
   `src/content/*.ts` and is checked with `satisfies` against `types.ts`, so a
   missing field is a compile error, not a blank space on the live site.
2. **Components never hard-code colours, fonts or spacing.** They use semantic
   tokens (`bg-surface`, `text-muted`, `rounded-card`, `py-section`) defined once
   in `globals.css`.
3. **Routes only compose.** Markup belongs to a feature or a UI primitive, which
   makes sections reorderable and reusable across pages.

## Editing content

| To change                  | Edit                        |
| -------------------------- | --------------------------- |
| Name, nav, socials, email  | `src/content/site.ts`       |
| Projects (and their pages) | `src/content/projects.ts`   |
| Work history, skills       | `src/content/experience.ts` |

Adding an object to `projects.ts` automatically creates `/projects/<slug>`, adds
the card to the listing, and adds the URL to the sitemap. Put cover images in
`public/projects/` and set their real `width`/`height`.

## Applying the Figma design

`globals.css` is the only file that needs to change to re-skin the site:

- `--palette-*` — raw values copied from the Figma variables.
- semantic tokens (`--bg`, `--fg`, `--accent`, `--border`, …) — which palette
  value each role uses, in light and in dark.
- `@theme inline` — maps those onto Tailwind utility names.
- `--text-display` / `--text-headline` — fluid type scale using `clamp()`, so one
  value covers the mobile and desktop frames.

Typefaces are set in `src/lib/fonts.ts`; the page gutter and max width in
`src/components/ui/container.tsx`.

## Theming

Theme is stored on `<html data-theme="light|dark">`, applied before first paint
by the inline script in `src/components/layout/theme-script.tsx` (no flash of the
wrong theme), and persisted to `localStorage`. Style dark variants with Tailwind's
`dark:` prefix.
