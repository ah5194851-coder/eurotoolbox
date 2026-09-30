import { mkdir, readFile, writeFile, unlink } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = resolve(root, 'dist/public');
const sourcePublicDir = resolve(root, 'public');
const ssrModule = await import(pathToFileURL(resolve(root, '.prerender/ssr-entry.js')).href);
const { PRERENDER_ROUTES, SITEMAP_ROUTES, renderRoute, renderHead, absoluteUrl, SITE_URL, tools } = ssrModule;
const template = await readFile(resolve(publicDir, 'index.html'), 'utf8');
const stylesheets = [...template.matchAll(/<link[^>]+rel="stylesheet"[^>]*>/g)].map(match => match[0]).join('\n    ');
const scripts = [...template.matchAll(/<script type="module"[^>]+><\/script>/g)].map(match => match[0]).join('\n    ');
const today = new Date().toISOString().slice(0, 10);

function documentFor(path, body) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
    ${renderHead(path)}
       <meta name="google-site-verification" content="gUr0jluws07kPmgJnTiCcCkgoXgk8CcMyjgWGLaeTwU" />
    ${stylesheets}
  </head>
  <body>
    <div id="root">${body}</div>
    ${scripts}
  </body>
</html>
`;
}

async function writeRoute(path, body) {
  const output = path === '/' ? resolve(publicDir, 'index.html') : resolve(publicDir, path.slice(1), 'index.html');
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, documentFor(path, body));
}

for (const route of PRERENDER_ROUTES) {
  await writeRoute(route, renderRoute(route));
}

const notFoundBody = renderRoute('/404');
await writeFile(resolve(publicDir, '404.html'), documentFor('/404', notFoundBody));

const crawlRoutes = SITEMAP_ROUTES;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${crawlRoutes.map(route => `  <url><loc>${absoluteUrl(route)}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
const robots = `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`;

const llmsContent = `# LoveEasyTool

> Free everyday online tools for text, calculations, PDFs, images, and documents with zero sign-up and client-side privacy.

## About LoveEasyTool
LoveEasyTool (${SITE_URL}) is an open web utility platform created by Ali Hassan to provide calm, fast, and completely private browser tools. The platform's core promise is local-first client-side processing: all calculations, conversions, image processing, and text scrubbing execute directly inside the user's web browser using JavaScript and WebAssembly. No user accounts, email sign-ups, subscriptions, or file uploads to remote servers are required. When you close or refresh your browser tab, your working memory is cleared.

## Available Tools

${tools.map(tool => `- [${tool.name}](${SITE_URL}/tools/${tool.slug}): ${tool.description}`).join('\n')}

## Categories
- Text Tools: Word counter, character counter, case converter, text cleaner, duplicate line remover
- Number Tools: Percentage calculator, discount calculator, BMI calculator, loan calculator, VAT calculator, age calculator
- File Tools: Image compressor, image resizer, JPG to PNG, PNG to JPG, WebP converter, image cropper
- PDF Tools: Merge PDF, split PDF, PDF text extractor, Word to PDF, PDF optimizer, PDF to JPG, JPG to PDF helper
- Time Tools: Date calculator
- Everyday Tools: Unit converter, time-zone converter, currency reference converter
- Work Tools: Free CV builder, cover-letter generator, salary calculator

## Core Principles
- 100% Free: No fees, trials, or hidden paywalls
- Zero Sign-Up: Immediate access without accounts or emails
- Privacy-First: All processing happens in local browser memory with zero server uploads
- Author: Ali Hassan (founder and creator of LoveEasyTool)
`;

await Promise.all([
  writeFile(resolve(publicDir, 'sitemap.xml'), sitemap),
  writeFile(resolve(publicDir, 'robots.txt'), robots),
  writeFile(resolve(publicDir, 'llms.txt'), llmsContent),
  writeFile(resolve(sourcePublicDir, 'sitemap.xml'), sitemap),
  writeFile(resolve(sourcePublicDir, 'robots.txt'), robots),
  writeFile(resolve(sourcePublicDir, 'llms.txt'), llmsContent),
  unlink(resolve(publicDir, '_redirects')).catch(() => {}),
  unlink(resolve(sourcePublicDir, '_redirects')).catch(() => {}),
]);

console.log(`Prerendered ${PRERENDER_ROUTES.length} routes plus 404.html`);
console.log(`Generated llms.txt at ${SITE_URL}/llms.txt`);
console.log(`Generated ${crawlRoutes.length} sitemap URLs using ${SITE_URL}`);
console.log(PRERENDER_ROUTES.join('\n'));
