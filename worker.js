export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Permanent 301 redirect for www and alternate hostnames
    if (url.hostname === "www.loveeasytool.com" || url.hostname === "eurotoolbox.ah5194851.workers.dev") {
      let pathname = url.pathname;
      if (pathname !== "/" && !pathname.endsWith("/") && !pathname.includes(".")) {
        pathname += "/";
      }
      const target = "https://loveeasytool.com" + pathname + url.search;
      return Response.redirect(target, 301);
    }

    // 2. Permanent 301 redirect for deprecated/overlapping image-tools path
    if (
      url.pathname === "/tools/image-tools" ||
      url.pathname === "/tools/image-tools/" ||
      url.pathname === "/image-tools" ||
      url.pathname === "/image-tools/"
    ) {
      return Response.redirect("https://loveeasytool.com/tools/image-compressor/", 301);
    }

    // 3. Permanent 301 redirect for extensionless HTML paths to canonical trailing slash
    // This replaces Cloudflare's default 307/302 temporary redirects with an explicit 301
    if (url.pathname !== "/" && !url.pathname.endsWith("/") && !url.pathname.includes(".")) {
      const target = "https://loveeasytool.com" + url.pathname + "/" + url.search;
      return Response.redirect(target, 301);
    }

    return env.ASSETS.fetch(request);
  },
};
