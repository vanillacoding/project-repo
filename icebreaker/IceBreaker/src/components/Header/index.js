import { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Stage, Layer, RegularPolygon } from 'react-konva';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import styled from 'styled-components';

import { receiveAttack, updateWarningMessage } from '../../store/quizSlice';
import { flexCenter } from '../../styles/share/common';
import theme from '../../styles/theme';
import { pounding, emergency } from '../../styles/share/animation';
import { ROOMS, GAME_STATUS, ATTACK } from '../../constants/game';

function Header() {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const currentQuizIndex = useSelector((state) => state.quiz.currentQuizIndex);
  const gameStatus = useSelector((state) => state.quiz.gameStatus);
  const remainingTime = useSelector((state) => state.quiz.remainingTime);
  const score = useSelector((state) => state.quiz.score);
  const level = currentQuizIndex + 1;
  const userName = useSelector((state) => state.battle.userName);
  const id = useSelector((state) => state.battle.id);
  const opponentId = useSelector((state) => state.battle.opponentId);
  const warningMessage = useSelector((state) => state.quiz.warningMessage);

  useEffect(() => {
    if (typeof opponentId !== 'number') return;

    const cleanUp = onValue(
      ref(getDatabase(), `${ROOMS}/${roomId}/breakers/${opponentId}/level`),
      (snapshot) => {
        const updatedLevel = snapshot.val();

        if (updatedLevel === 1) return;

        dispatch(
          updateWarningMessage(`상대 브레이커 레벨 ${updatedLevel} 진입!`),
        );
        setTimeout(() => dispatch(updateWarningMessage('RESET')), 3000);
      },
    );

    return () => cleanUp();
  }, [dispatch, roomId, opponentId]);

  useEffect(() => {
    if (
      typeof id !== 'number' &&
      gameStatus !== GAME_STATUS.ANSWER_GUESS_TIME
    ) {
      return;
    }

    const cleanUp = onValue(
      ref(getDatabase(), `${ROOMS}/${roomId}/breakers/${id}/attack`),
      (snapshot) => {
        const attack = snapshot.val();

        if (attack !== null) {
          dispatch(receiveAttack(attack));
          setTimeout(() => dispatch(updateWarningMessage('RESET')), 3000);
        }

        update(ref(getDatabase(), `${ROOMS}/${roomId}/breakers/${id}`), {
          attack: null,
        });
      },
    );

    return () => cleanUp();
  }, [dispatch, roomId, id, gameStatus]);

  useEffect(() => {
    if (userName && level) {
      update(ref(getDatabase(), `${ROOMS}/${roomId}/breakers/${id}`), {
        level,
      });
    }
  }, [level]);

  useEffect(() => {
    if (userName && score) {
      update(ref(getDatabase(), `${ROOMS}/${roomId}/breakers/${id}`), {
        score,
      });
    }
  }, [score]);

  return (
    <Container>
      {warningMessage !== '' && <BattleMessage>{warningMessage}</BattleMessage>}
      <StateBox>
        <Stage width={100} height={64}>
          <Layer>
            <RegularPolygon
              x={40}
              y={30}
              sides={6}
              radius={24}
              rotation={90}
              fill={theme.pink}
            />
          </Layer>
        </Stage>
        <UserScore>
          <span className="level">Lv.{level}</span>
          <span className="score">{score === 0 ? `00` : score}</span>
        </UserScore>
      </StateBox>
      <Time>
        <span
          className={
            warningMessage === ATTACK.REDUCE.message ? 'clock warning' : 'clock'
          }
        >
          ⏰
        </span>
        <span
          className={
            gameStatus === GAME_STATUS.ICE_BREAKING_TIME
              ? 'time breaking-time'
              : 'time answer-time'
          }
        >
          {remainingTime < 10 ? `0${remainingTime}` : remainingTime}
        </span>
      </Time>
    </Container>
  );
}

const MemoizedHeader = memo(Header);
export default MemoizedHeader;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 9%;
`;

const StateBox = styled.div`
  display: flex;
  align-items: center;
  width: 75%;
`;

const UserScore = styled.div`
  transform: translate(-85px, 0px);
  text-align: center;

  .level {
    display: block;
    font-size: 0.7em;
    color: ${({ theme }) => theme.white};
  }

  .score {
    padding-left: 1px;
    font-size: 1.7em;
    -webkit-text-stroke: 1px ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.deepBlue};
  }
`;

const Time = styled.div`
  display: flex;
  width: 25%;

  .clock {
    font-size: 1.5em;
    margin-right: 5px;
  }

  .clock.warning {
    display: block;
    animation: ${emergency} 200ms infinite linear;
  }

  .time {
    display: block;
    font-size: 1.7em;
    color: ${({ theme }) => theme.purple};
    animation: ${pounding} 1.1s infinite linear;
  }

  .time.breaking-time {
    color: ${({ theme }) => theme.red};
  }

  .time.answer-time {
    color: ${({ theme }) => theme.purple};
  }
`;

const BattleMessage = styled.div`
  ${flexCenter}
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  font-family: 'Do Hyeon';
  color: ${({ theme }) => theme.deepPink};
`;
