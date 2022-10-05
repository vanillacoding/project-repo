import Phaser from "phaser";
import AnimationLoadScene from "../AnimationLoadScene";

import GameOverScene from "../modal/GameOverScene";
import GameStartCountScene from "../modal/GameStartCountScene";
import GuideScene from "../modal/GuideScene";

import MovingPlatform from "../../objects/MovingPlatform";
import Shuriken from "../../objects/Shuriken";
import Character from "../../objects/Character";
import Enemy from "../../objects/Enemy";
import {
  PLATFORM,
  CHARACTER,
  SHURIKEN_SPIN,
  ENEMY,
  BGM
} from "../../constants/textureNames";
import {
  GAMEOVER_SCENE,
  GAME_START_COUNT_SCENE,
  GUIDE_SCENE
} from "../../constants/scenes";
import {
  IS_VISIT,
  PLAY_TIME,
  SCORE
} from "../../constants/localStorageKey";

export default class initPlayScene extends AnimationLoadScene {
  constructor(config) {
    super(config);
    this.deadZone = config.deadZone;

    this.objectVelocityControl = config.objectVelocityControl;

    this.scorePosition = config.scorePosition;

    this.startPosition = config.startPosition;
    this.accelerationValue = config.accelerationValue;

    this.plaformStartPosition = config.platformStartPosition;
    this.plaformInterval = config.platformInterval;
    this.platformHeightLimit = config.height * 0.65;

    this.enemyStartPosition = config.enemyStartPosition;
    this.enemySize = config.enemySize;
    this.enemyNumberLimit = config.enemyNumberLimit;
    this.enemyInterval = config.enemyInterval;

    this.shurikenPositionOffset = config.shurikenPositionOffset;
    this.shurikenVelocityConstant = config.shurikenVelocityConstant;

    this.difficultyFactors = {
      plaformInterval: config.platformInterval,
      enemyNumberLimit: config.enemyNumberLimit,
      enemyInterval: config.enemyInterval
    };

    this.isStart = false;
    this.isGameOver = false;
    this.scoreBoard = null;
    this.startTime = 0;
    this.timedEvent = null;
    this.bgm = null;
    this.modalZone = null;
    this.collision1 = 2;
    this.collision2 = 4;

    this.character = null;
    this.platforms = [];
    this.enemies = {};
    this.shuriken = null;
    this.rope = null;
    this.attatchedTarget = null;
  };

  create() {
    this.modalZone = this.add.zone(0, 0, this.worldWidth, this.worldHeight).setOrigin(0.5);
    this.registry.set(SCORE, 0);

    const gameStartCountScene = new GameStartCountScene(
      this,
      this.modalZone,
      this.worldWidth,
      this.worldHeight
    );
    const isVisited = window.localStorage.getItem(IS_VISIT);

    if (isVisited) {
      this.#addGameStartCountModal(gameStartCountScene);
    } else {
      this.#addGuideModal(gameStartCountScene);
    }

    super.create();
    this.#createBGM();
    this.#createScore();
    this.#createTimeBoard();

    for (let i = 0; i < this.enemyNumberLimit; i++) {
      const XPosition = this.enemyStartPosition + (this.enemyInterval * i);

      this.createEnemy(XPosition);
    }

    for (let i = 0; i < 4; i++) {
      const xPosition = this.plaformStartPosition + (this.plaformInterval * i);

      this.createPlatform(xPosition);
    }

    this.#handleMouseClickEvent();
    this.#handleKeyDownEvent();
    this.#handleCollisionEvent();
  };

