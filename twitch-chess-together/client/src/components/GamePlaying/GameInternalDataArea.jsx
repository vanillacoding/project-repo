import React from 'react';
import styled from 'styled-components';

import GameTimer from './GameTimer';
import CurrentTurnInfo from './CurrentTurnInfo';
import { flexCenter } from '../styles/mixin';

export default function GameInternalDataArea() {
  return (
    <ColorGuideArea>
      <GameTimer />
      <ColorGuideWrapper>
        <ColorSample color="#FBE698" />
        <ColorInfoOuterBox>
          <ColorInfo>선택된 말</ColorInfo>
        </ColorInfoOuterBox>
      </ColorGuideWrapper>
      <ColorGuideWrapper>
        <ColorSample color="#15B5B0" />
        <ColorInfoOuterBox>
          <ColorInfo>선택 가능한 말</ColorInfo>
        </ColorInfoOuterBox>
      </ColorGuideWrapper>
      <ColorGuideWrapper>
        <ColorSample color="#6DECE0" />
        <ColorInfoOuterBox>
          <ColorInfo>움직일 수 있는 곳 </ColorInfo>
        </ColorInfoOuterBox>
      </ColorGuideWrapper>
      <ColorGuideWrapper>
        <ColorSample color="#DB1F48" />
        <ColorInfoOuterBox>
          <ColorInfo>공격가능 한 곳 </ColorInfo>
        </ColorInfoOuterBox>
      </ColorGuideWrapper>
      <CurrentTurnInfo />
    </ColorGuideArea>
  );
}

const ColorGuideArea = styled.div`
  width: 492px;
  height: 100%;
  margin-top: 40px;
`;

const ColorInfoOuterBox = styled.div`
  ${flexCenter}
  width: 300px;
  height: 80px;
`;

const ColorGuideWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 100px;
  width: 400px;
  margin: 20px auto 0 auto;
`;

const ColorSample = styled.div`
  height: 80px;
  width: 80px;
  background-color: ${({ color }) => color};
`;

const ColorInfo = styled.div`
  width: 300px;
  padding-left: 40px;
  font-size: 30px;
`;
