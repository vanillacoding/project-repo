import { ROAD_COLOR } from "../../constants/constants";

class DotsController {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  fiilStaticDots(staticDots) {
    const dots = [];

    for (let i = 0; i < staticDots.length; i++) {
      if (staticDots[i]) {
        dots[i] = [...staticDots[i]];
      }
    }

    return dots;
  }

  mergeRoadDots(ctx, staticDots, roadDots) {
    ctx.strokeStyle = ROAD_COLOR;
    ctx.lineWidth = 3;

    for (const eachRoad of roadDots) {
      const {
        posX,
        dots
      } = eachRoad;

      for (let i = 0; i < dots.length; i++) {
        if (staticDots[posX + i]) {
          staticDots[posX + i].push(dots[i]);
          staticDots[posX + i].sort();
        } else {
          staticDots[posX + i] = [dots[i]];
        }

        ctx.beginPath();

        ctx.moveTo(posX + i, dots[i]);
        ctx.lineTo(posX + i + 1, dots[i + 1]);
        ctx.stroke();
      }
    }

    ctx.closePath();
  }

  mergePadDots(staticDots, padDots) {
    for (const eachPad of padDots) {
      const {
        posX,
        posY,
        width,
      } = eachPad;

      for (let i = 0; i < width; i++) {
        if (staticDots[posX + i]) {
          staticDots[posX + i].push(posY);
          staticDots[posX + i].sort();
        } else {
          staticDots[posX + i] = [posY];
        }
      }
    }
  }
}

export default DotsController;
