import React from 'react';
import styled from 'styled-components';

function InternalError() {
  return (
    <Container>
      <Title>500</Title>
      <Line />
      <h2>Internal Server Error</h2>
      <span>this may be a temporary issue! please try again later</span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  align-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 5rem;
`;

const Line = styled.div`
  width: 30%;
  border-bottom: 1px solid white;
`;

export default InternalError;
