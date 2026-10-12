const TOOL_SLUGS = new Set([
  'word-counter', 'character-counter', 'case-converter', 'text-cleaner', 'duplicate-line-remover',
  'percentage-calculator', 'discount-calculator', 'bmi-calculator', 'loan-calculator', 'vat-calculator', 'age-calculator',
  'image-compressor', 'image-resizer', 'jpg-to-png', 'png-to-jpg', 'webp-converter', 'image-cropper',
  'pdf-to-word', 'word-to-pdf', 'merge-pdf', 'split-pdf', 'compress-pdf', 'pdf-to-jpg', 'jpg-to-pdf',
  'date-calculator', 'unit-converter', 'time-zone-converter', 'currency-converter',
  'cv-builder', 'cover-letter-generator', 'salary-calculator'
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Force HTTPS: If request is http, redirect 301 to https
    const isHttp = url.protocol === "http:" || request.headers.get("x-forwarded-proto") === "http";

    // 2. Alternate hostnames check (redirect alternate hostnames and www to primary apex domain)
    const isAlternateHost = url.hostname === "eurotoolbox.ah5194851.workers.dev" || url.hostname === "www.loveeasytool.com";

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

    // 5. Case normalization & Trailing slash enforcement:
    // Strip trailing slashes on all non-root paths and 301 redirect
    let normalizedPath = url.pathname;
    const hasUpperCase = /[A-Z]/.test(normalizedPath);
    if (hasUpperCase) {
      normalizedPath = normalizedPath.toLowerCase();
    }

    const isFile = normalizedPath.includes(".");
    const hasTrailingSlash = normalizedPath !== "/" && normalizedPath.endsWith("/");

    if (hasTrailingSlash) {
      normalizedPath = normalizedPath.replace(/\/+$/, "");
    }

    if (isHttp || isAlternateHost || hasUpperCase || hasTrailingSlash) {
      const destinationPath = normalizedPath === "" ? "/" : normalizedPath;
      return Response.redirect("https://loveeasytool.com" + destinationPath + url.search, 301);
    }

    // 6. Serve static asset: for clean page paths without file extension, attempt serving .html asset first
    if (!isFile && normalizedPath !== "/") {
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
      response.headers.get("Location") &&
      response.headers.get("Location").endsWith("/")
    ) {
      const location = response.headers.get("Location");
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
