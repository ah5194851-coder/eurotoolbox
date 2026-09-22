---
name: Static SEO prerendering
description: Deployment and verification constraints for static Cloudflare-style artifact routes.
---

Build-time prerendering should emit directory index.html files plus a root 404.html, and the static-assets configuration must use its explicit 404-page mode rather than SPA fallback. Vite preview may still return the home page for unknown paths, so verify deployment behavior with a plain static server or the deployment runtime.

**Why:** The development preview server intentionally falls back to index.html, which can hide a broken production 404 configuration.

**How to apply:** Keep the prerender output under the configured static-assets directory, test known route 200s and unknown route 404s separately, and keep generated SSR intermediates ignored.