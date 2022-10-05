class PlayInfo {
  constructor (canvasWidth, canvasHeight, images, fps){
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.images = images.playInfos.playInfo;
    this.fps = fps;
  }

  animate (ctx, characterInfo, gameStatus, frame) {
    const { distance, life, maxLife, isWinner } = characterInfo;
    const { goalDistance, isPlay, isFinished } = gameStatus;
    const { getReady, victory, youLose } = this.images;

    const heart = this.images.heart;
    const lifeBoxWidth = 0.2 * this.canvasWidth;
    const lifeBoxGap = lifeBoxWidth / maxLife;
    const lifeBoxPosX = 0.02 * this.canvasWidth;
    const lifeBoxPosY = 0.1 * this.canvasHeight;
    const lifeWidth = lifeBoxGap - 0.005 * this.canvasWidth;

    for (let i = 0; i < life; i++) {
      ctx.drawImage(
        heart,
        lifeBoxPosX + lifeBoxGap * i,
        lifeBoxPosY,
        lifeWidth,
        lifeWidth * (heart.height / heart.width),
      );
    }

    ctx.font = `900 ${0.03 * this.canvasWidth}px sans-serif`;
    ctx.textAlign = "left";
    ctx.fillStyle = "#7B1FA2";
    ctx.fillText(
      "남은거리",
      0.03 * this.canvasWidth,
      0.08 * this.canvasHeight,
    );
    ctx.textAlign = "right";
    ctx.fillText(
      `${Math.max(Math.floor(100 * (goalDistance - distance / this.canvasWidth)), 0)} m`,
      0.23 * this.canvasWidth,
      0.08 * this.canvasHeight,
    );

    if (!isPlay || isFinished) {
      let gameStatusImg;

      if (!isPlay) { gameStatusImg = getReady }

      if (isFinished) {
        if (isWinner) {
          gameStatusImg = victory;
        } else {
          gameStatusImg = youLose;
        }
      }

      const gap = gameStatusImg.width / this.fps;
      const width = 0.5 * this.canvasWidth;
      const height = width * (gameStatusImg.height / gap);

      ctx.drawImage(
        gameStatusImg,
        gap * frame,
        0,
        gap,
        gameStatusImg.height,
        this.canvasWidth / 2 - width / 2,
        this.canvasHeight / 2 - height / 2,
        width,
        height,
      );
    }
  };
}

export default PlayInfo;
