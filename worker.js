export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "eurotoolbox.ah5194851.workers.dev") {
      const target = "https://loveeasytool.com" + url.pathname + url.search;
      return Response.redirect(target, 301);
    }
    return env.ASSETS.fetch(request);
  },
};
