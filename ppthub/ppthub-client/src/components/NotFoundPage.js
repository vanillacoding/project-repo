import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";

import SEQUENCES from "../config/constants/sequences";
import THEME_COLORS from "../config/constants/themeColors";
import { changeSequence } from "../features/sequenceReducer";

function NotFoundPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeSequence(SEQUENCES.ERROR));
  }, [dispatch]);

  return (
    <NotFoundContainer>
      <NotFoundHeader>404</NotFoundHeader>
      <NotFoundMessage>
        찾으시려는 페이지가 현재 존재하지 않습니다.
        <br />
        주소를 다시 한 번 확인해 주세요.
      </NotFoundMessage>
    </NotFoundContainer>
  );
}

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 26vw;
  overflow: auto;
`;

const NotFoundHeader = styled.h1`
  color: ${THEME_COLORS.MAIN_COLOR};
  font-size: 24vmin;
  font-style: italic;
`;

const NotFoundMessage = styled.p`
  margin-top: 3rem;
  font-size: 3vmin;
  line-height: 4vmin;
  text-align: left;
`;

export default NotFoundPage;
