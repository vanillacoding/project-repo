import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";

import SEQUENCES from "../config/constants/sequences";
import THEME_COLORS from "../config/constants/themeColors";
import { changeSequence } from "../features/sequenceReducer";

function ErrorPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeSequence(SEQUENCES.ERROR));
  }, [dispatch]);

  return (
    <ErrorContainer>
      <ErrorHeader>SORRY</ErrorHeader>
      <ErrorMessage>
        현재 알 수 없는 문제로 인하여
        <br /> 서비스 이용이 불가능합니다.
        <br /> 잠시 후 다시 이용 부탁드립니다.
      </ErrorMessage>
    </ErrorContainer>
  );
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 26vw;
  overflow: auto;
`;

const ErrorHeader = styled.h1`
  color: ${THEME_COLORS.MAIN_COLOR};
  font-size: 20vmin;
  font-style: italic;
`;

const ErrorMessage = styled.p`
  margin-top: 3rem;
  font-size: 3vmin;
  line-height: 4vmin;
  text-align: left;
`;

export default ErrorPage;
