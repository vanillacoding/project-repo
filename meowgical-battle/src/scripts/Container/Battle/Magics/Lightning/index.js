import * as PIXI from "pixi.js";
import Magic from "..";
import globalStore from "../../../../globalStore";

export default class Lightning extends Magic {
  constructor(option) {
    super(option);

    const {
      lightning1,
      lightning2,
    } = globalStore.getItem("resources");

    this.lightningTextures = [
      ...Object.values(lightning1.textures),
      ...Object.values(lightning2.textures),
    ];

    this.x += this.xOffset;
    this.damage = 45;
    this.anchor = {
      x: 0.5,
      y: 0.96,
    };
    this.animationSpeed = 0.5;

    this.sprite = null;
    this.createSprite();
  }

  createSprite() {
    this.sprite = new PIXI.AnimatedSprite(
      this.lightningTextures
    );

    this.setSpriteProperties(this.sprite);
    this.sprite.loop = false;
  }

  checkIsHit({
    rowIndex: toBeHitObjectRowIndex,
    columnIndex: toBeHitObjectColumnIndex,
  }) {
    const isHit = toBeHitObjectRowIndex === this.rowIndex &&
      toBeHitObjectColumnIndex === this.columnIndex;

    this.isAbleToHit = !(isHit);

    return isHit;
  }

  start() {
    if (this.startCallback) {
      this.startCallback(this);
    }

    this.container.addChild(this.sprite);

    this.sprite.onFrameChange = (frameNumber) => {
      if (frameNumber === 9) {
        this.isAbleToHit = false;
      }
    };
    this.sprite.onComplete = () => {
      this.terminate();
    };

    this.sprite.play();
  }
}
