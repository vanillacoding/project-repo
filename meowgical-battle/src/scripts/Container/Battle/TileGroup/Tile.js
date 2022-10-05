import * as PIXI from "pixi.js";
import { DropShadowFilter } from "@pixi/filter-drop-shadow";

export default class Tile {
  constructor({ x, y, width, height, borderWidth, borderColor }) {
    this.x = x;
    this.y = y;
    this.borderColor = borderColor;
    this.width = width;
    this.height = height;
    this.borderWidth = borderWidth;

    this.container = new PIXI.Container();

    this.graphic = null;
    this.createTile();
  }

  createTile() {
    this.graphic = new PIXI.Graphics();

    this.graphic.pivot.set(0.5, 0.5);
    this.graphic
      .lineStyle(
        this.borderWidth,
        this.borderColor
      )
      .drawRect(
        this.x,
        this.y,
        this.width,
        this.height
      );

    this.graphic.filters = [new DropShadowFilter({
      distance: 2,
    })];
  }
}
