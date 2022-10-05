class PlayerAvatar {
  constructor(imgObj, canvasWidth, canvasHeight) {
    this.imgObj = imgObj;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  idle(ctx, spriteCount) {
    ctx.drawImage(
      this.imgObj.idle,
      (this.imgObj.idle.width / 12) * (spriteCount % 12),
      0,
      (this.imgObj.idle.width / 12) * 1,
      this.imgObj.idle.height,
      -10,
      this.canvasHeight * 0.4,
      this.canvasWidth / 8,
      (this.canvasWidth / 8 / 10) * 9
    );
  }

  cast(ctx, spriteCount) {
    ctx.drawImage(
      this.imgObj.cast,
      (this.imgObj.cast.width / 12) * (spriteCount % 12),
      0,
      this.imgObj.cast.width / 12,
      this.imgObj.cast.height,
      0,
      this.canvasHeight * 0.4,
      this.canvasWidth / 8,
      (this.canvasWidth / 8 / 10) * 9
    );
  }

  lose(ctx, spriteCount) {
    ctx.drawImage(
      this.imgObj.lose,
      (this.imgObj.lose.width / 15) * (spriteCount % 15),
      0,
      this.imgObj.lose.width / 15,
      this.imgObj.lose.height,
      0,
      this.canvasHeight * 0.4,
      this.canvasWidth / 8,
      (this.canvasWidth / 8 / 10) * 9
    );
  }
}

export default PlayerAvatar;
