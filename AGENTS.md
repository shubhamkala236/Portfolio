<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project conventions

- Content lives in `src/content/*.ts`, typed with `satisfies` against
  `src/content/types.ts`. Never hard-code copy or data inside a component.
- Colours, fonts, radii and section spacing come from the tokens in
  `src/app/globals.css`. Never write a raw hex value or an arbitrary Tailwind
  value in a component.
- `src/app/**` holds routes only; they compose components from `src/features/**`
  and `src/components/**`.
- `src/components/ui` is for design-system primitives, `src/components/layout`
  for site chrome, `src/features/<section>` for page sections.
- Server Components by default. Add `"use client"` only for genuine interactivity
  (currently the case-study section nav, the home tab bar, the about-me
  photo fan's scroll trigger, the site-wide scroll reveal, the page
  transition, the route memory and the pager's previous arrow).
- Scroll reveal: mark a container `data-reveal-group` and its direct children
  fade and rise in, staggered, as they scroll into view; nested groups
  cascade. Skip a child with `data-reveal-skip` (e.g. anything sticky).
- Page transition: a link marked `data-page-transition` (the home project
  cards) plays the blob cover-and-window transition into its page;
  `data-page-transition="curtain"` (the case-study pager arrows) plays the
  black curtain wipe instead.
- Before finishing: `npm run typecheck && npm run lint && npm run build`.
