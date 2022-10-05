import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import themes from "./styles/themes";
import GlobalStyle from "./styles/global";
import history from "./utils/history";
import store from "./store";
import App from "./components/App";

ReactDOM.render(
  <Router history={history} >
    <Provider store={store} >
      <ThemeProvider theme={themes} >
        <App />
        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  </Router>,
  document.getElementById("root"),
);
