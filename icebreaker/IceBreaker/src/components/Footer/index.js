import { lazy, Suspense, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Stage, Layer, RegularPolygon } from 'react-konva';
import styled from 'styled-components';
import theme from '../../styles/theme';

import {
  changeGameStatus,
  pauseGameProgress,
  changeMessage,
  resetQuizForGameOver,
} from '../../store/quizSlice';
import { resetBattleForGameOver } from '../../store/battleSlice';
import usedCokeWeb from '../../asset/usedCoke.webp';
import cokeWeb from '../../asset/coke.webp';
import coke from '../../asset/coke.png';
import { rightAndLeft } from '../../styles/share/animation';
import { flexCenter } from '../../styles/share/common';
import { ROUTE, GAME_STATUS } from '../../constants/game';
import { USE_ITEM, ANSWER } from '../../constants/messages';

const Portal = lazy(() => import('../Portal'));
const Modal = lazy(() => import('../Modal'));
const ItemModal = lazy(() => import('../Modal/ItemModal'));

function Footer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentQuizIndex = useSelector((state) => state.quiz.currentQuizIndex);
  const gameStatus = useSelector((state) => state.quiz.gameStatus);
  const isGamePaused = useSelector((state) => state.quiz.isGamePaused);
  const itemsCount = useSelector((state) => state.quiz.itemsCount);
  const isAnswerGuessTime = gameStatus === GAME_STATUS.ANSWER_GUESS_TIME;

  const moveToMenu = () => {
    dispatch(changeGameStatus(GAME_STATUS.END));
    dispatch(resetQuizForGameOver());
    dispatch(resetBattleForGameOver());
    history.push(ROUTE.MENU);
  };

  const openItemModal = () => {
    if (!isAnswerGuessTime) return;

    dispatch(changeMessage(USE_ITEM.GUIDE));
    dispatch(pauseGameProgress(true));
  };

  const closeItemModal = () => {
    dispatch(changeMessage(ANSWER[currentQuizIndex + 1]));
    dispatch(pauseGameProgress(false));
  };

  return (
    <Wrapper>
      <Stage width={120} height={60}>
        <Layer>
          <RegularPolygon
            x={37}
            y={31}
            sides={6}
            radius={26}
            fill={theme.purple}
            shadowColor="#000000"
            shadowBlur={4}
            shadowOffset={{ x: 1, y: 6 }}
            shadowOpacity={0.2}
            onClick={moveToMenu}
            onMouseDown={moveToMenu}
            onTouchStart={moveToMenu}
          />
          <RegularPolygon
            x={95}
            y={31}
            sides={6}
            radius={26}
            fill={isAnswerGuessTime ? theme.deepPink : theme.lightGray}
            shadowColor="#000000"
            shadowBlur={4}
            shadowOffset={{ x: 1, y: 6 }}
            shadowOpacity={0.2}
            onClick={openItemModal}
            onMouseDown={openItemModal}
            onTouchStart={openItemModal}
          />
        </Layer>
      </Stage>
      <Nav coke={coke}>
        <span className="menu" onClick={moveToMenu}>
          MENU
        </span>
        <span className="item" onClick={openItemModal}>
          <img
            className="item-img"
            src={coke}
            alt="coke"
            width="20"
            height="25"
          />
          ITEM
        </span>
        {isGamePaused && (
          <Suspense fallback={null}>
            <Portal>
              <Modal onClose={closeItemModal} background="red">
                <ItemModal onClose={closeItemModal} />
              </Modal>
            </Portal>
          </Suspense>
        )}
      </Nav>
      <Cokes>
        {Array(5)
          .fill(null)
          .map((_, i) => {
            return (
              <img
                key={i}
                src={i > itemsCount - 1 ? usedCokeWeb : cokeWeb}
                alt="coke"
                width="27"
                height="41"
              />
            );
          })}
      </Cokes>
    </Wrapper>
  );
}

const MemoizedFooter = memo(Footer);
export default MemoizedFooter;

const Wrapper = styled.div`
  ${flexCenter}
  justify-content: space-between;
  height: 9%;
  padding-right: 10px;
`;

const Nav = styled.div`
  display: flex;
  font-size: 0.4em;
  color: ${({ theme }) => theme.white};
  transform: translate(-123px, 2px);

  .menu {
    display: block;
    color: ${({ theme }) => theme.white};
  }

  .item {
    transform: translateX(25px);

    .item-img {
      position: absolute;
      transform: translate(5px, -30px) rotate(20deg);
    }
  }
`;

const Cokes = styled.div`
  transform: translateY(5px);

  img {
    transform: rotate(20deg);
    animation: ${rightAndLeft} 1.1s infinite ease-in;
  }
`;
