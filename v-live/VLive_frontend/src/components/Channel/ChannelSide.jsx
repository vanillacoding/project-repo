import React from 'react';
import styled from '@emotion/styled';

import PlayerContainer from './PlayerContainer';
import SideButtonContainer from './SideButtonContainer';
import ChatContainer from './ChatContainer';

export default function ChannelSide() {
  return (
    <SideContainer>
      <ChatContainer />
      <PlayerContainer />
      <SideButtonContainer />
    </SideContainer>
  );
}

const SideContainer = styled.div`
  display: flex;
  width: 100%;
  height: 30vh;
  background-size: cover;
`;
