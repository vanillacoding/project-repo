import * as PIXI from "pixi.js";
import { canvasSize } from "../../../config";
import createButton from "../../../pixiUtils/createButton";

export default class Menu {
  constructor({ offsetX, offsetY }, ...buttonInfos) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.buttonInfos = buttonInfos;

    this.container = new PIXI.Container();
    this.menuButtons = [];
    this.createMenu();

    this.render();
  }

  createMenu() {
    for (let i = 0; i < this.buttonInfos.length; i += 1) {
      const buttonInfo = this.buttonInfos[i];
      const currentButtonY = this.offsetY + (150 * i);

      const buttonBoxOption = {
        width: 350,
        height: 100,
        x: canvasSize.width / 2 + this.offsetX,
        y: canvasSize.height + currentButtonY,
        color: 0xffffff,
        borderWidth: 10,
        borderColor: buttonInfo.borderColor,
      };

      const buttonTextOption = {
        fontFamily: "sans-serif",
        fontSize: 60,
        align: "center",
      };

      const button = createButton(
        buttonBoxOption,
        buttonInfo.text,
        buttonTextOption,
        buttonInfo.event
      );

      this.menuButtons.push(button);
    }
  }

  render() {
    this.container.addChild(...this.menuButtons);
  }
}
