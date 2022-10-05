import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { createBrowserHistory } from "history";

import App from "./components/App/App";
import reducer from "./reducers/reducer";
import AuthService from "./api/firebaseService.js";

const customHistory = createBrowserHistory();
const middleware = [thunk.withExtraArgument({ history: customHistory })];

if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));
const authService = new AuthService();

ReactDOM.render(
  <Provider store={store}>
    <Router history={customHistory}>
      <App authService={authService} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
