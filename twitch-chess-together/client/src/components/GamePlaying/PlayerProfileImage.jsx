import React from 'react';
import styled from 'styled-components';
import { flexCenter } from '../styles/mixin';

export default function PlayerProfileImage({ size, imgUrl }) {
  return <PlayerProfileImageInBox imgUrl={imgUrl} size={size} />;
}

const PlayerProfileImageInBox = styled.div`
  ${flexCenter}
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-image: url(${({ imgUrl }) => imgUrl});
  background-size: ${({ size }) => size}px;
`;
