import React from "react";
import styled from "styled-components";

function Loading() {
  return (
    <LoadingStyled>
      <Loader />
    </LoadingStyled>
  );
}

const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid ${({ theme }) => theme.palette.blue};
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 1.5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default Loading;
