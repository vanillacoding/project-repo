import React, { useState, useEffect } from "react";
import firebase from "../config/firebase";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { postLogin } from "../api";
import { save } from "../features/userSlice";

import Font from "../components/Shared/Font";
import Preload from "../components/Shared/Preload";

import bg_texture from "../assets/bg_texture.png";
import bg_texture_grey from "../assets/bg_texture_grey.jpeg";
import bg_texture_fragment from "../assets/bg_texture_fragment.png";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const preload = useSelector((state) => state.preload.isLoaded);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (user) {
      if (!user.couple && !user.partner_id) {
        history.push("/register");
        return;
      }

      if (!user.couple && user.partner_id) {
        history.push("/queue");
        return;
      }

      if (user.couple && !user.is_matched) {
        history.push("/queue");
        return;
      }

      history.push("/");
    }
  }, [history, user]);

  useEffect(() => {
    setTimeout(() => {
      if (preload) {
        setIsAnimated(true);
      }
    }, 1800);
  }, [preload]);

  const { mutate } = useMutation(postLogin, {
    onSuccess: ({ data }) => {
      const { user } = data;

      dispatch(save(user));

      if (!user.couple && !user.partner_id) {
        history.push("/register");
        return;
      }

      if (!user.couple && user.partner_id) {
        history.push("/queue");
        return;
      }

      if (user.couple && !user.is_matched) {
        history.push("/queue");
        return;
      }

      history.push("/chat");
    },
  });

  const loginWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const { additionalUserInfo } = await firebase.auth().signInWithPopup(provider);
      const { email, name, picture } = additionalUserInfo.profile;

      const userData = {
        name,
        email,
        picture,
      };

      mutate(userData);
    } catch (error) {

    }
  };

  return (
    <Wrapper>
      <Preload />
      <LoginBox>
        <StyledPageTitle>FSS</StyledPageTitle>
        <button type="button" onClick={loginWithGoogle}>Google Login</button>
      </LoginBox>
      <Line isAnimated={isAnimated}>
        <span></span>
      </Line>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  background: url(${bg_texture_grey}) repeat 50%/400px 200px;
  transition: .7s linear;
`;

const LoginBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Line = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 6px;
  height: 100%;
  z-index: 500;

  span {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform-origin: 0 100%;
    transform: ${({ isAnimated }) => isAnimated ? "scaleY(1)" : "scaleY(0)"};
    background-color: #1a1a1e;
    transition: .675s cubic-bezier(.82,.01,.21,1);
  }
`;

const StyledPageTitle = styled(Font)`
  position: relative;
  background: #222 url(${bg_texture_fragment});
  background-clip: text;
  -webkit-background-clip: text;
  font-family: "Druk XCond Web";
  font-size: 20vw;
  font-weight: 600;
  color: transparent;

  :after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${bg_texture}) repeat 50%/300px 150px;
  }
`;

export default Login;
