import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import Header from '../Header';
import Button from '../Button';
import RecentHistory from './RecentHistory';

export default function History() {
  return (
    <Container>
      <Header>V-Live</Header>
      <HistoryWrapper>
        <RecentHistory />
      </HistoryWrapper>
      <ButtonWrapper>
        <Link href="/main" passHref>
          <a>
            <Button>게임하러가기</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 100vh;
  text-align: center;
  background-image: linear-gradient(
      rgba(5, 5, 5, 0.746),
      rgba(58, 57, 57, 0.842),
      rgba(100, 98, 98, 0.5),
      rgba(58, 57, 57, 0.842),
      rgba(5, 5, 5, 0.746)
    ),
    url('/images/background.jpg');

  .recent-game {
    margin-top: 0px;
    color: white;
  }
`;

const HistoryWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  height: 600px;
  width: 100%;
  background: #1d1d2985;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
`;
