import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import createClone from 'rfdc';

import Layout from '../Board/Layout';
import ChessPiece from '../piece';

import {
  INITIAL_CHESS_GAME_DATA,
  EMPTY,
  CAN_ATTACK,
  INITIAL_SELECTED_PIECE_POSITION,
} from '../../../common/constants/chess';
import createSetNextBorderStatus from '../../../common/utils/chess';

import { selectGameCurrentTurn } from '../../../features/game/selectors';
import { selectChessPiecePosition } from '../../../features/chess/selectors';
import {
  addLatestCommand,
  addDuplicateCommand,
  setWinner,
} from '../../../features/game/slices';

const BOARD_LENGTH = 8;

const createNewBoardStatusData = () => {
  const initialBoardStatus = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  return initialBoardStatus;
};

const createInitialGameData = () => {
  return [...INITIAL_CHESS_GAME_DATA];
};

const createInitialPosition = () => {
  return { ...INITIAL_SELECTED_PIECE_POSITION };
};

export default function Chess() {
  const dispatch = useDispatch();
  const clone = createClone();

  const piecePosition = useSelector(selectChessPiecePosition);
  const currentTurn = useSelector(selectGameCurrentTurn);

  const [chessGameData, setChessGameData] = useState(createInitialGameData());
  const [selectedPiecePosition, setSelectedPiecePosition] = useState(
    createInitialPosition(),
  );
  const [gamePhase, setGamePhase] = useState(0);
  const [gameTurn, setGameTurn] = useState(1);
  const [boardStatus, setBoardStatus] = useState(createNewBoardStatusData());

  const handleGamePhase = () => {
    setGamePhase(gamePhase === 1 ? 0 : 1);
  };

  const handleGameTurn = () => {
    setGameTurn(gameTurn === 1 ? 0 : 1);
  };

  useEffect(() => {
    const { x: nextX, y: nextY } = piecePosition;

    if (nextX === undefined || nextX === null) return;

    const { x: prevX, y: prevY } = selectedPiecePosition;
    const chessPanelStatus = boardStatus[nextY][nextX];
    const { type } = chessGameData[nextY][nextX];

    if (gamePhase) {
      if (chessPanelStatus === EMPTY) {
        dispatch(addLatestCommand());
        return;
      }
      console.log('현재턴', gameTurn);
      if (chessPanelStatus === CAN_ATTACK) {
        if (chessGameData[nextY][nextX].type === 'king') {
          dispatch(setWinner(gameTurn ? 1 : 0));
          setChessGameData(createInitialGameData());
        }
      }

      setChessGameData((prevState) => {
        const nextState = clone(prevState);
        const selectedPiece = prevState[prevY][prevX];

        if (selectedPiece.type === 'pawn') {
          selectedPiece.moved = true;
        }

        nextState[prevY][prevX] = prevY * BOARD_LENGTH + prevX;
        nextState[nextY][nextX] = selectedPiece;

        return nextState;
      });

      setSelectedPiecePosition(createInitialPosition());
      handleGamePhase();
      handleGameTurn();
    }

    if (!type) {
      dispatch(addDuplicateCommand);
    }

    setSelectedPiecePosition(piecePosition);
    handleGamePhase();
  }, [piecePosition]);

  useEffect(() => {
    if (selectedPiecePosition.x === null) return;

    setBoardStatus((prevBoardStatus) => {
      const setNextBorderStatus = createSetNextBorderStatus(
        chessGameData,
        prevBoardStatus,
      );

      const newBoardStatus = setNextBorderStatus(selectedPiecePosition);

      return newBoardStatus;
    });
  }, [selectedPiecePosition, chessGameData]);

  useEffect(() => {
    if (gamePhase === 0) {
      setBoardStatus(createNewBoardStatusData());
    }
  }, [gamePhase]);

  return (
    <Layout>
      {chessGameData.map((rowData, y) =>
        rowData.map((data, x) => {
          const { type, team } = data;
          const index = y * BOARD_LENGTH + x;
          return (
            <ChessPiece
              key={index}
              type={type}
              team={team}
              gamePhase={gamePhase}
              gameTurn={currentTurn}
              boardStatus={boardStatus[y][x]}
            />
          );
        }),
      )}
    </Layout>
  );
}
