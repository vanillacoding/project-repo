import * as PIXI from 'pixi.js';
import { GlowFilter } from 'pixi-filters';
import { isMouseXOver, isMouseYOver } from '../../../utils/isMouseOver';

const TextureCache = PIXI.utils.TextureCache;

export default class PullSwitch extends PIXI.Sprite {
  constructor(x = 0, y = 0) {
    const texture = TextureCache['pullSwitch'];
    super(texture);

    this.anchor.set(0);
    this.width = 15;
    this.height = 240;
    this.x = x;
    this.y = y;

    this.isMouseOver = false;
    this.isMouseClick = false;

    this.interactive = true;
    this.buttonMode = true;

    this.filter = new GlowFilter(0, 2, 0xfff8b3);
    this.filters = [this.filter];

    this.on('pointerup', this.sizeUp);
    this.on('pointerdown', this.sizeDown);
    this.on('pointermove', this.addGlowFilter);

    this.blind = null;
  }

  sizeDown() {
    this.width = this.width * 1.06;
    this.height = this.height * 1.05;
    this.isMouseClick = true;
  }

  sizeUp() {
    this.width = 13;
    this.height = 230;
  }

  addGlowFilter(e) {
    if (e.data === undefined) return;
    const position = e.data.global;

    const isMouseOver =
      isMouseXOver(position.x, this.x, this.x + this.width) &&
      isMouseYOver(position.y, this.y, this.y + this.height);

    if (isMouseOver === true) {
      this.filter.uniformGroup.uniforms.outerStrength = 5;
    } else {
      this.filter.uniformGroup.uniforms.outerStrength = 0;
    }
  }
}
