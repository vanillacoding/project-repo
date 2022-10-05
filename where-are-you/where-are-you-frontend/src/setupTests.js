import React from "react";

import "@testing-library/jest-dom";
import "jest-canvas-mock";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createStore } from "redux";
import { ThemeProvider } from "styled-components";

import { ModalProvider } from "./contexts/ModalContext";
import reducer from "./reducers";
import GlobalStyles from "./styles";
import GlobalFonts from "./styles/fonts";
import theme from "./styles/theme";

export const store = createStore(reducer);

export const history = createMemoryHistory({
  initialEntries: ["/"]
});

export const customRender = (children) => (
  render((
    <Router history={history}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <GlobalFonts />
          <ModalProvider>
            {children}
          </ModalProvider>
        </ThemeProvider>
      </Provider>
    </Router>
  ))
);

beforeAll(() => {
  ReactDOM.createPortal = jest.fn((element) => element);
});
