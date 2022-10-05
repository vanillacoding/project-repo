import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ToastProvider } from "react-toast-notifications";

import { theme } from "../../theme/theme";
import StartPage from "../../pages/StartPage";
import GamePage from "../../pages/GamePage";
import MultiGamePage from "../../pages/MultiGamePage";
import JoinPage from "../../pages/JoinPage";
import WaitingPage from "../../pages/WaitingPage";
import RecordPage from "../../pages/RecordPage";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <Switch>
          <Route path="/" exact>
            <StartPage />
          </Route>
          <Route path="/game/single">
            <GamePage />
          </Route>
          <Route path="/game" exact>
            <GamePage />
          </Route>
          <Route path="/join">
            <JoinPage />
          </Route>
          <Route path="/waiting/:id">
            <WaitingPage />
          </Route>
          <Route path="/game/:id">
            <MultiGamePage />
          </Route>
          <Route path="/records">
            <RecordPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
