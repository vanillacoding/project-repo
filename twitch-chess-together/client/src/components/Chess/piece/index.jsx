import React from 'react';
import styled from 'styled-components';

import chessPieces from '../../../assets/chessPieceImage';
import { fullWidthAndHeight } from '../../styles/mixin';

export default function Piece({
  type,
  team,
  gamePhase,
  gameTurn,
  boardStatus,
}) {
  return (
    <ChessPieceImageWrapper
      boardStatus={boardStatus}
      gameTurn={gameTurn}
      team={team}
      gamePhase={gamePhase}
    >
      {type ? (
        <ChessPieceImage alt="chessPiece" src={chessPieces[type][team]} />
      ) : null}
    </ChessPieceImageWrapper>
  );
}

const ChessPieceImageWrapper = styled.div`
  width: 76px;
  height: 76px;
  background-color: ${({ boardStatus, gameTurn, team, gamePhase }) => {
    if (boardStatus === 1) {
      return '#FBE698';
    }
    if (boardStatus === 2) {
      return '#6DECE0';
    }
    if (boardStatus === 3) {
      return '#DB1F48';
    }
    if (gameTurn === team && !gamePhase) {
      return '#15B5B0';
    }
  }};
  border: 2px solid #a7a7a7;
`;

const ChessPieceImage = styled.img`
  ${fullWidthAndHeight}
`;
