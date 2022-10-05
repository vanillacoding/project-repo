import Phaser from "phaser";

import { BACKGOURND } from "../constants/textureNames";

export default class Background extends Phaser.Physics.Matter.Image {
  constructor(scene, x, y, options) {
    super(scene.matter.world, x, y, BACKGOURND, 0, options);
    scene.add.existing(this);

    this.setOrigin(0);
    this.setFriction(1, 0, Infinity);

    this.startX = x;
    this.startY = y;
  };

  moveHorizontally() {
    this.tweenCounter = this.scene.tweens.addCounter({
      from: 0,
      to: -10000,
      duration: 150000,
      ease: 0,
      repeat: 0,
      yoyo: false,
      onUpdate: (tween, target) => {
        const x = this.startX + target.value;
        const dx = x - this.x;
        this.x = x;
        this.setVelocityX(dx);
      },
    });
  }

  removeCounter() {
    this.scene.tweens.remove(this.tweenCounter);
  }
};
