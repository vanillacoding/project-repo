import * as PIXI from 'pixi.js';
import Blind from './Blind';
import PullSwitch from './PullSwitch';
import Window from './Window';
import Landscape from './LandScape';
import Heart from './Heart';
import Arrow from '../Arrows/Arrow';

import apiController from '../../../configs/apiController';

const TextureCache = PIXI.utils.TextureCache;

export default class Background {
  constructor(app, name, species, isBlindUp = true, plantId, penaltyPoints) {
    this.app = app;

    this.isBlindUp = isBlindUp;
    this.plantId = plantId;

    this.container = new PIXI.Container();
    this.animationBlind = null;
    this.pullSwitch = null;
    this.window = null;
    this.landscape = null;
    this.penaltyPointsCircle = null;
    this.leftArrow = null;
    this.rightArrow = null;
    this.lifePoints = `${10 - penaltyPoints}`;
    this.name = name;
    this.species = species;

    this.createSprite();

    this.app.windowWidth = this.window.width;
    this.render();
    this.app.ticker.add(this.handleBlind, this);
  }

  async handleBlind() {
    if (this.pullSwitch.isMouseClick === false) return;

    if (this.isBlindUp === true) {
      this.animationBlind.play();
      this.isBlindUp = false;
      this.animationBlind.animationSpeed = Math.abs(
        this.animationBlind.animationSpeed,
      );
    } else {
      this.animationBlind.animationSpeed = -Math.abs(
        this.animationBlind.animationSpeed,
      );
      this.animationBlind.play();
      this.isBlindUp = true;
    }

    this.pullSwitch.isMouseClick = false;
    await this.updateBlind();
  }

  async updateBlind() {
    await apiController.put(`plants/${this.plantId}`, {
      state: 'blind',
    });
  }

  createSprite() {
    let textures = [];

    if (this.isBlindUp === true) {
      for (let i = 1; i < 7; i++) {
        textures.push(TextureCache[`blind${i}.png`]);
      }
    } else {
      for (let i = 6; i > 0; i--) {
        textures.push(TextureCache[`blind${i}.png`]);
      }
    }

    this.animationBlind = new PIXI.AnimatedSprite(textures);
    this.animationBlind.anchor.set(0.5, 0);
    this.animationBlind.position.set(this.app.screen.width / 2, 30);

    if (this.isBlindUp === true) {
      this.animationBlind.animationSpeed = 0.45;
    } else {
      this.animationBlind.animationSpeed = -0.45;
    }

    this.animationBlind.width = 490;

    this.animationBlind.loop = false;

    this.blind = new Blind(this.app.screen.width / 2, 50, this.isBlindUp);
    this.pullSwitch = new PullSwitch(this.blind.x + this.blind.width / 2, 50);
    this.window = new Window(this.app.screen.width / 2, 265);
    this.landscape = new Landscape(
      this.app.screen.width / 2,
      this.window.height / 2 + 10,
    );

    this.nameText = new PIXI.Text(`${this.name}`, {
      fontFamily: 'GowunBatang-Regular',
      fontSize: 30,
      fontWeight: 600,
      fill: 0x000000,
      align: 'center',
    });
    this.nameText.anchor.set(0.5);
    this.nameText.x = this.app.screen.width / 2;
    this.nameText.y = 120;

    this.speciesText = new PIXI.Text(this.species, {
      fontFamily: 'GowunBatang-Regular',
      fontSize: 20,
      fill: 0x333333,
      align: 'center',
    });
    this.speciesText.anchor.set(0.5);
    this.speciesText.x = this.app.screen.width / 2;
    this.speciesText.y = 160;

    this.heart = new Heart(775, 105);
    this.pointText = new PIXI.Text(this.lifePoints, {
      fontFamily: 'GowunBatang-Regular',
      fontSize: 28,
      fill: 0xffffff,
      align: 'center',
      fontWeight: 700,
    });
    this.pointText.x = this.heart.x - this.pointText.width / 2;
    this.pointText.y = this.heart.y - this.pointText.height / 2;

    this.leftArrow = new Arrow(200, 260, 'leftArrow');
    this.rightArrow = new Arrow(1000, 260, 'rightArrow');
  }

  render() {
    this.container.addChild(
      this.landscape,
      this.window,
      this.animationBlind,
      this.pullSwitch,
      this.nameText,
      this.speciesText,
      this.heart,
      this.pointText,
    );
  }
}
