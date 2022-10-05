import BackgroundScene from "./BackgroundScene";

import {
  CHARACTER_DIE_ANIMATION,
  CHARACTER_THROW_JUMP,
  ENEMY_BIRD1,
  ENEMY_BIRD1_DIE,
  ENEMY_BIRD2,
  ENEMY_BIRD2_DIE
} from "../constants/textureNames";
import { PLAY_SCENE } from "../constants/scenes";

export default class AnimationLoadScene extends BackgroundScene {
  constructor(config) {
    super(PLAY_SCENE, config);

    this.enemyType = [];
    this.characterDieAnimation = "";
    this.charaterThrowAnimation = "";
  }

  create() {
    super.create();
    this.#createAnimation();
  }

  #createAnimation() {
    const animationKey1 = "fly1";
    this.anims.create({
      key: animationKey1,
      frames: this.anims.generateFrameNumbers(ENEMY_BIRD1, { start: 0, end: 7 }),
      frameRate: 8,
      repeat: -1,
    });

    const dieAnimationKey1 = "die1";
    this.anims.create({
      key: dieAnimationKey1,
      frames: this.anims.generateFrameNumbers(ENEMY_BIRD1_DIE, { start: 0, end: 7 }),
      frameRate: 8,
      repeat: 0,
    });

    this.enemyType.push({ animation: animationKey1, enemyType: ENEMY_BIRD1, dieAnimation: dieAnimationKey1 });

    const animationKey2 = "fly2";
    this.anims.create({
      key: animationKey2,
      frames: this.anims.generateFrameNumbers(ENEMY_BIRD2, { start: 0, end: 11 }),
      frameRate: 8,
      repeat: -1,
    });

    const dieAnimationKey2 = "die2";
    this.anims.create({
      key: dieAnimationKey2,
      frames: this.anims.generateFrameNumbers(ENEMY_BIRD2_DIE, { start: 0, end: 7 }),
      frameRate: 8,
      repeat: 0,
    });

    this.enemyType.push({ animation: animationKey2, enemyType: ENEMY_BIRD2, dieAnimation: dieAnimationKey2 });

    const characterDieAnimationKey = "ninja6_Die1";
    this.anims.create({
      key: characterDieAnimationKey,
      frames: this.anims.generateFrameNames(CHARACTER_DIE_ANIMATION, {
        start: 1,
        end: 5,
        prefix: "ninja6_dead",
        zeroPad: 2,
        suffix: ".png",
      }),
      frameRate: 8,
      repeat: false,
    });

    this.characterDieAnimation = characterDieAnimationKey;

    const characterThrowAnimationKey = "ninja6_Throw1";
    this.anims.create({
      key: characterThrowAnimationKey,
      frames: this.anims.generateFrameNames(CHARACTER_THROW_JUMP, {
        start: 0,
        end: 7,
        prefix: "ninja6_throwJump",
        zeroPad: 2,
        suffix: ".png",
      }),
      frameRate: 20,
      repeat: false,
    });

    this.charaterThrowAnimation = characterThrowAnimationKey;
  }
}
