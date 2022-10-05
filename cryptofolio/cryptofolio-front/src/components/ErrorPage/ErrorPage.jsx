import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const ErrorPageContainer = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
`;

const HomeButton = styled.button`
  padding: 10px 20px;
  margin-left: 1vw;
  margin-top: 5vh;
  background-color: #ec6998;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  cursor: pointer;
`;

const ErrorPage = () => {
  const history = useHistory();

  return (
    <ErrorPageContainer>
      <ErrorMessage>알 수 없는 에러가 발생하였습니다.</ErrorMessage>
      <HomeButton
        onClick={() => {
          history.push("/");
        }}
      >
        돌아가기
      </HomeButton>
    </ErrorPageContainer>
  );
};

export default ErrorPage;
