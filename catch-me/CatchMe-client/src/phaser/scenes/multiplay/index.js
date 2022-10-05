import Phaser from "phaser";

import Preloader from "./PreloadScene";
import Stage from "./Stage";

const config = {
  type: Phaser.WEBGL,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game-container",
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: "#C2F6FF",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Preloader, Stage],
};

export default config;
