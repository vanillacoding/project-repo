import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import App from "./components/App/App";
import reducer from "./reducers";
import AuthService from "./api/firebaseService.js";

const middleware = [thunk];

if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));
const authService = new AuthService();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App authService={authService} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
