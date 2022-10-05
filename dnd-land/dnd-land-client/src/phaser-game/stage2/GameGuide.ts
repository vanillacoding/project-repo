import Phaser from "phaser";

import Grid from "../common/Grid";
import { ANIMATION, SCENE } from "../../constants";

export default class Stage2GameGuide extends Phaser.Scene {
  private grid!: Grid;
  private cursor!: Phaser.GameObjects.Sprite;

  constructor() {
    super(SCENE.PUZZLE_GAME_GUIDE);
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
      columns: 1,
      xStart: 670,
      yStart: 300,
      xOffset: 0,
      yOffset: 0,
      game: "puzzle-game",
      cardTypes: [
        {
          name: "orange2",
          image: "orange-2",
          value: 2,
        },
      ],
      onDragEnd: () => {
        return null;
      },
    });

    this.grid.addDraggableCards(0);
  }

  private createClickGuide() {
    this.cursor = this.add
      .sprite(700, 350, "cursor-image")
      .play(ANIMATION.CURSOR)
      .setDepth(5);

    const card = this.grid.cards[0];

    this.tweens.add({
      targets: this.cursor,
      duration: 1000,
      x: 377,
      y: 417,
      repeat: -1,
      hold: 500,
      delay: 500,
      repeatDelay: 500,
    });

    this.tweens.add({
      targets: card,
      duration: 1000,
      x: 347,
      y: 367,
      repeat: -1,
      hold: 500,
      delay: 500,
      repeatDelay: 500,
    });
  }

  private handlePointerUp() {
    this.scene.stop(SCENE.PUZZLE_GAME_GUIDE);
  }
}
