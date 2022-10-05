import * as PIXI from "pixi.js";
import Tile from "./Tile";

export default class TileGroup {
  constructor({
    x,
    y,
    row,
    column,
    tileWidth,
    tileHeight,
    tileBorderWidth,
    tileBorderColor,
    tileXGap,
    tileYGap,
  }) {
    this.x = x;
    this.y = y;
    this.tileBorderColor = tileBorderColor;
    this.tileBorderWidth = tileBorderWidth;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;

    this.container = new PIXI.Container();

    this.row = row;
    this.column = column;
    this.tileXGap = tileXGap;
    this.tileYGap = tileYGap;
    this.width =
      (this.tileWidth + this.tileXGap) *
        (this.column - 1) + this.tileWidth;
    this.height =
      (this.tileHeight + this.tileYGap) *
        (this.row - 1) + this.tileHeight;

    this.container.pivot.set(this.width / 2, this.height / 2);

    this.tileOption = {
      x: this.x,
      y: this.y,
      width: this.tileWidth,
      height: this.tileHeight,
      borderWidth: this.tileBorderWidth,
      borderColor: this.tileBorderColor,
    };

    this.tiles = [];

    this.createTileGroup();
    this.render();
  }

  createTileGroup() {
    for (let i = 0; i < this.row; i += 1) {
      const row = [];

      this.tileOption.y =
        this.y + (this.tileHeight + this.tileYGap) * i;

      for (let j = 0; j < this.column; j += 1) {
        this.tileOption.x =
          this.x + (this.tileWidth + this.tileXGap) * j;

        const tile = new Tile(this.tileOption);
        row.push(tile);
      }

      this.tileOption.x = this.x;

      this.tiles.push(row);
    }
  }

  render() {
    for (let i = 0; i < this.tiles.length; i += 1) {
      const row = this.tiles[i];

      for (let j = 0; j < row.length; j += 1) {
        const tile = row[j];

        this.container.addChild(tile.graphic);
      }
    }
  }
}
