import React from 'react';
import styled from 'styled-components';
import { flexCenter } from '../styles/mixin';

export default function PlayerProfileDisplayName({ displayName, size = 20 }) {
  const letterSpace = parseInt((size * 2) / displayName.length, 10);
  return (
    <PlayerProfileDisplayNameInBox size={size} letterSpace={letterSpace}>
      {displayName}
    </PlayerProfileDisplayNameInBox>
  );
}

const PlayerProfileDisplayNameInBox = styled.div`
  ${flexCenter}
  height: 30px;
  letter-spacing: ${({ letterSpace }) => letterSpace}px;
  margin-right: -${({ letterSpace }) => letterSpace}px;
  font-size: ${({ size }) => size}px;
`;
