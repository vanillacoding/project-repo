import * as PIXI from "pixi.js";
import Tween from "@tweenjs/tween.js";
import Magic from "..";
import globalStore from "../../../../globalStore";

export default class Mine extends Magic {
  constructor(option) {
    super(option);

    const {
      mine,
      mineExplosion1,
      mineExplosion2,
    } = globalStore.getItem("resources");

    this.mineTexture = mine.texture;
    this.mineExplosionTextures = [
      ...Object.values(mineExplosion1.textures),
      ...Object.values(mineExplosion2.textures),
    ];

    this.x += this.xOffset;
    this.damage = 10;
    this.anchor = {
      x: 0.55,
      y: 0.53,
    };
    this.explosionSpriteAnchor = {
      x: 0.55,
      y: 0.9,
    };

    this.initZIndex();

    this.animationSpeed = 0.4;
    this.fadeInOutDuration = 500;
    this.explosionZIndexOffset = 0.5;

    this.sprite = null;
    this.explosionSprite = null;
    this.createSprite();
    this.createExplosionSprite();

    this.durationTime = 10000;

    this.handleHit = this.explode;

    this.damage = 15;
  }

  initZIndex() {
    this.container.zIndex = 0;
  }

  createSprite() {
    this.sprite = new PIXI.Sprite(
      this.mineTexture
    );
    this.sprite.width = 500;
    this.sprite.height = 500;

    this.setSpriteProperties(this.sprite);
    this.sprite.alpha = 0;
  }

  createExplosionSprite() {
    this.explosionSprite = new PIXI.AnimatedSprite(
      this.mineExplosionTextures
    );

    this.setSpriteProperties(this.explosionSprite);

    this.explosionSprite.loop = false;
    this.explosionSprite.anchor.set(
      this.explosionSpriteAnchor.x,
      this.explosionSpriteAnchor.y
    );
  }

  fadeIn() {
    const tween = new Tween.Tween(this.sprite);

    tween
      .to(
        { alpha: 1 },
        this.fadeInOutDuration
      );

    tween.start();
  }

  fadeOut() {
    this.isAbleToHit = false;

    const tween = new Tween.Tween(this.sprite);

    tween
      .to(
        { alpha: 0 },
        this.fadeInOutDuration
      )
      .onComplete(() => {
        this.terminate();
      });

    tween.start();
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

  explode() {
    clearTimeout(this.timerId);

    this.container.zIndex = this.rowIndex + this.explosionZIndexOffset;

    this.explosionSprite.x = this.x;
    this.explosionSprite.y = this.y;

    this.container.removeChild(this.sprite);
    this.container.addChild(this.explosionSprite);

    this.explosionSprite.play();
    this.explosionSprite.onComplete = () => {
      this.terminate();
    };
  }

  start() {
    if (this.startCallback) {
      this.startCallback(this);
    }

    this.container.addChild(this.sprite);
    this.fadeIn();

    this.timerId = setTimeout(() => {
      this.fadeOut();
    }, this.durationTime);
  }
}
