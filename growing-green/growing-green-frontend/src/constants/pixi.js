export const imagePath = [
  { alias: 'defaultPlant', path: '../images/plants/default_plant.json' },
  { alias: 'cloverPlant', path: '../images/plants/clover_plant.json' },
  { alias: 'treePlant', path: '../images/plants/tree_plant.json' },
  { alias: 'plantPot', path: '../images/plants/pot.png' },
  { alias: 'wateringCan', path: '../images/furniture/watering_can.png' },
  { alias: 'openWindow', path: '../images/furniture/open_window.png' },
  { alias: 'pullSwitch', path: '../images/furniture/pull_switch.png' },
  { alias: 'dayTimeLandscape', path: '../images/landscapes/day.png' },
  { alias: 'nightTimeLandscape', path: '../images/landscapes/night.png' },
  { alias: 'leftArrow', path: '../images/arrows/left_arrow.png' },
  { alias: 'rightArrow', path: '../images/arrows/right_arrow.png' },
  { alias: 'heart', path: '../images/shapes/heart.png' },
  { alias: 'nail', path: '../images/furniture/nail.png' },
  { alias: 'blind', path: '../images/furniture/blind.json' },
];

export const plantTypes = {
  defaultPlant: 'default_plant',
  cloverPlant: 'clover_plant',
  treePlant: 'tree_plant',
};

export const plantPositions = {
  defaultPlant: {
    1: {
      x: 5,
      y: 350,
      width: 50,
      height: 80,
    },
    2: {
      x: -5,
      y: 320,
      width: 185,
      height: 160,
    },
    3: {
      x: -5,
      y: 320,
      width: 185,
      height: 160,
    },
    preview: {
      x: 250,
      y: 390,
    },
  },
  treePlant: {
    1: {
      x: -5,
      y: 350,
      width: 50,
      height: 80,
    },
    2: {
      x: -23,
      y: 305,
      width: 185,
      height: 160,
    },
    3: {
      x: -10,
      y: 305,
      width: 185,
      height: 160,
    },
    preview: {
      x: 237,
      y: 385,
    },
  },
  cloverPlant: {
    1: {
      x: -5,
      y: 350,
      width: 50,
      height: 80,
    },
    2: {
      x: -5,
      y: 320,
      width: 110,
      height: 125,
    },
    3: {
      x: -5,
      y: 300,
      width: 170,
      height: 200,
    },
    preview: {
      x: 240,
      y: 392,
    },
  },
};
