import { ROAD_COLOR } from "../../constants/constants";

class RoadBrush {
  constructor(point) {
    this.radius = 8;
    this.range = point.pointer.range;

    this.initialX = point.posX + this.range;
    this.initialY = point.posY + this.range;

    this.posX = this.initialX;
    this.posY = this.initialY;

    this.maxX = this.initialX + point.width;
    this.maxY = this.initialY + point.height;
    this.minY = this.initialY - point.height;

    this.speed = 1;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = ROAD_COLOR;
    ctx.arc(
      this.posX,
      this.posY,
      this.radius,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  resetBrush() {
    this.posX = this.initialX;
    this.posY = this.initialY;
  }
}

export default RoadBrush;
