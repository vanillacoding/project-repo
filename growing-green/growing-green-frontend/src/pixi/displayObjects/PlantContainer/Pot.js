import * as PIXI from 'pixi.js';
const TextureCache = PIXI.utils.TextureCache;

export default class Pot extends PIXI.Sprite {
  constructor(x = 0, y = 0) {
    const texture = TextureCache['plantPot'];
    super(texture);

    this.anchor.set(0);
    this.width = 95;
    this.height = 115;
    this.x = x - this.width / 2;
    this.y = y;
  }
}
