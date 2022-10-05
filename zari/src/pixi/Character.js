import * as PIXI from 'pixi.js';

const TextureCache = PIXI.utils.TextureCache;
const Sprite = PIXI.Sprite;
const Rectangle = PIXI.Rectangle;

const frame = new Rectangle(0, 0, 32, 32);

export default function createCharacterByType(type) {
  const texture = TextureCache[type];
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  texture.frame = frame;

  const sprite = new Sprite(texture);
  sprite.x = 52;
  sprite.y = 10;
  sprite.scale.set(3, 3);

  return sprite;
}
