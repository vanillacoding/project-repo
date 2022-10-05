import * as PIXI from "pixi.js";
import { canvasSize } from "../../../config";
import createButton from "../../../pixiUtils/createButton";
import createBox from "../../../pixiUtils/createBox";
import copyToClipboard from "../../../utils/copyToClipboard";

export default class InvitationCodeBox {
  constructor(playerId) {
    this.playerId = playerId;
    this.container = new PIXI.Container();

    this.wrapper = null;
    this.title = null;
    this.invitationCode = null;
    this.copyButton = null;

    this.createWrapper();
    this.createTitle();
    this.createContents();

    this.render();
  }

  createWrapper() {
    this.wrapper = createBox({
      width: 500,
      height: 600,
      x: canvasSize.width / 2 + 300,
      y: canvasSize.height / 2,
      color: 0xffffff,
      borderWidth: 10,
      borderColor: 0x82c9f5,
    });
  }

  createTitle() {
    this.title = new PIXI.Text(
      "초대코드",
      {
        fontFamily: "sans-serif",
        fontSize: 50,
        align: "center",
      }
    );
    this.title.anchor.set(0.5, 0.5);
    this.title.x = canvasSize.width / 2 + 300;
    this.title.y = canvasSize.height / 2 - 200;
  }

  createContents() {
    this.invitationCode = new PIXI.Text(
      this.playerId,
      {
        fontFamily: "sans-serif",
        fontSize: 50,
        align: "center",
      }
    );
    this.invitationCode.anchor.set(0.5, 0.5);
    this.invitationCode.x = canvasSize.width / 2 + 300;
    this.invitationCode.y = canvasSize.height / 2;

    const handleCopyButtonClick = () => {
      try {
        copyToClipboard(this.playerId);
      } catch (err) {
        if (process.env.NODE_ENV !== "production") {
          console.error(err);
        }
      }
    };

    this.copyButton = createButton(
      {
        width: 150,
        height: 100,
        x: canvasSize.width / 2 + 300,
        y: canvasSize.height / 2 + 200,
        color: 0x3a8ec7,
      },
      "복사",
      {
        fontFamily: "sans-serif",
        fontSize: 40,
        align: "center",
        fill: 0xffffff,
      },
      handleCopyButtonClick
    );
  }

  render() {
    this.container.addChild(
      this.wrapper,
      this.title,
      this.invitationCode,
      this.copyButton
    );
  }
}
