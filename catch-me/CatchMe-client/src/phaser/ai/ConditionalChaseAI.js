import Phaser from "phaser";

import { Direction } from "../../constants/direction";

export default class ConditionalChaseAI {
  constructor(hero, enemy, board, normalAI, poweredAI) {
    this.hero = hero;
    this.enemy = enemy;
    this.board = board;
    this.normalAI = normalAI;
    this.poweredAI = poweredAI;

    this.speed = 60;
    this.lastDirection = Direction.None;
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
    
    const targetDistance = Phaser.Math.Distance.Between(
      targetX,
      targetY,
      currentX,
      currentY,
    );

    if (targetDistance < 300) {
      this.speed = 125;

      if (targetDistance < 100) {
        this.speed = 150;
      }

      return this.poweredAI.pickDirection();
    }

    this.speed = 80;

    return this.normalAI.pickDirection();
  }
}
