interface Env {
  ASSETS: {
    fetch: (request: Request | string) => Promise<Response>;
  };
}

const TOOL_SLUGS = new Set([
  'word-counter', 'character-counter', 'case-converter', 'text-cleaner', 'duplicate-line-remover',
  'percentage-calculator', 'discount-calculator', 'bmi-calculator', 'loan-calculator', 'vat-calculator', 'age-calculator',
  'image-compressor', 'image-resizer', 'jpg-to-png', 'png-to-jpg', 'webp-converter', 'image-cropper',
  'pdf-to-word', 'word-to-pdf', 'merge-pdf', 'split-pdf', 'compress-pdf', 'pdf-to-jpg', 'jpg-to-pdf',
  'date-calculator', 'unit-converter', 'time-zone-converter', 'currency-converter',
  'cv-builder', 'cover-letter-generator', 'salary-calculator', 'php-vulnerability-checker'
]);

// In-memory IP rate limiter: 10 requests per hour per IP
const ipRateLimits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(clientIp: string): { allowed: boolean; remaining: number; resetInMinutes: number } {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const limit = 10;

  const record = ipRateLimits.get(clientIp);
  if (!record || now > record.resetAt) {
    ipRateLimits.set(clientIp, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetInMinutes: 60 };
  }

  if (record.count >= limit) {
    const resetInMinutes = Math.max(1, Math.ceil((record.resetAt - now) / 60000));
    return { allowed: false, remaining: 0, resetInMinutes };
  }

  record.count += 1;
  const resetInMinutes = Math.max(1, Math.ceil((record.resetAt - now) / 60000));
  return { allowed: true, remaining: limit - record.count, resetInMinutes };
}

function isBlockedHost(hostname: string): boolean {
  const host = hostname.toLowerCase().trim();

  // 1. Common blocked hostnames & internal TLDs
  if (
    host === 'localhost' ||
    host === '0.0.0.0' ||
    host === '::1' ||
    host === 'metadata.google.internal' ||
    host === 'instance-data' ||
    host.endsWith('.local') ||
    host.endsWith('.internal') ||
    host.endsWith('.localhost') ||
    host.endsWith('.lan') ||
    host.endsWith('.home') ||
    host.endsWith('.corp')
  ) {
    return true;
  }

  // 2. IPv4 address classification
  const ipv4Match = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4Match) {
    const a = parseInt(ipv4Match[1], 10);
    const b = parseInt(ipv4Match[2], 10);
    const c = parseInt(ipv4Match[3], 10);
    const d = parseInt(ipv4Match[4], 10);

    if (a > 255 || b > 255 || c > 255 || d > 255) return true;

    // Loopback 127.0.0.0/8
    if (a === 127) return true;
    // Current network 0.0.0.0/8
    if (a === 0) return true;
    // Private RFC 1918 (10.0.0.0/8)
    if (a === 10) return true;
    // Private RFC 1918 (172.16.0.0/12)
    if (a === 172 && b >= 16 && b <= 31) return true;
    // Private RFC 1918 (192.168.0.0/16)
    if (a === 192 && b === 168) return true;
    // Link-local / Cloud metadata (169.254.0.0/16)
    if (a === 169 && b === 254) return true;
    // Carrier-grade NAT (100.64.0.0/10)
    if (a === 100 && b >= 64 && b <= 127) return true;
    // Multicast & Reserved (224.0.0.0/4 and above)
    if (a >= 224) return true;
  }

  // 3. Raw 32-bit integer IPs
  if (/^\d+$/.test(host)) return true;

  // 4. IPv6 loopback / link-local / unique-local
  if (
    host.startsWith('fe80:') ||
    host.startsWith('fc00:') ||
    host.startsWith('fd00:') ||
    host.includes('::ffff:')
  ) {
    return true;
  }

  return false;
}

