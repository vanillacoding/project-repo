class PitchPoint {
  constructor(point, images) {
    this.img = images[point.pointer.index];

    this.posX = point.posX;
    this.posY = point.posY;
    this.range = point.pointer.range;
  }

  draw(ctx) {
    ctx.save();
    ctx.drawImage(
      this.img,
      this.posX,
      this.posY + (this.range - 40),
      40,
      40
    );
    ctx.restore();
  }

  checkCharacterReached(characterX, characterY) {
    return (
      (this.posY + this.range) === characterY &&
      this.posX <= characterX &&
      characterX <= (this.posX + this.range)
    );
  }
}

export default PitchPoint;
