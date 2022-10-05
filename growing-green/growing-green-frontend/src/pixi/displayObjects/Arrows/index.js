import * as PIXI from 'pixi.js';
import Arrow from '../Arrows/Arrow';

export default class Background {
  constructor(app, name, species, isBlindUp = true, plantId, penaltyPoints) {
    this.app = app;

    this.container = new PIXI.Container();
    this.leftArrow = null;
    this.rightArrow = null;
    this.createSprite();

    this.render();
  }

  createSprite() {
    this.leftArrow = new Arrow(200, 260, 'leftArrow');
    this.rightArrow = new Arrow(1000, 260, 'rightArrow');
  }

  render() {
    this.container.addChild(this.leftArrow, this.rightArrow);
  }
}
