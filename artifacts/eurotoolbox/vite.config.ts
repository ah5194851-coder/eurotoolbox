import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

function devApiPlugin() {
  return {
    name: 'dev-api-endpoints',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === '/api/php-check' && req.method === 'POST') {
          let rawBody = '';
          req.on('data', (chunk: any) => { rawBody += chunk; });
          req.on('end', async () => {
            try {
              const body = JSON.parse(rawBody);
              let targetUrlStr = typeof body?.url === 'string' ? body.url.trim() : '';
              if (!targetUrlStr) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Please enter a website URL.' }));
                return;
              }
              if (!/^https?:\/\//i.test(targetUrlStr)) targetUrlStr = 'https://' + targetUrlStr;
              const parsed = new URL(targetUrlStr);
              const host = parsed.hostname.toLowerCase();
              if (host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host.endsWith('.local')) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Requests to private, loopback, or internal IP addresses are blocked.' }));
                return;
              }
              const response = await fetch(parsed.toString(), {
                method: 'GET',
                headers: {
                  'User-Agent': 'LoveEasyTool PHP checker (+https://loveeasytool.com/tools/php-vulnerability-checker)',
                  'Accept': 'text/html,*/*',
                },
                redirect: 'follow',
                signal: AbortSignal.timeout(5000),
              });
              const xPoweredBy = response.headers.get('x-powered-by');
              const serverHdr = response.headers.get('server');
              const setCookie = response.headers.get('set-cookie');
              const text = await response.text();
              const snippet = text.slice(0, 102400);

              const indicators: string[] = [];
              let detectedVersion: string | undefined;
              if (xPoweredBy) {
                indicators.push(`X-Powered-By header: "${xPoweredBy}"`);
                const match = xPoweredBy.match(/PHP\/([0-9]+(?:\.[0-9]+)+(?:-[a-zA-Z0-9.+~]+)?)/i);
                if (match) detectedVersion = match[1];
              }
              if (serverHdr) {
                const sMatch = serverHdr.match(/(?:PHP|mod_php)\/([0-9]+(?:\.[0-9]+)+(?:-[a-zA-Z0-9.+~]+)?)/i);
                if (sMatch) {
                  indicators.push(`Server header module: "${sMatch[0]}"`);
                  if (!detectedVersion) detectedVersion = sMatch[1];
                }
              }
              if (setCookie && /phpsessid/i.test(setCookie)) indicators.push('Session cookie: PHPSESSID detected in Set-Cookie header');
              let metaGen: string | null = null;
              const gm = snippet.match(/<meta[^>]+(?:name=["']generator["'][^>]+content=["']([^"']+)["']|content=["']([^"']+)["'][^>]+name=["']generator["'])/i);
              if (gm) {
                metaGen = (gm[1] || gm[2] || '').trim();
                if (/wordpress|drupal|joomla|magento/i.test(metaGen)) {
                  indicators.push(`Meta generator: "${metaGen}" (PHP-powered CMS)`);
                }
              }

              let state = 'no_indicators';
              let stateLabel = 'No PHP indicators found — this does not guarantee the site is unaffected';
              let summary = 'No public headers, session cookies, or page markup exposed PHP signatures.';

              if (detectedVersion) {
                state = 'possibly_affected';
                stateLabel = 'Possibly affected';
                summary = `The server publicly reports PHP version ${detectedVersion}.`;
              } else if (indicators.length > 0) {
                state = 'php_detected_version_hidden';
                stateLabel = 'PHP detected, version hidden — ask your host to confirm';
                summary = 'Passive indicators confirm this site runs on a PHP-based environment, but the exact version string is hidden.';
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                url: targetUrlStr,
                finalUrl: response.url || targetUrlStr,
                status: response.status,
                state,
                stateLabel,
                summary,
                detectedVersion,
                indicators,
                headers: { xPoweredBy, server: serverHdr, setCookie },
                metaGenerator: metaGen,
                hasPhpLinks: snippet.includes('.php'),
                redirectsCount: 0,
              }));
            } catch (err: any) {
              res.statusCode = 502;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: String(err?.message || 'Check failed') }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(({ command }) => {
  const isBuild = command === 'build';
  const rawPort = process.env.PORT ?? (isBuild ? '4173' : '3000');
  const port = Number(rawPort) || 3000;
  const basePath = process.env.BASE_PATH || '/';

  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
      devApiPlugin(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, 'src'),
        '@assets': path.resolve(
          import.meta.dirname,
          '..',
          '..',
          'attached_assets',
        ),
      },
      dedupe: ['react', 'react-dom'],
    },
    root: path.resolve(import.meta.dirname),
    build: {
      outDir: path.resolve(import.meta.dirname, 'dist/public'),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined;
            if (id.includes('pdfjs-dist') || id.includes('pdf-lib')) return 'pdf';
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('@radix-ui')) return 'radix';
            if (/\/node_modules\/(?:react|react-dom|scheduler)(?:\/|$)/.test(id)) return 'react';
            return 'vendor';
          },
        },
      },
    },
    server: {
      port,
      strictPort: true,
      host: '0.0.0.0',
      allowedHosts: true,
      fs: {
        strict: true,
      },
    },
    preview: {
      port,
      host: '0.0.0.0',
      allowedHosts: true,
    },
  };
});
