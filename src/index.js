// Dependencies
import loadRoutes from "./routes";
import store from "./store";

// Mount the app
import "app";
riot.mount("app");

// Start routing
riot.route.base("/");
const routes = loadRoutes(".site__body", store);
for (const route in routes) {
  riot.route(route, routes[route]);
}
riot.route.start(true);
