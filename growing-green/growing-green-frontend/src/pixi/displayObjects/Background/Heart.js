import * as PIXI from 'pixi.js';
const TextureCache = PIXI.utils.TextureCache;

export default class Heart extends PIXI.Sprite {
  constructor(x = 0, y = 0) {
    super(TextureCache['heart']);

    this.anchor.set(0.5);
    this.width = 54;
    this.height = 50;
    this.x = x;
    this.y = y;
  }
}
