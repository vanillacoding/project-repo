import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { clearCommands } from '../../features/chatServer/slices';
import { selectChatServerCommands } from '../../features/chatServer/selectors';
import {
  addCommand,
  addDuplicateCommand,
  gameTurnIsOver,
} from '../../features/game/slices';
import { selectChessMyTurnSequence } from '../../features/chess/selectors';
import { selectGameProcess } from '../../features/game/selectors';
import {
  setPiecePosition,
  initializeTurnSequence,
} from '../../features/chess/slices';

import {
  createPrimeCommandList,
  getHighestCount,
} from '../../common/utils/primeCommand';
import NotMyTurn from './NotMyTurn';
import { flexCenter } from '../styles/mixin';

export default function CommandElectionProcess() {
  const commandList = useSelector(selectChatServerCommands);
  const gameProcess = useSelector(selectGameProcess);
  const myTurnSequence = useSelector(selectChessMyTurnSequence);
  const dispatch = useDispatch();

  const [wholeCommandStats, setWholeCommandStats] = useState({});
  const [primeCommandList, setPrimeCommandList] = useState([]);
  const [highestCount, setHightestCount] = useState(0);

  useEffect(() => {
    if (commandList[0] === 0) return;
    const { content } = commandList.slice(-1)[0];
    setWholeCommandStats((prevState) => {
      const nextState = { ...prevState };

      if (nextState[content]) {
        nextState[content] += 1;
      } else {
        nextState[content] = 1;
      }
      return nextState;
    });
  }, [commandList]);

  useEffect(() => {
    const tempPrimeCommandList = createPrimeCommandList(wholeCommandStats);
    const tempHightestCount = getHighestCount(tempPrimeCommandList);
    setPrimeCommandList(tempPrimeCommandList);
    setHightestCount(tempHightestCount);
  }, [wholeCommandStats]);

  useEffect(() => {
    if (myTurnSequence === 0) return;
    if (myTurnSequence === 1) {
      setPrimeCommandList([]);
      setWholeCommandStats({});
      dispatch(clearCommands());
      return;
    }

    const electedResult = primeCommandList[0][0];

    if (myTurnSequence === 2) {
      if (!electedResult) {
        dispatch(initializeTurnSequence());
        dispatch(gameTurnIsOver());
        return;
      }
      dispatch(addCommand(electedResult));
      dispatch(clearCommands());
      setPrimeCommandList([]);
      setWholeCommandStats({});
    }

    if (myTurnSequence === 3) {
      if (!electedResult) {
        dispatch(addDuplicateCommand());
        dispatch(initializeTurnSequence());
        dispatch(gameTurnIsOver());
        return;
      }

      dispatch(addCommand(electedResult));
      dispatch(clearCommands());
      setPrimeCommandList([]);
      setWholeCommandStats({});
      dispatch(initializeTurnSequence());
      dispatch(gameTurnIsOver());
    }
  }, [myTurnSequence]);

  useEffect(() => {
    if (gameProcess.length === 0) return;
    dispatch(setPiecePosition(gameProcess.slice(-1)[0]));
  }, [gameProcess]);

  return (
    <>
      {myTurnSequence ? (
        primeCommandList.map(([name, count], index) => {
          const length = parseInt((count / highestCount) * 100, 10);
          if (!count) return <Empty key={`PrimeCommandOuterBox${index}`} />;
          return (
            <PrimeCommandOuterBox key={`PrimeCommandOuterBox${index}`}>
              <PrimeCommandContent>{name}</PrimeCommandContent>
              <PrimeCommandChartOuterBox>
                <PrimeCommandChart index={index} length={length} />
              </PrimeCommandChartOuterBox>
            </PrimeCommandOuterBox>
          );
        })
      ) : (
        <NotMyTurn />
      )}
    </>
  );
}

const Empty = styled.div`
  height: 15px;
`;

const PrimeCommandOuterBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 7px;
  align-items: center;
  width: 300px;
  height: 40px;
`;

const PrimeCommandContent = styled.div`
  ${flexCenter}
  width: 40px;
  height: 30px;
  font-size: 30px;
`;

const PrimeCommandChartOuterBox = styled.div`
  height: 20px;
  width: 200px;
`;

const PrimeCommandChart = styled.div`
  height: 15px;
  margin-left: 10px;
  width: ${({ length }) => length}%;
  background-color: ${({ index }) => {
    if (index === 0) return 'red';
    if (index === 1) return 'orange';
    if (index === 2) return 'yellow';
    return 'white';
  }};
`;
