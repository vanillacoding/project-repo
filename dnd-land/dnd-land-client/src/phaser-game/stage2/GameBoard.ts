import Phaser from "phaser";

export default class GameBoard extends Phaser.GameObjects.Container {
  private gameBoard: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.gameBoard = scene.add.sprite(0, 0, "board").setOrigin(0, 0);
    this.add(this.gameBoard);

    scene.add.existing(this);
  }
}
