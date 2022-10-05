import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import App from "./components/App/App";
import reducer from "./reducer";

const middleware = [thunk];

if (process.env.NODE_ENV !== "production") {
  middleware.push(logger);
}

const store = configureStore({ reducer, middleware });

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
