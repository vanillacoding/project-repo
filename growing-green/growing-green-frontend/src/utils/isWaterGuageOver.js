export function isWaterGuageOver(currentGuage, defaultGuage) {
  if (defaultGuage < currentGuage + 1) {
    return false;
  }

  return true;
}
