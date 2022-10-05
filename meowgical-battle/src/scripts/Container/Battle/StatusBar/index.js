import * as PIXI from "pixi.js";
import HpBar from "./HpBar";
import Portrait from "./Portrait";

export default class StatusBar {
  constructor({ x, y, isHost }) {
    this.x = x;
    this.y = y;
    this.isHost = isHost;

    this.portraitHpBarDistance = 150;

    this.portraitXOffset = -(this.portraitHpBarDistance) - 50;
    this.portraitYOffset = 0;

    this.hpBarXOffset = this.portraitHpBarDistance - 50;
    this.hpBarYOffset = 0;
    this.hpBarOption = {
      x: this.x + this.hpBarXOffset,
      y: this.y + this.hpBarYOffset,
    };
    this.portraitOption = {
      x: this.x + this.portraitXOffset,
      y: this.y + this.portraitYOffset,
      isHost: this.isHost,
    };

    this.container = new PIXI.Container();

    this.hpBar = null;
    this.portrait = null;
    this.createHpBar();
    this.createPortrait();

    this.render();
  }

  createHpBar() {
    this.hpBar = new HpBar(this.hpBarOption);
  }

  createPortrait() {
    this.portrait = new Portrait(this.portraitOption);
  }

  beHit(damage) {
    const newHp = this.hpBar.hpPercentage - damage;

    this.hpBar.renewHp(newHp);
    this.portrait.beHit();
  }

  render() {
    this.container.addChild(
      this.portrait.container,
      this.hpBar.container
    );
  }
}
