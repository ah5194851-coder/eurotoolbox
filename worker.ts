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
  'cv-builder', 'cover-letter-generator', 'salary-calculator'
]);

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

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
