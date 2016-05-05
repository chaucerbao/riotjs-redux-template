// Dependencies
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Reducers
import branch from "./branch/reducers";

const reducers = {
  branch
};

export default createStore(
  combineReducers(reducers),
  applyMiddleware(thunk)
);
