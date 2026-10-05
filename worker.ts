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

    // 1. Hostname normalization (redirect alternate hostnames and www to primary apex domain)
    if (url.hostname === "eurotoolbox.ah5194851.workers.dev" || url.hostname === "www.loveeasytool.com") {
      let pathname = url.pathname;
      if (pathname !== "/" && !pathname.endsWith("/") && !pathname.includes(".")) {
        pathname += "/";
      }
      const target = "https://loveeasytool.com" + pathname + url.search;
      return Response.redirect(target, 301);
    }

    // 2. Deprecated / renamed tool paths
    if (
      url.pathname === "/tools/image-tools" ||
      url.pathname === "/tools/image-tools/" ||
      url.pathname === "/image-tools" ||
      url.pathname === "/image-tools/"
    ) {
      return Response.redirect("https://loveeasytool.com/tools/image-compressor/", 301);
    }

    // 3. Lowercase normalization for path
    if (/[A-Z]/.test(url.pathname)) {
      return Response.redirect("https://loveeasytool.com" + url.pathname.toLowerCase() + url.search, 301);
    }

    // 4. Shorthand tool URLs (/slug or /slug/) -> /tools/slug/ for canonical consolidation
    const cleanPath = url.pathname.replace(/^\/|\/$/g, "");
    if (TOOL_SLUGS.has(cleanPath) && !url.pathname.startsWith("/tools/")) {
      return Response.redirect("https://loveeasytool.com/tools/" + cleanPath + "/" + url.search, 301);
    }

    // 5. Enforce trailing slash on clean extensionless directory routes
    if (url.pathname !== "/" && !url.pathname.endsWith("/") && !url.pathname.includes(".")) {
      return Response.redirect("https://loveeasytool.com" + url.pathname + "/" + url.search, 301);
    }

    const response = await env.ASSETS.fetch(request);
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
