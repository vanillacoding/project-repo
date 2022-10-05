import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Button from "../shared/Button/Button";

import useErrorMessage from "../../hooks/useErrorMessage";

import pickRandom from "../../utils/pickRandom";
import micImage from "../../images/thumbnails/mic.png";
import { logUnAuthMode, playerLogin } from "../../actions/authActionCreators";
import { RANDOM_WORD } from "../../constants/constants";

const LoginContainer = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainImage = styled.img`
  max-width: 80vw;
`;

const MainTitle = styled.div`
  width: 80%;
  text-align: center;
  font-size: 4rem;
  margin-top: 2vh;
`;

const Login = ({ authService }) => {
  const dispatch = useDispatch();
  const [error, showErrorMessage] = useErrorMessage("");

  const handleLogin = useCallback(
    async (event) => {
      try {
        const loginData = await authService.login(event.target.name);
        const { email, uid, displayName } = loginData.user;
        dispatch(playerLogin({ email, uid, displayName }));
      } catch (err) {
        showErrorMessage("로그인에 실패하였습니다.");
      }
    },
    [authService, dispatch, showErrorMessage]
  );

  const handleUnAuthMode = useCallback(() => {
    const tempId = uuidv4();
    const tempName = pickRandom(RANDOM_WORD);
    const tempEmail = "temp@temp.temp";

    dispatch(logUnAuthMode(tempId, tempName, tempEmail));
  }, [dispatch]);

  return (
    <LoginContainer>
      {error.length > 0 && <ErrorMessage error={error} />}
      <MainImage src={micImage} alt="mic" />
      <MainTitle>VOICE GAME</MainTitle>
      <Button
        name="Google"
        onClick={handleLogin}
        margin={["2vh", "0", "0", "0"]}
      >
        Google Login
      </Button>
      <Button
        onClick={handleUnAuthMode}
        bgColor="#4bcffa"
        fontWeight={800}
        margin={["2vh", "0", "0", "0"]}
      >
        비회원 입장하기
      </Button>
    </LoginContainer>
  );
};

Login.propTypes = {
  authService: PropTypes.object.isRequired,
};

export default Login;
