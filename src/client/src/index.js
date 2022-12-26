import { createRoot } from 'react-dom/client';

import React from "react";
import App from "./ui/components/App/App";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./redux/store";

const store = configureStore();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
      <App />
  </Provider>,
);

serviceWorker.register();
