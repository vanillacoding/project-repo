import React from "react";
import styled from "styled-components";

import Background from "../publicComponents/Backgroud/Background";
import WelcomeHeader from "../publicComponents/WelcomeHeader/WelcomeHeader";
import LoginContainer from "./LoginContainer/LoginContainer";

const LoginOutter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .login-buffer {
    width: 100%;
    height: 15%;
  }
`;

function Login() {
  return (
    <Background>
      <LoginOutter>
        <WelcomeHeader isLogin={false} />
        <div className="login-buffer" />
        <LoginContainer />
      </LoginOutter>
    </Background>
  );
}

export default Login;
