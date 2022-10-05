import Phaser from "phaser";

import { SHURIKEN_SPIN } from "../constants/textureNames";

export default class Shuriken extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, options) {
    super(scene.matter.world, x, y, SHURIKEN_SPIN, 0, options);
    scene.add.existing(this);

    this.setFriction(1, 0.01, Infinity);

    this.startX = x;
    this.startY = y;
  };

  spinShuriken() {
    this.tweenCounter = this.scene.tweens.addCounter({
      from: 0,
      to: 360,
      duration: 500,
      ease: 0,
      repeat: -1,
      yoyo: false,
      onUpdate: (tween, target) => {
        this.setRotation(target.value);
      },
    });
  }

  removeCounter() {
    this.scene.tweens.remove(this.tweenCounter);
  }
}
