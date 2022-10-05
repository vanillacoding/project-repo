import React from "react";
import styled from "styled-components";

import Background from "../publicComponents/Backgroud/Background";
import WelcomeHeader from "../publicComponents/WelcomeHeader/WelcomeHeader";
import SignUpContainer from "./SignUpContainer/SignUpContainer";

const SignUpOutter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .signup-buffer {
    width: 100%;
    height: 15%;
  }
`;

function SignUp() {
  return (
    <Background>
      <SignUpOutter>
        <WelcomeHeader isLogin={false} />
        <div className="signup-buffer" />
        <SignUpContainer />
      </SignUpOutter>
    </Background>
  );
}

export default SignUp;
