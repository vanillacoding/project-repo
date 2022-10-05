function getBackgroundImageUri(color, shape) {
  const baseUrl = "/image/backgrounds/";
  return baseUrl + color + "-" + shape + ".png";
}

function getGemImageUri(color, shape) {
  const baseUrl = "/image/gems/";
  return baseUrl + color + "-" + shape + ".png";
}

export { getBackgroundImageUri, getGemImageUri };
