import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import Game from "./Game";
import Home from "./Home";

import { theme } from "../styles/theme";
import { flexCenter } from "../styles/mixin";
import { GlobalStyle } from "../styles/globalStyle";

const DisplayContainer = styled.div`
  ${flexCenter}

  width: 100vw;
  height: 100vh;

  background: linear-gradient(
    90deg,
    hsla(224, 88%, 93%, 1) 0%,
    hsla(275, 18%, 79%, 1) 15%,
    hsla(351, 47%, 88%, 1) 47%,
    hsla(312, 91%, 96%, 1) 74%,
    hsla(233, 100%, 94%, 1) 100%
  );
`;

const Content = styled.div`
  position: relative;

  width: 100%;
  aspect-ratio: 4 / 3;

  max-width: ${({ theme }) => theme.size.maxWidth};
  max-height: ${({ theme }) => theme.size.maxHeight};

  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 10px 20px, rgba(0, 0, 0, 0.4) 0px 10px 10px;

  @media screen and (max-width: 800px) {
    padding-top: 75%;
  }
`;

function App() {
  useEffect(() => {
    async function registerServiceWorker() {
      try {
        if ("serviceWorker" in navigator) {
          await navigator.serviceWorker.register("/service-worker.js");
        }
      } catch (error) {
        console.log("service worker registration failed", error);
      }
    }

    registerServiceWorker();
  }, []);

  return (
    <DisplayContainer>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Content>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/game" component={Game} />
            <Redirect to="/" />
          </Switch>
        </Content>
      </ThemeProvider>
    </DisplayContainer>
  );
}

export default App;
