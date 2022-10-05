import React from "react";

import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyles from "../../styles";
import GlobalFonts from "../../styles/fonts";
import theme from "../../styles/theme";
import Betting from "../Betting";
import Header from "../Header";
import History from "../History";
import Login from "../Login";
import Main from "../Main";
import Notification from "../Notification";
import PrivateRoute from "../PrivateRoute";
import Result from "../Result";
import Modal from "../Shared/Modal";
import Statistic from "../Statistic";

const Wrapper = styled.div`
  width: 100%;
  min-width: 1200px;
`;

const Layout = styled.main`
  width: 100%;
  height: auto;
`;

function App() {
  const user = useSelector((state) => state.login.user);
  const modal = useSelector((state) => state.modal);

  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <GlobalFonts />
        <Layout>
          <>
            {user && <Header />}
            <Switch>
              <PrivateRoute
                exact
                path="/"
                component={Main}
              />
              <Route
                path="/login"
                component={Login}
              />
              <PrivateRoute
                path="/betting"
                component={Betting}
              />
              <PrivateRoute
                path="/result/:gameDate"
                component={Result}
              />
              <PrivateRoute
                path="/statistics/:gameDate"
                component={Statistic}
              />
              <PrivateRoute
                path="/history"
                component={History}
              />
              <Route
                path="*"
                render={() => (
                  <Notification
                    icon="🙅"
                    title="404"
                    text="페이지를 찾을 수 없습니다"
                  />
                )}
              />
            </Switch>
          </>
        </Layout>
        {modal.isVisible
          && (
            <Modal
              title={modal.title}
              contentText={modal.contentText}
              hasLinkButton={modal.hasLinkButton}
              path={modal.path}
              linkButtonText={modal.linkButtonText}
            />
          )}
      </ThemeProvider>
    </Wrapper>
  );
}

export default App;
