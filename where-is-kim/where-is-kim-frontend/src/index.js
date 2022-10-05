import React from "react";
import ReactDom from "react-dom";
import App from "./components/App/Container";
import { Provider } from "react-redux";
import getStore from "./store";
import { PersistGate } from "redux-persist/integration/react";
import "./moment.config";

const { store, persistor } = getStore();

ReactDom.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
