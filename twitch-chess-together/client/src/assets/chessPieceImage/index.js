import whitePawn from './pawn_white.png';
import whiteQueen from './queen_white.png';
import whiteKing from './king_white.png';
import whiteRook from './rook_white.png';
import whiteKnight from './knight_white.png';
import whiteBishop from './bishop_white.png';

import blackPawn from './pawn_black.png';
import blackQueen from './queen_black.png';
import blackKing from './king_black.png';
import blackRook from './rook_black.png';
import blackKnight from './knight_black.png';
import blackBishop from './bishop_black.png';

const chessPieces = {
  pawn: [whitePawn, blackPawn],
  knight: [whiteKnight, blackKnight],
  bishop: [whiteBishop, blackBishop],
  king: [whiteKing, blackKing],
  queen: [whiteQueen, blackQueen],
  rook: [whiteRook, blackRook],
};

export default chessPieces;
