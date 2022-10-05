import * as PIXI from 'pixi.js';
const TextureCache = PIXI.utils.TextureCache;

export default class Nail extends PIXI.Sprite {
  constructor(x = 0, y = 0) {
    const texture = TextureCache['nail'];
    super(texture);

    this.anchor.set(0);
    this.width = 13;
    this.height = 13;
    this.x = x;
    this.y = y;
  }
}
