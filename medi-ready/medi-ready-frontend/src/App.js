import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { getAuthCheck } from "./api";
import { ModalProvider } from "./contexts/ModalContext";

import GlobalStyles from "./styles";
import theme from "./styles/theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Error from "./components/Shared/Error";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Prescription from "./pages/Prescription";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/Shared/PrivateRoute";

const queryClient = new QueryClient();

const App = () => {
  const history = useHistory();

  const [user, setUser] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const { data, result, pharmacyInformation } = await getAuthCheck();

        if (result === "success") {
          setUser({ ...data, ...pharmacyInformation });
          history.push("/");
        } else {
          setUser("");
        }

      } catch (error) {
        return <Error error={error} />;
      }
    };

    checkLoginStatus();
  }, [isSignedIn]);

  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <Navigation isSignedIn={user} onLogout={setUser} />
          <Section>
            <Header userInfo={user} />
            <ModalProvider>
              <Switch>
                <PrivateRoute
                  path="/dashboard"
                  isAuthenticated={user}
                  component={Dashboard}
                  userInfo={user}
                />
                <PrivateRoute
                  path="/prescription"
                  isAuthenticated={user}
                  component={Prescription}
                  userInfo={user}
                />
                <PrivateRoute
                  path="/prescriptions"
                  isAuthenticated={user}
                  component={History}
                  queryClient={queryClient}
                />
                <PrivateRoute
                  path="/settings"
                  isAuthenticated={user}
                  component={Settings}
                  userInfo={user}
                />
                <Route path="/login">
                  <Login onSuccess={setUser} setIsSignedIn={setIsSignedIn} />
                </Route>
                <Route path="/error">
                  <Error />
                </Route>
                <Route path="/" exact>
                  <Redirect to="/dashboard" />
                </Route>
              </Switch>
            </ModalProvider>
            <Footer />
          </Section>
        </QueryClientProvider>
      </ThemeProvider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Section = styled.section`
  width: calc(100% - 230px);
  min-height: 100vh;
  background-color: ${({ theme }) => theme.color.grey};
`;

export default App;
