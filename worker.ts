interface Env {
  ASSETS: {
    fetch: (request: Request | string) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.hostname === "eurotoolbox.ah5194851.workers.dev") {
      const target = "https://loveeasytool.com" + url.pathname + url.search;
      return Response.redirect(target, 301);
    }
    return env.ASSETS.fetch(request);
  },
};
