import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useSound from 'use-sound';

import { changeGameStatus, resetQuizForGameOver } from '../../store/quizSlice';
import { resetBattleForGameOver } from '../../store/battleSlice';
import { flexCenterColumn } from '../../styles/share/common';
import { ROUTE } from '../../constants/game';

import Button from '../share/Button';

function ErrorBox() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [play] = useSound('/audio/click.mp3');

  const goToMenu = () => {
    play();
    dispatch(changeGameStatus());
    dispatch(resetQuizForGameOver());
    dispatch(resetBattleForGameOver());
    history.push(ROUTE.MENU);
  };

  return (
    <Container>
      <h1 className="error-message">🙈{location.state.error}</h1>
      <Button
        text="메뉴로 돌아가기"
        size="large"
        backgroundColor="pink"
        onClick={goToMenu}
      />
    </Container>
  );
}

export default ErrorBox;

const Container = styled.div`
  ${flexCenterColumn}

  z-index: 999;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 50px;
  background: ${({ theme }) => theme.loseResultBg};

  .message {
    margin-bottom: 50px;
    text-align: center;
    font-family: 'Do hyeon';
    font-size: 24px;
    overflow-wrap: break-word;
    color: white;
  }
`;
