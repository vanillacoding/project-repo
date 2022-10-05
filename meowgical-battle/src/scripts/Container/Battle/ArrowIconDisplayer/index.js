import * as PIXI from "pixi.js";
import globalStore from "../../../globalStore";

export default class ArrowIconDisplayer {
  constructor({ color, size, position }) {
    this.color = color;
    this.arrowInitialPosition = position;
    this.arrowSize = size;

    this.container = new PIXI.Container();
    this.container.sortableChildren = true;

    this.loadArrowIconTextures();

    this.arrows = [];
    this.arrowPosition = { ...this.arrowInitialPosition };
  }

  loadArrowIconTextures() {
    if (this.color === "orange") {
      const {
        orangeLeftArrow,
        orangeRightArrow,
        orangeUpArrow,
        orangeDownArrow,
      } = globalStore.getItem("resources");

      this.leftArrowTexture = orangeLeftArrow.texture;
      this.rightArrowTexture = orangeRightArrow.texture;
      this.upArrowTexture = orangeUpArrow.texture;
      this.downArrowTexture = orangeDownArrow.texture;
    } else {
      const {
        blueLeftArrow,
        blueRightArrow,
        blueUpArrow,
        blueDownArrow,
      } = globalStore.getItem("resources");

      this.leftArrowTexture = blueLeftArrow.texture;
      this.rightArrowTexture = blueRightArrow.texture;
      this.upArrowTexture = blueUpArrow.texture;
      this.downArrowTexture = blueDownArrow.texture;
    }
  }

  createArrowIcon(direction) {
    let arrow = null;
    const {
      x: arrowXPos,
      y: arrowYPos,
    } = this.arrowPosition;

    switch (direction) {
      case "left":
        arrow = new PIXI.Sprite(this.leftArrowTexture);
        break;
      case "right":
        arrow = new PIXI.Sprite(this.rightArrowTexture);
        break;
      case "up":
        arrow = new PIXI.Sprite(this.upArrowTexture);
        break;
      case "down":
        arrow = new PIXI.Sprite(this.downArrowTexture);
        break;
      default:
        break;
    }

    arrow.x = arrowXPos;
    arrow.y = arrowYPos;
    arrow.width = this.arrowSize.width;
    arrow.height = this.arrowSize.height;

    this.arrowPosition.x += arrow.width;

    this.arrows.push(arrow);
    this.container.addChild(arrow);
  }

  clearArrowIcons() {
    for (let i = 0; i < this.arrows.length; i += 1) {
      this.container.removeChild(this.arrows[i]);
    }

    this.arrowPosition = { ...this.arrowInitialPosition };
  }
}
