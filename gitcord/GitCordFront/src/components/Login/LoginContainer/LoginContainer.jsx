import React, { useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { GoogleLogin } from "react-google-login";

import { postGoogleLogin, putLogin } from "../../../api/userApi";
import { loginUser } from "../../../actions/userActions";
import {
  NEED_EMAIL,
  NEED_EMAIL_FORMAT,
  NEED_PASSWORD
} from "../../../constants/message";
import route from "../../../constants/routes";

import InputWithLabel from "../../publicComponents/InputWithLabel/InputWithLabel";
import Button from "../../publicComponents/Button/Button";

const LoginContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 40vw;
  height: 60vh;
  border: 3px solid #3B4755;
  border-radius: 10px;
  background-color: #3B4755;
  box-shadow: 0px 2px 5px black;

  .login-title {
    height: 10%;
    color: #ffffff;
    font-size: 30px;
    font-weight: bold;
  }

  .login-contents {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 60%;
    height: 80%;

    &-email {
      width: 100%;
      height: 20%;
    }

    &-password {
      width: 100%;
      height: 20%;
    }
  }

  .error {
    color: red;
    font-size: 15px;
    font-weight: bold;
  }

  .login-signup {
    text-decoration: none;
    font-weight: bold;
    color: #ffffff;
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }
`;

function isEmailValidate(email) {
  return email.match(/\w+@\w+.\w+/g);
}

function LoginContainer() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleLoginClick() {
    if (!email) return setEmailError(NEED_EMAIL);

    if (!isEmailValidate(email)) return setEmailError(NEED_EMAIL_FORMAT);

    if (!password) return setPasswordError(NEED_PASSWORD);

    const loginInfo = {
      email,
      password
    };

    try {
      const response = await putLogin(loginInfo);

      if (response.caused) {
        if (response.caused === "email") return setEmailError(response.message);
        if (response.caused === "password") return setPasswordError(response.message);
      }

      if (response.status >= 400) throw new Error(response.message);

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      localStorage.setItem("access", response.accessToken);
      localStorage.setItem("refresh", response.refreshToken);

      dispatch(loginUser({
        email: response.email,
        name: response.name
      }));

      setIsLoginSuccess(true);
    } catch (err) {
      setIsError(true);
    }
  }

  async function handleGoogleLoginClick(googleUserInfo) {
    const { profileObj } = googleUserInfo;

    try {
      const response = await postGoogleLogin(profileObj);

      localStorage.setItem("access", response.accessToken);
      localStorage.setItem("refresh", response.refreshToken);

      dispatch(loginUser({
        email: response.email,
        name: response.name
      }));

      setIsLoginSuccess(true);
    } catch (err) {
      setIsError(true);
    }
  }

  return (
    <LoginContainerStyle>
      <div className="login-title">Login</div>
      <section className="login-contents">
        <div className="login-contents-email">
          <InputWithLabel
            labelContent="Email"
            placeholder="Type email here"
            height="95%"
            onChange={handleEmailChange}
          />
          <div className="error">
            {emailError}
          </div>
        </div>
        <div className="login-contents-password">
          <InputWithLabel
            labelContent="Password"
            placeholder="Type password"
            height="95%"
            onChange={handlePasswordChange}
            type="password"
          />
          <div className="error">
            {passwordError}
          </div>
        </div>
        <Button
          content="LOGIN"
          width="40%"
          height="10%"
          onClick={handleLoginClick}
        />
        <div>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="GOOGLE LOGIN"
            onSuccess={handleGoogleLoginClick}
          />
        </div>
        <Link className="login-signup" to={route.SIGNUP}>Sign up</Link>
      </section>
      { isLoginSuccess && <Redirect to={route.HOME} /> }
      { isError && <Redirect to={route.ERROR} /> }
    </LoginContainerStyle>
  );
}

export default LoginContainer;
