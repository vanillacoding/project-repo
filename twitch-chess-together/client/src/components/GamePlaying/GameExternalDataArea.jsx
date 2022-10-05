import React from 'react';
import styled from 'styled-components';

import PlayersInfo from './PlayersInfo';
import CommandList from './CommandList';
import CommandElection from './CommandElection';
import { flexCenter } from '../styles/mixin';

export default function GameExternalDataArea() {
  return (
    <>
      <GameExternalInfoInnerBox>
        <PlayersInfo />
        <CommandElection />
        <UsableCommand>!선택 A5</UsableCommand>
        <CommandList />
      </GameExternalInfoInnerBox>
    </>
  );
}

const UsableCommand = styled.div`
  ${flexCenter}
  width: 350px;
  height: 80px;
  font-size: 45px;
`;

const GameExternalInfoInnerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  width: auto;
`;
