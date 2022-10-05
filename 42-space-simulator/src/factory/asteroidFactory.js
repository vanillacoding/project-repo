import * as THREE from "three";

import { createAsteroid } from "../objects/asteroid";
import {
  smallAsteroidCharacteristics,
  mediumAsteroidCharacteristics,
  mediumAsteroidCharacteristics2,
  largeAsteroidCharacteristics,
  largeAsteroidCharacteristics2,
} from "../constant/asteroid";

class AsteroidFactory {
  constructor(scene) {
    this.scene = scene;
  }

  realize() {
    const smallAsteroidGroup = new THREE.Group();
    const smallAsteroidField = createAsteroid(
      smallAsteroidGroup,
      smallAsteroidCharacteristics.count,
      smallAsteroidCharacteristics.minX,
      smallAsteroidCharacteristics.maxX,
      smallAsteroidCharacteristics.minY,
      smallAsteroidCharacteristics.maxY,
      smallAsteroidCharacteristics.minZ,
      smallAsteroidCharacteristics.maxZ,
      smallAsteroidCharacteristics.minScale,
      smallAsteroidCharacteristics.maxScale,
    );
    this.scene.add(smallAsteroidField.group);
    smallAsteroidField.setPosition(
      smallAsteroidCharacteristics.position.x,
      smallAsteroidCharacteristics.position.y,
      smallAsteroidCharacteristics.position.z,
    );

    const mediumAsteroidGroup = new THREE.Group();
    const mediumAsteroidField = createAsteroid(
      mediumAsteroidGroup,
      mediumAsteroidCharacteristics.count,
      mediumAsteroidCharacteristics.minX,
      mediumAsteroidCharacteristics.maxX,
      mediumAsteroidCharacteristics.minY,
      mediumAsteroidCharacteristics.maxY,
      mediumAsteroidCharacteristics.minZ,
      mediumAsteroidCharacteristics.maxZ,
      mediumAsteroidCharacteristics.minScale,
      mediumAsteroidCharacteristics.maxScale,
    );
    this.scene.add(mediumAsteroidField.group);
    mediumAsteroidField.setPosition(
      mediumAsteroidCharacteristics.position.x,
      mediumAsteroidCharacteristics.position.y,
      mediumAsteroidCharacteristics.position.z,
    );

    const largeAsteroidGroup = new THREE.Group();
    const largeAsteroidField = createAsteroid(
      largeAsteroidGroup,
      largeAsteroidCharacteristics.count,
      largeAsteroidCharacteristics.minX,
      largeAsteroidCharacteristics.maxX,
      largeAsteroidCharacteristics.minY,
      largeAsteroidCharacteristics.maxY,
      largeAsteroidCharacteristics.minZ,
      largeAsteroidCharacteristics.maxZ,
      largeAsteroidCharacteristics.minScale,
      largeAsteroidCharacteristics.maxScale,
    );
    this.scene.add(largeAsteroidField.group);
    largeAsteroidField.setPosition(
      largeAsteroidCharacteristics.position.x,
      largeAsteroidCharacteristics.position.y,
      largeAsteroidCharacteristics.position.z,
    );

    const largeAsteroidGroup2 = new THREE.Group();
    const largeAsteroidField2 = createAsteroid(
      largeAsteroidGroup2,
      largeAsteroidCharacteristics2.count,
      largeAsteroidCharacteristics2.minX,
      largeAsteroidCharacteristics2.maxX,
      largeAsteroidCharacteristics2.minY,
      largeAsteroidCharacteristics2.maxY,
      largeAsteroidCharacteristics2.minZ,
      largeAsteroidCharacteristics2.maxZ,
      largeAsteroidCharacteristics2.minScale,
      largeAsteroidCharacteristics2.maxScale,
    );
    this.scene.add(largeAsteroidField2.group);
    largeAsteroidField2.setPosition(
      largeAsteroidCharacteristics2.position.x,
      largeAsteroidCharacteristics2.position.y,
      largeAsteroidCharacteristics2.position.z,
    );

    const mediumAsteroidGroup2 = new THREE.Group();
    const mediumAsteroidField2 = createAsteroid(
      mediumAsteroidGroup2,
      mediumAsteroidCharacteristics2.count,
      mediumAsteroidCharacteristics2.minX,
      mediumAsteroidCharacteristics2.maxX,
      mediumAsteroidCharacteristics2.minY,
      mediumAsteroidCharacteristics2.maxY,
      mediumAsteroidCharacteristics2.minZ,
      mediumAsteroidCharacteristics2.maxZ,
      mediumAsteroidCharacteristics2.minScale,
      mediumAsteroidCharacteristics2.maxScale,
    );
    mediumAsteroidField2.setPosition(
      mediumAsteroidCharacteristics2.position.x,
      mediumAsteroidCharacteristics2.position.y,
      mediumAsteroidCharacteristics2.position.z,
    );
  }
}

export { AsteroidFactory };
