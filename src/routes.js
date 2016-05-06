export default function loadRoutes(mountPoint, store) {
  const mountTag = (tag, opts = {}) => riot.mount(mountPoint, tag, Object.assign({ store }, opts));

  return {
    "/": () => require(["pages/homepage"], mountTag.bind(null, "homepage")),
    "/page-*": (page) => require(["pages/homepage"], mountTag.bind(null, "homepage", { page })),
    "/resource/*": (id) => require(["pages/resource"], mountTag.bind(null, "resource", { id })),

    // Page not found (Error 404)
    "/..": () => require(["pages/not-found-404"], mountTag.bind(null, "not-found-404"))
  };
}
