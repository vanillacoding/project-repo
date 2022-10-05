import * as PIXI from 'pixi.js';
const TextureCache = PIXI.utils.TextureCache;

export default class Arrow extends PIXI.Sprite {
  constructor(x = 0, y = 0, type) {
    super(TextureCache[type]);

    this.anchor.set(0.5);
    this.width = 150;
    this.height = 150;
    this.x = x;
    this.y = y;
    this.interactive = true;
    this.buttonMode = true;
  }
}
