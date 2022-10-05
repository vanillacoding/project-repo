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
import useLocalLogin from "../../hooks/useLocalLogin";
import useSocialLogin from "../../hooks/useSocialLogin";

import actionCreator from "../../actions/actionCreator";

const LoginContainer = styled.section`
  width: 100vw;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  color: white;
`;

const MainTitle = styled.div`
  margin-top: 300px;
  margin-bottom: 60px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 800;
  font-size: 3.7rem;
`;

const LoginForm = styled.form`
  width: 300px;
`;

const LoginLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const LoginInputBox = styled.div`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LoginPage = ({ authService }) => {
  const dispatch = useDispatch();
  const { authError } = useSelector((state) => state.authReducer);
  const history = useHistory();

  const [error, showErrorMessage] = useErrorMessage("");
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const handleLogin = useLocalLogin(email, password, showErrorMessage);
  const handleSocialLogin = useSocialLogin(authService, showErrorMessage);

  useEffect(() => {
    if (authError) {
      showErrorMessage(authError);
      dispatch(actionCreator.resetErrorMessage());
    }
  }, [dispatch, authError, showErrorMessage]);

  return (
    <LoginContainer>
      {error.length > 0 && <ErrorMessage error={error} />}
      <MainTitle>Log In</MainTitle>
      <LoginForm onSubmit={handleLogin}>
        <LoginInputBox>
          <LoginLabel htmlFor="user-email">이메일</LoginLabel>

          <Input
            name="user-email"
            value={email}
            onChange={onChangeEmail}
            required
          />
        </LoginInputBox>
        <LoginInputBox>
          <LoginLabel htmlFor="user-password">비밀번호</LoginLabel>

          <Input
            name="user-password"
            value={password}
            type="password"
            onChange={onChangePassword}
            required
          />
        </LoginInputBox>

        <ButtonContainer>
          <Button
            name="Login"
            onClick={handleLogin}
            margin={["0", "5px", "0", "5px"]}
            bgColor={"#f1c40f"}
            color={"black"}
          >
            Log In
          </Button>
        </ButtonContainer>
      </LoginForm>
      <ButtonContainer>
        <Button
          name="Signup"
          onClick={() => history.push("/signup")}
          margin={["10px", "5px", "0", "5px"]}
        >
          Sign Up
        </Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button
          name="Google"
          onClick={handleSocialLogin}
          margin={["10px", "5px", "0", "5px"]}
        >
          Google Login
        </Button>
      </ButtonContainer>
    </LoginContainer>
  );
};

LoginPage.propTypes = {
  authService: PropTypes.object.isRequired,
};

export default LoginPage;
