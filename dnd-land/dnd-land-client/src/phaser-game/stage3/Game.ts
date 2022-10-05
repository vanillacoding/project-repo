import Phaser from "phaser";
import Grid from "../common/Grid";
import DraggablePoint from "./DraggablePoint";

import { GAME, SCENE, SOUND } from "../../constants";
import { sceneEvents } from "../events/EventsManager";
import { updateFinalStageRecord } from "../../api";
import { matchingGameCardTypes } from "./matchingGameCardTypes";

enum GameState {
  Playing,
  GameOver,
}

export default class MatchingGame extends Phaser.Scene {
  private grid!: Grid;
  private drawing!: boolean;

  private line!: Phaser.Geom.Line;
  private state = GameState.Playing;
  private graphics!: Phaser.GameObjects.Graphics;

  private completedLines: Phaser.Geom.Line[] = [];
  private _points: Phaser.GameObjects.Sprite[] = [];

  constructor() {
    super(SCENE.MATCHING_GAME);
  }

  init() {
    this.cameras.main.fadeIn(800);

    this.state = GameState.Playing;

    this.drawing = false;
    this.completedLines = [];

    this.add.tileSprite(0, 0, 800, 600, "background3").setOrigin(0);
    this.graphics = this.add.graphics({
      lineStyle: { width: 2, color: 0xef524f },
    });
  }

  create() {
    this.createStatusBar();
    this.createGameboard();

    this.grid.addCards(0);
    this.grid.addDraggablePoint(0);
  }

  drawLine(this: MatchingGame, point: Phaser.GameObjects.Sprite) {
    if (this.state === GameState.GameOver) {
      return;
    }

    this.drawing = true;

    this.line = new Phaser.Geom.Line(
      point.parentContainer.x + point.data.get("originalX"),
      point.parentContainer.y + point.data.get("originalY"),
      point.x,
      point.y,
    );

    this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      this.line.x2 = pointer.x;
      this.line.y2 = pointer.y;
    });
  }

  checkCorrection(
    this: Grid,
    pointer: Phaser.Input.Pointer,
    point: Phaser.GameObjects.Sprite,
  ) {
    const { name, value } = point.parentContainer as DraggablePoint;
    const scene = this.scene as MatchingGame;

    let shouldTurnOnBeep = true;

    for (let i = 0; i < scene.points.length; i++) {
      const targetCard = scene.points[i].parentContainer;
      const {
        x: pointX,
        y: pointY,
        name: targetName,
        value: targetValue,
      } = targetCard as DraggablePoint;

      const dx = Math.abs(pointX - 70 - pointer.upX);
      const dy = Math.abs(pointY - pointer.upY);
      const distance = Math.sqrt(dx * dx + dy * dy);

      const isCorrect =
        (value === "green" &&
          targetValue === "yellow" &&
          name === targetName) ||
        (value === "yellow" && targetValue === "blue" && name === targetName);

      if (distance < 50 && isCorrect) {
        const completedLine = new Phaser.Geom.Line(
          point.parentContainer.x + 70,
          point.parentContainer.y,
          pointX - 70,
          pointY,
        );

        point.disableInteractive();

        scene.completedLines.push(completedLine);
        sceneEvents.emit("get-point", scene.completedLines.length);

        shouldTurnOnBeep = false;
        scene.sound.play(SOUND.CORRECT, { volume: 0.3 });
      }
    }

    if (shouldTurnOnBeep) {
      scene.sound.play(SOUND.BEEP, { volume: 0.3 });
    }

    point.x = point.data.get("originalX");
    point.y = point.data.get("originalY");

    scene.drawing = false;

    if (scene.completedLines.length === GAME.MATCHING_GAME_TOTAL_TARGET_SCORE) {
      scene.state = GameState.GameOver;

      sceneEvents.emit("gameover");
      updateFinalStageRecord(SCENE.MATCHING_GAME);
    }
  }

  private createStatusBar() {
    this.scene.run(SCENE.STATUS_BAR, {
      scene: this,
      game: SCENE.MATCHING_GAME,
      totalScore: GAME.MATCHING_GAME_TOTAL_TARGET_SCORE,
    });
  }

  private createGameboard() {
    this.grid = new Grid({
      scene: this,
      rows: 4,
      columns: 3,
      xStart: 150,
      yStart: 500,
      xOffset: 260,
      yOffset: 120,
      game: "matching-game",
      cardTypes: matchingGameCardTypes,
      onDragEnd: this.checkCorrection,
    });
  }

  update() {
    this.graphics.clear();

    for (let i = 0; i < this.completedLines.length; i++) {
      const line = this.completedLines[i];
      this.graphics.strokeLineShape(line);
    }

    if (this.drawing) {
      this.graphics.strokeLineShape(this.line);
    }
  }

  get points(): Phaser.GameObjects.Sprite[] {
    return this._points;
  }

  set addNewPoint(newPoint: Phaser.GameObjects.Sprite) {
    if (this._points.length === 12) {
      this._points = [];
    }

    this._points.push(newPoint);
  }
}
