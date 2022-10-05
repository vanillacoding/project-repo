import { useState, useEffect, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useSound from 'use-sound';

import { changeMessage, resetQuizForGameOver } from '../../store/quizSlice';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { ROUTE } from '../../constants/game';
import { RESET, GAME } from '../../constants/messages';

import Button from '../share/Button';
import Message from '../share/Message';
import BarSpinner from '../share/LoadingSpinner/BarSpinner';
const Portal = lazy(() => import('../Portal'));
const Modal = lazy(() => import('../Modal'));
const RegisterRankModal = lazy(() => import('../Modal/RegisterRankModal'));

function GameOver() {
  const dispatch = useDispatch();
  const score = useSelector((state) => state.quiz?.score);
  const [rankModalOpen, setRankModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasRank, setHasRank] = useState(false);
  const [play] = useSound('/audio/click.mp3');

  useEffect(() => {
    setLoading(true);

    return () => dispatch(resetQuizForGameOver());
  }, [dispatch, score]);

  const shareGameURL = () => {
    play();
    copyToClipboard(process.env.REACT_APP_ICE_BREAKER_URL);
    dispatch(changeMessage(GAME.SHARE));
  };

  const openRankModal = () => {
    play();
    setRankModalOpen(true);
  };

  const closeRankModal = () => {
    play();
    setRankModalOpen(false);
    dispatch(changeMessage(RESET));
  };

  return (
    <Container>
      <TitleWrapper>
        <h1 className="title">GAME OVER</h1>
        {loading ? <h2 className="score">{score}</h2> : <BarSpinner />}
      </TitleWrapper>
      <Buttons>
        <li className="button">
          <Button
            text="공유하기"
            size="large"
            backgroundColor="pink"
            onClick={shareGameURL}
          />
        </li>
        <li className="button">
          <Button
            text="랭킹 등록"
            size="large"
            backgroundColor="purple"
            onClick={openRankModal}
            disabled={hasRank}
          />
          {rankModalOpen && (
            <Suspense fallback={null}>
              <Portal>
                <Modal onClose={closeRankModal} background="orange">
                  <RegisterRankModal
                    onClose={closeRankModal}
                    hasRank={setHasRank}
                  />
                </Modal>
              </Portal>
            </Suspense>
          )}
        </li>
        <li className="button">
          <Link to={ROUTE.MENU}>
            <Button text="처음으로" size="large" backgroundColor="skyBlue" />
          </Link>
        </li>
      </Buttons>
      <Message />
    </Container>
  );
}

export default GameOver;

const Container = styled.div`
  height: 100%;
  background-image: url(/background/solo.png);
`;

const TitleWrapper = styled.div`
  position: relative;
  height: 65%;
  text-align: center;

  .title {
    margin: auto;
    padding-top: 100px;
    font-family: 'Do hyeon';
    font-size: 55px;
    color: ${({ theme }) => theme.white};
    -webkit-text-stroke: 2px ${({ theme }) => theme.white};
  }

  .score {
    position: absolute;
    top: 75%;
    left: 50%;
    width: 100%;
    line-height: 1.6em;
    font-size: 60px;
    color: ${({ theme }) => theme.red};
    -webkit-text-stroke: 2px ${({ theme }) => theme.red};
    transform: translate(-50%, -50%);
  }
`;

const Buttons = styled.ul`
  height: 30%;
  text-align: center;

  .button {
    margin-bottom: 0.7em;
  }
`;
