import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import "./index.css";

import rootReducer from "./reducers";

import App from "./components/App";

const middlewares = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      ...middlewares,
      createLogger()
    )
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
