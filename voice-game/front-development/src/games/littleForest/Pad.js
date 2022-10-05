import PitchPoint from "./PitchPoint";

class Pad {
  constructor(
    pitchDetectorRef,
    point,
    images
  ) {
    this.pitchDetector = pitchDetectorRef.current;

    this.pitchPoint = new PitchPoint(point, images.pitchPoints);

    this.img = images.pads[point.pad.index];

    this.dWidth = point.width;
    this.dHeight = point.height;

    this.posX = point.posX - point.pad.range;
    this.posY = point.posY;
    this.minX = this.posX;
    this.maxX = this.posX + point.pad.range - this.dWidth;

    this.pitchPivot = 100;
    this.speed = 1;
    this.correction = 20;

    this.ready = false;
    this.detectorOn = false;
  }

  draw(ctx, characterController) {
    this.chracterX = characterController.characterCenterX;
    this.chracterY = characterController.posY;

    this.pitchPoint.draw(ctx);

    ctx.save();
    ctx.drawImage(
      this.img,
      this.posX,
      this.posY - this.correction,
      this.dWidth,
      this.dHeight
    );
    ctx.restore();

    if (this.pitchPoint.checkCharacterReached(this.chracterX, this.chracterY)) {
      this.ready = true;
    } else {
      this.ready = false;

      if (this.minX < this.posX) {
        this.posX -= this.speed;
        this.checkOnBoard(characterController);
      }

      if (this.detectorOn) {
        this.pitchDetector.toggleLiveInput(false);
        this.detectorOn = false;
      }
    }

    if (this.ready) {
      this.movePad();
    }

    return {
      posX: this.posX,
      posY: this.posY,
      width: this.dWidth,
    };
  }

  async movePad() {
    if (!this.detectorOn) {
      this.pitchDetector.toggleLiveInput(true);

      this.detectorOn = true;
    }

    const pitch = this.pitchDetector.pitch;

    if (pitch * 2 < this.posX - this.minX && this.minX < this.posX) {
      this.posX -= this.speed;
    }

    if (this.posX - this.minX <= pitch * 2 && this.posX < this.maxX) {
      this.posX += this.speed;
    }
  }

  checkOnBoard(characterController) {
    if (this.posY !== this.chracterY) {
      return;
    }

    if (this.posY < this.chracterX && this.chracterX < this.posX + this.dWidth) {
      characterController.posX -= this.speed;
    }
  }
}

export default Pad;
