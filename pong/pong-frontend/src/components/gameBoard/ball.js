const ball = (ctx, canvas, ballObj, moderator) => {
  class Ball {
    constructor(x, y, radius) {
      this.x = moderator ? x : canvas.width - x;
      this.y = moderator ? y : canvas.height - y;
      this.radius = radius;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = "#f9ca24";
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "black";
      ctx.strokeWidth = 4;
      ctx.fill();
      ctx.stroke();
    }
  }

  const ball = new Ball(ballObj.x, ballObj.y, ballObj.radius);

  ball.draw();
};

export default ball;
