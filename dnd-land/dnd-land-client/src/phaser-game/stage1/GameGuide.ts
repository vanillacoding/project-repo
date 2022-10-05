import Phaser from "phaser";

import Enemy from "./Enemy";
import Cannon from "./Cannon";
import ShotPreview from "./ShotPreview";

export default class Stage1GameGuide extends Phaser.Scene {
  private cursor!: Phaser.GameObjects.Sprite;
  private cannon!: Cannon;
  private shotPreview!: ShotPreview;

  constructor() {
    super("shooting-game-guide");
  }

  init() {
    this.cameras.main.setBackgroundColor("rgba(0, 0, 0, 0.8)");

    this.input.on("pointerdown", this.handlePointerUp, this);
  }

  create() {
    this.createEnemies();

    this.cannon = new Cannon(this, 400, 500, "cannon");
    this.shotPreview = this.cannon.setShotPreview();

    this.createArrow();
    this.createClickGuide();
    this.createShotPreviewAnimation();
  }

  private createEnemies() {
    for (let i = 0; i < 5; i++) {
      const enemy = new Enemy(this, 80 * i + 240, 200, i + 1);
      enemy.setImmovable(true).setGravityY(-30);
    }
  }

  private createClickGuide() {
    this.cursor = this.add.sprite(300, 320, "cursor-image").play("cursor");

    this.tweens.add({
      targets: this.cursor,
      duration: 1800,
      x: this.cursor.x + 230,
      ease: "Linear",
      repeat: -1,
      yoyo: true,
    });
  }

  private createShotPreviewAnimation() {
    const dx = this.cursor.x - this.cannon.x;
    const dy = this.cursor.y - this.cannon.y;

    const vec = new Phaser.Math.Vector2(dx, dy);
    vec.normalize();

    this.shotPreview.showPreview(this.cannon.x, this.cannon.y, vec, 10);

    for (let i = 0; i < this.shotPreview.previews.length; i++) {
      const target = this.shotPreview.previews[i];

      this.tweens.add({
        targets: target,
        duration: 1800,
        ease: "Linear",
        x: target.x + 50 * (i + 1),
        repeat: -1,
        yoyo: true,
      });
    }

    this.cannon.angle -= 30;

    this.tweens.add({
      targets: this.cannon,
      duration: 1800,
      ease: "Linear",
      angle: vec.angle() + 25,
      repeat: -1,
      yoyo: true,
    });
  }

  private createArrow() {
    this.add.line(400, 140, 0, 0, 300, 0, 0xef524f).setLineWidth(5);
    this.add.line(550, 140, 0, 0, 30, 0, 0xef524f).setLineWidth(16, 1);
  }

  private handlePointerUp() {
    this.scene.stop("shooting-game-guide");
  }
}
