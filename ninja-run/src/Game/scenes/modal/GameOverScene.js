import Phaser from "phaser";

import Character from "../../objects/Character";
import { GAMEOVER_SCENE } from "../../constants/scenes";
import { CHARACTER_DEAD, STUN } from "../../constants/textureNames";

export default class GameOverScene extends Phaser.Scene {
  constructor(parent, zone, width, height) {
    super(GAMEOVER_SCENE);

    this.parent = parent;
    this.zone = zone;
    this.worldWidth = width;
    this.worldHeigth = height;
    this.worldCenter = { x: width / 2, y: height / 2 };
    this.lineHeight = 50;
    this.buttonFontStyle = {
      fontSize: "30px",
      fontFamily: "fontNaruto",
    };
    this.infoFontStyle = {
      fontSize: "20px",
      fontFamily: "fontNaruto",
    };

    this.deadCharacter = null;
    this.stun = null;
    this.restartButton = null;
    this.quitButton = null;
    this.playerNameLabel = null;
    this.playerNameText = null;
    this.scoreLabel = null;
    this.scoreText = null;
  }

  create() {
    this.cameras.main.setBackgroundColor("rgba(0, 0, 0, 0.5)");

    this.deadCharacter = new Character(
      this,
      this.worldCenter.x,
      this.worldCenter.y,
      CHARACTER_DEAD,
      { isStatic: true }
    ).setScale(0.4);

    const leftBoundOfDeadCharacter = this.deadCharacter.x - this.deadCharacter.displayWidth;
    const underBoundOfDeadCharacter = this.deadCharacter.y + this.deadCharacter.displayHeight;
    const playerNameYCordinate = this.#moveToNextLine(underBoundOfDeadCharacter);
    const scoreYCordinate = this.#moveToNextLine(playerNameYCordinate);

    this.#createStunAnimation(
      this.worldCenter.x,
      this.worldCenter.y - this.deadCharacter.displayHeight
    );

    const { restartButton, quitButton } = this.#createButtons(
      leftBoundOfDeadCharacter,
      underBoundOfDeadCharacter
    );

    this.restartButton = restartButton;
    this.#handleRestartButtonEvents(this.restartButton);

    this.quitButton = quitButton;
    this.#handleQuitButtonEvents(this.quitButton);

    this.#createPlayerName(
      this.deadCharacter.x,
      playerNameYCordinate
    );

    this.#createScore(
      this.deadCharacter.x,
      scoreYCordinate
    );
  }

  #createStunAnimation(xCordinate, yCordinate) {
    const animationKey1 = "stunAnimation";

    this.anims.create({
      key: animationKey1,
      frames: this.anims.generateFrameNames(STUN, {
        start: 1,
        end: 4,
        prefix: "stun",
        zeroPad: 2,
        suffix: ".png",
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.stun = this.add.sprite(xCordinate, yCordinate, STUN).setScale(0.3);
    this.stun.play(animationKey1);
  }

  #createButtons(xCordinateToStart, yCordinate) {
    const restartButton = this.add.text(
      xCordinateToStart,
      yCordinate,
      "Restart?",
      this.buttonFontStyle
    ).setOrigin(0.7, 0.5).setInteractive();

    const quitButton = this.add.text(
      restartButton.x + restartButton.displayWidth,
      yCordinate,
      "Save & Quit?",
      this.buttonFontStyle
    ).setOrigin(0.2, 0.5).setInteractive();

    return {
      restartButton,
      quitButton
    };
  }

  #handleRestartButtonEvents(restartButton) {
    restartButton.on("pointerover", () => {
      restartButton.setStyle({ fill: "red" });
    });

    restartButton.on("pointerout", () => {
      restartButton.setStyle({ fill: "white" });
    });

    restartButton.once("pointerup", () => {
      this.scene.remove();
      this.parent.restartGame();
    });
  }

  #handleQuitButtonEvents(quitButton) {
    quitButton.on("pointerover", () => {
      quitButton.setStyle({ fill: "red" });
    });

    quitButton.on("pointerout", () => {
      quitButton.setStyle({ fill: "white" });
    });

    quitButton.on("pointerup", () => {
      const player = this.game.player;
      const score = this.registry.get("score");

      this.game.saveRecord(player, score);
      this.game.router("", "/");
    });
  }

  #createPlayerName(xCordinate, yCordinate) {
    const player = this.game.player;
    const labelOffsetX = 10;
    const textOffsetX = 30;

    this.playerNameLabel = this.add.text(
      xCordinate - labelOffsetX,
      yCordinate,
      "Player:",
      this.infoFontStyle
    ).setOrigin(1, 0.5);

    this.playerNameText = this.add.text(
      xCordinate + textOffsetX,
      yCordinate,
      player,
      this.infoFontStyle
    ).setOrigin(0, 0.5);
  }

  #createScore(xCordinate, yCordinate) {
    const score = this.registry.get("score");
    const labelOffsetX = 10;
    const textOffsetX = 30;

    this.scoreLabel = this.add.text(
      xCordinate - labelOffsetX,
      yCordinate,
      "Score:",
      this.infoFontStyle
    ).setOrigin(1, 0.5);

    this.scoreText = this.add.text(
      xCordinate + textOffsetX,
      yCordinate,
      score,
      this.infoFontStyle
    ).setOrigin(0, 0.5);
  }

  #moveToNextLine(yCordinate) {
    return yCordinate + this.lineHeight;
  }

  refresh() {
    this.cameras.main.setPosition(this.zone.x, this.zone.y);

    this.scene.bringToTop();
  }
}