const FIXED_VERSIONS: Record<string, { minimumPatched: string; isEol: boolean }> = {
  '8.3': { minimumPatched: '8.3.13', isEol: false },
  '8.2': { minimumPatched: '8.2.25', isEol: false },
  '8.1': { minimumPatched: '8.1.30', isEol: false },
  '8.0': { minimumPatched: 'None (End of Life)', isEol: true },
  '7.4': { minimumPatched: 'None (End of Life)', isEol: true },
};

function isVersionOlder(candidate: string, target: string): boolean {
  const cParts = candidate.split(/[-+~]/)[0].split('.').map(n => parseInt(n, 10) || 0);
  const tParts = target.split(/[-+~]/)[0].split('.').map(n => parseInt(n, 10) || 0);

  for (let i = 0; i < Math.max(cParts.length, tParts.length); i++) {
    const c = cParts[i] ?? 0;
    const t = tParts[i] ?? 0;
    if (c < t) return true;
    if (c > t) return false;
  }
  return false;
}

async function handlePhpCheck(request: Request): Promise<Response> {
  const clientIp = request.headers.get('cf-connecting-ip') ||
                   request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                   '127.0.0.1';

  const rateCheck = checkRateLimit(clientIp);
  if (!rateCheck.allowed) {
    return new Response(JSON.stringify({
      error: `Rate limit reached. You can perform up to 10 checks per hour. Please try again in ${rateCheck.resetInMinutes} minute(s).`
    }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Retry-After': String(rateCheck.resetInMinutes * 60),
      }
    });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON request payload.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }

  let targetUrlStr = typeof body?.url === 'string' ? body.url.trim() : '';
  if (!targetUrlStr) {
    return new Response(JSON.stringify({ error: 'Please enter a website URL (e.g. example.com).' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }

  if (!/^https?:\/\//i.test(targetUrlStr)) {
    targetUrlStr = 'https://' + targetUrlStr;
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrlStr);
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid URL format.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }

  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    return new Response(JSON.stringify({ error: 'Only HTTP and HTTPS protocols are permitted.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }

  const port = parsedUrl.port ? parseInt(parsedUrl.port, 10) : (parsedUrl.protocol === 'https:' ? 443 : 80);
  if (port !== 80 && port !== 443) {
    return new Response(JSON.stringify({ error: 'Only standard web ports (80 for HTTP and 443 for HTTPS) are permitted.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }

  if (isBlockedHost(parsedUrl.hostname)) {
    return new Response(JSON.stringify({ error: 'Requests to private, loopback, or internal IP addresses are blocked.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }

  // Follow up to 3 redirects safely while enforcing SSRF checks on each step
  let currentUrl = parsedUrl.toString();
  let redirectsCount = 0;
  const MAX_REDIRECTS = 3;
  let targetResponse: Response | null = null;

  while (redirectsCount <= MAX_REDIRECTS) {
    const curParsed = new URL(currentUrl);
    if (isBlockedHost(curParsed.hostname)) {
      return new Response(JSON.stringify({ error: 'Redirect to an internal or blocked address was refused.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      });
    }

    const curPort = curParsed.port ? parseInt(curParsed.port, 10) : (curParsed.protocol === 'https:' ? 443 : 80);
    if (curPort !== 80 && curPort !== 443) {
      return new Response(JSON.stringify({ error: 'Redirect to a non-standard port was refused.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      });
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);

    try {
      const res = await fetch(currentUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'LoveEasyTool PHP checker (+https://loveeasytool.com/tools/php-vulnerability-checker)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        },
        redirect: 'manual',
        signal: controller.signal,
      });
      clearTimeout(timer);

      if ([301, 302, 303, 307, 308].includes(res.status)) {
        const location = res.headers.get('Location');
        if (!location) {
          targetResponse = res;
          break;
        }
        redirectsCount++;
        if (redirectsCount > MAX_REDIRECTS) {
          return new Response(JSON.stringify({ error: 'Exceeded maximum of 3 redirects.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
          });
        }
        currentUrl = new URL(location, currentUrl).toString();
        continue;
      }

      targetResponse = res;
      break;
    } catch (err: any) {
      clearTimeout(timer);
      if (err?.name === 'AbortError') {
        return new Response(JSON.stringify({ error: 'Connection timed out (5 second limit reached).' }), {
          status: 504,
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
      }
      return new Response(JSON.stringify({ error: `Unable to connect to target site: ${err?.message || 'Network error'}` }), {
        status: 502,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      });
    }
  }

  if (!targetResponse) {
    return new Response(JSON.stringify({ error: 'No response received from target host.' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }

  const xPoweredBy = targetResponse.headers.get('x-powered-by');
  const server = targetResponse.headers.get('server');
  const setCookie = targetResponse.headers.get('set-cookie');

  let bodySnippet = '';
  if (targetResponse.body) {
    const reader = targetResponse.body.getReader();
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;
    const MAX_BYTES = 100 * 1024; // 100 KB limit

    try {
      while (totalBytes < MAX_BYTES) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          totalBytes += value.length;
        }
      }
    } finally {
      try {
        await reader.cancel();
      } catch {}
    }

    const combined = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      combined.set(chunk, offset);
      offset += chunk.length;
    }
    bodySnippet = new TextDecoder('utf-8', { fatal: false }).decode(combined);
  }

  // Passive indicator detection
  const indicators: string[] = [];
  let detectedVersion: string | undefined;

  if (xPoweredBy) {
    indicators.push(`X-Powered-By header: "${xPoweredBy}"`);
    const match = xPoweredBy.match(/PHP\/([0-9]+(?:\.[0-9]+)+(?:-[a-zA-Z0-9.+~]+)?)/i);
    if (match) detectedVersion = match[1];
  }

  if (server) {
    const sMatch = server.match(/(?:PHP|mod_php)\/([0-9]+(?:\.[0-9]+)+(?:-[a-zA-Z0-9.+~]+)?)/i);
    if (sMatch) {
      indicators.push(`Server header module: "${sMatch[0]}"`);
      if (!detectedVersion) detectedVersion = sMatch[1];
    } else if (/php/i.test(server)) {
      indicators.push(`Server header mentions PHP: "${server}"`);
    }
  }

  if (setCookie && /phpsessid/i.test(setCookie)) {
    indicators.push('Session cookie: PHPSESSID detected in Set-Cookie header');
  }

  let metaGenerator: string | null = null;
  const genMatch = bodySnippet.match(/<meta[^>]+name=["']generator["'][^>]+content=["']([^"']+)["']/i) ||
                   bodySnippet.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']generator["']/i);
  if (genMatch) {
    metaGenerator = genMatch[1].trim();
    if (/wordpress|drupal|joomla|magento|prestashop|phpbb|typo3/i.test(metaGenerator)) {
      indicators.push(`Meta generator: "${metaGenerator}" (PHP-powered CMS)`);
    }
  }

  const hasPhpLinks = /href=["'][^"']*\.php(?:[?#][^"']*)?["']/i.test(bodySnippet) ||
                      /action=["'][^"']*\.php(?:[?#][^"']*)?["']/i.test(bodySnippet);
  if (hasPhpLinks) {
    indicators.push('Page markup contains links or form actions referencing .php endpoints');
  }

  // 3 Result States:
  // 1. "Possibly affected" (version detected and older than the fixed release)
  // 2. "PHP detected, version hidden — ask your host to confirm"
  // 3. "No PHP indicators found — this does not guarantee the site is unaffected"
  if (detectedVersion) {
    const cleanVer = detectedVersion.split('-')[0];
    const branchMatch = cleanVer.match(/^(\d+\.\d+)/);
    const branch = branchMatch ? branchMatch[1] : cleanVer;
    const config = FIXED_VERSIONS[branch];

    let isOlder = false;
    let minFixed = 'Unknown';

    if (config) {
      minFixed = config.minimumPatched;
      if (config.isEol) {
        isOlder = true;
      } else {
        isOlder = isVersionOlder(cleanVer, config.minimumPatched);
      }
    } else {
      const major = parseInt(cleanVer.split('.')[0], 10);
      if (major < 8) {
        isOlder = true;
        minFixed = 'Upstream branch is EOL. Upgrade to PHP 8.1.30, 8.2.25, or 8.3.13';
      }
    }

    if (isOlder) {
      return new Response(JSON.stringify({
        url: targetUrlStr,
        finalUrl: currentUrl,
        status: targetResponse.status,
        state: 'possibly_affected',
        stateLabel: 'Possibly affected',
        summary: `The server publicly reports PHP version ${detectedVersion}, which is older than the October 21, 2026 emergency security patch (${minFixed}).`,
        detectedVersion,
        branch,
        minimumFixedVersion: minFixed,
        indicators,
        headers: { xPoweredBy, server, setCookie },
        metaGenerator,
        hasPhpLinks,
        redirectsCount,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store, no-cache' }
      });
    }

    return new Response(JSON.stringify({
      url: targetUrlStr,
      finalUrl: currentUrl,
      status: targetResponse.status,
      state: 'php_detected_version_hidden',
      stateLabel: 'PHP detected, version hidden — ask your host to confirm',
      summary: `Detected PHP version signature (${detectedVersion}) appears consistent with or newer than published patch baselines, but passive checks cannot verify compiled internal binary patches. Ask your host or run "php -v" to confirm.`,
      detectedVersion,
      branch,
      minimumFixedVersion: minFixed,
      indicators,
      headers: { xPoweredBy, server, setCookie },
      metaGenerator,
      hasPhpLinks,
      redirectsCount,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store, no-cache' }
    });
  }

  if (indicators.length > 0) {
    return new Response(JSON.stringify({
      url: targetUrlStr,
      finalUrl: currentUrl,
      status: targetResponse.status,
      state: 'php_detected_version_hidden',
      stateLabel: 'PHP detected, version hidden — ask your host to confirm',
      summary: 'Passive indicators confirm this site runs on a PHP-based environment (e.g. via session cookies, CMS generator tags, or server module headers), but the exact PHP version string is suppressed. Ask your host or run "php -v" via SSH to inspect the active binary.',
      indicators,
      headers: { xPoweredBy, server, setCookie },
      metaGenerator,
      hasPhpLinks,
      redirectsCount,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store, no-cache' }
    });
  }

  return new Response(JSON.stringify({
    url: targetUrlStr,
    finalUrl: currentUrl,
    status: targetResponse.status,
    state: 'no_indicators',
    stateLabel: 'No PHP indicators found — this does not guarantee the site is unaffected',
    summary: 'No public headers, session cookies, or page markup exposed PHP signatures. The server might run another technology stack, or may run PHP with hardened headers (expose_php = Off). Only your hosting provider can confirm the true underlying server software.',
    indicators: ['No X-Powered-By PHP header present', 'No PHPSESSID cookie received', 'No PHP CMS meta tags detected'],
    headers: { xPoweredBy, server, setCookie },
    metaGenerator,
    hasPhpLinks: false,
    redirectsCount,
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store, no-cache' }
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // API endpoints: PHP Vulnerability Checker
    if (url.pathname === '/api/php-check') {
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }
      if (request.method === 'POST') {
        return handlePhpCheck(request);
      }
      return new Response(JSON.stringify({ error: 'Method not allowed. Use POST.' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });
    }

    // 0. Static assets under /assets/ (Vite bundled JS, CSS, fonts, web workers):
    // CRITICAL: Must be served directly by env.ASSETS without case-normalization, trailing slash redirects,
    // or HTML fallbacks. Vite hashes contain uppercase characters (e.g. index-KMud9tmI.css); lowercasing them breaks the asset.
    if (url.pathname.startsWith("/assets/")) {
      const resp = await env.ASSETS.fetch(request);
      if (resp.status === 200) {
        const headers = new Headers(resp.headers);
        headers.set("Cache-Control", "public, max-age=31536000, immutable");
        headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
        headers.set("X-Content-Type-Options", "nosniff");
        return new Response(resp.body, {
          status: 200,
          headers,
        });
      }
      // If a hashed asset is missing, return 404 text/plain. NEVER fall back to 404.html (which is text/html),
      // because returning HTML for a .css or .js asset triggers MIME type errors in browsers.
      return new Response("Asset not found", {
        status: 404,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache, no-store",
        },
      });
    }

    // Static text & metadata assets: served directly from static assets (HTTP 200) BEFORE any redirect, SPA fallback, or 404 handling
    if (url.pathname === "/ads.txt" || url.pathname === "/ads.txt/") {
      const adsUrl = new URL(request.url);
      adsUrl.pathname = "/ads.txt";
      let resp = await env.ASSETS.fetch(new Request(adsUrl.toString(), request));
      if (resp.status !== 200) {
        resp = new Response("google.com, pub-2678039503427231, DIRECT, f08c47fec0942fa0\n", {
          status: 200,
        });
      }
      const headers = new Headers(resp.headers);
      headers.set("Content-Type", "text/plain; charset=utf-8");
      headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
      headers.set("X-Content-Type-Options", "nosniff");
      headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
      return new Response(resp.body, {
        status: 200,
        headers,
      });
    }

    if (url.pathname === "/robots.txt" || url.pathname === "/robots.txt/") {
      const robotsUrl = new URL(request.url);
      robotsUrl.pathname = "/robots.txt";
      const resp = await env.ASSETS.fetch(new Request(robotsUrl.toString(), request));
      const headers = new Headers(resp.headers);
      headers.set("Content-Type", "text/plain; charset=utf-8");
      headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
      headers.set("X-Content-Type-Options", "nosniff");
      headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
      return new Response(resp.body, {
        status: resp.status,
        headers,
      });
    }

    if (url.pathname === "/sitemap.xml" || url.pathname === "/sitemap.xml/") {
      const sitemapUrl = new URL(request.url);
      sitemapUrl.pathname = "/sitemap.xml";
      const resp = await env.ASSETS.fetch(new Request(sitemapUrl.toString(), request));
      const headers = new Headers(resp.headers);
      headers.set("Content-Type", "application/xml; charset=utf-8");
      headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
      headers.set("X-Content-Type-Options", "nosniff");
      headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
      return new Response(resp.body, {
        status: resp.status,
        headers,
      });
    }

    // 1. Force HTTPS: If request is http, redirect 301 to https
    const isHttp = url.protocol === "http:" || request.headers.get("x-forwarded-proto") === "http";

    // 2. Alternate hostnames check (redirect alternate hostnames and www to primary apex domain)
    const isAlternateHost = url.hostname === "eurotoolbox.ah5194851.workers.dev" || url.hostname === "www.loveeasytool.com";

    // Static root files (e.g. /favicon.ico, /logo.png, /og-image.png, /llms.txt, /apple-touch-icon.png):
    // Must preserve exact file casing and not undergo route normalization.
    const lastSlashIdx = url.pathname.lastIndexOf("/");
    const filename = lastSlashIdx !== -1 ? url.pathname.slice(lastSlashIdx + 1) : url.pathname;
    const isFile = filename.includes(".") && !filename.endsWith(".html");

    if (isFile) {
      if (isHttp || isAlternateHost) {
        return Response.redirect("https://loveeasytool.com" + url.pathname + url.search, 301);
      }
      const fileResp = await env.ASSETS.fetch(request);
      const headers = new Headers(fileResp.headers);
      headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
      headers.set("X-Content-Type-Options", "nosniff");
      return new Response(fileResp.body, {
        status: fileResp.status,
        headers,
      });
    }

    // 3. Deprecated / renamed tool paths -> redirect 301 to canonical non-trailing slash URL
    if (
      url.pathname === "/tools/image-tools" ||
      url.pathname === "/tools/image-tools/" ||
      url.pathname === "/image-tools" ||
      url.pathname === "/image-tools/"
    ) {
      return Response.redirect("https://loveeasytool.com/tools/image-compressor", 301);
    }

    // 4. Shorthand tool URLs (/slug or /slug/) -> /tools/slug for canonical consolidation
    const rawClean = url.pathname.toLowerCase().replace(/^\/|\/$/g, "");
    if (TOOL_SLUGS.has(rawClean) && !url.pathname.toLowerCase().startsWith("/tools/")) {
      return Response.redirect("https://loveeasytool.com/tools/" + rawClean + url.search, 301);
    }

    // 5. Case normalization & Trailing slash enforcement for PAGE routes:
    // Strip trailing slashes on all non-root paths and 301 redirect
    let normalizedPath = url.pathname;
    const hasUpperCase = /[A-Z]/.test(normalizedPath);
    if (hasUpperCase) {
      normalizedPath = normalizedPath.toLowerCase();
    }

    const hasTrailingSlash = normalizedPath !== "/" && normalizedPath.endsWith("/");
    if (hasTrailingSlash) {
      normalizedPath = normalizedPath.replace(/\/+$/, "");
    }

    if (isHttp || isAlternateHost || hasUpperCase || hasTrailingSlash) {
      const destinationPath = normalizedPath === "" ? "/" : normalizedPath;
      return Response.redirect("https://loveeasytool.com" + destinationPath + url.search, 301);
    }

    // 6. Serve static asset: for clean page paths without file extension, attempt serving .html asset first
    if (normalizedPath !== "/") {
      const htmlUrl = new URL(request.url);
      htmlUrl.pathname = normalizedPath + ".html";
      const htmlResp = await env.ASSETS.fetch(new Request(htmlUrl.toString(), request));
      if (htmlResp.status === 200) {
        const headers = new Headers(htmlResp.headers);
        headers.set("Content-Type", "text/html; charset=utf-8");
        headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
        headers.set("X-Content-Type-Options", "nosniff");
        headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
        return new Response(htmlResp.body, {
          status: 200,
          headers,
        });
      }
    }

    const response = await env.ASSETS.fetch(request);

    // If ASSETS router returns a redirect to a trailing slash, intercept and serve .html directly
    if (
      (response.status === 301 || response.status === 302 || response.status === 307 || response.status === 308) &&
      response.headers.get("Location")?.endsWith("/")
    ) {
      const location = response.headers.get("Location")!;
      const locUrl = new URL(location, request.url);
      if (locUrl.pathname !== "/" && locUrl.pathname.endsWith("/")) {
        const cleanPath = locUrl.pathname.replace(/\/+$/, "");
        const htmlUrl = new URL(request.url);
        htmlUrl.pathname = cleanPath + ".html";
        const htmlResp = await env.ASSETS.fetch(new Request(htmlUrl.toString(), request));
        if (htmlResp.status === 200) {
          const headers = new Headers(htmlResp.headers);
          headers.set("Content-Type", "text/html; charset=utf-8");
          headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
          headers.set("X-Content-Type-Options", "nosniff");
          headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
          return new Response(htmlResp.body, {
            status: 200,
            headers,
          });
        }
      }
    }

    const newHeaders = new Headers(response.headers);
    newHeaders.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
    newHeaders.set("X-Content-Type-Options", "nosniff");
    newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");

    const hasBody = response.body && response.status !== 204 && response.status !== 304;
    return new Response(hasBody ? response.body : null, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
