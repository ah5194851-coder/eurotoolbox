# EuroToolBox

EuroToolBox is a fast collection of browser-first utilities for text, calculations, images, dates, careers and everyday tasks.

## Cloudflare Pages

- Build command: `pnpm --filter @workspace/eurotoolbox run build`
- Output directory: `artifacts/eurotoolbox/dist/public`
- Framework preset: Vite
- No backend or API key is required for the current version.

The app uses the browser's local APIs for text, calculations, image processing, printing and time-zone formatting. Currency values are clearly marked as static reference rates; the app does not claim to provide live exchange rates.

## Local development

From the workspace root:

```bash
pnpm --filter @workspace/eurotoolbox run dev
```

The managed preview workflow supplies `PORT` and `BASE_PATH`. For a one-off production build outside the workflow, provide both values:

```bash
PORT=4173 BASE_PATH=/ pnpm --filter @workspace/eurotoolbox run build
```