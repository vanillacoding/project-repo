import Hero from "../../../gameObjects/Hero";
import Enemy from "../../../gameObjects/Enemy";
import ChaseHeroAI from "../../../ai/ChaseHeroAI";
import RotateAI from "../../../ai/RotateAI";
import ConditionalChaseAI from "../../../ai/ConditionalChaseAI";
import CountDownScene from "../../common/CountDownScene";

import store from "../../../../store";
import { updateGameProgress } from "../../../../redux/slices/singlePlaySlice";
import { gameProgress } from "../../../../constants/gameState";
import { Clouds } from "../../../../constants/coordinates";

export default class Stage extends Phaser.Scene {
  init() {
    this.isCleared = false;
    this.isStarted = false;
  }

  create() {
    this.successEffect = this.sound.add("success", { loop: false });
    this.coinEffect = this.sound.add("coin", { loop: false });
    this.failEffect = this.sound.add("fail", { loop: false });
    this.mainMusic = this.sound.add("main", { loop: true });

    const countDownScene = new CountDownScene(this.scene, this.mainMusic);

    this.scene.add("CountDownScene", countDownScene, true);

    this.setStatusBar();

    this.setCoinToMap();

    this.cursors = this.input.keyboard.createCursorKeys();
    
    this.setCamera();
  }

  update() {
    if (!this.hero || !this.hero.body) {
      return;
    }
    
    const currentTime = 90 - this.timer.getElapsedSeconds().toString().substr(0, 2);
    const currentMin = Math.floor(currentTime / 60);
    const currentSecond = currentTime % 60 < 10 ? `0${currentTime % 60}` : currentTime % 60;

    this.countDown.setText(`TIME: ${currentMin}:${currentSecond}`).setDepth(7);

    this.countDown.x = this.hero.body.position.x + 160;
    this.countDown.y = this.hero.body.position.y - 340;

    this.score.setText(`SCORE: ${this.registry.values.score}`).setDepth(7);

    this.score.x = this.hero.body.position.x + 340;
    this.score.y = this.hero.body.position.y - 340;
    
    this.hero.handleMovement(
      this.cursors,
      this.boardLayer,
    );
  }

  setBackground(level) {
    this.map = this.add.tilemap(`level${level}-map`);

    const tileset = this.map.addTilesetImage(`iso-level${level}`, "tiles");

    this.boardLayer = this.map.createLayer("Tile Layer 1", tileset).setDepth(2);
    this.coinLayer = this.map.createLayer("Tile Layer 2", tileset);

    Clouds.forEach((cloud) => {
      this.add.image(cloud.x, cloud.y, "cloud").setDepth(1);
    });
  }

  setCoinToMap() {
    this.coins = this.coinLayer.createFromTiles(6, -1, { key: "coin" });

    this.coinCount = this.coins.length;

    this.coins.forEach((coin) => {
      this.physics.add.existing(coin);

      const body = coin.body;

      body.setCircle(32, 31, -1);
      coin.setDepth(5);
    });
    
    if (this.hero) {
      this.physics.add.overlap(
        this.hero,
        this.coins,
        this.handlePlayerGetCoin,
        this.checkIsCanPlayerGetCoin,
        this
      );
    }
  }

  setStatusBar() {
    this.score = this.add
      .text(0, 500, `SCORE: `, {
        fontSize: "35px", 
        fill: "#FFFFFF", 
        fontFamily: "MainFont" 
      })
      .setDepth(0);

    this.countDown = this.add
      .text(0, 500, `TIME: `, {
        fontSize: "35px",
        fill: "#FFFFFF", 
        fontFamily: "MainFont" 
      })
      .setDepth(0);

    this.timer = this.time.delayedCall(90000, this.stopStage, [], this);
  }

  setCharacters(enemyList) {
    this.createHero();
    
    this.createEnemies(enemyList);
    
    this.physics.add.collider(this.hero, this.enemies, () => {
      this.stopStage();
    });
  }

  createHero() {
    this.hero = new Hero(this, 90, 400, "hero");

    this.add.existing(this.hero).setDepth(5);

    this.physics.world.enable(
      this.hero,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    );

    this.hero.body.setSize(35, 50, true);
    this.hero.body.setOffset(45, 40);
  }

  createEnemies(enemyList) {
    this.enemies = enemyList.map((enemy) => {
      const newEnemy = new Enemy(this, enemy.x, enemy.y, "enemy");
      
      // newEnemy.setTargetIndicatorColor(enemy.indicatorColor);

      this.add.existing(newEnemy).setDepth(6);

      this.physics.world.enable(
        newEnemy,
        Phaser.Physics.Arcade.DYNAMIC_BODY
      );
      
      newEnemy.body.setSize(40, 75, true);
      newEnemy.body.setOffset(45, 40);

      const ai = enemy.ai;
      
      switch (ai) {
        case "chase": {
          newEnemy.setAI(new ChaseHeroAI(this.hero, newEnemy, this.boardLayer));
          break;
        }
        case "conditionalChase": {
          newEnemy.setTint(0xFFD3DD);
          newEnemy.setAI(new ConditionalChaseAI(
            this.hero, 
            newEnemy, 
            this.boardLayer,
            new RotateAI({ x: enemy.x, y: enemy.y }, newEnemy, this.boardLayer, this.hero), 
            new ChaseHeroAI(this.hero, newEnemy, this.boardLayer),
          ));
          break;
        }
        default:
          break;
      }

      return newEnemy;
    });

    this.physics.add.collider(this.enemies);
  }

  setCamera() {
    this.cameras.main.startFollow(this.hero, true);
    this.cameras.main.setZoom(1);
  }

  stopStage() {
    this.cursors = null;

    this.handleEnemyUnSubscribeAI();

    this.failEffect.play();
    this.mainMusic.pause();

    this.hero.setDie();

    this.time.addEvent({
      callback: () => {
        store.dispatch(updateGameProgress(gameProgress.GAME_OVER));

        this.hero.destroy();
        this.enemies.forEach((enemy) => {
          enemy.destroy();
        });
      },
      callbackScope: this,
      delay: 2000,
    });
  }

  moveNextStage(callback) {
    this.cursors = null;

    this.handleEnemyUnSubscribeAI();

    this.hero.setWin();

    this.mainMusic.pause();
    this.successEffect.play();

    this.time.addEvent({
      callback: () => {
        this.cameras.main.fadeOut(3000, 50, 50, 50);

        this.cameras.main.once(
          Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
         callback
        );
      },
      callbackScope: this,
      delay: 2000,
    });
  }

  handlePlayerGetCoin(hero, coin) {
    coin.destroy(true);

    hero.getCoin();

    this.coinEffect.play();

    this.coinCount--;

    this.registry.values.score += 10;
  }

  checkIsCanPlayerGetCoin(hero, coin) {
    if (!hero) {
      return false;
    }

    return hero.canGetCoin(coin);
  }

  handleEnemyUnSubscribeAI() {
    this.enemies.forEach((enemy) => {
      enemy.unSubscribeAI();
      enemy.setIdle();
    });
  }
}
