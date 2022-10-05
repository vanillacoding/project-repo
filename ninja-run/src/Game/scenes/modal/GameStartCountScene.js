import Phaser from "phaser";

import { GAME_START_COUNT_SCENE } from "../../constants/scenes";

export default class GameStartCountScene extends Phaser.Scene {
  constructor(parent, zone, width, height) {
    super(GAME_START_COUNT_SCENE);

    this.parent = parent;
    this.zone = zone;
    this.worldWidth = width;
    this.worldHeigth = height;
    this.worldCenter = { x: width / 2, y: height / 2 };
    this.alert = "Ready?";
    this.count = 4;

    this.chracterPositionInfo = null;
    this.centerText = null;
  }

  create() {
    this.cameras.main.setBackgroundColor("rgba(0, 0, 0, 0.5)");

    this.chracterPositionInfo = this.add.text(50, 50, "<- CHARACTER", {
      fontSize: "50px",
      fontStyle: "bold",
      color: "silver",
      fontFamily: "fontNaruto",
    }).setOrigin(0);

    this.centerText = this.#createCenterText(this.alert);

    this.countingInterval = setInterval(() => {
      this.count--;

      if (this.count <= 0) return;

      this.centerText.destroy();

      this.centerText = this.#createCenterText(this.count);
    }, 1000);
  }

  update() {
    if (this.count === 0) {
      clearInterval(this.countingInterval);
      delete this.countingInterval;

      this.scene.remove();

      this.parent.startGame();
    }
  }

  #createCenterText(textContent) {
    const centerText = this.add.text(this.worldCenter.x, this.worldCenter.y, textContent, {
      fontSize: "50px",
      fontStyle: "bold",
      color: "red",
      fontFamily: "fontNaruto",
    }).setOrigin(0.5);

    return centerText;
  }
}
