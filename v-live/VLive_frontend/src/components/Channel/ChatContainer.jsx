import React from 'react';
import styled from '@emotion/styled';

import ChatBody from './ChatBody';
import ChatForm from './ChatForm';

export default function ChatContainer() {
  return (
    <Container>
      <ChatBody />
      <ChatForm />
    </Container>
  );
}

const Container = styled.div`
  width: 65%;
  height: 100%;
  background-size: cover;
  background-image: linear-gradient(
      rgba(5, 3, 19, 0.801),
      rgba(5, 3, 19, 0.788),
      rgba(5, 3, 19, 0.568),
      rgba(5, 3, 19, 0.788),
      rgba(5, 3, 19, 0.801)
    ),
    url('/images/11.jpg');
`;
