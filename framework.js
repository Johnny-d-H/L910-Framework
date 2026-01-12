const http = require("http");
const { enhanceReqRes, parseBodySafe } = require("./utils");

function createApp() {
  const middlewares = [];
  const routes = [];

  function use(mwOrRouter) {
    middlewares.push(mwOrRouter);
  }

  function register(method, path, handler) {
    routes.push({ method, pathParts: path.split("/").filter(Boolean), handler });
  }

  async function handle(req, res) {
    try {
      enhanceReqRes(req, res);
      req.query = Object.fromEntries(new URLSearchParams(req.url.split("?")[1] || ""));
      let idx = 0;
      const next = () => {
        if (idx < middlewares.length) {
          const mw = middlewares[idx++];
          if (typeof mw.handle === "function") return mw.handle(req, res, next);
          return mw(req, res, next);
        }
        dispatch(req, res);
      };
      next();
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  function matchRoute(method, urlPath) {
    const urlParts = urlPath.split("?")[0].split("/").filter(Boolean);
    for (const r of routes) {
      if (r.method !== method) continue;
      if (r.pathParts.length !== urlParts.length) continue;
      const params = {};
      let ok = true;
      for (let i = 0; i < r.pathParts.length; i++) {
        const rp = r.pathParts[i], up = urlParts[i];
        if (rp.startsWith(":")) params[rp.slice(1)] = up;
        else if (rp !== up) { ok = false; break; }
      }
      if (ok) return { route: r, params };
    }
    return null;
  }

  async function dispatch(req, res) {
    const match = matchRoute(req.method, req.url);
    if (!match) return res.status(404).json({ error: "Not found" });
    req.params = match.params;
    await parseBodySafe(req);
    return match.route.handler(req, res);
  }

  function listen(port, onStart) {
    const server = http.createServer(handle);
    server.listen(port, onStart);
  }

  return {
    use,
    get: (p, h) => register("GET", p, h),
    post: (p, h) => register("POST", p, h),
    put: (p, h) => register("PUT", p, h),
    patch: (p, h) => register("PATCH", p, h),
    delete: (p, h) => register("DELETE", p, h),
    listen,
    handle
  };
}

module.exports = { createApp };
