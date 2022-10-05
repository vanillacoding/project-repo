import React from "react";
import { HashRouter } from "react-router-dom";
import Routes from "../../routes";
import GlobalStyle from "../../styles/GlobalStyle";

export default function App({ isLogin }) {
  return (
    <HashRouter>
      <GlobalStyle />
      <Routes isLogin={isLogin} />
    </HashRouter>
  );
}
