import Phaser from "phaser";

import Background from "../objects/Background";

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.parent = this;
    this.worldScale = config.worldScale;
    this.worldWidth = config.width;
    this.worldHeight = config.height;
    this.worldCenter = { x: config.width / 2, y: config.height };

    this.fontSize = 34;
    this.fontOptions = { fontSize: `${this.fontSize}px`, fill: "#FFFFFF" };

    this.backgroundScenes = [];
  }

  create() {
    for (let i = 0; i < 3; i++) {
      const backgroundXPosition = 0 + (this.worldWidth * i);

      this.createBackground(backgroundXPosition);
    }
  }

  createBackground(xPosition) {
    this.background = new Background(this, xPosition, 0, { isStatic: true }).setScale(this.worldScale);

    this.background.moveHorizontally();
    this.background.setIgnoreGravity(true);
    this.background.setCollisionGroup(-1);
    this.background.setDepth(-1);

    this.backgroundScenes.push(this.background);
  }
}

export default BaseScene;
