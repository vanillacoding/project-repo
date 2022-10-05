import * as PIXI from "pixi.js";
import Modal from "../../shared/Modal";
import { canvasSize } from "../../../config";
import createButton from "../../../pixiUtils/createButton";

export default class ResultModal extends Modal {
  constructor(boxOption, isWin, handleButtonClick) {
    super({ boxOption });

    this.isWin = isWin;
    this.handleButtonClick = handleButtonClick;

    if (this.isWin) {
      this.textContent = "승리!";
    } else {
      this.textContent = "패배";
    }

    this.buttonYOffset = 80;
    this.textYOffset = -80;

    this.buttonBoxOption = {
      width: 200,
      height: 80,
      x: canvasSize.width / 2,
      y: canvasSize.height / 2 + this.buttonYOffset,
      color: 0xffffff,
      borderWidth: 8,
      borderColor: 0x5c5c5c,
      radius: 5,
    };
    this.buttonTextContent = "메인메뉴로";
    this.buttonTextOption = {
      fontFamily: "sans-serif",
      fontSize: 40,
      align: "center",
      fill: 0x5c5c5c,
    };

    this.createText();
    this.createMainMenuLinkButton();

    this.render();
  }

  createText() {
    this.text = new PIXI.Text(
      this.textContent,
      {
        fill: this.isWin ? 0x1e90ff : 0xd11137,
        align: "center",
        fontFamily: "sans-serif",
        fontSize: 70,
        fontWeight: "bold",
      }
    );
    this.text.anchor.set(0.5, 0.5);
    this.text.x = canvasSize.width / 2;
    this.text.y = canvasSize.height / 2 + this.textYOffset;
  }

  createMainMenuLinkButton() {
    this.mainMenuLinkButton = createButton(
      this.buttonBoxOption,
      this.buttonTextContent,
      this.buttonTextOption,
      this.handleButtonClick
    );
  }

  render() {
    this.container.addChild(
      this.wrapper,
      this.mainMenuLinkButton,
      this.text
    );
  }
}
