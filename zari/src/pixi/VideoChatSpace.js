import * as PIXI from 'pixi.js';
import { nanoid } from 'nanoid';

const TextureCache = PIXI.utils.TextureCache;
const Sprite = PIXI.Sprite;

export default class VideoChatSpace {
  constructor(type, x, y, id, isPreview) {
    this.sprite = new Sprite(TextureCache[type]);
    this.sprite.type = type;
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.spaceId = id ?? nanoid();

    if (isPreview) {
      const filter = new PIXI.filters.AlphaFilter(0.4);
      this.sprite.filters = [filter];
    }
  }
}
