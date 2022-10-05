import Phaser from "phaser";

import addButtonEvent from "../common/ButtonEvent";
import { sceneEvents } from "../events/EventsManager";

import { CreateGetCoinAnimation } from "../animations/Coin";
import { ANIMATION, COLOR, GAME, SCENE, SOUND } from "../../constants";

export default class Lobby extends Phaser.Scene {
  private stone!: Phaser.GameObjects.Sprite;
  private girlfriend!: Phaser.GameObjects.Sprite;

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private coin?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private character!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor() {
    super(SCENE.LOBBY);
  }

  create() {
    this.cameras.main.fadeIn(800);
    this.add.image(0, 0, "lobby").setOrigin(0, 0).setDisplaySize(800, 600);

    this.createButtons();
    this.createCharacter();
    this.createClickGuide();
    this.createStageClearReward();

    this.cursors = this.input.keyboard.createCursorKeys();

    sceneEvents.on("logout", this.handleLogout, this);
    this.removeSceneEvents();
  }

  createCharacter() {
    const { lastStage } = this.registry.get("user");
    const location = Math.min(lastStage, GAME.TOTAL_STAGE - 1);

    this.character = this.physics.add
      .sprite(100 + 200 * location, 410, ANIMATION.CHARACTER_IDLE)
      .setSize(150, 180)
      .setOrigin(0.5, 1)
      .setOffset(30, 15)
      .setGravityY(-30)
      .setScale(0.5)
      .setDepth(1)
      .play(ANIMATION.CHARACTER_IDLE);

    this.character.body.setOffset(20, 20);

    this.add
      .sprite(560, 290, "stone1")
      .setOrigin(0.5, 1)
      .setDisplaySize(100, 80)
      .setDepth(0);
    this.add
      .sprite(660, 350, "stone1")
      .setOrigin(0.5, 1)
      .setDisplaySize(110, 80)
      .setDepth(2);

    this.stone = this.add
      .sprite(610, 320, `stone${lastStage + 1}`)
      .setOrigin(0.5, 1)
      .setScale(0.2)
      .setDepth(1);
  }

  createButtons() {
    const { lastStage } = this.registry.get("user");

    for (let i = 0; i < lastStage + 1; i++) {
      if (i === GAME.TOTAL_STAGE) {
        return;
      }

      const button = new Phaser.GameObjects.Sprite(
        this,
        50 + 200 * i,
        365,
        "stage",
      );
      button.setOrigin(0, 0).setInteractive();

      this.add
        .text(button.x + 42, button.y + 12, `${i + 1}`, {
          fontSize: "50px",
          color: COLOR.BROWN_HEX,
          fontFamily: "Arial",
        })
        .setDepth(1)
        .setOrigin(0, 0);

      this.add.existing(button);

      addButtonEvent(button, () => {
        const games = [
          SCENE.SHOOTING_GAME,
          SCENE.PUZZLE_GAME,
          SCENE.MATCHING_GAME,
        ];

        this.scene.start(games[i]);
        this.scene.stop(SCENE.LOBBY_STATUS_BAR);
      });
    }

    for (let i = lastStage + 1; i < GAME.TOTAL_STAGE; i++) {
      const lockedButton = new Phaser.GameObjects.Sprite(
        this,
        200 * i + 50,
        365,
        "lock",
      );

      lockedButton.setOrigin(0, 0);
      this.add.existing(lockedButton);
    }
  }

  createClickGuide() {
    const { lastStage } = this.registry.get("user");

    if (lastStage === GAME.TOTAL_STAGE) {
      return;
    }

    this.add
      .sprite(160 + 200 * lastStage, 450, "cursor")
      .play(ANIMATION.CURSOR);
  }

  createStageClearReward() {
    const { lastStage } = this.registry.get("user");

    if (lastStage === GAME.TOTAL_STAGE) {
      this.coin = this.physics.add
        .sprite(630, 360, "coin")
        .setOrigin(0.5, 0.5)
        .setGravity(0, -30)
        .setOffset(0, 0)
        .setSize(120, 120)
        .setScale(0.25)
        .setDepth(3)
        .setInteractive()
        .play(ANIMATION.COIN);

      this.coin.on("pointerdown", () => {
        this.tweens.add({
          targets: this.character,
          duration: 1000,
          delay: 1000,
          x: 580,
        });
      });

      this.physics.add.collider(this.character, this.coin, () => {
        this.coin?.destroy();
        this.sound.play(SOUND.COIN, { volume: 0.5 });

        this.girlfriend = this.add
          .sprite(650, 360, ANIMATION.CHARACTER_IDLE)
          .setOrigin(0.5, 0.5)
          .setFlipX(true)
          .setScale(0.5)
          .setDepth(5)
          .setAlpha(0)
          .play(ANIMATION.CHARACTER_IDLE);

        const heart = this.add
          .sprite(615, 300, "heart")
          .setAlpha(0)
          .setDepth(5);
        this.add.existing(heart);

        CreateGetCoinAnimation(this.tweens, this.stone, this.girlfriend, heart);
      });
    }
  }

  handleLogout() {
    this.registry.remove("user");

    window.location.href = "/";
  }

  removeSceneEvents() {
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off("logout", this.handleLogout);
    });
  }

  update() {
    if (this.cursors.right.isDown) {
      if (this.character.x > 575) {
        this.character.x = 575;
        return;
      }

      const velocity = 130;

      this.character.play(ANIMATION.CHARACTER_RUN, true);
      this.character.setVelocityX(velocity).setFlipX(false);
    } else if (this.cursors.left.isDown) {
      if (this.character.x < 50) {
        this.character.x = 50;
        return;
      }

      const velocity = -130;

      this.character.play(ANIMATION.CHARACTER_RUN, true);
      this.character.setVelocityX(velocity).setFlipX(true);
    } else {
      const velocity = 0;

      this.character.setScale(0.5).setVelocityX(velocity);
      this.character.play(ANIMATION.CHARACTER_IDLE, true);
    }
  }
}
