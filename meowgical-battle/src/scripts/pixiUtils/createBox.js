import * as PIXI from "pixi.js";
import { DropShadowFilter } from "@pixi/filter-drop-shadow";

const createBox = ({
  width,
  height,
  x,
  y,
  color,
  alpha = 1,
  radius = 20,
  borderWidth = 0,
  borderColor = 0x000000,
  borderAlpha = 1,
  borderAlignment = 1,
  pivotX = width / 2,
  pivotY = height / 2,
  hasShadow = true,
}) => {
  const box = new PIXI.Graphics();

  box
    .lineStyle(
      borderWidth,
      borderColor,
      borderAlpha,
      borderAlignment
    )
    .beginFill(color, alpha)
    .drawRoundedRect(
      x,
      y,
      width,
      height,
      radius
    )
    .endFill();

  box.pivot.set(
    pivotX,
    pivotY
  );

  if (hasShadow) {
    box.filters = [new DropShadowFilter()];
  }

  return box;
};

export default createBox;
