import * as THREE from "three";

import { generateRandomNumber } from "../utils/randomNumberGenerator";

const createAsteroid = (
  group,
  count,
  minX,
  maxX,
  minY,
  maxY,
  minZ,
  maxZ,
  minScale,
  maxScale,
) => {
  for (let i = 0; i < count; i++) {
    const x = generateRandomNumber(minX, maxX);
    const z = generateRandomNumber(minY, maxY);
    const y = generateRandomNumber(minZ, maxZ);

    const asteroidGeometry = new THREE.DodecahedronGeometry(2, 0);
    const asteroidMaterial = new THREE.MeshStandardMaterial({
      color: "#b2b6b1",
    });

    const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

    asteroid.castShadow = true;
    asteroid.receiveShadow = true;

    asteroid.scale.set(
      generateRandomNumber(minScale, maxScale),
      generateRandomNumber(minScale, maxScale),
      generateRandomNumber(minScale, maxScale),
    );

    asteroid.position.set(x, y, z);

    asteroid.rotation.z = (Math.random() - 0.5) * 0.5;
    asteroid.rotation.y = (Math.random() - 0.5) * 0.5;

    group.add(asteroid);
  }

  return {
    group,
    setPosition(x, y, z) {
      this.group.position.set(x, y, z);
    },
  };
};

export { createAsteroid };
