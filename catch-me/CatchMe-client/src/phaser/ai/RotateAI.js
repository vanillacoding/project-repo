import Phaser from "phaser";

import { Direction } from "../../constants/direction";
import { 
  determineDirectionByTarget,
  getOppositeDirection,
} from "../../utils/directions";

export default class RotateAI {
  constructor(target, enemy, board) {
    this.target = target;
    this.enemy = enemy;
    this.board = board;
    this.speed = 80;
    this.lastDirection = Direction.None;
    this.lastDistance = -1;
  }

  getLastDistance() {
    return Phaser.Math.Distance.Between(
      this.target.x, 
      this.target.y, 
      this.enemy.x, 
      this.enemy.y,
    );
  }

  pickDirection() {
    const { x: targetX, y: targetY } = this.target;
    const { x: currentX, y: currentY } = this.enemy;

    const directions = [Direction.Up, Direction.Left, Direction.Down, Direction.Right];

    const distance = Phaser.Math.Distance.Between(
      targetX,
      targetY,
      currentX,
      currentY,
    );

    if (distance < 30) {
      return Direction.None;
    }

    return determineDirectionByTarget({
      targetX,
      targetY,
      currentX,
      currentY,
      directions,
      board: this.board,
    });
  }
}
