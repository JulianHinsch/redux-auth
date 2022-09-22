import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer.js";
import { createLogger } from "redux-logger";

import authMiddleware from "./middleware/feature/auth";

import actionSplitterMiddleware from "./middleware/core/actionSplitter";
import apiMiddleware from "./middleware/core/api";
import redirectMiddleware from "./middleware/core/redirect";

const featureMiddleware = [authMiddleware];

const coreMiddleware = [
  apiMiddleware,
  redirectMiddleware,
  actionSplitterMiddleware, //this should really be first core but it throws errors
  createLogger({ collapsed: true }),
];

export default () => {
  return configureStore(
    rootReducer,
    applyMiddleware(...featureMiddleware, ...coreMiddleware)
  );
};
