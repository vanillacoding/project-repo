import Phaser from "phaser";

import Preloader from "./PreloadScene";
import Stage1 from "./PlayScenes/Stage1";
import Stage2 from "./PlayScenes/Stage2";
import Stage3 from "./PlayScenes/Stage3";

const config = {
  type: Phaser.WEBGL,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game-container",
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: "#60E7F7",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Preloader, Stage1, Stage2, Stage3],
};

export default config;
