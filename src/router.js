const routes = {
  "/": () => require(["pages/homepage"], mountTag.bind(null, "homepage")),
  "/page-*": (page) => require(["pages/homepage"], mountTag.bind(null, "homepage", { page })),
  "/resource/*": (id) => require(["pages/resource"], mountTag.bind(null, "resource", { id })),

  // Page not found (Error 404)
  "/..": () => require(["pages/not-found-404"], mountTag.bind(null, "not-found-404"))
};

let mountTag;

export default function router(base, mountPoint, opts = {}) {
  riot.route.base(base);

  mountTag = (tag, additionalOpts = {}) => riot.mount(mountPoint, tag, Object.assign(opts, additionalOpts));

  for (const route in routes) {
    riot.route(route, routes[route]);
  }

  riot.route.start(true);
}
