export const figureVisualizer = (context, figures) => {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  context.beginPath();

  for (let i = 0; i < figures.length; i++) {
    if (figures[i].type === "square") {
      context.fillStyle = figures[i].color;
      context.fillRect(
        figures[i].x,
        figures[i].y,
        figures[i].width,
        figures[i].height,
      );
    } else if (figures[i].type === "circle") {
      context.beginPath();
      context.arc(
        figures[i].x,
        figures[i].y,
        figures[i].height / 2,
        0,
        2 * Math.PI,
      );

      context.stroke();
      context.fillStyle = figures[i].color;
      context.fill();
    } else if (figures[i].type === "triangle") {
      context.beginPath();
      context.moveTo(figures[i].x, figures[i].y);
      context.lineTo(
        figures[i].x + figures[i].width / 2,
        figures[i].y - figures[i].height,
      );

      context.lineTo(figures[i].x + figures[i].width, figures[i].y);

      context.closePath();
      context.fillStyle = figures[i].color;
      context.fill();
    }
  }
};
