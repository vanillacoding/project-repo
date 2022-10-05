export const getMousePosition = (canvas, event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  return { mouseX, mouseY };
};

export const isMouseXOnImage = (mouseX, imageX, imageWidth) => (
  mouseX > imageX && mouseX < imageX + imageWidth
);

export const isMouseYOnImage = (mouseY, imageY, imageHeight) => (
  mouseY > imageY && mouseY < imageY + imageHeight
);

export const runCursorEffect = (circle, canvas, event, items) => {
  const { mouseX, mouseY } = getMousePosition(canvas, event);

  if (mouseX < 30 || mouseX > canvas.width - 30 || mouseY < 30 || mouseY > canvas.height - 30) {
    circle.style.opacity = 0;
    circle.style.left = "-9999px";
    circle.style.top = "-9999px";
    return;
  }

  for (const item of items) {
    if (item.isMouseOn(canvas, event)) {
      circle.style.width = "70px";
      circle.style.height = "70px";
      circle.style.left = `${mouseX - 35}px`;
      circle.style.top = `${mouseY - 35}px`;
      circle.classList.add("scale");
      return;
    }

    circle.style.opacity = 0.6;
    circle.style.width = "30px";
    circle.style.height = "30px";
    circle.style.left = `${mouseX - 15}px`;
    circle.style.top = `${mouseY - 15}px`;
    circle.classList.remove("scale");
  }
};
