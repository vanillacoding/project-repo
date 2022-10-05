/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
const CLICKED = 1;
const CAN_MOVE = 2;
const CAN_ATTACK = 3;

const createSetNextBorderStatus =
  (chessGameData, prevBoardStatus) => (selectedPiecePosition) => {
    const searchNextPawnPlace = () => {
      if (team) {
        if (y === 0) return;

        if (!chessGameData[y - 1][x].type) {
          newBoardStatus[y - 1][x] = CAN_MOVE;
        }

        if (
          x !== 0 &&
          chessGameData[y - 1][x - 1].type &&
          chessGameData[y - 1][x - 1].team !== team
        ) {
          newBoardStatus[y - 1][x - 1] = CAN_ATTACK;
        }

        if (
          x !== 7 &&
          chessGameData[y - 1][x + 1].type &&
          chessGameData[y - 1][x + 1].team !== team
        ) {
          newBoardStatus[y - 1][x + 1] = CAN_ATTACK;
        }

        if (y === 1 || moved || chessGameData[y - 2][x].type) return;

        newBoardStatus[y - 2][x] = CAN_MOVE;
      } else {
        if (y === 7) return;

        if (!chessGameData[y + 1][x].type) {
          newBoardStatus[y + 1][x] = CAN_MOVE;
        }

        if (
          x !== 0 &&
          chessGameData[y + 1][x - 1].type &&
          chessGameData[y + 1][x - 1].team !== team
        ) {
          newBoardStatus[y + 1][x - 1] = CAN_ATTACK;
        }

        if (
          x !== 7 &&
          chessGameData[y + 1][x + 1].type &&
          chessGameData[y + 1][x + 1].team !== team
        ) {
          newBoardStatus[y + 1][x + 1] = CAN_ATTACK;
        }

        if (y === 6 || moved || chessGameData[y + 2][x].type) return;

        newBoardStatus[y + 2][x] = CAN_MOVE;
      }
    };

    const searchNextRookPlace = () => {
      for (let i = 0; i < 4; i++) {
        switch (i) {
          case 0: {
            for (let posX = x - 1; posX >= 0; posX--) {
              if (!chessGameData[y][posX].type) {
                newBoardStatus[y][posX] = CAN_MOVE;
              } else {
                if (team !== chessGameData[y][posX].team) {
                  newBoardStatus[y][posX] = CAN_ATTACK;
                }
                break;
              }
            }
            break;
          }
          case 1: {
            for (let posX = x + 1; posX <= 7; posX++) {
              if (!chessGameData[y][posX].type) {
                newBoardStatus[y][posX] = CAN_MOVE;
              } else {
                if (team !== chessGameData[y][posX].team) {
                  newBoardStatus[y][posX] = CAN_ATTACK;
                }
                break;
              }
            }
            break;
          }
          case 2: {
            for (let posY = y + 1; posY <= 7; posY++) {
              if (!chessGameData[posY][x].type) {
                newBoardStatus[posY][x] = CAN_MOVE;
              } else {
                if (team !== chessGameData[posY][x].team) {
                  newBoardStatus[posY][x] = CAN_ATTACK;
                }
                break;
              }
            }
            break;
          }
          case 3: {
            for (let posY = y - 1; posY >= 0; posY--) {
              if (!chessGameData[posY][x].type) {
                newBoardStatus[posY][x] = CAN_MOVE;
              } else {
                if (team !== chessGameData[posY][x].team) {
                  newBoardStatus[posY][x] = CAN_ATTACK;
                }

                break;
              }
            }
            break;
          }
          default: {
            break;
          }
        }
      }
    };
    const searchNextKnightPlace = () => {
      for (let i = 0; i < 8; i++) {
        switch (i) {
          case 0: {
            if (y < 6 && x < 7) {
              if (team !== chessGameData[y + 2][x + 1].team)
                newBoardStatus[y + 2][x + 1] = chessGameData[y + 2][x + 1].type
                  ? CAN_ATTACK
                  : CAN_MOVE;
            }
            break;
          }
          case 1: {
            if (y < 7 && x < 6) {
              if (team !== chessGameData[y + 1][x + 2].team)
                newBoardStatus[y + 1][x + 2] = chessGameData[y + 1][x + 2].type
                  ? CAN_ATTACK
                  : CAN_MOVE;
            }
            break;
          }
          case 2: {
            if (y < 7 && x > 0) {
              if (team !== chessGameData[y + 2][x - 1].team)
                newBoardStatus[y + 2][x - 1] = chessGameData[y + 2][x - 1].type
                  ? CAN_ATTACK
                  : CAN_MOVE;
            }
            break;
          }
          case 3: {
            if (y < 6 && x > 1) {
              if (team !== chessGameData[y + 1][x - 2].team)
                newBoardStatus[y + 1][x - 2] = chessGameData[y + 1][x - 2].type
                  ? CAN_ATTACK
                  : CAN_MOVE;
            }
            break;
          }
          case 4: {
            if (y > 0 && x > 1) {
              if (team !== chessGameData[y - 1][x - 2].team)
                newBoardStatus[y - 1][x - 2] = chessGameData[y - 1][x - 2].type
                  ? CAN_ATTACK
                  : CAN_MOVE;
            }
            break;
          }
          case 5: {
            if (y > 1 && x > 0) {
              if (team !== chessGameData[y - 2][x - 1].team)
                newBoardStatus[y - 2][x - 1] = chessGameData[y - 2][x - 1].type
                  ? CAN_ATTACK
                  : CAN_MOVE;
            }
            break;
          }
          case 6: {
            if (y > 1 && x < 7) {
              if (team !== chessGameData[y - 2][x + 1].team)
                newBoardStatus[y - 2][x + 1] = chessGameData[y - 2][x + 1].type
                  ? CAN_ATTACK
                  : CAN_MOVE;
            }
            break;
          }
          case 7: {
            if (y > 0 && x < 6) {
              if (team !== chessGameData[y - 1][x + 2].team)
                newBoardStatus[y - 1][x + 2] = chessGameData[y - 1][x + 2].type
                  ? CAN_ATTACK
                  : CAN_MOVE;
            }
            break;
          }
          default: {
            break;
          }
        }
      }
    };
    const searchNextBishopPlace = () => {
      for (let i = 0; i < 4; i++) {
        switch (i) {
          case 0: {
            for (
              let posX = x + 1, posY = y + 1;
              posX <= 7 && posY <= 7;
              posX++, posY++
            ) {
              if (chessGameData[posY][posX].type) {
                if (team === chessGameData[posY][posX].team) break;
                newBoardStatus[posY][posX] = CAN_ATTACK;
                break;
              } else {
                newBoardStatus[posY][posX] = CAN_MOVE;
              }
            }
            break;
          }
          case 1: {
            for (
              let posX = x - 1, posY = y - 1;
              posX >= 0 && posY >= 0;
              posX--, posY--
            ) {
              if (chessGameData[posY][posX].type) {
                if (team === chessGameData[posY][posX].team) break;
                newBoardStatus[posY][posX] = CAN_ATTACK;
                break;
              } else {
                newBoardStatus[posY][posX] = CAN_MOVE;
              }
            }
            break;
          }
          case 2: {
            for (
              let posX = x + 1, posY = y - 1;
              posX <= 7 && posY >= 0;
              posX++, posY--
            ) {
              if (chessGameData[posY][posX].type) {
                if (team === chessGameData[posY][posX].team) break;
                newBoardStatus[posY][posX] = CAN_ATTACK;
                break;
              } else {
                newBoardStatus[posY][posX] = CAN_MOVE;
              }
            }
            break;
          }
          case 3: {
            for (
              let posX = x - 1, posY = y + 1;
              posX >= 0 && posY <= 7;
              posX--, posY++
            ) {
              if (chessGameData[posY][posX].type) {
                if (team === chessGameData[posY][posX].team) break;
                newBoardStatus[posY][posX] = CAN_ATTACK;
                break;
              } else {
                newBoardStatus[posY][posX] = CAN_MOVE;
              }
            }
            break;
          }
          default: {
            break;
          }
        }
      }
    };
    const searchNextKingPlace = () => {
      for (let i = 0; i < 8; i++) {
        switch (i) {
          case 0: {
            const posX = x + 1;
            const posY = y + 1;
            if (posX > 7 || posY > 7) break;
            if (chessGameData[posY][posX].team === team) break;
            newBoardStatus[posY][posX] = chessGameData[posY][posX].type
              ? CAN_ATTACK
              : CAN_MOVE;
            break;
          }
          case 1: {
            const posX = x;
            const posY = y + 1;
            if (posX > 7 || posY > 7) break;
            if (chessGameData[posY][posX].team === team) break;
            newBoardStatus[posY][posX] = chessGameData[posY][posX].type
              ? CAN_ATTACK
              : CAN_MOVE;
            break;
          }
          case 2: {
            const posX = x + 1;
            const posY = y;
            if (posX > 7 || posY > 7) break;
            if (chessGameData[posY][posX].team === team) break;
            newBoardStatus[posY][posX] = chessGameData[posY][posX].type
              ? CAN_ATTACK
              : CAN_MOVE;
            break;
          }
          case 3: {
            const posX = x - 1;
            const posY = y;
            if (posX < 0 || posY > 7) break;
            if (chessGameData[posY][posX].team === team) break;
            newBoardStatus[posY][posX] = chessGameData[posY][posX].type
              ? CAN_ATTACK
              : CAN_MOVE;
            break;
          }
          case 4: {
            const posX = x - 1;
            const posY = y - 1;
            if (posX < 0 || posY < 0) break;
            if (chessGameData[posY][posX].team === team) break;
            newBoardStatus[posY][posX] = chessGameData[posY][posX].type
              ? CAN_ATTACK
              : CAN_MOVE;
            break;
          }
          case 5: {
            const posX = x;
            const posY = y - 1;
            if (posX < 0 || posY < 0) break;
            if (chessGameData[posY][posX].team === team) break;
            newBoardStatus[posY][posX] = chessGameData[posY][posX].type
              ? CAN_ATTACK
              : CAN_MOVE;
            break;
          }
          case 6: {
            const posX = x + 1;
            const posY = y - 1;
            if (posX > 7 || posY < 0) break;
            if (chessGameData[posY][posX].team === team) break;
            newBoardStatus[posY][posX] = chessGameData[posY][posX].type
              ? CAN_ATTACK
              : CAN_MOVE;
            break;
          }
          case 7: {
            const posX = x - 1;
            const posY = y + 1;
            if (posX < 0 || posY > 7) break;
            if (chessGameData[posY][posX].team === team) break;
            newBoardStatus[posY][posX] = chessGameData[posY][posX].type
              ? CAN_ATTACK
              : CAN_MOVE;
            break;
          }

          default: {
            break;
          }
        }
      }
    };
    const newBoardStatus = [...prevBoardStatus];
    const { x, y } = selectedPiecePosition;
    const selectedPiece = chessGameData[y][x];
    const { type, team, moved } = selectedPiece;

    switch (type) {
      case 'pawn': {
        searchNextPawnPlace();
        break;
      }
      case 'rook': {
        searchNextRookPlace();
        break;
      }
      case 'knight': {
        searchNextKnightPlace();
        break;
      }
      case 'bishop': {
        searchNextBishopPlace();
        break;
      }
      case 'queen': {
        searchNextBishopPlace();
        searchNextRookPlace();
        break;
      }
      case 'king': {
        searchNextKingPlace();
        break;
      }
      default:
        break;
    }

    newBoardStatus[y][x] = CLICKED;

    return newBoardStatus;
  };

export const createPosition = (tempPosition) => {
  const [tempX, tempY] = tempPosition;
  const filterX = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
  };
  return { x: filterX[tempX], y: tempY - 1 };
};

export default createSetNextBorderStatus;
