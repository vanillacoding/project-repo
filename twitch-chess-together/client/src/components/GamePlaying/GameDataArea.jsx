import React from 'react';
import styled from 'styled-components';

import GameExternalInfoArea from './GameExternalDataArea';
import GameInternalDataArea from './GameInternalDataArea';

export default function GameDataArea() {
  return (
    <GameDataAreaInnerBox>
      <GameInternalDataArea />
      <GameExternalInfoArea />
    </GameDataAreaInnerBox>
  );
}

const GameDataAreaInnerBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;
