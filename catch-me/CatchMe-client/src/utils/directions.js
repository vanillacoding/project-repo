import { Direction } from "../constants/direction";
import { TileSize } from "../constants/tile";

export const getOrderedDirections = (filter) => {
  const directions = [Direction.Up, Direction.Left, Direction.Down, Direction.Right];

  if (!filter) {
    return directions;
  }

  return directions.filter(filter);
};

export const getSideDirection = (direction) => {
  switch (direction) {
    case Direction.Left:
      return Direction.Down;
    case Direction.Right:
      return Direction.Up;
    case Direction.Up:
      return Direction.Right;
    case Direction.Down:
      return Direction.Right;
    default:
      break;
  }
};

export const getOppositeDirection = (direction) => {
  switch (direction) {
    case Direction.Left:
      return Direction.Right;
    case Direction.Right:
      return Direction.Left;
    case Direction.Up:
      return Direction.Down;
    case Direction.Down:
      return Direction.Up;
    default:
      break;
  }
};

export const getPositionByDirection = (x, y, direction) => {
  switch (direction) {
    case Direction.Up: {
      return { x: x + TileSize.x, y: y - TileSize.y };
    }
    case Direction.Down: {
      return { x: x - TileSize.x, y: y + TileSize.y };
    }
    case Direction.Left: {
      return { x: x - TileSize.x, y: y - TileSize.y };
    }
    case Direction.Right: {
      return { x: x + TileSize.x, y: y - TileSize.y };
    }
    default: {
      break;
    }
  }
};

export const determineDirectionByTarget = ({
  targetX, 
  targetY, 
  currentX, 
  currentY, 
  directions, 
  board, 
  oppositeDirection,
}) => {
  let lastClosedDirection = Direction.None;
  let lastClosedDistance = -1;
  
  for (const direction of directions) {
    const { x: positionX, y: positionY } = getPositionByDirection(currentX, currentY, direction);
    
    if (!board.getTileAtWorldXY(positionX + 12, positionY + 60)) {
      continue;
    }

    const distance = Phaser.Math.Distance.Between(
      positionX,
      positionY,
      targetX,
      targetY
    );
    
    if (lastClosedDirection === Direction.None || distance < lastClosedDistance) {
      lastClosedDirection = direction;
      lastClosedDistance = distance;
    }
  }

  return lastClosedDirection !== Direction.None ? lastClosedDirection : oppositeDirection;
};

export const isEnableDirection = (board, x, y) => {
  return board.getTileAtWorldXY(x + 12, y + 60);
};
