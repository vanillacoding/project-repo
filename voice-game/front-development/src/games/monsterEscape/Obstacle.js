class Obstacle{
  constructor(gameMap, canvasWidth) {
    this.gameMap = gameMap;
    this.canvasWidth = canvasWidth;
  }

  animate(ctx, speed) {
    this.gameMap.forEach((point) => (point.posX -= speed));

    const firstPoint = this.gameMap[0];
    const secondPoint = this.gameMap[1];
    const lastPoint = this.gameMap[this.gameMap.length - 1];
    const gap = secondPoint.posX - firstPoint.posX;

    if (firstPoint.posX < -gap) {
      firstPoint.posX = lastPoint.posX + gap;
      this.gameMap.push(firstPoint);
      this.gameMap.shift();
    }

    for (let i = 0; i < this.gameMap.length; i++) {
      const { posX, posY, width, height, image } = this.gameMap[i];
      ctx.drawImage(image, posX, posY, width, height);
    }
  };
}

export default Obstacle;
