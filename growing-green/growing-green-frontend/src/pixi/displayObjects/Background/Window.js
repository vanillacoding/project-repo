import * as PIXI from 'pixi.js';
const TextureCache = PIXI.utils.TextureCache;

export default class Window extends PIXI.Sprite {
  constructor(x = 0, y = 0) {
    const texture = TextureCache['openWindow'];
    super(texture);

    this.anchor.set(0.5);
    this.width = 680;
    this.height = 530;
    this.x = x;
    this.y = y;
  }
}
