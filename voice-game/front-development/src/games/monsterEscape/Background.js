class Background{
  constructor(canvasWidth, canvasHeight, images) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.images = images;
  }

  animate = function (ctx) {
    ctx.drawImage(
      this.images.background,
      0,
      100,
      263,
      263,
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
  };
}

export default Background;
