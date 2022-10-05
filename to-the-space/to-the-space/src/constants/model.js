const SPACESHIP = {
  SCALE: 6,
  POSITION: {
    X: 0,
    Y: 0,
    Z: 0,
  },
  ROTATION: {
    X: 0,
    Y: -Math.PI * 0.5,
    Z: 0,
  },
  PHYSICS: {
    X: 30,
    Y: 100,
    Z: 50,
  },
};

const EARTH = {
  SCALE: 0,
  POSITION: {
    X: 60,
    Y: -520,
    Z: -50,
  },
  ROTATION: {
    X: 0,
    Y: 0,
    Z: 0,
  },
};

const MOON = {
  SCALE: 0.15,
  POSITION: {
    X: 600,
    Y: 0,
    Z: 0,
  },
  ROTATION: {
    X: 0,
    Y: 0,
    Z: 0,
  },
};

export { SPACESHIP, EARTH, MOON };
