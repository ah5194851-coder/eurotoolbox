# EuroToolBox

EuroToolBox is a browser-first collection of free tools for text, calculations, images, dates, careers and everyday tasks.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/eurotoolbox/src/App.tsx` — the product shell, tool catalog, routes and browser-side tool logic
- `artifacts/eurotoolbox/src/index.css` — EuroToolBox theme tokens, typography, motion and print rules
- `artifacts/eurotoolbox/public/robots.txt` and `sitemap.xml` — crawler support
- `artifacts/eurotoolbox/README.md` — Cloudflare Pages build and publish notes

## Architecture decisions

- Utilities are client-side by default so text and image inputs do not need to leave the browser.
- The currency converter uses clearly labelled static reference values until a live rate provider is intentionally added.
- PDF image export uses the native browser print flow rather than pretending to provide a universal PDF writer.
- Tool routes support both `/tools/<slug>` and short SEO-friendly `/<slug>` URLs.

## Product

The app includes searchable text tools, everyday calculators, image resizing and format conversion, date and time utilities, a printable CV builder, and a local cover-letter draft generator. Tool pages include route-level metadata, related links, instructions and FAQs.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
