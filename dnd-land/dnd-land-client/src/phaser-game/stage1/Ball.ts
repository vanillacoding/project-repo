import Phaser from "phaser";

export default class Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setCircle(this.width * 0.5);

    const body = this.body as Phaser.Physics.Arcade.Body;

    body.immovable = false;
    body.setAllowGravity(false);
  }
}
