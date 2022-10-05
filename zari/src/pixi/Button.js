import * as PIXI from 'pixi.js';

const TextureCache = PIXI.utils.TextureCache;
const Sprite = PIXI.Sprite;

export default class Button {
  constructor(type, x, y) {
    const texture = TextureCache[type];
    texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

    this.sprite = new Sprite(texture);
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
  }
}
