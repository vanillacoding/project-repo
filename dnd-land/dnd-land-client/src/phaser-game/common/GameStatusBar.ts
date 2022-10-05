import Phaser from "phaser";
import GoBackButton from "./GoBackButton";
import GameGuideButton from "./GameGuideButton";

import { SCENE, COLOR } from "../../constants";
import { sceneEvents } from "../events/EventsManager";
import { IStatusBarData } from "./../../types/game";

export default class GameStatusBar extends Phaser.Scene {
  private stars!: Phaser.GameObjects.Group;
  private targetScore!: number;
  private gameName!: string;

  constructor() {
    super(SCENE.STATUS_BAR);
  }

  create(data: IStatusBarData) {
    const { totalScore, game } = data;

    this.createStatusBarElements(data);

    this.gameName = game;
    this.targetScore = totalScore;

    sceneEvents.on("get-point", this.increaseOnePoint, this);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off("get-point", this.increaseOnePoint);
    });
  }

  private increaseOnePoint(point: number) {
    if (this.targetScore === point) {
      this.scene.run(SCENE.GAMEOVER, { game: this.gameName });
    }

    this.stars.children.each((element, index) => {
      const star = element as Phaser.GameObjects.Image;

      if (index < point) {
        star.setTexture("star");
      } else {
        star.setTexture("star-empty");
      }

      if (index + 1 === point) {
        const originalX = star.x;
        const originalY = star.y;
        const originalWidth = star.displayWidth;
        const originalHeight = star.displayHeight;

        star.displayWidth = 200;
        star.displayHeight = 200;
        star.x = 400 + star.x;
        star.y = 200 + star.y;

        this.tweens.add({
          targets: star,
          duration: 600,
          x: originalX,
          y: originalY,
          displayWidth: originalWidth,
          displayHeight: originalHeight,
        });
      }
    });
  }

  private createStatusBarElements(data: IStatusBarData) {
    const { totalScore, game, scene } = data;
    const color = this.getStatusBarColor(game);

    this.add.rectangle(0, 0, scene.scale.width, 60, color, 0.9).setOrigin(0, 0);

    this.stars = this.add.group({ classType: Phaser.GameObjects.Image });

    this.stars.createMultiple({
      key: "star-empty",
      quantity: totalScore,
      setXY: {
        x: 100,
        y: 30,
        stepX: 35,
      },
    });

    new GoBackButton(this, 50, 30, "goBack", game);
    new GameGuideButton(this, 750, 30, "help", game);
  }

  private getStatusBarColor(game: string) {
    const color =
      game === SCENE.MATCHING_GAME
        ? COLOR.DARKGRAY
        : game === SCENE.PUZZLE_GAME
        ? COLOR.BROWN
        : game === SCENE.SHOOTING_GAME
        ? COLOR.DARKPINK
        : COLOR.WHITE;

    return color;
  }
}
