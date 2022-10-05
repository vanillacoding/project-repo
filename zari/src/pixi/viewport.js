import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';

const Ticker = PIXI.Ticker.shared;
let viewport;

export function createViewport({ screenWidth, screenHeight, worldWidth, worldHeight, followingSprite }) {
  viewport = new Viewport({
    screenWidth,
    screenHeight,
    worldWidth,
    worldHeight,
    ticker: Ticker,
  });

  viewport.follow(followingSprite, {
    speed: 0,
    acceleration: null,
    radius: null,
  });

  viewport.clamp({
    direction: 'all',
    underflow: 'center',
  });

  viewport.fit();
  viewport.moveCenter(worldWidth / 2, worldHeight / 2);
  viewport.scaled = 2;

  return viewport;
}

export function addViewportChildren(children) {
  children.forEach(child => {
    children.forEach(child => viewport.addChild(child));
  })
}
