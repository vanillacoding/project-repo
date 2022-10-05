import React from "react";
import { Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";

import { darkTheme, lightTheme } from "../assets/styles/theme";
import { useAppSelector } from "./store";

import CalendarPage from "../pages/CalendarPage";
import IndexPage from "../pages/IndexPage";
import AuthRoute from "../features/common/AuthRoute";

const queryClient = new QueryClient();

function App() {
  const themeMode = useAppSelector((state) => state.setting.themeMode);

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route exact path="/">
            <IndexPage />
          </Route>
          <AuthRoute path="/calendar">
            <CalendarPage />
          </AuthRoute>
          <Route>404 NOT FOUND</Route>
        </Switch>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
