const baseDistance = 500000;

const sunCharacteristics = {
  startPosition: 0,
  revolutionSpeedRate: 0,
  rotationSpeedRate: 0.0001,
  distanceFromAxis: 0,
  rotationHeight: 0,
  scale: baseDistance + 400000,
};

const mercuryCharacteristics = {
  startPosition: 20,
  revolutionSpeedRate: 0.007,
  rotationSpeedRate: 0.0001,
  distanceFromAxis: baseDistance + 600000,
  rotationHeight: 10,
  scale: baseDistance + 6000000,
  orbit: {
    thickness: 150,
    segment: 300,
    color: "indianred",
    xAxis: Math.PI / 2 - 0.15,
  },
};

const venusCharacteristics = {
  startPosition: 42,
  revolutionSpeedRate: 0.007,
  rotationSpeedRate: 0.0001,
  distanceFromAxis: baseDistance + 800000,
  rotationHeight: 10,
  scale: baseDistance + 6000000,
  orbit: {
    thickness: 150,
    segment: 300,
    color: "indianred",
    xAxis: Math.PI / 2,
  },
};

const earthCharacteristics = {
  startPosition: 32,
  revolutionSpeedRate: 0.007,
  rotationSpeedRate: 0.0001,
  distanceFromAxis: baseDistance + 1200000,
  rotationHeight: 10,
  scale: baseDistance + 8000000,
  orbit: {
    thickness: 150,
    segment: 300,
    color: "indianred",
    xAxis: Math.PI / 2,
  },
};

const marsCharacteristics = {
  startPosition: 52,
  revolutionSpeedRate: 0.007,
  rotationSpeedRate: 0.0001,
  distanceFromAxis: baseDistance + 1600000,
  rotationHeight: 10,
  scale: baseDistance + 8000000,
  orbit: {
    thickness: 150,
    segment: 300,
    color: "indianred",
    xAxis: Math.PI / 2,
  },
};

const jupiterCharacteristics = {
  startPosition: 62,
  revolutionSpeedRate: 0.007,
  rotationSpeedRate: 0.0001,
  distanceFromAxis: baseDistance + 4200000,
  rotationHeight: 10,
  scale: baseDistance + 5000000,
  orbit: {
    thickness: 150,
    segment: 300,
    color: "indianred",
    xAxis: Math.PI / 2,
  },
};

const saturnCharacteristics = {
  startPosition: 22,
  revolutionSpeedRate: 0.007,
  rotationSpeedRate: 0.0001,
  distanceFromAxis: baseDistance + 5800000,
  rotationHeight: 10,
  scale: baseDistance + 5000000,
  orbit: {
    thickness: 150,
    segment: 300,
    color: "indianred",
    xAxis: Math.PI / 2,
  },
};

const uranusCharacteristics = {
  startPosition: 42,
  revolutionSpeedRate: 0.007,
  rotationSpeedRate: 0.0001,
  distanceFromAxis: baseDistance + 6800000,
  rotationHeight: 10,
  scale: baseDistance + 5000000,
  orbit: {
    thickness: 150,
    segment: 300,
    color: "indianred",
    xAxis: Math.PI / 2,
  },
};

const neptuneCharacteristics = {
  startPosition: 62,
  revolutionSpeedRate: 0.007,
  rotationSpeedRate: 0.0001,
  distanceFromAxis: baseDistance + 8800000,
  rotationHeight: 10,
  scale: baseDistance + 5000000,
  orbit: {
    thickness: 150,
    segment: 300,
    color: "indianred",
    xAxis: Math.PI / 2,
  },
};

const plutoCharacteristics = {
  startPosition: 82,
  revolutionSpeedRate: 0.007,
  rotationSpeedRate: 0.0001,
  distanceFromAxis: baseDistance + 8800000,
  rotationHeight: 10,
  scale: baseDistance + 5000000,
  orbit: {
    thickness: 150,
    segment: 300,
    color: "indianred",
    xAxis: Math.PI / 2,
  },
};

export {
  sunCharacteristics,
  mercuryCharacteristics,
  venusCharacteristics,
  earthCharacteristics,
  marsCharacteristics,
  jupiterCharacteristics,
  saturnCharacteristics,
  uranusCharacteristics,
  neptuneCharacteristics,
  plutoCharacteristics,
};
