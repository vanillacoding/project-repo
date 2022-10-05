import Phaser from "phaser";
import { getUserData } from "../../api";
import { sceneEvents } from "../events/EventsManager";

import createCharacterAnimation from "../animations/Character";
import { SCENE } from "../../constants";
export default class Preloader extends Phaser.Scene {
  private loadingBar!: Phaser.GameObjects.Graphics;
  private progressBar!: Phaser.GameObjects.Graphics;

  constructor() {
    super("preloader");
  }

  preload() {
    this.loadGameImages();
    this.loadCardImages();
    this.loadSoundEffects();
    this.loadBackgroundImages();
  }

  create() {
    createCharacterAnimation(this.anims);

    this.createProgressgbar();
    this.createBackgroundMusic();

    this.loadUserData();
  }

  private async loadUserData() {
    const user = await getUserData();

    if (user) {
      this.registry.set("user", user);

      this.scene.start(SCENE.LOBBY);
      this.scene.run(SCENE.LOBBY_STATUS_BAR, { user });
    }
  }

  private createBackgroundMusic() {
    const music = this.sound.add("background-music", {
      loop: true,
      volume: 0.3,
    });

    music.play();

    sceneEvents.on("toggleBackgroundMusic", () => {
      music.isPlaying ? music.pause() : music.resume();
    });
  }

  private createProgressgbar() {
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0x023047, 1);
    this.loadingBar.fillRect(200, 270, 400, 50);
    this.progressBar = this.add.graphics();

    this.load.on(
      "progress",
      (value: number) => {
        this.progressBar.clear();
        this.progressBar.fillStyle(0xfca311, 1);
        this.progressBar.fillRect(210, 280, 380 * value, 30);
      },
      this,
    );

    this.load.on(
      "complete",
      () => {
        this.progressBar.destroy();
        this.loadingBar.destroy();
      },
      this,
    );
  }

  private loadBackgroundImages() {
    this.load.image("background1", "/background/desk1.png");
    this.load.image("background2", "/background/desk2.png");
    this.load.image("background3", "/background/desk3.png");

    this.load.image("lobby", "/background/lobby.png");
    this.load.image("stage", "/background/stage.png");
  }

  private loadGameImages() {
    this.load.image("goBack", "/game/goBackButton.png");
    this.load.image("star", "/game/star.png");
    this.load.image("star-empty", "/game/star-empty.png");

    this.load.image("lock", "/game/lock.png");
    this.load.image("help", "/game/help.png");
    this.load.image("logout", "/game/logout.png");
    this.load.image("sound-on", "/game/sound-on.png");
    this.load.image("sound-off", "/game/sound-off.png");
    this.load.image("user-info", "/game/user-info.png");

    this.load.image("board", "/game/board.png");
    this.load.image("heart", "/game/heart.png");
    this.load.image("point", "/game/point.png");
    this.load.image("cannon", "/game/cannon.png");
    this.load.image("enemy-blue", "/game/enemy-blue.png");
    this.load.image("enemy-green", "/game/enemy-green.png");
    this.load.image("enemy-yellow", "/game/enemy-yellow.png");

    this.load.image("coin-image", "/game/coin-image.png");
    this.load.atlas("coin", "/game/coin.png", "/game/coin.json");

    this.load.image("cursor-image", "/game/cursor.png");
    this.load.atlas(
      "cursor",
      "/game/cursor-anim.png",
      "/game/cursor-anim.json",
    );

    this.load.image("stone1", "/character/stone1.png");
    this.load.image("stone2", "/character/stone2.png");
    this.load.image("stone3", "/character/stone3.png");
    this.load.image("stone4", "/character/stone4.png");
    this.load.image("stone8", "/character/stone8.png");

    this.load.atlas(
      "character-run",
      "/character/run.png",
      "/character/run.json",
    );
    this.load.atlas(
      "character-idle",
      "/character/stand.png",
      "/character/stand.json",
    );
  }

  private loadCardImages() {
    this.load.image("card", "/card/card.png");

    this.load.image("kiwi-1", "/card/kiwi1.png");
    this.load.image("kiwi-2", "/card/kiwi2.png");
    this.load.image("kiwi-3", "/card/kiwi3.png");
    this.load.image("orange-1", "/card/orange1.png");
    this.load.image("orange-2", "/card/orange2.png");
    this.load.image("orange-3", "/card/orange3.png");
    this.load.image("strawberry-1", "/card/strawberry1.png");
    this.load.image("strawberry-2", "/card/strawberry2.png");
    this.load.image("strawberry-3", "/card/strawberry3.png");

    this.load.image("music-blue", "/card/music-blue.png");
    this.load.image("music-green", "/card/music-green.png");
    this.load.image("music-yellow", "/card/music-yellow.png");
    this.load.image("trophy-blue", "/card/trophy-blue.png");
    this.load.image("trophy-green", "/card/trophy-green.png");
    this.load.image("trophy-yellow", "/card/trophy-yellow.png");
    this.load.image("check-blue", "/card/check-blue.png");
    this.load.image("check-green", "/card/check-green.png");
    this.load.image("check-yellow", "/card/check-yellow.png");
    this.load.image("star-blue", "/card/star-blue.png");
    this.load.image("star-green", "/card/star-green.png");
    this.load.image("star-yellow", "/card/star-yellow.png");
  }

  private loadSoundEffects() {
    this.load.audio("pop", "/sound/pop.wav");
    this.load.audio("drag", "/sound/jump.wav");
    this.load.audio("beep", "/sound/beep.wav");
    this.load.audio("coin", "/sound/coin.wav");
    this.load.audio("click", "/sound/click.wav");
    this.load.audio("correct", "/sound/correct.mp3");

    this.load.audio("background-music", "/sound/background-music.mp3");
  }
}
