class Portal {
  constructor(info, image) {
    this.img = image.img;
    this.totalFrame = image.frame;

    this.sWidth = this.img.width / this.totalFrame;
    this.sHeight = this.img.height;

    this.dx = info.posX;
    this.dy = info.posY;

    this.dWidth = info.width;
    this.dHeight = info.height;

    this.currentFrame = 0;
    this.frameSpeed = 10;
    this.fpsTime = 1000 / this.frameSpeed;

    this.isPortalCall = false;
  }

  draw(ctx, characterController, timeStamp, getNextMap) {
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

    this.checkReachedPortal(characterController, getNextMap);
    this.animate(ctx);
  }

  animate(ctx) {
    ctx.save();
    ctx.drawImage(
      this.img,
      this.sWidth * this.currentFrame,
      0,
      this.sWidth,
      this.sHeight,
      this.dx,
      this.dy,
      this.dWidth,
      this.dHeight
    );
    ctx.restore();
  }

  checkReachedPortal(characterController, getNextMap) {
    const characterX = characterController.characterCenterX;
    const characterY = characterController.posY - 20;

    const checkX =
      this.dx <= characterX &&
      characterX <= this.dx + this.dWidth;
    const checkY =
      this.dy <= characterY &&
      characterY <= this.dy + this.dHeight;

    if (checkX && checkY && !this.isPortalCall) {
      this.isPortalCall = true;
      characterController.isInPortal = true;
      characterController.character.isInPortal = true;

      setTimeout(() => {
        getNextMap();
      }, 3000);
    }
  }
}

export default Portal;
