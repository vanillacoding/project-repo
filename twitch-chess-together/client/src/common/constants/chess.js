export const EMPTY = 0;
export const CLICKED = 1;
export const CAN_MOVE = 2;
export const CAN_ATTACK = 3;

export const INITIAL_SELECTED_PIECE_POSITION = { x: null, y: null };

export const INITIAL_CHESS_GAME_DATA = [
  [
    { type: 'rook', team: 0 },
    { type: 'knight', team: 0 },
    { type: 'bishop', team: 0 },
    { type: 'queen', team: 0 },
    { type: 'king', team: 0 },
    { type: 'bishop', team: 0 },
    { type: 'knight', team: 0 },
    { type: 'rook', team: 0 },
  ],
  [
    { type: 'pawn', team: 0 },
    { type: 'pawn', team: 0 },
    { type: 'pawn', team: 0 },
    { type: 'pawn', team: 0 },
    { type: 'pawn', team: 0 },
    { type: 'pawn', team: 0 },
    { type: 'pawn', team: 0 },
    { type: 'pawn', team: 0 },
  ],
  [16, 17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30, 31],
  [32, 33, 34, 35, 36, 37, 38, 39],
  [40, 41, 42, 43, 44, 45, 46, 47],
  [
    { type: 'pawn', team: 1 },
    { type: 'pawn', team: 1 },
    { type: 'pawn', team: 1 },
    { type: 'pawn', team: 1 },
    { type: 'pawn', team: 1 },
    { type: 'pawn', team: 1 },
    { type: 'pawn', team: 1 },
    { type: 'pawn', team: 1 },
  ],
  [
    { type: 'rook', team: 1 },
    { type: 'knight', team: 1 },
    { type: 'bishop', team: 1 },
    { type: 'king', team: 1 },
    { type: 'queen', team: 1 },
    { type: 'bishop', team: 1 },
    { type: 'knight', team: 1 },
    { type: 'rook', team: 1 },
  ],
];

export const POSITION_GUIDE_MATRIX = [
  ['', 0, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''],
  ['1', 0, 0, 0, 0, 0, 0, 0, 0, 0, '1'],
  ['2', 0, 0, 0, 0, 0, 0, 0, 0, 0, '2'],
  ['3', 0, 0, 0, 0, 0, 0, 0, 0, 0, '3'],
  ['4', 0, 0, 0, 0, 0, 0, 0, 0, 0, '4'],
  ['5', 0, 0, 0, 0, 0, 0, 0, 0, 0, '5'],
  ['6', 0, 0, 0, 0, 0, 0, 0, 0, 0, '6'],
  ['7', 0, 0, 0, 0, 0, 0, 0, 0, 0, '7'],
  ['8', 0, 0, 0, 0, 0, 0, 0, 0, 0, '8'],
  ['', 0, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''],
];
