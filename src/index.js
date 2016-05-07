// Dependencies
import router from "./router";
import store from "./store";

// Mount the app
import "app";
riot.mount("app");

// Start routing
router("/", ".site__body", { store });
