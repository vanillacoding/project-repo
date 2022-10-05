import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import { bounce } from '../../styles/animation';

import useChannels from '../../hooks/channel/useChannels';

import Header from '../Header';
import HistoryItem from './HistoryItem';
import Button from '../Button';
import ErrorBox from '../ErrorBox';

export default function Landing() {
  const { historyChannels, error } = useChannels();

  if (error) {
    return <ErrorBox message={error.message} />;
  }

  return (
    <Container>
      <Header />
      <HistoryWrapper bounce={bounce}>
        <h2 className="history-title">RECENT LIVE</h2>
        <div className="history-list">
          {historyChannels?.map((channel) => (
            <Link href={`/history/${channel._id}`} key={channel._id} passHref>
              <a>
                <HistoryItem channel={channel} />
              </a>
            </Link>
          ))}
        </div>
        <div className="button-wrapper">
          <Link href="/main" passHref>
            <Button
              className="start-button"
              width="200px"
              color={theme.white}
              bgColor={theme.pink}
              hoverBgColor={theme.white}
            >
              게임하러가기
            </Button>
          </Link>
        </div>
      </HistoryWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  text-align: center;
  height: 100vh;
  background-image: linear-gradient(
      rgba(5, 3, 19, 0.801),
      rgba(5, 3, 19, 0.788),
      rgba(5, 3, 19, 0.568),
      rgba(5, 3, 19, 0.788),
      rgba(5, 3, 19, 0.801)
    ),
    url('/images/background.jpg');
`;

const HistoryWrapper = styled.div`
  position: absolute;
  top: 54%;
  left: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 480px;
  transform: translate(-50%, -50%);

  .history-title {
    font-size: 1.5em;
    color: ${({ theme }) => theme.pink};
    animation: ${bounce} 1.2s ease-in infinite;
  }

  .history-list {
    display: flex;
    flex-direction: column;
    min-width: 600px;
    height: 400px;
    overflow-y: auto;
    border-radius: 20px;
    background: ${({ theme }) => theme.darkNavy}95;
    box-shadow: ${({ theme }) => theme.whiteShadow};

    &::-webkit-scrollbar {
      width: 13px;
      background-color: ${({ theme }) => theme.darkNavy};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 30px;
      background-color: ${({ theme }) => theme.pink};

      &:hover {
        background-color: ${({ theme }) => theme.white};
        border: none;
      }
    }
  }

  .button-wrapper {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    .start-button {
      font-size: 18px;
    }
  }
`;
