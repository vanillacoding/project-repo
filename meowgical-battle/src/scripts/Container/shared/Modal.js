import * as PIXI from "pixi.js";
import { canvasSize } from "../../config";
import createBox from "../../pixiUtils/createBox";

export default class Modal {
  constructor({
    boxOption,
    backgroundColor,
    handleBackgroundClick,
    zIndex = 10,
  }) {
    this.boxOption = boxOption;
    this.backgroundColor = backgroundColor;
    this.zIndex = zIndex;
    this.handleBackgroundClick = handleBackgroundClick;

    this.container = new PIXI.Container();
    this.container.sortableChildren = true;

    this.createWrapper();

    if (this.backgroundColor) {
      this.createBackground();
    }
  }

  createWrapper() {
    this.wrapper = createBox(this.boxOption);
  }

  createBackground() {
    this.background = createBox({
      x: canvasSize.width / 2,
      y: canvasSize.height / 2,
      width: canvasSize.width,
      height: canvasSize.height,
      color: this.backgroundColor,
      alpha: 0.5,
    });

    this.background.zIndex = this.zIndex;
    this.background.interactive = true;

    if (this.handleBackgroundClick) {
      this.background.on("pointerdown", this.handleBackgroundClick);
    }
  }
}
