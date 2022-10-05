export function isMouseXOver(mouseX, startX, EndX) {
  if (mouseX > startX && mouseX < EndX) {
    return true;
  }

  return false;
}

export function isMouseYOver(mouseY, startY, endY) {
  if (mouseY > startY && mouseY < endY) {
    return true;
  }

  return false;
}
