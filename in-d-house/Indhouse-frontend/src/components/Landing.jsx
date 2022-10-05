import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import LandingNav from "./LandingNav";
import LandingMain from "./LandingMain";
import GenreChoose from "./GenreChoose";

const Page = styled.div`
  background-color: ${({ theme }) => theme.colors.blue};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Landing = () => {
  return (
    <Page>
      <LandingNav />

      <Switch>
        <Route
          exact
          path="/"
          component={LandingMain}
        />
        <Route
          path="/users/choose_genre/:user_id"
          component={GenreChoose}
        />
        <Route
          path="/login"
          component={LoginForm}
        />
        <Route
          path="/signup"
          component={SignupForm}
        />
      </Switch>
    </Page>
  );
};

export default Landing;
