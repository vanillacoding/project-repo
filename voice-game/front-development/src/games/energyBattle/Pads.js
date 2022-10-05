class Pads {
  constructor(imgObj, canvasWidth, canvasHeight) {
    this.imgObj = imgObj;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  myPad(ctx) {
    ctx.drawImage(
      this.imgObj.pad1,
      0,
      0,
      this.imgObj.pad1.width,
      this.imgObj.pad1.height,
      0,
      this.canvasHeight * 0.5,
      this.canvasWidth / 8,
      (this.canvasWidth / 8 / 10) * 9
    );
  }

  otherPad(ctx) {
    ctx.drawImage(
      this.imgObj.pad2,
      0,
      0,
      this.imgObj.pad2.width,
      this.imgObj.pad2.height,
      -this.canvasWidth + 10,
      this.canvasHeight * 0.52,
      this.canvasWidth / 8,
      (this.canvasWidth / 8 / 10) * 9
    );
  }
}

export default Pads;
