import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";

import theme from "../src/styles/theme";
import GlobalStyles from "../src/styles/";
import { ModalProvider } from "../src/contexts/ModalContext";

const queryClient = new QueryClient();

export const history = createMemoryHistory({
  initialEntries: ["/"],
});

export const customRender = (children) => (
  render((
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <ModalProvider>
            {children}
          </ModalProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </Router>
  ))
);

beforeAll(() => {
  ReactDOM.createPortal = jest.fn((element) => element);
});
