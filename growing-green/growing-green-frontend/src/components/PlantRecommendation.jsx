import React from 'react';
import styled from 'styled-components';

export default function PlantRecommendation({ plantsNames }) {
  return (
    <Container>
      <Title>사용자들이 가장 많이 키우는 식물 TOP 5</Title>
      {plantsNames?.map((name) => (
        <p key={name}>{name}</p>
      ))}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 350px;
  background: white;
  z-index: -1;
`;

const Title = styled.h1`
  margin: 2rem;
  font-size: 1.3em;
`;
