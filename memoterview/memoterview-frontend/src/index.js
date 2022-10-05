import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./components/App";
import GlobalStyle from "./Layout/theme/GlobalStyles";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <GlobalStyle />
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
