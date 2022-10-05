import Phaser from "phaser";

import { Direction } from "../../constants/direction";

export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.lastDirection = Direction.None;
    this.lastTilePosition = { x: 0, y: 0 };

    // this.targetIndicator = scene.add
    //   .text(0, 0, "x")
    //   .setOrigin(0.5)
    //   .setDepth(1000);

    // this.enableTargetMarker(true);

    this.play("enemy-idle-right");

    this.movementCount = 0;
  }

  setTargetIndicatorColor(color) {
    this.targetIndicator.setColor(color);
  }

  get currentDirection() {
    return this.lastDirection;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (!this.ai) {
      return;
    }

    this.movementCount--;
    
    if (this.movementCount > 0) {
      return;
    }

    const body = this.body;

    const x = body.position.x;
    const y = body.position.y;

    const gx = Math.floor(x / 128) * 128;
    const gy = Math.floor(y / 64) * 64;

    body.position.x = gx;
    body.position.y = gy;

    this.lastTilePosition.x = gx;
    this.lastTilePosition.y = gy;

    const speed = this.ai.speed;

    // const speed = this.ai.speed;
    // const targetPosition = this.ai.targetPosition;

    // this.targetIndicator.setPosition(targetPosition.x, targetPosition.y);
    this.direction = this.ai.pickDirection();
    
    switch (this.direction) {
      case Direction.Left: {
        this.play("enemy-running-back-left", true);
        body.setVelocity(-speed, -speed * 0.5);
        break;
      }
      case Direction.Right: {
        this.play("enemy-running-right", true);
        body.setVelocity(speed, speed * 0.5);
        break;
      }
      case Direction.Up: {
        this.play("enemy-running-back-right", true);
        body.setVelocity(speed, -speed * 0.5);
        break;
      }
      case Direction.Down: {
        this.play("enemy-running-left", true);
        body.setVelocity(-speed, speed * 0.5);
        break;
      }
      case Direction.None: {
        body.setVelocity(0, 0);
      }
      default: {
        break;
      }
    }

    if (this.direction !== Direction.None) {
      this.movementCount = 5;
    }

    this.lastDirection = this.direction;
  }
  
  setAI(ai) {
    this.ai = ai;
  }

  setIdle() {
    switch (this.direction) {
      case Direction.Left: {
        this.play("enemy-idle-back-left", true);
        break;
      }
      case Direction.Right: {
        this.play("enemy-idle-right", true);
        break;
      }
      case Direction.Up: {
        this.play("enemy-idle-back-right", true);
        break;
      }
      case Direction.Down: {
        this.play("enemy-idle-left", true);
        break;
      }
      case Direction.None: {
        this.body.setVelocity(0, 0);
      }
      default: {
        break;
      }
    }
  }

  unSubscribeAI() {
    this.ai = null;
    this.body.setVelocity(0, 0);
  }

  // enableTargetMarker(isEnable) {
  //   this.targetIndicator.setVisible(isEnable);
  // }
}
