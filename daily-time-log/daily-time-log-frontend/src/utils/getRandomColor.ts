export default function getRandomColor() {
  const r = getRandom(0, 255);
  const g = getRandom(0, 255);
  const b = getRandom(0, 255);

  return `rgb(${r} ${g} ${b})`;
}

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
