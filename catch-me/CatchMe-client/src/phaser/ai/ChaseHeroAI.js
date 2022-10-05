import {
  getOrderedDirections,
  getOppositeDirection,
  getSideDirection,
  determineDirectionByTarget,
} from "../../utils/directions";

import { shuffleOrder } from "../../utils/random";

export default class ChaseHeroAI {
  constructor(hero, enemy, board) {
    this.hero = hero;
    this.enemy = enemy;
    this.board = board;
    this.speed = 110;
  }

  get targetPosition() {
    return {
      x: this.hero.x,
      y: this.hero.y,
    };
  }

  pickDirection() {
    const { x: targetX, y: targetY } = this.hero;
    const { x: currentX, y: currentY } = this.enemy;
    
    const sideDirection = getOppositeDirection(this.enemy.currentDirection);
    const directions = getOrderedDirections((direction) => direction !== sideDirection);
    const shuffledDirections = shuffleOrder(directions);

    return determineDirectionByTarget({
      targetX,
      targetY,
      currentX,
      currentY,
      directions: shuffledDirections,
      board: this.board,
      oppositeDirection: sideDirection,
    });
  }
}
