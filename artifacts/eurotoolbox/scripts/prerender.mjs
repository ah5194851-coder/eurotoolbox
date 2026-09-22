import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = resolve(root, 'dist/public');
const sourcePublicDir = resolve(root, 'public');
const ssrModule = await import(pathToFileURL(resolve(root, '.prerender/ssr-entry.js')).href);
const { PRERENDER_ROUTES, SITEMAP_ROUTES, renderRoute, renderHead, absoluteUrl, SITE_URL } = ssrModule;
const template = await readFile(resolve(publicDir, 'index.html'), 'utf8');
const stylesheets = [...template.matchAll(/<link[^>]+rel="stylesheet"[^>]*>/g)].map(match => match[0]).join('\n    ');
const scripts = [...template.matchAll(/<script type="module"[^>]+><\/script>/g)].map(match => match[0]).join('\n    ');
const today = new Date().toISOString().slice(0, 10);

function documentFor(path, body) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
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
await Promise.all([
  writeFile(resolve(publicDir, 'sitemap.xml'), sitemap),
  writeFile(resolve(publicDir, 'robots.txt'), robots),
  writeFile(resolve(sourcePublicDir, 'sitemap.xml'), sitemap),
  writeFile(resolve(sourcePublicDir, 'robots.txt'), robots),
]);

console.log(`Prerendered ${PRERENDER_ROUTES.length} routes plus 404.html`);
console.log(`Generated ${crawlRoutes.length} sitemap URLs using ${SITE_URL}`);
console.log(PRERENDER_ROUTES.join('\n'));
