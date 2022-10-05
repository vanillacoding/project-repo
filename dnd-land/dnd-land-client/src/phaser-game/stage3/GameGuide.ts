import Phaser from "phaser";

import Grid from "../common/Grid";
import { ANIMATION, SCENE } from "../../constants";

export default class Stage3GameGuide extends Phaser.Scene {
  private grid!: Grid;
  private line!: Phaser.GameObjects.Line;
  private cursor!: Phaser.GameObjects.Sprite;

  constructor() {
    super(SCENE.MATCHING_GAME_GUIDE);
  }

  init() {
    this.cameras.main.setBackgroundColor("rgba(0, 0, 0, 0.8)");

    this.input.on("pointerdown", this.handlePointerUp, this);
  }

  create() {
    this.createExampleCards();
    this.createClickGuide();
  }

  private createExampleCards() {
    this.grid = new Grid({
      scene: this,
      rows: 1,
      columns: 2,
      xStart: 230,
      yStart: 300,
      xOffset: 340,
      yOffset: 120,
      game: "matching-game",
      cardTypes: [
        {
          name: "star",
          image: "star-green",
          value: "green",
        },
        {
          name: "star",
          image: "star-blue",
          value: "blue",
        },
      ],
      onDragEnd: () => {
        return null;
      },
    });

    this.grid.addCards(0);
    this.grid.addDraggablePoint(0);
  }

  private createClickGuide() {
    this.cursor = this.add
      .sprite(325, 330, "cursor-image")
      .play(ANIMATION.CURSOR)
      .setDepth(5);
    this.line = this.add
      .line(400, 300, 0, 0, 200, 0, 0xef524f)
      .setLineWidth(2)
      .setAlpha(0);

    this.tweens.add({
      targets: this.cursor,
      duration: 1000,
      x: this.cursor.x + 200,
      repeat: -1,
      hold: 500,
      delay: 300,
    });

    this.tweens.add({
      targets: this.line,
      duration: 1000,
      repeat: -1,
      hold: 500,
      delay: 300,
      alpha: 1,
    });
  }

  private handlePointerUp() {
    this.scene.stop(SCENE.MATCHING_GAME_GUIDE);
  }
}
