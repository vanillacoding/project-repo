import * as PIXI from 'pixi.js';

export default class Guage extends PIXI.Sprite {
  constructor(texture, x, y, color) {
    super(texture);

    this.anchor.set(0);
    this.x = x;
    this.y = y;
    this.color = color;

    const mask = new PIXI.Graphics()
      .beginFill(0xff00ff)
      .drawRoundedRect(this.x, this.y, 400, 50, 25);

    this.mask = mask;
  }
}
