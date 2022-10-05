import * as PIXI from "pixi.js";
import createBox from "../../../pixiUtils/createBox";

export default class HpBar {
  constructor({ x, y, hpPercentage = 100 }) {
    this.x = x;
    this.y = y;
    this.hpPercentage = hpPercentage;

    this.container = new PIXI.Container();

    this.hpBarFirstColor = 0x67fa3e;
    this.hpBarSecondColor = 0xf5ef42;
    this.hpBarThirdColor = 0xff1c14;
    this.hpBarLength = 350;

    this.hpBarBackgroundOption = {
      x: this.x,
      y: this.y,
      width: this.hpBarLength,
      height: 50,
      color: 0xeeeeee,
      radius: 20,
      pivotX: this.hpBarLength / 2,
      hasShadow: true,
    };

    this.hpBarOption = {
      x: this.x,
      y: this.y,
      width: (this.hpBarLength / 100) * this.hpPercentage,
      height: 50,
      color: this.hpBarFirstColor,
      radius: 20,
      pivotX: this.hpBarLength / 2,
      hasShadow: false,
    };

    this.hpPercentageMin = 0;

    this.hpBarBackground = null;
    this.hpBar = null;
    this.createHpBarBackground();
    this.createHpBar();

    this.render();
  }

  createHpBarBackground() {
    this.hpBarBackground = createBox(this.hpBarBackgroundOption);
  }

  createHpBar() {
    this.hpBarOption.width =
      (this.hpBarLength / 100) * this.hpPercentage;

    if (this.hpPercentage < 70 && this.hpPercentage >= 40) {
      this.hpBarOption.color = this.hpBarSecondColor;
    } else if (this.hpPercentage < 40) {
      this.hpBarOption.color = this.hpBarThirdColor;
    }

    this.hpBar = createBox(this.hpBarOption);
  }

  render() {
    this.container.addChild(
      this.hpBarBackground,
      this.hpBar
    );
  }

  renewHp(newHpPercentage) {
    if (newHpPercentage < this.hpPercentageMin) {
      this.hpPercentage = this.hpPercentageMin;
    } else {
      this.hpPercentage = newHpPercentage;
    }

    this.container.removeChild(this.hpBar);
    this.createHpBar();
    this.container.addChild(this.hpBar);
  }
}
