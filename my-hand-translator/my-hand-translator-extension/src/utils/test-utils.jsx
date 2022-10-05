import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import userReducer from "../features/user/userSlice";

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: { user: userReducer }, preloadedState }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";

const user = {
  projectId: "translate-324702",
  translations: [
    {
      nanoId: "qWYBIfLPMsjP1LHNRqlFW",
      origin: "react",
      translated: "리액트",
      url: "vanilla",
      glossary: {
        react: "리액트",
      },
      createdAt: "2017-01-01",
    },
  ],
  glossary: {
    react: "리액트",
  },
  glossaryId: "6141bd1c2a11e5b51320bac1",
  isServerOn: false,
  name: "aidencoders",
  email: "aidencoders@gmail.com",
};

export { render, user };
