class Mountain {
  constructor(peakNum, width, height, color) {
    this.peakNum = peakNum;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  points = [];
  peakGap = 0;

  getPeakHeight() {
    const minHeight = this.height / 20;
    const deviation = (this.height - minHeight) / 10;

    return minHeight + Math.random() * deviation;
  };

  setPeakPoint() {
    this.peakGap = this.width / (this.peakNum - 1);

    for (let i = 0; i < this.peakNum; i++) {
      this.points[i] = {
        x: i * this.peakGap,
        y: this.height - this.getPeakHeight(),
      };
    }
  };

  animate(ctx, speed) {
    this.points.forEach((point) => (point.x -= speed));

    const startX = this.points[this.points.length - 1].x;
    const endX = this.points[0].x;

    if (startX <= this.width + this.peakGap) {
      this.points.push({
        x: this.width + 2 * this.peakGap,
        y: this.height - this.getPeakHeight(),
      });
    } else if (endX <= -this.width) {
      this.points.shift();
    }

    ctx.beginPath();

    let currentX = this.points[0].x;
    let currentY = this.points[0].y;

    ctx.moveTo(currentX, currentY);

    for (let i = 1; i < this.points.length; i++) {
      const nextX = this.points[i].x;
      const nextY = this.points[i].y;
      const midX = (currentX + nextX) / 2;
      const midY = (currentY + nextY) / 2;

      ctx.quadraticCurveTo(currentX, currentY, midX, midY);

      currentX = this.points[i].x;
      currentY = this.points[i].y;
    }

    ctx.lineTo(currentX, currentY);
    ctx.lineTo(this.width, this.height);
    ctx.lineTo(this.points[0].x, this.height);

    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.closePath();
  }
};

export default Mountain;
