class SkillEffect {
  constructor(imgObj, canvasWidth, canvasHeight) {
    this.imgObj = imgObj;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  mySkill(ctx, spriteCount, volumeSum, myVolumeSum) {
    ctx.drawImage(
      this.imgObj.fire,
      (this.imgObj.fire.width / 10) * (spriteCount % 10),
      0,
      this.imgObj.fire.width / 10,
      this.imgObj.fire.height,
      (myVolumeSum / volumeSum) * this.canvasWidth -
        (this.canvasWidth / 4 / 10) * 6.8,
      this.canvasHeight * 0.24,
      this.canvasWidth / 4,
      (this.canvasWidth / 4 / 10) * 9
    );
  }

  spark(ctx, spriteCount, volumeSum, myVolumeSum) {
    ctx.drawImage(
      this.imgObj.light,
      (this.imgObj.light.width / 4) * (spriteCount % 4),
      0,
      this.imgObj.light.width / 4,
      this.imgObj.light.height,
      (myVolumeSum / volumeSum) * this.canvasWidth -
        (this.canvasWidth / 4 / 10) * 5,
      this.canvasHeight * 0.3,
      this.canvasWidth / 4,
      (this.canvasWidth / 4 / 10) * 9
    );
  }

  otherSkill(ctx, spriteCount, volumeSum, otherVolumeSum) {
    ctx.drawImage(
      this.imgObj.ice,
      (this.imgObj.ice.width / 13) * (spriteCount % 13),
      0,
      this.imgObj.ice.width / 13,
      this.imgObj.ice.height,
      -this.canvasWidth +
        (otherVolumeSum / volumeSum) * this.canvasWidth -
        (this.canvasWidth / 4 / 10) * 6.8,
      this.canvasHeight * 0.27,
      this.canvasWidth / 4,
      (this.canvasWidth / 4 / 10) * 9
    );
  }
}

export default SkillEffect;
