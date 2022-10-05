const smallGalaxyCharacteristics = {
  count: 1500,
  size: 100,
  radius: 2045,
  branches: 6,
  spin: 0.18,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: "indianred",
  ousideColor: "#ff6030",

  position: {
    x: 10800000,
    y: -5700000,
    z: 0,
  },

  scale: {
    x: 600,
    y: 600,
    z: 600,
  },

  rotation: {
    x: Math.PI / 2.5,
    y: 0,
    z: Math.PI / 2.5,
  },
};

const mediumGalaxyCharacteristics = {
  count: 20000,
  size: 4,
  radius: 5005,
  branches: 6,
  spin: 5.2,
  randomness: 0.2,
  randomnessPower: 1,
  insideColor: "indianred",
  ousideColor: "indianred",

  position: {
    x: -500,
    y: 10470000,
    z: -2000000,
  },

  scale: {
    x: 300,
    y: 300,
    z: 300,
  },

  rotation: {
    x: Math.PI / 2.5,
    y: Math.PI / 2.5,
    z: Math.PI / 2.5,
  },
};

const grandGalaxyCharacteristics = {
  count: 20000,
  size: 52,
  radius: 850,
  branches: 6,
  spin: 2.2,
  randomness: 1.2,
  randomnessPower: 3,
  insideColor: "#f79320",
  ousideColor: "#85301b",

  position: {
    x: -680000,
    y: 670000,
    z: -10000,
  },

  scale: {
    x: 400,
    y: 400,
    z: 400,
  },

  rotation: {
    x: Math.PI / 3,
    y: 0,
    z: Math.PI / 3,
  },
};

export {
  smallGalaxyCharacteristics,
  mediumGalaxyCharacteristics,
  grandGalaxyCharacteristics,
};
