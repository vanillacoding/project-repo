import Phaser from "phaser";

import {
  BACKGOURND,
  CHARACTER,
  CHARACTER_DEAD,
  CHARACTER_DIE_ANIMATION,
  CHARACTER_THROW_JUMP,
  STUN,
  SHURIKEN_SPIN,
  PLATFORM,
  ENEMY_BIRD1,
  ENEMY_BIRD2,
  ENEMY_BIRD1_DIE,
  ENEMY_BIRD2_DIE
} from "../constants/textureNames";
import { PRE_LOAD_SCENE, PLAY_SCENE } from "../constants/scenes";

class PreloadScene extends Phaser.Scene {
  constructor(config) {
    super(PRE_LOAD_SCENE);

    this.worldCenter = { x: config.width / 2, y: config.height / 2 };
  };

  preload() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    const progressText = this.make.text({
      x: this.worldCenter.x,
      y: this.worldCenter.y,
      text: "0%",
      style: {
        font: "30px monospace",
        fill: "#ffffff",
        fontSize: "bold",
      },
    }).setOrigin(0.5);

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRoundedRect(this.worldCenter.x - 160, this.worldCenter.y - 25, 320, 50, 5);

    this.load.on("progress", (value) => {
      progressText.setText(Math.round(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRoundedRect(this.worldCenter.x + 10 - 160, this.worldCenter.y + 10 - 25, 300 * value, 30, 5);
    });

    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      progressText.destroy();
    });

    this.load.atlas(STUN, "assets/images/Game/stun_sprite.png", "assets/atlasJson/stun_sprite.json");
    this.load.atlas(CHARACTER_DIE_ANIMATION, "assets/images/Game/ninja6_dying.png", "assets/atlasJson/ninja6_dying.json");
    this.load.atlas(CHARACTER_THROW_JUMP, "assets/images/Game/ninja6_throwJump.png", "assets/atlasJson/ninja6_throwJump.json");

    this.load.image(BACKGOURND, "assets/images/Game/ForestBG.png");

    this.load.image(CHARACTER, "assets/images/Game/ninja6_hanging_fit.png");
    this.load.image(CHARACTER_DEAD, "assets/images/Game/ninja6_dead.png");

    this.load.image(SHURIKEN_SPIN, "assets/images/Game/shuriken_spin.png");

    this.load.image(PLATFORM, "assets/images/Game/pad_small.png");

    this.load.spritesheet(ENEMY_BIRD1, "assets/images/Game/red_bird.png", { frameWidth: 663, frameHeight: 637 });
    this.load.spritesheet(ENEMY_BIRD1_DIE, "assets/images/Game/red_bird_die.png", { frameWidth: 663, frameHeight: 637 });
    this.load.spritesheet(ENEMY_BIRD2, "assets/images/Game/yellow_bird.png", { frameWidth: 625, frameHeight: 621 });
    this.load.spritesheet(ENEMY_BIRD2_DIE, "assets/images/Game/yellow_bird_die.png", { frameWidth: 625, frameHeight: 621 });

    this.load.audio("bgm", "assets/sounds/kitunneWood.mp3");
  };

  create() {
    this.matter.world.update60Hz();
    this.scene.start(PLAY_SCENE);
  };
}

export default PreloadScene;
