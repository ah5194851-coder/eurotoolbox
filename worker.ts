interface Env {
  ASSETS: {
    fetch: (request: Request | string) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.hostname === "eurotoolbox.ah5194851.workers.dev" || url.hostname === "www.loveeasytool.com") {
      const target = "https://loveeasytool.com" + url.pathname + url.search;
      return Response.redirect(target, 301);
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
