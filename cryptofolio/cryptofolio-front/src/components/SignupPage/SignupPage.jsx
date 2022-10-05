import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Button from "../shared/Button/Button";
import Input from "../shared/Input/Input";

import useErrorMessage from "../../hooks/useErrorMessage";
import useInput from "../../hooks/useInput";
import useSignUp from "../../hooks/useSignup";
import useSocialLogin from "../../hooks/useSocialLogin";

import actionCreator from "../../actions/actionCreator";

const SignUpContainer = styled.section`
  width: 100vw;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  color: white;
`;

const MainTitle = styled.div`
  margin-top: 200px;
  margin-bottom: 60px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 800;
  font-size: 3.7rem;
`;

const SignUpForm = styled.form`
  width: 300px;
`;

const SignUpLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const SignUpInputBox = styled.div`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SignupPage = ({ authService }) => {
  const dispatch = useDispatch();
  const { authError } = useSelector((state) => state.authReducer);
  const history = useHistory();

  const [email, onChangeEmail] = useInput("");
  const [name, onChangeName] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordConfirm, onChangePasswordConfirm] = useInput("");
  const [error, showErrorMessage] = useErrorMessage("");

  const handleSignup = useSignUp(
    { email, name, password, passwordConfirm },
    showErrorMessage
  );
  const handleSocialLogin = useSocialLogin(authService, showErrorMessage);

  useEffect(() => {
    if (authError) {
      showErrorMessage(authError);
      dispatch(actionCreator.resetErrorMessage());
    }
  }, [dispatch, authError, showErrorMessage]);

  return (
    <SignUpContainer>
      {error.length > 0 && <ErrorMessage error={error} />}
      <MainTitle>Sign Up</MainTitle>
      <SignUpForm onSubmit={handleSignup}>
        <SignUpInputBox>
          <SignUpLabel htmlFor="user-email">이메일</SignUpLabel>

          <Input
            name="user-email"
            value={email}
            onChange={onChangeEmail}
            required
          />
        </SignUpInputBox>
        <SignUpInputBox>
          <SignUpLabel htmlFor="user-name">이름</SignUpLabel>

          <Input
            name="user-name"
            value={name}
            onChange={onChangeName}
            required
          />
        </SignUpInputBox>
        <SignUpInputBox>
          <SignUpLabel htmlFor="user-password">비밀번호</SignUpLabel>

          <Input
            name="user-password"
            value={password}
            type="password"
            onChange={onChangePassword}
            required
          />
        </SignUpInputBox>
        <SignUpInputBox>
          <SignUpLabel htmlFor="user-passwordConfirm">
            비밀번호 확인
          </SignUpLabel>

          <Input
            name="user-passwordConfirm"
            value={passwordConfirm}
            type="password"
            onChange={onChangePasswordConfirm}
            required
          />
        </SignUpInputBox>
        <ButtonContainer>
          <Button
            name="SignUp"
            onClick={handleSignup}
            margin={["10px", "0", "0", "0"]}
            bgColor={"#f1c40f"}
            color={"black"}
          >
            Sign Up
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button
            name="Login"
            onClick={() => history.push("/login")}
            margin={["10px", "0", "0", "0"]}
          >
            Log In
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button
            name="Google"
            onClick={handleSocialLogin}
            margin={["10px", "0", "0", "0"]}
          >
            Google Login
          </Button>
        </ButtonContainer>
      </SignUpForm>
    </SignUpContainer>
  );
};

SignupPage.propTypes = {
  authService: PropTypes.object.isRequired,
};

export default SignupPage;
