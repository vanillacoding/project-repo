import Phaser from "phaser";

import Ball from "./Ball";
import Enemy from "./Enemy";
import Cannon from "./Cannon";

import { updateFinalStageRecord } from "../../api";
import { sceneEvents } from "../events/EventsManager";
import { GAME, SCENE, SOUND } from "../../constants";

enum GameState {
  Playing,
  GameOver,
}

export default class ShootingGame extends Phaser.Scene {
  private order!: number;
  private cannon!: Cannon;
  private enemies: Enemy[] = [];

  private state = GameState.Playing;
  private enemyGroup!: Phaser.Physics.Arcade.Group;

  constructor() {
    super(SCENE.SHOOTING_GAME);
  }

  init() {
    this.cameras.main.fadeIn(800);
    this.add.tileSprite(0, 0, 800, 600, "background2").setOrigin(0);

    this.order = 1;
    this.state = GameState.Playing;

    this.input.on("pointerup", this.handlePointerUp, this);
  }

  create() {
    this.createStatusBar();

    const width = this.scale.width;
    const height = this.scale.height;

    this.cannon = new Cannon(this, width / 2, height - 35, "cannon").setDepth(
      3,
    );
    this.cannon.setShotPreview();

    this.createEnemyGroup();
    this.createEnemies(this.enemyGroup);

    this.setCollisionGroup();
  }

  private handlePointerUp() {
    if (this.state === GameState.GameOver) {
      return;
    }

    this.sound.play(SOUND.CLICK, { volume: 0.3 });

    const ball = this.cannon.loadBall();

    this.cannon.shoot(ball);
    this.checkCollision(ball);

    this.cannon.getShotPreview.removePreviousPreview();
  }

  private createEnemyGroup() {
    this.enemyGroup = this.physics.add.group({
      bounceX: 1,
      bounceY: 1,
      velocityX: 150,
      velocityY: -50,
      maxVelocityX: 300,
      collideWorldBounds: true,
    });
  }

  private createEnemies(enemyGroup: Phaser.Physics.Arcade.Group) {
    for (let i = 0; i < GAME.SHOOTING_GAME_TOTAL_TARGET_SCORE; i++) {
      const enemy = new Enemy(
        this,
        Math.random() * 200 + 300,
        Math.random() * 100,
        i + 1,
      );

      enemyGroup.add(enemy).setVelocity(50, -150);
      this.enemies.push(enemy);
    }
  }

  private checkCollision(ball: Ball) {
    this.physics.add.collider(ball, this.enemyGroup, (ball, enemy) => {
      ball.destroy();

      if (this.order !== (enemy as Enemy).value) {
        return;
      }

      (enemy as Enemy).getDamage();
      sceneEvents.emit("get-point", this.order);

      this.order++;
      this.sound.play(SOUND.POP, { volume: 0.5 });

      if (this.order === GAME.SHOOTING_GAME_TOTAL_TARGET_SCORE + 1) {
        this.state = GameState.GameOver;

        sceneEvents.emit("gameover");
        updateFinalStageRecord(SCENE.SHOOTING_GAME);
      }
    });
  }

  private createStatusBar() {
    this.scene.run(SCENE.STATUS_BAR, {
      scene: this,
      game: SCENE.SHOOTING_GAME,
      totalScore: GAME.SHOOTING_GAME_TOTAL_TARGET_SCORE,
    });
  }

  private setCollisionGroup() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.physics.world.setBounds(0, 50, width, height - 50);

    this.physics.add.collider(this.enemyGroup, this.cannon);
    this.physics.add.collider(this.enemyGroup, this.enemyGroup);
  }

  update() {
    this.cannon.update();
    this.enemies.forEach((enemy) => enemy.update());
  }
}
