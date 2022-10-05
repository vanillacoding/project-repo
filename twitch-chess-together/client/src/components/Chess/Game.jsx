import React from 'react';
import styled from 'styled-components';

import Play from './Play';
import Board from './Board';
import BorderPositionGuide from './Board/PositionGuide';

export default function ChessGame() {
  return (
    <Wrapper>
      <ChessGameWrapper>
        <Board />
        <Play />
      </ChessGameWrapper>
      <BorderPositionGuide />
    </Wrapper>
  );
}

const ChessGameWrapper = styled.div`
  height: 800px;
  width: 800px;
`;

const Wrapper = styled.div`
  display: grid;
  height: 800px;
  width: 800px;
  padding: 80px 0 0 70px;
  grid-template-columns: repeat(10, 80px);
  grid-template-rows: repeat(10, 80px);
`;
