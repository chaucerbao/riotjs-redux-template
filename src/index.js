// Dependencies
import loadRoutes from "./routes";
import store from "./store";

// Styles
import "normalize.css/normalize";
import "./style";

// Routing
riot.route.base("/");
const routes = loadRoutes(".site__body", store);
for (const route in routes) {
  riot.route(route, routes[route]);
}
riot.route.start(true);
