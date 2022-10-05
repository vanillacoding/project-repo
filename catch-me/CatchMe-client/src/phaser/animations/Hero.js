const createHeroAnimations = (animations, isSingle) => {
  animations.create({
    key: "hero-running-right",
    frameRate: 10,
    repeat: -1,
    frames: animations.generateFrameNames("hero-running-right", {
      start: 1,
      end: 6,
      prefix: "hero-running-right",
      zeroPad: 2,
      suffix: ".png",
    }),
  });

  animations.create({
    key: "hero-running-left",
    frameRate: 10,
    repeat: -1,
    frames: animations.generateFrameNames("hero-running-left", {
      start: 1,
      end: 6,
      prefix: "hero-running-left",
      zeroPad: 2,
      suffix: ".png",
    }),
  });

  animations.create({
    key: "hero-running-back-left",
    frameRate: 10,
    repeat: -1,
    frames: animations.generateFrameNames("hero-running-back-left", {
      start: 1,
      end: 6,
      prefix: "hero-running-back-left",
      zeroPad: 2,
      suffix: ".png",
    }),
  });

  animations.create({
    key: "hero-running-back-right",
    frameRate: 10,
    repeat: -1,
    frames: animations.generateFrameNames("hero-running-back-right", {
      start: 1,
      end: 6,
      prefix: "hero-running-back-right",
      zeroPad: 2,
      suffix: ".png",
    }),
  });

  animations.create({
    key: "hero-idle-right",
    frameRate: 10,
    repeat: -1,
    frames: animations.generateFrameNames("hero-idle-right", {
      start: 1,
      end: 6,
      prefix: "hero-idle-right",
      zeroPad: 2,
      suffix: ".png",
    }),
  });

  animations.create({
    key: "hero-idle-left",
    frameRate: 10,
    repeat: -1,
    frames: animations.generateFrameNames("hero-idle-left", {
      start: 1,
      end: 6,
      prefix: "hero-idle-left",
      zeroPad: 2,
      suffix: ".png",
    }),
  });

  animations.create({
    key: "hero-idle-back-left",
    frameRate: 10,
    repeat: -1,
    frames: animations.generateFrameNames("hero-idle-back-left", {
      start: 1,
      end: 6,
      prefix: "hero-idle-back-left",
      zeroPad: 2,
      suffix: ".png",
    }),
  });

  animations.create({
    key: "hero-idle-back-right",
    frameRate: 10,
    repeat: -1,
    frames: animations.generateFrameNames("hero-idle-back-right", {
      start: 1,
      end: 6,
      prefix: "hero-idle-back-right",
      zeroPad: 2,
      suffix: ".png",
    }),
  });

  if (isSingle) {
    animations.create({
      key: "hero-die-right",
      frameRate: 10,
      repeat: -1,
      frames: animations.generateFrameNames("hero-die-right", {
        start: 1,
        end: 6,
        prefix: "hero-die-right",
        zeroPad: 2,
        suffix: ".png",
      }),
    });

    animations.create({
      key: "hero-die-left",
      frameRate: 10,
      repeat: -1,
      frames: animations.generateFrameNames("hero-die-left", {
        start: 1,
        end: 6,
        prefix: "hero-die-left",
        zeroPad: 2,
        suffix: ".png",
      }),
    });
  }
};

export default createHeroAnimations;
