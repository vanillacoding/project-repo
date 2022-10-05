import styled from 'styled-components';

import { flexCenter } from './common';

export const Container = styled.div`
  height: 100%;
  text-align: center;
  background-image: url(/background/roomsBg.webp);
`;

export const RoomHeader = styled.ul`
  ${flexCenter}
  height: 20%;

  .title {
    font-size: 36px;
    color: ${({ theme }) => theme.white};
  }
`;
