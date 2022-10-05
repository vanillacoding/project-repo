import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { FaExclamation } from "react-icons/fa";
import styled from "styled-components";

import { PAGE_NOT_FOUND } from "../../constants/message";
import route from "../../constants/routes";

import Background from "../publicComponents/Backgroud/Background";
import MainIcon from "../publicComponents/MainIcon/MainIcon";

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 50%;

    &-text {
      font-size: 50px;
      font-weight: bold;
      color: rebeccapurple;

      &-count {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: red;
      }
    }
  }

  .container-picture {
    position: relative;

    &-exclamation {
      position: absolute;
      left: 100%;
      font-size: 100px;
      color: red;
      transform: translate(-20%, -20%);
      transform: rotate(15deg);
    }
  }
`;

function Error({ location }) {
  const [count, setCount] = useState(3);
  const message = location.state ? location.state.message : PAGE_NOT_FOUND;

  useEffect(() => {
    setTimeout(() => {
      setCount(count => count - 1);
    }, 1000);
  }, [count]);

  if (count <= 0) return <Redirect to={route.LOGIN} />;

  return (
    <Background>
      <ModalBackground>
        <div className="container">
          <div className="container-picture">
            <FaExclamation className="container-picture-exclamation" />
            <MainIcon width="300px" height="300px" />
          </div>
          <div className="container-text">
            <div className="container-text-message">
              {message}
            </div>
            <div className="container-text-count">
              {count}
            </div>
          </div>
        </div>
      </ModalBackground>
    </Background>
  );
}

export default Error;
