import Phaser from "phaser";

export default class Character extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, texture, options) {
    super(scene.matter.world, x, y, texture, 0, options);
    scene.add.existing(this);

    this.setOrigin(0.5);
    this.setScale(0.3);
    this.setFriction(1, 0.01, Infinity);

    this.startX = x;
    this.startY = y;
  };

  spinCharacterOneTime() {
    const duration = 300;

    this.tweenCounter = this.scene.tweens.addCounter({
      from: 3,
      to: -3,
      duration: duration,
      ease: 0,
      repeat: 1,
      yoyo: true,
      onUpdate: (tween, target) => {
        this.setRotation(target.value - 3);
      },
    });

    setTimeout(() => {
      this && this.removeCounter();
    }, duration + 10);
  }

  removeCounter() {
    if (this.tweenCounter) {
      this.scene.tweens.remove(this.tweenCounter);
      delete this.tweenCounter;
      this.setRotation(0);
    }
  }
}
