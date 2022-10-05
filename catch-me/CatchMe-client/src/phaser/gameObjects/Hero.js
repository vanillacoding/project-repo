import Phaser from "phaser";

import { Direction } from "../../constants/direction";
import { TileSize } from "../../constants/tile";
import { isEnableDirection } from "../../utils/directions";

export default class Hero extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    
    this.lastDirection = Direction.None;

    this.speed = 165;

    this.textureName = texture;
    
    this.play(`${this.textureName}-idle-right`);
  }

  handleMovement(cursors, boardLayer) {
    if (!cursors) {
      return;
    }
    
    const body = this.body;

    body.setVelocity(0, 0);
    
    this.keysDown = this.getKeysDownState(cursors);
        
    if (this.keysDown.left) {
      if (isEnableDirection(boardLayer, this.x - TileSize.x, this.y - TileSize.y)) {
        this.play(`${this.textureName}-running-back-left`, true);
        body.setVelocity(-this.speed, -this.speed * 0.5);

        this.lastDirection = Direction.Left;
      }
    } else if (this.keysDown.right) {
      if (isEnableDirection(boardLayer, this.x + TileSize.x, this.y + TileSize.y)) {
        this.play(`${this.textureName}-running-right`, true);
        body.setVelocity(this.speed, this.speed * 0.5);

        this.lastDirection = Direction.Right;
      }
    } else if (this.keysDown.up) {
      if (isEnableDirection(boardLayer, this.x + TileSize.x, this.y - TileSize.y)) {
        this.play(`${this.textureName}-running-back-right`, true);
        body.setVelocity(this.speed, -this.speed * 0.5);

        this.lastDirection = Direction.Up;
      }
    } else if (this.keysDown.down) {
      if (isEnableDirection(boardLayer, this.x - TileSize.x, this.y + TileSize.y)) {
        this.play(`${this.textureName}-running-left`, true);
        body.setVelocity(-this.speed, this.speed * 0.5);

        this.lastDirection = Direction.Down;
      }
    } 
  }

  getKeysDownState(cursors) {
    return {
      left: cursors.left?.isDown,
      right: cursors.right?.isDown,
      up: cursors.up?.isDown,
      down: cursors.down?.isDown
    };
  }

  setWin() {
    this.body.setVelocity(0, 0);

    this.setIdle();

    this.resultMessasge = this.scene.add.image(this.x - 7, this.y - 50, "win").setDepth(7);
  }

  setLose() {
    this.body.setVelocity(0, 0);

    this.resultMessasge = this.scene.add.image(this.x - 7, this.y - 50, "lose").setDepth(7);
  }

  setDie() {
    this.body.setVelocity(0, 0)

    if (this.lastDirection === Direction.Up || this.lastDirection === Direction.Right) {
      this.play(`${this.textureName}-die-right`, true);

      return;
    }
    
    this.play(`${this.textureName}-die-left`, true);
  }

  setIdle() {
    switch (this.lastDirection) {
      case Direction.Left: {
        this.play(`${this.textureName}-idle-back-left`);
        break;
      }
      case Direction.Right: {
        this.play(`${this.textureName}-idle-right`);
        break;
      }
      case Direction.Up: {
        this.play(`${this.textureName}-idle-back-right`);
        break;
      }
      case Direction.Down: {
        this.play(`${this.textureName}-idle-left`);
        break;
      }
      default:
        break;
    }
  }

  canGetCoin(coin) {
    const heroPosition = this.body.position

    const coinPosition = coin.body.position.clone();

    coinPosition.x -= coin.body.offset.x
    coinPosition.y -= coin.body.offset.y

    return Phaser.Math.Distance.BetweenPointsSquared(heroPosition, coinPosition) <= 5000;
  }
  
  getCoin() {
    const coinMessage = this.scene.add.image(this.x, this.y - 50, "add-coin").setDepth(7);

    this.scene.time.addEvent({
      callback: () => {
        coinMessage.destroy();
      },
      delay: 200,
    });
  }
}
