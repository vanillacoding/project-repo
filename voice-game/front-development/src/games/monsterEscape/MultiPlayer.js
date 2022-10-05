class MultiPlayer {
  constructor(canvasWidth, canvasHeight, images, size, fps) {
    this.images = images.characters.goblin;
    this.size = size;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fps = fps;
    this.setSize();
  }

  setSize() {
    const image = this.images.normal;
    this.width = this.size * this.canvasWidth;
    this.height = this.width * image.height / (image.width / this.fps);
  };

  animate(ctx, myData, yourData, player, frame) {
    const myNormDistance = myData?.normDistance ?? 0;
    const { normPosY = 0.6, normDistance = 0, shieldTime = 0, life = 1 } = yourData;

    let image = this.images.normal;

    const gap = image.width / this.fps;
    const distanceGap = (myNormDistance - normDistance) * this.canvasWidth;
    const posX = (0.5 * this.canvasWidth - 0.5 * this.width) - distanceGap;
    const posY = normPosY * this.canvasHeight;

    if (shieldTime) { image = this.images.collision }

    if (!life) { image = this.images.dead }

    ctx.font = `900 ${0.015 * this.canvasWidth}px sans-serif`;
    ctx.fillStyle = "red";
    ctx.textAlign = "center";

    ctx.fillText(
      player.name,
      posX + 0.5 * this.width,
      posY - 0.1 * this.height,
    );

    ctx.drawImage(
      image,
      gap * frame,
      0,
      gap,
      image.height,
      posX,
      posY,
      this.width,
      this.height,
    );
  };
}

export default MultiPlayer;
