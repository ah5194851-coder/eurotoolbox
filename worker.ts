interface Env {
  ASSETS: {
    fetch: (request: Request | string) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env, ctx: unknown): Promise<Response> {
    const url = new URL(request.url);

    // Early hostname check: permanently redirect requests arriving on eurotoolbox.ah5194851.workers.dev
    // to the same path and query string on https://loveeasytool.com
    // e.g. eurotoolbox.ah5194851.workers.dev/tools/merge-pdf?q=1 -> https://loveeasytool.com/tools/merge-pdf?q=1
    if (url.hostname === 'eurotoolbox.ah5194851.workers.dev') {
      const destination = new URL(url.pathname + url.search, 'https://loveeasytool.com');
      return Response.redirect(destination.toString(), 301);
    }

    // Normal requests on loveeasytool.com itself and any other domains continue to work normally,
    // served directly from static assets
    return env.ASSETS.fetch(request);
  },
};
