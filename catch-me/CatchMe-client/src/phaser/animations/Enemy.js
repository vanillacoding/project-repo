const createEnemyAnimations = (animations) => {
  animations.create({
    key: "enemy-running-right",
    frameRate: 10,
    repeat: -1,
    frames: animations.generateFrameNames("enemy-running-right", {
      start: 1,
      end: 8,
      prefix: "enemy-running-right",
      zeroPad: 2,
      suffix: ".png",
    }),
  });

  animations.create({
    key: "enemy-running-left",
    frameRate: 10,
    repeat: -1,
    frames: animations.generateFrameNames("enemy-running-left", {
      start: 1,
      end: 8,
      prefix: "enemy-running-left",
      zeroPad: 2,
      suffix: ".png",
    }),
  });

  animations.create({
    key: "enemy-running-back-left",
    frameRate: 10,
    repeat: -1,
    frames: animations.generateFrameNames("enemy-running-back-left", {
      start: 1,
      end: 8,
      prefix: "enemy-running-back-left",
      zeroPad: 2,
      suffix: ".png",
    }),
  });

  animations.create({
    key: "enemy-running-back-right",
    frameRate: 10,
    repeat: -1,
    frames: animations.generateFrameNames("enemy-running-back-right", {
      start: 1,
      end: 8,
      prefix: "enemy-running-back-right",
      zeroPad: 2,
      suffix: ".png",
    }),
  });

  animations.create({
    key: "enemy-idle-right",
    frameRate: 10,
    repeat: -1,
    frames: animations.generateFrameNames("enemy-idle-right", {
      start: 1,
      end: 6,
      prefix: "enemy-idle-right",
      zeroPad: 2,
      suffix: ".png",
    }),
  });

  animations.create({
    key: "enemy-idle-left",
    frameRate: 10,
    repeat: -1,
    frames: animations.generateFrameNames("enemy-idle-left", {
      start: 1,
      end: 6,
      prefix: "enemy-idle-left",
      zeroPad: 2,
      suffix: ".png",
    }),
  });

  animations.create({
    key: "enemy-idle-back-left",
    frameRate: 10,
    repeat: -1,
    frames: animations.generateFrameNames("enemy-idle-back-left", {
      start: 1,
      end: 6,
      prefix: "enemy-idle-back-left",
      zeroPad: 2,
      suffix: ".png",
    }),
  });

  animations.create({
    key: "enemy-idle-back-right",
    frameRate: 10,
    repeat: -1,
    frames: animations.generateFrameNames("enemy-idle-back-right", {
      start: 1,
      end: 6,
      prefix: "enemy-idle-back-right",
      zeroPad: 2,
      suffix: ".png",
    }),
  });
};

export default createEnemyAnimations;
