class Monster {
  constructor(canvasWidth, canvasHeight, images, player, size, life, fps) {
    this.images = images.characters.bat;
    this.player = player;
    this.size = size;
    this.life = life;
    this.maxLife = life;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fps = fps;
    this.setPosition();
  }

  isWinner = false;
  distance = 0;
  shieldTime = 0;
  posX = 0;
  posY = 0;
  width = 0;
  height = 0

  setPosition() {
    const image = this.images.normal;
    this.width = this.size * this.canvasWidth;
    this.height = this.width * image.height / (image.width / this.fps);
    this.posX = 0.5 * (this.canvasWidth - this.width);
    this.posY = 0.5 * (this.canvasHeight - this.height);
  };

  setIsCollision(obstacles, shieldTime, level) {
    let levelFactor;

    switch (level) {
      case "easy":
        levelFactor = 0;
        break;
      case "normal":
        levelFactor = 0.3;
        break;
      case "hard":
        levelFactor = 0.5;
        break;
      default:
        levelFactor = 0.7;
    }

    this.shieldTime = Math.max(this.shieldTime - 1, 0);
    if (this.shieldTime) { return }

    for (let i = 0; i < obstacles.length; i++) {
      const points = obstacles[i].gameMap;

      const nearObstacles = points.filter((layout) => {
        const { posX, posY, width, height } = layout;

        const centerX = 0.5 * this.width;
        const centerY = 0.5 * this.height;
        const calibratedW = this.width * levelFactor;
        const calibratedH = this.height * levelFactor;
        const calibratedX = this.posX + centerX - 0.5 * calibratedW;
        const calibratedY = this.posY + centerY - 0.5 * calibratedH;

        const isXCollision =
          ((calibratedX >= posX) && (calibratedX <= posX + width)) ||
          ((calibratedX + calibratedW >= posX) && (calibratedX + calibratedW <= posX + width));

        const isYCollision =
          ((calibratedY >= posY) && (calibratedY <= posY + height)) ||
          ((calibratedY + calibratedH >= posY) && (calibratedY + calibratedH <= posY + height));

        return isXCollision && isYCollision;
      });

      if (nearObstacles.length) {
        this.shieldTime = shieldTime;
        this.isCollision = true;

        return;
      }
    }

    this.isCollision = false;
  };

  animate(ctx, speed, volumeData, frame) {
    const { spdX, spdY } = speed;
    const { volume, volThreshold } = volumeData;
    let image = this.images.normal;

    if (volume > 2 * volThreshold) {
      this.posY -= 2 * spdY;
    } else if (volume > volThreshold) {
      this.posY -= spdY;
    } else {
      this.posY += spdY;
    }

    if (this.posY >= this.canvasHeight - this.height) {
      this.posY = this.canvasHeight - this.height;
    }

    if (this.posY <= 0) { this.posY = 0 }

    if (this.isCollision) {
      this.life = Math.max(0, this.life - 1);
      this.isCollision = false;
    }

    if (this.life) { this.distance += spdX };

    if (this.shieldTime) { image = this.images.collision }

    if (!this.life) { image = this.images.dead }

    const gap = image.width / this.fps;

    ctx.font = `900 ${0.015 * this.canvasWidth}px sans-serif`;
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.fillText(this.player.name, this.posX + 0.55 * this.width, this.posY);

    ctx.drawImage(
      image,
      gap * frame,
      0,
      gap,
      image.height,
      this.posX,
      this.posY,
      this.width,
      this.height,
    );
  };
}

export default Monster;