  #createBGM() {
    this.bgm = this.sound.add(BGM, { loop: true, volume: 1 });
    this.bgm.play();
  }

  #addGameStartCountModal(gameStartCountScene) {
    this.scene.add(GAME_START_COUNT_SCENE, gameStartCountScene, true);
  }

  #addGuideModal(gameStartCountScene) {
    this.scene.pause();

    const guideScene = new GuideScene(
      this,
      { key: GAME_START_COUNT_SCENE, object: gameStartCountScene },
      this.modalZone,
      this.worldWidth,
      this.worldHeight
    );

    this.scene.add(GUIDE_SCENE, guideScene, true);
  }

  #createScore() {
    const scoreX = this.scorePosition.x;
    const scoreY = this.scorePosition.y;
    const currentScore = this.registry.get(SCORE)

    if (this.scoreBoard) this.scoreBoard.destroy();

    this.scoreBoard = this.add.text(scoreX, scoreY, currentScore, {
      fontSize: "50px",
      color: "red",
      fontStyle: "bold",
      fontFamily: "fontNaruto"
    }).setOrigin(0);
  }

  #createTimeBoard() {
    const timeX = this.scorePosition.x;
    const timeY = this.scorePosition.y + 100;
    const currentTimeMillsecond = this.time.now - this.startTime;
    const currentSecond = Math.ceil(currentTimeMillsecond / 1000);
    const currentTime = { minute: Math.floor(currentSecond / 60), seconds: currentSecond % 60 };

    this.registry.set(PLAY_TIME, currentTime);

    if (currentSecond > 0 && currentTime.seconds % 10 === 0) this.#countUpScore();

    if (this.timeBoard) this.timeBoard.destroy();

    this.timeBoard = this.add.text(timeX, timeY, `${currentTime.minute}:${currentTime.seconds}`, {
      fontSize: "50px",
      color: "red",
      fontStyle: "bold",
      fontFamily: "fontNaruto"
    }).setOrigin(0);
  }

  createEnemy(xPosition) {
    const enemyType = this.#getEnemyTypeInRandom();
    const yPosition = Number(Math.random() * this.worldHeight);

    const newEnemy = new Enemy(
      this,
      xPosition,
      yPosition,
      enemyType.enemyType
    ).setScale(0.2);

    newEnemy
      .play(enemyType.animation)
      .setBody(this.enemySize)
      .setIgnoreGravity(true)
      .moveHorizontally(this.objectVelocityControl);

    newEnemy.setCollisionCategory(this.collision1);
    newEnemy.setCollidesWith(this.collision1);
    newEnemy.body.dieAnimation = enemyType.dieAnimation;
    newEnemy.body.label = ENEMY;

    this.enemies[newEnemy.body.id] = newEnemy;
  }

  createPlatform(xPosition) {
    const height = Number(Math.random() * this.platformHeightLimit);

    const newPlatform = new MovingPlatform(
      this,
      xPosition,
      height,
      { isStatic: true }
    );

    newPlatform.moveHorizontally(this.objectVelocityControl);
    newPlatform.setCollisionCategory(this.collision2);
    newPlatform.setCollidesWith(this.collision1);
    newPlatform.body.label = PLATFORM;

    this.platforms.push(newPlatform);
  }

  #handleMouseClickEvent() {
    const shootShuriken = (e) => {
      const angle = Phaser.Math.Angle.Between(
        this.character.x,
        this.character.y,
        e.position.x,
        e.position.y
      );
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const positionOffset = this.shurikenPositionOffset;
      const velocityConstant = this.shurikenVelocityConstant;

      this.character.play(this.character.throwAnimation);

      this.shuriken = new Shuriken(
        this,
        this.character.x + positionOffset * cos,
        this.character.y + positionOffset * sin
      )
        .setScale(0.5)
        .setVelocity(cos * velocityConstant, sin * velocityConstant);

      this.shuriken.spinShuriken();
      this.shuriken.setCollisionCategory(this.collision1);
      this.shuriken.setCollidesWith([this.collision1, this.collision2]);
      this.shuriken.body.label = SHURIKEN_SPIN;
    };

    this.input.on("pointerdown", (e) => {
      if (this.isGameOver) return;

      if (this.rope) {
        this.removeConstraintAndRope();
        this.character.spinCharacterOneTime();
        return;
      }

      if (this.shuriken) return;

      shootShuriken(e);
    });
  }

  #handleKeyDownEvent() {
    this.input.keyboard.on("keydown", (e) => {
      if (!this.rope) return;

      const accelerationValue = this.accelerationValue;

      if (e.key === "d") {
        this.character.setVelocityX(this.character.body.velocity.x + accelerationValue);
        return;
      }

      if (e.key === "a") {
        this.character.setVelocityX(this.character.body.velocity.x - accelerationValue);
      }
    });
  }

  #handleCollisionEvent() {
    const addConstraint = (character, otherObject) => {
      const distance = Phaser.Math.Distance.Between(
        character.x,
        character.y,
        otherObject.x,
        otherObject.y
      );

      this.rope = this.matter.add.constraint(
        character,
        otherObject,
        distance,
        0
      );
    };

    this.matter.world.on("collisionstart", (_, b1, b2) => {
      const isCharacterColledes = (
        b1.label === CHARACTER ||
        b2.label === CHARACTER
      );
      const isShurikenCollidesWithoutRope = (
        (
          b1.label === SHURIKEN_SPIN ||
          b2.label === SHURIKEN_SPIN
        ) &&
        !this.rope
      );

      if (isCharacterColledes) {
        const characterOpponent = b1.label === CHARACTER ? b2 : b1;

        if (characterOpponent.label === ENEMY) {
          const enemy = this.enemies[characterOpponent.id];

          this.#killEnemy(enemy, characterOpponent.id);
          this.gameOver();
        }

        return;
      }

      if (isShurikenCollidesWithoutRope) {
        const shurikenOpponent = b1.label === SHURIKEN_SPIN ? b2 : b1;
        const isEnemyCollides = (
          b1.label === ENEMY ||
          b2.label === ENEMY
        );

        this.deleteShuriken();

        if (isEnemyCollides) {
          const enemy = this.enemies[shurikenOpponent.id];

          this.#countUpScore();
          this.#killEnemy(enemy, shurikenOpponent.id);
        } else {
          this.#changeCharaterSprite(CHARACTER);

          this.attatchedTarget = shurikenOpponent;
          addConstraint(this.character, this.attatchedTarget);
        }
      }
    });
  }

  #countUpScore() {
    this.registry.set(SCORE, this.registry.get(SCORE) + 1);
    this.#createScore();
  }

  #changeCharaterSprite(spriteId) {
    this.character.stop();
    this.character.setTexture(spriteId);
  }

  #killEnemy(enemy, enemyId) {
    enemy.play(enemy.body.dieAnimation);
    enemy.body.destroy();
    enemy.setStatic(true);

    setTimeout(() => this.deleteEnemy(enemy, enemyId), 1000);
  }

  deleteEnemy(enemy, enemyId) {
    enemy.removeCounter();
    enemy.destroy();
    delete this.enemies[enemyId];
  }

  deleteShuriken() {
    this.shuriken.removeCounter();
    this.shuriken.destroy();
    this.shuriken = null;
  }

  #getEnemyTypeInRandom() {
    return this.enemyType[Math.floor(Math.random() * (this.enemyType.length))];
  }

  removeConstraintAndRope() {
    this.matter.world.removeConstraint(this.rope);

    this.rope = null;

    this.line.clear();
    this.line = null;

    this.attatchedTarget = null;
  };

  gameOver() {
    this.isGameOver = true;
    this.rope && this.removeConstraintAndRope();
    this.character.removeCounter();
    this.character.play(this.character.dieAnimation);
    setTimeout(() => {
      this.#addGameOverModal();
    }, 1000);
    setTimeout(() => {
      this.character && this.character.destroy();
    }, 2000);
  }

  #addGameOverModal() {
    const gameOverScene = new GameOverScene(this, this.modalZone, this.worldWidth, this.worldHeight);

    this.scene.add(GAMEOVER_SCENE, gameOverScene, true);
  }

  startGame() {
    this.startTime = this.time.now;
    this.timedEvent = this.#createTimerEvent();
    this.#createCharacter();
  }

  #createCharacter() {
    const startX = this.startPosition.x;
    const startY = this.startPosition.y;

    this.character = new Character(this, startX, startY, CHARACTER);
    this.character.setCollisionCategory(this.collision1);
    this.character.setCollidesWith(this.collision1);
    this.character.body.label = CHARACTER;

    this.character.dieAnimation = this.characterDieAnimation;
    this.character.throwAnimation = this.charaterThrowAnimation;

    delete this.characterDieAnimation;
    delete this.charaterThrowAnimation;

    this.character.setVelocity(10, 0);
  }

  #createTimerEvent() {
    return (this.time.addEvent({
      delay: 1000,
      callback: this.#createTimeBoard,
      callbackScope: this,
      loop: true
    }));
  }

  restartGame() {
    this.bgm.stop();
    this.bgm.destroy();

    this.backgroundScenes.forEach(background => {
      background.removeCounter();
      background.destroy();
    });
    this.backgroundScenes = [];

    this.platforms.forEach(platform => {
      platform.removeCounter();
      platform.destroy();
    });
    this.platforms = [];

    Object.values(this.enemies).forEach(enemy => {
      enemy.removeCounter();
      enemy.destroy();
    });
    this.enemies = {};

    this.input.removeAllListeners("pointerdown");
    this.input.removeAllListeners("keydown");
    this.matter.world.off("collisionstart");

    this.character && this.character.destroy();
    this.character = null;

    this.startTime = this.time.now;

    this.isGameOver = false;

    this.time.removeEvent(this.timedEvent);
    this.timedEvent = null;

    this.#initDifficultyFactors();

    this.scene.restart();
  }

  #initDifficultyFactors() {
    this.plaformInterval = this.difficultyFactors.plaformInterval;
    this.enemyInterval = this.difficultyFactors.enemyInterval;
    this.enemyNumberLimit = this.difficultyFactors.enemyNumberLimit;
  }
}
