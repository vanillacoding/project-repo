import * as PIXI from "pixi.js";
import globalStore from "../../../globalStore";
import { canvasSize } from "../../../config";

export default class Drawer {
  constructor(pointerUpCallback, addStrokeCallback) {
    this.pointerUpCallback = pointerUpCallback;
    this.addStrokeCallback = addStrokeCallback;

    this.container = new PIXI.Container();
    this.container.sortableChildren = true;

    this.lineStyle = {
      width: 12,
      color: 0xd2ff1e,
      cap: "round",
    };

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

    this.arrows = [];
    this.arrowInitialPosition = { x: 50, y: 250 };
    this.arrowSize = { width: 100, height: 100 };
    this.arrowPosition = { ...this.arrowInitialPosition };

    this.pointerStartPos = { x: 0, y: 0 };
    this.strokeRecognitionDistance = 20;
    this.strokeDirections = [];
    this.directionsLengthLimit = 18;

    this.canvas = null;
    this.createCanvas();
  }

  createCanvas() {
    this.canvas = new PIXI.Graphics();
    this.canvas.hitArea = new PIXI.Rectangle(
      0,
      0,
      canvasSize.width,
      canvasSize.height
    );

    this.isPointerDown = false;

    this.canvas.interactive = true;
    this.canvas.on(
      "pointerdown",
      this.handlePointerDown.bind(this)
    );
    this.canvas.on(
      "pointermove",
      this.handlePointerMove.bind(this)
    );
    this.canvas.on(
      "pointerup",
      this.handlePointerUp.bind(this)
    );
    this.canvas.on(
      "pointerout",
      this.handlePointerOut.bind(this)
    );

    this.container.addChild(this.canvas);
  }

  handlePointerDown(e) {
    this.isPointerDown = true;
    this.canvas.lineStyle(this.lineStyle);

    const { x, y } = e.data.global;
    this.updatePointerStartPos(x, y);
  }

  handlePointerMove(e) {
    if (!this.isPointerDown) {
      return;
    }

    const { x, y } = e.data.global;

    const { x: startX, y: startY } = this.pointerStartPos;

    const leftBorder = startX - this.strokeRecognitionDistance;
    const rightBorder = startX + this.strokeRecognitionDistance;
    const topBorder = startY - this.strokeRecognitionDistance;
    const bottomBorder = startY + this.strokeRecognitionDistance;

    let isOverRecognitionDistance = true;
    let strokeDirection = "";

    if (x < leftBorder) {
      strokeDirection = "left";
    } else if (x > rightBorder) {
      strokeDirection = "right";
    } else if (y < topBorder) {
      strokeDirection = "up";
    } else if (y > bottomBorder) {
      strokeDirection = "down";
    } else {
      isOverRecognitionDistance = false;
    }

    if (isOverRecognitionDistance) {
      this.updatePointerStartPos(x, y);
      this.addStrokeDirection(strokeDirection);
      this.drawLine(startX, startY, x, y);
    }
  }

  handlePointerUp() {
    this.isPointerDown = false;
    this.canvas.clear();

    if (this.pointerUpCallback) {
      this.pointerUpCallback(this.strokeDirections);
    }

    this.strokeDirections = [];
  }

  handlePointerOut() {
    if (this.isPointerDown) {
      this.handlePointerUp();
    }
  }

  updatePointerStartPos(x, y) {
    this.pointerStartPos = { x, y };
  }

  addStrokeDirection(direction) {
    const lastStrokeDirection =
      this.strokeDirections[this.strokeDirections.length - 1];

    const shouldAddDirection =
      lastStrokeDirection !== direction &&
        this.strokeDirections.length < this.directionsLengthLimit;

    if (shouldAddDirection) {
      this.strokeDirections.push(direction);

      this.addStrokeCallback(direction);
    }
  }

  drawLine(startX, startY, endX, endY) {
    this.canvas.moveTo(startX, startY);
    this.canvas.lineTo(endX, endY);
  }

  terminateDrawing() {
    this.canvas.interactive = false;
  }
}
