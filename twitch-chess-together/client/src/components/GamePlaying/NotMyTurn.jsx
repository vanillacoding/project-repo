import React from 'react';
import styled from 'styled-components';

export default function NotMyTurn() {
  return <NotMyTurnInnerBox>차례가 아닙니다</NotMyTurnInnerBox>;
}

const NotMyTurnInnerBox = styled.div`
  width: 100%;
  margin-top: 30px;
  text-align: center;
  font-size: 30px;
`;
