import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { ModalProvider } from "../../contexts/ModalContext";
import GlobalStyles from "../../styles";
import GlobalFonts from "../../styles/fonts";
import theme from "../../styles/theme";
import Ending from "../Ending";
import Game from "../Game";
import Main from "../Main";
import Review from "../Review";
import Mobile from "../Shared/Mobile";
import NotFound from "../Shared/NotFound";
import PrivateRoute from "../Shared/PrivateRoute";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const playerName = useSelector((state) => state.player.name);
  const playerPassword = useSelector((state) => state.game.playerPassword);

  useEffect(() => {
    let hasTouchScreen = false;

    if ("maxTouchPoints" in navigator) {
      hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
      hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
      const mediaQuery = window.matchMedia && matchMedia("(pointer:coarse)");

      if (mediaQuery && mediaQuery.media === "(pointer:coarse)") {
        hasTouchScreen = !!mediaQuery.matches;
      } else if ("orientation" in window) {
        hasTouchScreen = true;
      } else {
        const UA = navigator.userAgent;
        hasTouchScreen = (
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
          /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
        );
      }
    }

    if (hasTouchScreen) {
      setIsMobile(true);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <GlobalFonts />
        <ModalProvider>
          {isMobile
            ? <Route component={Mobile} />
            : (
              <Switch>
                <Route path="/" exact component={Main} />
                <PrivateRoute
                  path="/game/room/:room"
                  isAuthenticated={Boolean(playerName !== "")}
                  component={Game}
                />
                <PrivateRoute
                  path="/game/ending"
                  isAuthenticated={playerPassword["password5"].isUnlocked}
                  component={Ending}
                />
                <Route path="/review" component={Review} />
                <Route
                  render={(props) =>
                    <NotFound {...props} title={"404\nNot Found"} text="이런.. 존재하지 않는 페이지입니다." />}
                />
              </Switch>
            )}
        </ModalProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
