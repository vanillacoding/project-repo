import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

import StartButton from "./StartButton";
import { googleLogin } from "../api";
import { fullWidthAndHeight } from "../styles/mixin";

function Home() {
  const history = useHistory();

  async function handleLogin() {
    try {
      const userInfo = await googleLogin();

      if (userInfo) {
        history.push("/game");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Wrapper>
      <StartButton onClick={handleLogin} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${fullWidthAndHeight}

  position: absolute;
  top: 0;
  left: 0;

  background-size: cover;
  background-position: center;
  background-image: url("background/home.png");
`;

export default Home;
