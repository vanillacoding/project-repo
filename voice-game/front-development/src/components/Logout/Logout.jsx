import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

import useErrorMessage from "../../hooks/useErrorMessage";

import ErrorMessage from "../ErrorMessage/ErrorMessage";

import Button from "../shared/Button/Button";
import { playerLogout, stopUnAuthMode } from "../../actions/authActionCreators";

const LogoutContainer = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoutMessage = styled.div`
  font-size: 3rem;
  font-weight: 600;
`;

const Logout = ({ authService }) => {
  const { isUnAuthMode } = useSelector((state) => state.authReducer);
  const [error, showErrorMessage] = useErrorMessage("");
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async () => {
    if (isUnAuthMode) {
      dispatch(stopUnAuthMode());
      history.push("/");
    }

    try {
      await authService.logout();
      dispatch(playerLogout());
      history.push("/");
    } catch {
      showErrorMessage("로그아웃에 실패하였습니다.");
    }
  };

  return (
    <LogoutContainer>
      {error.length > 0 && <ErrorMessage error={error} />}
      <LogoutMessage>Are You Leaving?</LogoutMessage>
      <Button
        onClick={onLogout}
        margin={["5vh", "0", "0", "1vw"]}
        bgColor={"#eb4d4b"}
        fontWeight={"600"}
      >
        Log Out
      </Button>
      <Button
        onClick={() => history.push("/games")}
        margin={["1vh", "0", "0", "1vw"]}
        fontWeight={"600"}
      >
        Back to game
      </Button>
    </LogoutContainer>
  );
};

Logout.propTypes = {
  authService: PropTypes.object.isRequired,
};

export default Logout;
