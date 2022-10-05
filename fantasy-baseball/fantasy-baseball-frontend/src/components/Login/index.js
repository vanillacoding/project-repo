import React from "react";

import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { saveUser } from "../../actions/login";
import { showModal } from "../../actions/modal";
import { fetchUser } from "../../api/login";
import BaseballImage from "../../assets/images/login_bg.png";
import { LOGIN_FAILURE } from "../../constants/actionTypes";
import Button from "../Shared/Button";

const semitransparentBlockAppear = keyframes`
  0% {
    margin: 0 0 0 -500px;
  }
  100% {
    margin: 0;
  }
`;

const whiteBlockAppear = keyframes`
  0% {
    margin: 0 0 0 -500px;
  }
  100% {
    margin: 0;
  }
`;

const imageAppear = keyframes`
  0% {
    margin: 0 0 0 -850px;
  }
  100% {
    margin: 0;
  }
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;

  button {
    position: absolute;
    top: calc(50% - 2rem);
    right: 7rem;
  }
`;

const LoginImage = styled.div`
  width: 850px;
  height: 100vh;
  margin: 0 0 0 -850px;
  background: url(${BaseballImage});
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${imageAppear} 1s 0.3s forwards;
`;

const WhiteBlock = styled.div`
  width: 300px;
  height: 100vh;
  margin: 0 0 0 -300px;
  background: ${({ theme }) => theme.color.white};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  animation: ${whiteBlockAppear} 1s 2.3s forwards;
`;

const SemitransparentBlock = styled.div`
  width: 500px;
  height: 100vh;
  margin: 0 0 0 -500px;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  animation: ${semitransparentBlockAppear} 1s 1.3s forwards;
`;

const LoginTitle = styled.p`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: calc(50% - 1em);
  left: 7rem;
  z-index: 3;
  font-family: "Bebas Neue";
  font-size: 12rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.color.white};
  text-shadow: 8px 8px 10px rgba(0, 0, 0, 0.2);
  transform: scale(1, 0.9);
`;

const TopTitle = styled.span`
  position: relative;

  &::before {
    width: 0.74em;
    height: 5px;
    background: ${({ theme }) => theme.color.blue};
    display: block;
    position: absolute;
    top: -0.1em;
    left: 0;
    content: "";
  }
`;

const BottomTitle = styled.span`
  padding: 0 0 0 0.37em;
  position: relative;

  &::after {
    width: 0.74em;
    height: 5px;
    background: ${({ theme }) => theme.color.white};
    display: block;
    position: absolute;
    right: 0.1em;
    content: "";
  }
`;

const BlueText = styled.span`
  color: ${({ theme }) => theme.color.blue};
`;

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const onGoogleSuccess = async ({ tokenId }) => {
    try {
      const response = await fetchUser(tokenId, "login");
      const { data: user, isNewUser } = await response.json();

      if (response.ok) {
        dispatch(saveUser(user));
        dispatch(showModal({
          isVisible: isNewUser,
          title: "가입 축하",
          contentText: "가입 축하 선물로 5000 포인트를 드립니다!",
          hasLinkButton: false,
          path: "",
          linkButtonText: "",
        }));

        history.push("/");
      }
    } catch (err) {
      dispatch({ type: LOGIN_FAILURE });
    }
  };

  const onGoogleFailure = () => {
    dispatch({ type: LOGIN_FAILURE });
    history.push("/login");
  };

  return (
    <Wrapper>
      <WhiteBlock />
      <SemitransparentBlock />
      <LoginImage />
      <LoginTitle>
        <TopTitle>
          <BlueText>FA</BlueText>
          NTASY
        </TopTitle>
        <BottomTitle>
          <BlueText>B</BlueText>
          ASEBALL
        </BottomTitle>
      </LoginTitle>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={(renderProps) => (
          <Button
            type="button"
            color="white"
            size="middle"
            title="PLAY BALL"
            handleClick={renderProps.onClick}
            disabled={renderProps.disabled}
          />
        )}
        onSuccess={onGoogleSuccess}
        onFailure={onGoogleFailure}
        cookiePolicy="single_host_origin"
      />
    </Wrapper>
  );
}

export default Login;
