import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./modules/index.js";
import { composeWithDevTools } from "redux-devtools-extension";
import "@babel/polyfill";

import App from "./App";

const store = createStore(rootReducer, composeWithDevTools());

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  rootElement,
);
