import * as PIXI from 'pixi.js';
const TextureCache = PIXI.utils.TextureCache;

export default class Blind extends PIXI.Sprite {
  constructor(x = 0, y = 0) {
    const texture = TextureCache['blind1.png'];
    super(texture);

    this.anchor.set(0.5);
    this.width = 470;
    this.height = 55;
    this.x = x;
    this.y = y;
  }
}
