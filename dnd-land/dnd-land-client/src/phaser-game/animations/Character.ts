import { ANIMATION } from "../../constants";

export default function createCharacterAnimation(animations: Phaser.Animations.AnimationManager) {
  animations.create({
    key: ANIMATION.CHARACTER_IDLE,
    frames: animations.generateFrameNames(ANIMATION.CHARACTER_IDLE, {
      start: 1,
      end: 5,
      prefix: "blink-",
      zeroPad: 2,
      suffix: ".png",
    }),
    frameRate: 5,
    repeat: -1,
  });

  animations.create({
    key: ANIMATION.CHARACTER_RUN,
    frames: animations.generateFrameNames(ANIMATION.CHARACTER_RUN, {
      start: 1,
      end: 4,
      prefix: "run-",
      zeroPad: 2,
      suffix: ".png",
    }),
    frameRate: 10,
    repeat: -1,
  });

  animations.create({
    key: ANIMATION.COIN,
    frames: animations.generateFrameNames(ANIMATION.COIN, {
      start: 1,
      end: 5,
      prefix: "coin-",
      zeroPad: 2,
      suffix: ".png",
    }),
    frameRate: 10,
    repeat: -1,
  });

  animations.create({
    key: ANIMATION.CURSOR,
    frames: animations.generateFrameNames(ANIMATION.CURSOR, {
      start: 1,
      end: 2,
      prefix: "cursor-",
      zeroPad: 2,
      suffix: ".png",
    }),
    frameRate: 2,
    repeat: -1,
  });
}
