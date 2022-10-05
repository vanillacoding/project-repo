class Obstacle {
  constructor(info, images) {
    this.img = images[info.index].img;
    this.totalFrame = images[info.index].frame;

    this.sWidth = this.img.width / this.totalFrame;
    this.sHeigth = this.img.height;

    this.posX = info.posX;
    this.posY = info.posY;

    this.dWidth = info.width;
    this.dHeight = info.height;

    this.pivotX = info.posX + info.range;

    this.speed = info.speed;

    this.currentFrame = 0;
    this.frameSpeed = 20;
    this.fpsTime = 1000 / this.frameSpeed;
  }

  draw(ctx, characterController, timeStamp) {
    if (this.posX <= this.pivotX) {
      this.speed += 0.1;
    } else {
      this.speed -= 0.1;
    }

    this.posX += this.speed;
    this.collision(characterController);

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

    this.animate(ctx);
  }

  animate(ctx) {
    ctx.save();
    ctx.drawImage(
      this.img,
      this.sWidth * this.currentFrame,
      0,
      this.sWidth,
      this.sHeigth,
      this.posX,
      this.posY,
      this.dWidth,
      this.dHeight
    );
    ctx.restore();
  }

  collision(characterController) {
    const isHit = characterController.isHit;

    if (isHit) {
      return;
    }

    const width = characterController.character.width;
    const characterLeftX = characterController.posX;
    const characterRightX = characterLeftX + width;

    const height = characterController.character.height;
    const characterBottomY = characterController.posY;
    const characterUpperY = characterBottomY - height;

    const centerX = this.posX + (this.dWidth / 2);
    const centerY = this.posY + (this.dHeight / 2);

    const isXCollision =
    (characterLeftX <= centerX && centerX <= characterRightX);

    const isYCollision =
    (characterUpperY <= centerY && centerY <= characterBottomY);

    const speed = Math.floor(this.speed);

    if (isXCollision && isYCollision) {
      characterController.gravity -= 15;
      characterController.isHit = true;

      characterController.reaction += speed * 2;
    }
  }
}

export default Obstacle;
