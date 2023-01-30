import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import GlobalStyle from "./GlobalStyle";
import GlobalFonts from "./assets/fonts/fonts";
import App from "./app/App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <GlobalStyle />
    <GlobalFonts />
    <App />
  </BrowserRouter>
);
