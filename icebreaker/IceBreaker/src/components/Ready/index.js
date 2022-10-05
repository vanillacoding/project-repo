import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getDatabase, ref, get, child } from 'firebase/database';
import styled from 'styled-components';
import gsap from 'gsap';

import { saveQuizCollection } from '../../store/quizSlice';
import { saveUserName, saveId, saveBreakers } from '../../store/battleSlice';
import { ROUTE, QUIZ, ROOMS } from '../../constants/game';
import { ERROR } from '../../constants/error';
import { READY } from '../../styles/gsapStyle';
import { flexCenterColumn } from '../../styles/share/common';

function Ready() {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector((state) => state.battle.userName);
  const breakers = useSelector((state) => state.battle.breakers);
  const [time, setTime] = useState(3);

  useEffect(() => {
    if (roomId) return;

    const getQuiz = async () => {
      try {
        const quizCollection = (
          await get(child(ref(getDatabase()), QUIZ))
        ).val();

        if (quizCollection !== null) {
          dispatch(saveQuizCollection(quizCollection));
        }
      } catch (err) {
        history.push(ROUTE.ERROR, {
          error: ERROR.LOAD_DATA,
        });
      }
    };

    getQuiz();
  }, [dispatch, history]);

  useEffect(() => {
    if (!roomId) return;

    const getRoom = async () => {
      try {
        const room = (
          await get(child(ref(getDatabase()), `${ROOMS}/${roomId}`))
        ).val();

        if (room !== null) {
          dispatch(saveQuizCollection(room.quizCollection));
          dispatch(saveBreakers(room.breakers));
        }
      } catch (err) {
        history.push(ROUTE.ERROR, {
          error: ERROR.LOAD_DATA,
        });
      }
    };

    getRoom();
  }, [dispatch, history]);

  useEffect(() => {
    if (!userName || breakers.length === 0) return;

    const eachBreakerId = {};

    breakers.forEach((breaker, index) => {
      breaker.name === userName
        ? (eachBreakerId.id = index)
        : (eachBreakerId.opponentId = index);
    });

    dispatch(saveId(eachBreakerId));
  }, [dispatch, userName, breakers]);

  useEffect(() => {
    if (!roomId) return;

    try {
      const { userName } = JSON.parse(
        window.sessionStorage.getItem('userName'),
      );
      dispatch(saveUserName(userName));
    } catch (err) {
      history.push(ROUTE.ERROR, {
        error: ERROR.LOAD_DATA,
      });
    }
  }, [dispatch, history]);

  useEffect(() => {
    let timer;
    const waitForOneSecond = () => {
      return new Promise((resolve) => {
        timer = setTimeout(() => resolve(), 1000);
      });
    };

    (async () => {
      if (time === 0) {
        roomId
          ? history.push(`${ROUTE.BREAKING}/${roomId}`)
          : history.push(ROUTE.BREAKING);
      }

      try {
        await waitForOneSecond();
        setTime((prev) => prev - 1);
      } catch (err) {
        history.push(ROUTE.ERROR, {
          error: ERROR.UNKNOWN,
        });
      }
    })();

    return () => clearTimeout(timer);
  }, [history, time]);

  useEffect(() => {
    if (time === 3) {
      gsap.from(READY.CIRCLE, READY.RED_CIRCLE);
    } else if (time === 2) {
      gsap.to(READY.CIRCLE, READY.GREEN_CIRCLE);
      gsap.to(READY.CIRCLE, READY.SCALE_UP_FROM_GREEN);
    } else if (time === 1) {
      gsap.to(READY.CIRCLE, READY.TRANSPARENT_FROM_GREEN);
      gsap.to(READY.BACKGROUND, READY.YELLOW_CIRCLE);
      gsap.to(READY.CIRCLE, READY.SCALE_UP_FROM_YELLOW);
    }
  }, [time]);

  return (
    <Container className="background">
      <div className="circle">
        <span className="ready">READY</span>
        <span className="time">{time}</span>
      </div>
    </Container>
  );
}

export default Ready;

const Container = styled.div`
  position: relative;
  height: 100%;
  background-image: url(/background/readyBg.png);

  .circle {
    ${flexCenterColumn}
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: ${({ theme }) => theme.redCircleBg};
    box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.79);
    color: ${({ theme }) => theme.white};

    .ready {
      display: block;
      font-size: 1.8em;
      line-height: 1.8em;
    }

    .time {
      display: block;
      font-size: 4em;
    }
  }
`;
