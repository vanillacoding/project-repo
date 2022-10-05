import Phaser from "phaser";

import Grid from "../common/Grid";
import GameBoard from "./GameBoard";
import hitArea from "./puzzleHitArea";
import DraggableCard from "./DraggableCard";

import { SCENE, GAME, SOUND } from "../../constants";
import { updateFinalStageRecord } from "../../api";
import { sceneEvents } from "../events/EventsManager";
import { puzzleGameCardTypes } from "./puzzleGameCardTypes";

enum GameState {
  Playing,
  GameOver,
}
export default class PuzzleGame extends Phaser.Scene {
  private state = GameState.Playing;
  private grid!: Grid;

  constructor() {
    super(SCENE.PUZZLE_GAME);
  }

  init() {
    this.cameras.main.fadeIn(800);

    this.state = GameState.Playing;
    this.add.image(0, 0, "background1").setOrigin(0, 0);
  }

  create() {
    this.scene.run(SCENE.STATUS_BAR, {
      scene: this,
      game: SCENE.PUZZLE_GAME,
      totalScore: GAME.PUZZLE_GAME_TOTAL_TARGET_SCORE,
    });

    this.createGameboard();
    this.grid.addDraggableCards(0);
  }

  private createGameboard() {
    new GameBoard(this, 30, 60);

    this.grid = new Grid({
      scene: this,
      rows: 5,
      columns: 1,
      xStart: 670,
      yStart: 460,
      xOffset: 650,
      yOffset: 110,
      game: "puzzle-game",
      cardTypes: puzzleGameCardTypes,
      onDragEnd: this.checkCorrection,
    });
  }

  private checkCorrection<P, D extends DraggableCard>(
    this: Grid,
    pointer: P,
    gameObject: D,
  ) {
    if ((this.scene as PuzzleGame).state === GameState.GameOver) {
      return;
    }

    let shouldTurnOnBeep = true;

    for (let i = 0; i < hitArea.length; i++) {
      const area = hitArea[i];
      const { fruit, value } = gameObject;

      const isCorrect = area.name === fruit + "-" + value;

      const dx = Math.abs(area.pointX - gameObject.x);
      const dy = Math.abs(area.pointY - gameObject.y);

      if (dx < 60 && dy < 60 && isCorrect) {
        gameObject.depth = 0;
        gameObject.disableInteractive();

        gameObject.originalX = area.pointX;
        gameObject.originalY = area.pointY;

        const order = this.cards.findIndex(
          (card) => card.name === gameObject.name,
        );

        this.removeCompletedCard(order);
        this.moveCardsDown(order);

        this.completedCards++;
        sceneEvents.emit("get-point", this.completedCards);

        shouldTurnOnBeep = false;
        (this.scene as PuzzleGame).sound.play(SOUND.CORRECT, { volume: 0.3 });
      }
    }

    if (shouldTurnOnBeep) {
      (this.scene as PuzzleGame).sound.play(SOUND.BEEP, { volume: 0.3 });
    }

    if (this.completedCards === GAME.PUZZLE_GAME_TOTAL_TARGET_SCORE) {
      (this.scene as PuzzleGame).state = GameState.GameOver;

      sceneEvents.emit("gameover");
      updateFinalStageRecord(SCENE.PUZZLE_GAME);
    }

    gameObject.x = gameObject.originalX;
    gameObject.y = gameObject.originalY;
  }
}
