import * as PIXI from 'pixi.js';

import WateringCan from './WateringCan';
import Nail from './Nail';

export default class WateringContainer {
  constructor(app, isDead, isTimeTravelMode, plantContainer) {
    this.app = app;
    this.plantContainer = plantContainer;
    this.container = new PIXI.Container();
    this.wateringCan = null;
    this.nail = null;
    this.isDead = isDead;
    this.isTimeTravelMode = isTimeTravelMode;

    this.createSprite();
    this.render();
  }

  createSprite() {
    this.wateringCan = new WateringCan(
      this.app,
      this.app.screen.width / 2 + 350,
      380,
      this.plantContainer,
      this.isDead,
    );
    this.nail = new Nail(this.app.screen.width / 2 + 386, 387);
  }

  render() {
    if (!this.isTimeTravelMode) {
      this.container.addChild(this.wateringCan, this.nail);
    }
  }
}
