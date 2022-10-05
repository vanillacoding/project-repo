class ResultImage {
  constructor(imgObj, canvasWidth, canvasHeight) {
    this.imgObj = imgObj;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  win(ctx) {
    ctx.drawImage(
      this.imgObj.win,
      this.canvasWidth / 2 -
        ((this.imgObj.win.width / this.canvasWidth) * this.canvasHeight) / 2,
      this.canvasHeight / 4,
      (this.imgObj.win.width / this.canvasWidth) * this.canvasHeight,
      (this.imgObj.win.height / this.canvasWidth) * this.canvasHeight
    );
  }

  lose(ctx) {
    ctx.drawImage(
      this.imgObj.lose,
      this.canvasWidth / 2 -
        ((this.imgObj.lose.width / this.canvasWidth) * this.canvasHeight) / 2,
      this.canvasHeight / 4,
      (this.imgObj.lose.width / this.canvasWidth) * this.canvasHeight,
      (this.imgObj.lose.height / this.canvasWidth) * this.canvasHeight
    );
  }

  otherWin(ctx) {}

  otherLose(ctx) {}
}

export default ResultImage;
