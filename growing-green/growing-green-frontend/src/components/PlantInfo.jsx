import React from 'react';
import styled from 'styled-components';

export default function PlantInfo({ plant }) {
  return (
    <Container>
      <h3 className="info-item">식물 정보</h3>
      <p className="info-item">이름: {plant.name}</p>
      <p className="info-item">학명: {plant.scientificName}</p>
      <p className="info-item">과: {plant.species}</p>
      <p className="info-item">물주기: {plant.watering}일</p>
      <p className="info-item">
        광도: {plant.isSunPlant === true ? '양지 식물' : '음지식물'}
      </p>
    </Container>
  );
}

const Container = styled.div`
  text-align: left;
  margin: 2rem 2rem 0 -2rem;
  position: relative;
  border: 1px solid ${({ theme }) => theme.baseTheme.colors.gray};
  background: ${({ theme }) => theme.baseTheme.colors.ivory};
  padding: 1rem;

  .info-item {
    margin-left: 2rem;
  }
`;
