import * as PIXI from "pixi.js";
import Magic from "..";
import globalStore from "../../../../globalStore";

export default class Turret extends Magic {
  constructor(option, turretMagic) {
    super(option);

    this.option = option;
    this.turretMagic = turretMagic;
    this.turretTexture = globalStore
      .getItem("resources")
      .turret
      .texture;

    this.anchor = {
      x: 0.55,
      y: 0.65,
    };

    this.timerId = null;
    this.intervalId = null;

    this.magicCastingIntervalTime = 1500;
    this.magicCastingCount = 0;
    this.magicCastingCountLimit = 8;

    this.sprite = null;
    this.createSprite();
  }

  createSprite() {
    this.sprite = new PIXI.Sprite(this.turretTexture);
    this.sprite.width = 450;
    this.sprite.height = 450;

    this.setSpriteProperties(this.sprite);
  }

  startCastingMagic() {
    this.intervalId = setInterval(() => {
      this.turretMagic(this.option);
      this.magicCastingCount += 1;

      if (this.magicCastingCount >= this.magicCastingCountLimit) {
        clearInterval(this.intervalId);
        this.terminate();
      }
    }, this.magicCastingIntervalTime);
  }

  start() {
    if (this.startCallback) {
      this.startCallback(this);
    }

    this.container.addChild(this.sprite);

    this.startCastingMagic();
  }
}
