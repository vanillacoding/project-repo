import Phaser from "phaser";

import Ball from "./Ball";
import ShotPreview from "./ShotPreview";

export default class Cannon extends Phaser.Physics.Arcade.Sprite {
  private shotPreview!: ShotPreview;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setCircle(this.width * 0.5);

    const body = this.body as Phaser.Physics.Arcade.Body;

    body.immovable = true;
    body.setAllowGravity(false);
  }

  loadBall(): Ball {
    const width = this.scene.scale.width;
    const height = this.scene.scale.height;

    const ball = new Ball(this.scene, width / 2, height - 35, "point");

    return ball;
  }

  shoot(ball: Ball) {
    const pointer = this.scene.input.activePointer;

    const dx = pointer.x - this.scene.scale.width / 2;
    const dy = pointer.y - (this.scene.scale.height - 35);

    const vec = new Phaser.Math.Vector2(dx, dy);
    const speed = 500;

    vec.normalize();

    ball.setVelocity(vec.x * speed, vec.y * speed);

    ball.body.x = ball.x;
    ball.body.y = ball.y;
  }

  setShotPreview() {
    return (this.shotPreview = new ShotPreview(this.scene));
  }

  update() {
    const pointer = this.scene.input.activePointer;

    if (!pointer.leftButtonDown()) {
      return;
    }

    const dx = pointer.x - this.x;
    const dy = pointer.y - this.y;

    const vec = new Phaser.Math.Vector2(dx, dy);
    vec.normalize();

    const rotation = vec.angle();

    this.rotation = rotation + Math.PI / 2;
    this.shotPreview.showPreview(400, 570, vec, 20);
  }

  get getShotPreview(): ShotPreview {
    return this.shotPreview;
  }
}
