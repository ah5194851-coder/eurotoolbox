# LoveEasyTool

LoveEasyTool is a browser-first collection of free tools for text, calculations, images, dates, careers and everyday tasks.

## Run & Operate

- `npm run dev` — run LoveEasyTool on port 3000
- `npm run build` — typecheck + build
- `npm run lint` — lint/typecheck codebase

## Where things live

- `artifacts/eurotoolbox/src/App.tsx` — the product shell, tool catalog, routes and browser-side tool logic
- `artifacts/eurotoolbox/src/index.css` — LoveEasyTool theme tokens, typography, motion and print rules
- `artifacts/eurotoolbox/public/robots.txt` and `sitemap.xml` — crawler support
- `artifacts/eurotoolbox/README.md` — build and publish notes

## Architecture decisions

- Utilities are client-side by default so text and image inputs do not need to leave the browser.
- The currency converter uses clearly labelled static reference values until a live rate provider is intentionally added.
- PDF image export uses the native browser print flow rather than pretending to provide a universal PDF writer.
- Tool routes support both `/tools/<slug>` and short SEO-friendly `/<slug>` URLs.

## Product

The app includes searchable text tools, everyday calculators, image resizing and format conversion, date and time utilities, a printable CV builder, and a local cover-letter draft generator. Tool pages include route-level metadata, related links, instructions and FAQs.
