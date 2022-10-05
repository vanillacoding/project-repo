import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Home from "./Home";
import Landing from "./Landing";

import * as actions from "../reducers/user";

const Wrapper = styled.div`
  overflow: hidden;
`;

const App = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.user);
  const isInitUser = profile ? profile.likeGenre.length : false;

  useEffect(() => {
    if (localStorage.user && profile === null) {
      dispatch(actions.refreshLoginRequest(JSON.parse(localStorage.user)));
    }
  }, []);

  return (
    <Wrapper>
      {!!isInitUser && <Home />}
      {!isInitUser && <Landing />}
    </Wrapper>
  );
};

export default App;
