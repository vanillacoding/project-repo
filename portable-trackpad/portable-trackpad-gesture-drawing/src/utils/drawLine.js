export const drawLineWithEmit = (
  context,
  canvas,
  socket,
  startPosition,
  endPosition,
  color,
  width,
) => {
  context.beginPath();
  context.moveTo(...startPosition);
  context.lineTo(...endPosition);
  context.strokeStyle = color;
  context.lineWidth = width;
  context.lineCap = "round";
  context.stroke();
  context.closePath();

  socket.current.emit("drawing", {
    startPosition: [
      startPosition[0] / canvas.width,
      startPosition[1] / canvas.height,
    ],
    endPosition: [
      endPosition[0] / canvas.width,
      endPosition[1] / canvas.height,
    ],
    color,
    width,
  });
};

export const drawLineWithoutEmit = (
  context,
  startPosition,
  endPosition,
  color,
  width,
) => {
  context.beginPath();
  context.moveTo(...startPosition);
  context.lineTo(...endPosition);
  context.strokeStyle = color;
  context.lineWidth = width;
  context.lineCap = "round";
  context.stroke();
  context.closePath();
};
