class ControlBox {
  constructor(canvasWidth, canvasHeight, images) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.images = images.controlBoxes.controlBox;
  }

  playBtnHeight = 0;
  playBtnWidth = 0;
  playBtnPosX = 0;
  playBtnPosY = 0;
  upBtnHeight = 0;
  upBtnWidth = 0;
  upBtnPosX = 0;
  upBtnPosY = 0;
  downBtnHeight = 0;
  downBtnWidth = 0;
  downBtnPosX = 0;
  downBtnPosY = 0;
  plusBtnHeight = 0;
  plusBtnWidth = 0;
  plusBtnPosX = 0;
  plusBtnPosY = 0;
  minusBtnHeight = 0;
  minusBtnWidth = 0;
  minusBtnPosX = 0;
  minusBtnPosY = 0;

  animate(ctx, isPlay, speed, volumeData) {
    const MAX_VOL_DISP = 10;

    const { volume, volThreshold } = volumeData;
    const ctrlBox = this.images.controlBox;
    const playBtn = this.images.playButton;
    const replayBtn = this.images.replayButton;
    const minusBtn = this.images.minusButton;
    const plusBtn = this.images.plusButton;
    const downBtn = this.images.downButton;
    const upBtn = this.images.upButton;
    const volumeIcon = this.images.volumeIcon;
    const speedIcon = this.images.speedIcon;

    const ctrlBoxAspectRatio = ctrlBox.width / ctrlBox.height;
    const ctrlBoxHeight = 0.2 * this.canvasHeight;
    const ctrlBoxWidth = ctrlBoxAspectRatio * ctrlBoxHeight;
    const ctrlBoxPosX = 0.01 * this.canvasWidth;
    const ctrlBoxPosY = 0.8 * this.canvasHeight;

    const playBtnAspectRatio = playBtn.width / playBtn.height;
    const playBtnHeight = ctrlBoxHeight / 3;
    const playBtnWidth = playBtnAspectRatio * playBtnHeight;
    const playBtnPosX = ctrlBoxPosX + 0.05 * ctrlBoxWidth;
    const playBtnPosY = ctrlBoxPosY + 0.5 * ctrlBoxHeight - 0.5 * playBtnHeight;

    const batSpeedAspectRatio = speedIcon.width / speedIcon.height;
    const batSpeedHeight = 0.2 * ctrlBoxHeight;
    const batSpeedWidth = batSpeedAspectRatio * batSpeedHeight;
    const batSpeedPosX = ctrlBoxPosX + 0.3 * ctrlBoxWidth;
    const batSpeedPosY = ctrlBoxPosY + 0.5 * ctrlBoxHeight - 0.5 * batSpeedHeight;

    const upBtnAspectRatio = upBtn.width / upBtn.height;
    const upBtnHeight = ctrlBoxHeight * 0.15;
    const upBtnWidth = upBtnAspectRatio * upBtnHeight;
    const upBtnPosX = ctrlBoxPosX + batSpeedPosX + 0.1 * ctrlBoxWidth;
    const upBtnPosY = ctrlBoxPosY + 0.2 * ctrlBoxHeight;

    const downBtnAspectRatio = downBtn.width / downBtn.height;
    const downBtnHeight = upBtnHeight;
    const downBtnWidth = downBtnAspectRatio * downBtnHeight;
    const downBtnPosX = upBtnPosX;
    const downBtnPosY = ctrlBoxPosY + ctrlBoxHeight - downBtnHeight - 0.2 * ctrlBoxHeight;

    const settingSpdFontSize = 0.15 * ctrlBoxHeight;
    const settingSpdPosY =
      upBtnPosY + upBtnHeight + 0.5 * (downBtnPosY - upBtnPosY) - 0.2 * settingSpdFontSize;
    const settingSpdPosX = upBtnPosX + 0.045 * ctrlBoxWidth;

    const volIconAspectRatio = volumeIcon.width / volumeIcon.height;
    const volIconHeight = 0.2 * ctrlBoxHeight;
    const volIconWidth = volIconAspectRatio * volIconHeight;
    const volIconPosX = ctrlBoxPosX + 0.6 * ctrlBoxWidth;
    const volIconPosY = ctrlBoxPosY + 0.5 * ctrlBoxHeight - 0.5 * volIconHeight;

    const plusBtnAspectRatio = plusBtn.width / plusBtn.height;
    const plusBtnHeight = ctrlBoxHeight * 0.15;
    const plusBtnWidth = plusBtnAspectRatio * plusBtnHeight;
    const plusBtnPosX = ctrlBoxPosX + volIconPosX + 0.1 * ctrlBoxWidth;
    const plusBtnPosY = ctrlBoxPosY + 0.2 * ctrlBoxHeight;

    const minusBtnAspectRatio = minusBtn.width / minusBtn.height;
    const minusBtnHeight = plusBtnHeight;
    const minusBtnWidth = minusBtnAspectRatio * minusBtnHeight;
    const minusBtnPosX = plusBtnPosX;
    const minusBtnPosY = ctrlBoxPosY + ctrlBoxHeight - minusBtnHeight - 0.2 * ctrlBoxHeight;

    const settingVolFontSize = 0.15 * ctrlBoxHeight;
    const settingVolPosY =
      plusBtnPosY + plusBtnHeight + 0.5 * (minusBtnPosY - plusBtnPosY) - 0.2 * settingVolFontSize;
    const settingVolPosX = plusBtnPosX + 0.045 * ctrlBoxWidth;

    const volBarPosX = plusBtnPosX + 0.15 * ctrlBoxWidth;
    const volBarPosY = plusBtnPosY + plusBtnHeight;
    const volBarWidth = 0.05 * ctrlBoxWidth;
    const volBarHeight = minusBtnPosY - plusBtnPosY;

    const volumeFontSize = 0.1 * ctrlBoxHeight;
    const volumePosY = plusBtnPosY + 0.1 * ctrlBoxHeight;
    const volumePosX = volBarPosX + 0.02 * ctrlBoxWidth;
    const volDisp = Math.round(10 * volume) / 10;

    const volDispBar = Math.max(MAX_VOL_DISP, volBarHeight * (volDisp / MAX_VOL_DISP));
    const settingVolDispBar = volBarHeight * (volThreshold / MAX_VOL_DISP);

    this.playBtnHeight = playBtnHeight;
    this.playBtnWidth = playBtnWidth;
    this.playBtnPosX = playBtnPosX;
    this.playBtnPosY = playBtnPosY;

    this.upBtnHeight = upBtnHeight;
    this.upBtnWidth = upBtnWidth;
    this.upBtnPosX = upBtnPosX;
    this.upBtnPosY = upBtnPosY;

    this.downBtnHeight = downBtnHeight;
    this.downBtnWidth = downBtnWidth;
    this.downBtnPosX = downBtnPosX;
    this.downBtnPosY = downBtnPosY;

    this.plusBtnHeight = plusBtnHeight;
    this.plusBtnWidth = plusBtnWidth;
    this.plusBtnPosX = plusBtnPosX;
    this.plusBtnPosY = plusBtnPosY;

    this.minusBtnHeight = minusBtnHeight;
    this.minusBtnWidth = minusBtnWidth;
    this.minusBtnPosX = minusBtnPosX;
    this.minusBtnPosY = minusBtnPosY;

    ctx.drawImage(ctrlBox, ctrlBoxPosX, ctrlBoxPosY, ctrlBoxWidth, ctrlBoxHeight);

    ctx.drawImage(volumeIcon, volIconPosX, volIconPosY, volIconWidth, volIconHeight);
    ctx.drawImage(plusBtn, plusBtnPosX, plusBtnPosY, plusBtnWidth, plusBtnHeight);
    ctx.font = `bold ${settingSpdFontSize}px sans-serif`;
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(speed, settingSpdPosX, settingSpdPosY);
    ctx.drawImage(minusBtn, minusBtnPosX, minusBtnPosY, minusBtnWidth, minusBtnHeight);

    ctx.drawImage(speedIcon, batSpeedPosX, batSpeedPosY, batSpeedWidth, batSpeedHeight);
    ctx.drawImage(upBtn, upBtnPosX, upBtnPosY, upBtnWidth, upBtnHeight);
    ctx.font = `bold ${settingVolFontSize}px sans-serif`;
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(volThreshold, settingVolPosX, settingVolPosY);
    ctx.drawImage(downBtn, downBtnPosX, downBtnPosY, downBtnWidth, downBtnHeight);

    ctx.font = `bold ${volumeFontSize}px sans-serif`;
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(volDisp, volumePosX, volumePosY);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(volBarPosX, volBarPosY, volBarWidth, volBarHeight);
    ctx.fillStyle = "black";
    ctx.fillRect(volBarPosX, volBarPosY + Math.max(0, volBarHeight - volDispBar), volBarWidth, volDispBar);

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "red";
    ctx.moveTo(volBarPosX, volBarPosY + volBarHeight - settingVolDispBar);
    ctx.lineTo(volBarPosX + volBarWidth, volBarPosY + volBarHeight - settingVolDispBar);
    ctx.stroke();
    ctx.closePath();

    if (isPlay) {
      ctx.drawImage(replayBtn, playBtnPosX, playBtnPosY, playBtnWidth, playBtnHeight);
    } else {
      ctx.drawImage(playBtn, playBtnPosX, playBtnPosY, playBtnWidth, playBtnHeight);
    }
  }
}

export default ControlBox;
