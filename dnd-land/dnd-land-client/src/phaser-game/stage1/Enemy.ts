import Phaser from "phaser";
import { COLOR } from "../../constants";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  private _value: number;
  private text: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number, value: number) {
    const enemies = ["enemy-yellow", "enemy-green", "enemy-blue"];
    const enemyIndex = Math.floor(Math.random() * enemies.length);

    super(scene, x, y, enemies[enemyIndex]);

    this.setDisplaySize(
      (value * this.width) / 30 + 50,
      (value * this.height) / 30 + 50,
    );

    this._value = value;

    this.text = this.scene.add
      .text(this.x, this.y, String(value))
      .setFont(`${value * 2 + 15}px`)
      .setColor(COLOR.WHITE_HEX)
      .setOrigin(0.5, 0)
      .setDepth(5);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setCircle(this.width * 0.5);
  }

  getDamage() {
    this.destroy();
    this.text.destroy();
  }

  update() {
    this.text.x = this.x;
    this.text.y = this.y;
  }

  get value() {
    return this._value;
  }
}
