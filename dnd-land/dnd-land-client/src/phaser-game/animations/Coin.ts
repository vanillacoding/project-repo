function CreateGetCoinAnimation(
  animationManager: Phaser.Tweens.TweenManager,
  stone: Phaser.GameObjects.Sprite,
  girlfriend: Phaser.GameObjects.Sprite,
  heart: Phaser.GameObjects.Sprite
) {
  animationManager.add({
    targets: stone,
    duration: 1000,
    delay: 500,
    alpha: 0,
  });

  animationManager.add({
    targets: girlfriend,
    duration: 1000,
    delay: 500,
    alpha: 1,
  });

  animationManager.add({
    targets: heart,
    duration: 1400,
    delay: 1000,
    scale: 1.2,
    alpha: 0.7,
    repeat: -1,
  });
}

export { CreateGetCoinAnimation };
