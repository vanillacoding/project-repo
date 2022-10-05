import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import Options from "./components/Options";

import { globalCss } from "./config/stitches.config";
import reset from "./config/reset";
import store from "./app/store";

globalCss(reset)();

render(
  <Provider store={store}>
    <Options />
  </Provider>,
  document.getElementById("options"),
);
