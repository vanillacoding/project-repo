import rotateImage from "../../utils/rotateImage";

class Character {
  constructor(images) {
    this.imgList = images;
    this.currentImg = this.imgList.idle;

    this.ratio = 4;

    this.currentFrame = 0;
    this.frameSpeed = 10;
    this.fpsTime = 1000 / this.frameSpeed;

    this.isFlipped = false;
    this.isInPortal = false;
    this.deg = 0;
  }

  draw(ctx, posX, posY, timeStamp) {
    this.img = this.currentImg.img;
    this.totalFrame = this.currentImg.frame;

    this.sWidth = this.img.width / this.totalFrame;
    this.sHeight = this.img.height;

    this.width = this.sWidth / this.ratio;
    this.height = this.sHeight / this.ratio;

    if (!this.pivotTime) {
      this.pivotTime = timeStamp;
    }

    const now = timeStamp - this.pivotTime;

    if (now > this.fpsTime) {
      this.pivotTime = timeStamp;
      this.currentFrame += 1;
    }

    if (this.totalFrame <= this.currentFrame) {
      this.currentFrame = 0;
    }

    this.animate(ctx, posX, posY);
  }

  animate(ctx, posX, posY) {
    const dHeight = this.height;
    const dy = posY - dHeight + 4;
    let dWidth = this.width;
    let dx = posX;

    ctx.save();

    if (this.isInPortal) {
      rotateImage(
        this.deg,
        ctx,
        this.img,
        dx,
        dy,
        dWidth,
        dHeight,
        this.sWidth,
        0,
        this.sWidth,
        this.sHeight,
        this.currentFrame
      );

      this.ratio += 0.5;
      this.deg += 10;

      ctx.restore();

      return;
    }

    if (this.isFlipped) {
      ctx.scale(-1, 1);
      dx = -dx;
      dWidth = -dWidth;
    }

    ctx.drawImage(
      this.img,
      this.sWidth * this.currentFrame,
      0,
      this.sWidth,
      this.sHeight,
      dx,
      dy,
      dWidth,
      dHeight
    );
    ctx.restore();
  }
}

export default Character;
