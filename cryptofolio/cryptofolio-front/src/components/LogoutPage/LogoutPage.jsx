import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Button from "../shared/Button/Button";

import useLogout from "../../hooks/useLogout";

const LogoutContainer = styled.div`
  width: 100vw;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  color: white;
`;

const LogoutMessage = styled.div`
  margin-top: 400px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 800;
  font-size: 3.7rem;
`;

const LogoutPage = ({ authService }) => {
  const handleLogout = useLogout(authService);
  const history = useHistory();

  return (
    <LogoutContainer>
      <LogoutMessage>Log Out</LogoutMessage>
      <Button
        onClick={handleLogout}
        margin={["5vh", "0", "0", "1vw"]}
        bgColor={"#eb4d4b"}
        fontWeight={"600"}
      >
        Log Out
      </Button>
      <Button
        onClick={() => history.push("/")}
        margin={["1vh", "0", "0", "1vw"]}
        fontWeight={"600"}
      >
        Go Back
      </Button>
    </LogoutContainer>
  );
};

LogoutPage.propTypes = {
  authService: PropTypes.object.isRequired,
};

export default LogoutPage;
