import { Galaxy } from "../objects/galaxy";
import {
  smallGalaxyCharacteristics,
  mediumGalaxyCharacteristics,
  grandGalaxyCharacteristics,
} from "../constant/galaxy";

class GalaxyFactory {
  constructor(scene) {
    this.scene = scene;
  }

  realize() {
    const smallGalaxy = new Galaxy(
      this.scene,
      smallGalaxyCharacteristics.count,
      smallGalaxyCharacteristics.size,
      smallGalaxyCharacteristics.radius,
      smallGalaxyCharacteristics.branches,
      smallGalaxyCharacteristics.spin,
      smallGalaxyCharacteristics.randomness,
      smallGalaxyCharacteristics.randomnessPower,
      smallGalaxyCharacteristics.insideColor,
      smallGalaxyCharacteristics.ousideColor,
    );
    smallGalaxy.create();
    smallGalaxy.setPosition(
      smallGalaxyCharacteristics.position.x,
      smallGalaxyCharacteristics.position.y,
      smallGalaxyCharacteristics.position.z,
    );
    smallGalaxy.setScale(
      smallGalaxyCharacteristics.scale.x,
      smallGalaxyCharacteristics.scale.y,
      smallGalaxyCharacteristics.scale.z,
    );
    smallGalaxy.setRotation(
      smallGalaxyCharacteristics.rotation.x,
      smallGalaxyCharacteristics.rotation.y,
      smallGalaxyCharacteristics.rotation.z,
    );
    smallGalaxy.addToScene();

    const mediumGalaxy = new Galaxy(
      this.scene,
      mediumGalaxyCharacteristics.count,
      mediumGalaxyCharacteristics.size,
      mediumGalaxyCharacteristics.radius,
      mediumGalaxyCharacteristics.branches,
      mediumGalaxyCharacteristics.spin,
      mediumGalaxyCharacteristics.randomness,
      mediumGalaxyCharacteristics.randomnessPower,
      mediumGalaxyCharacteristics.insideColor,
      mediumGalaxyCharacteristics.ousideColor,
    );
    mediumGalaxy.create();
    mediumGalaxy.setPosition(
      mediumGalaxyCharacteristics.position.x,
      mediumGalaxyCharacteristics.position.y,
      mediumGalaxyCharacteristics.position.z,
    );
    mediumGalaxy.setScale(
      mediumGalaxyCharacteristics.scale.x,
      mediumGalaxyCharacteristics.scale.y,
      mediumGalaxyCharacteristics.scale.z,
    );
    mediumGalaxy.setRotation(
      mediumGalaxyCharacteristics.rotation.x,
      mediumGalaxyCharacteristics.rotation.y,
      mediumGalaxyCharacteristics.rotation.z,
    );
    mediumGalaxy.addToScene();

    const grandGalaxy = new Galaxy(
      this.scene,
      grandGalaxyCharacteristics.count,
      grandGalaxyCharacteristics.size,
      grandGalaxyCharacteristics.radius,
      grandGalaxyCharacteristics.branches,
      grandGalaxyCharacteristics.spin,
      grandGalaxyCharacteristics.randomness,
      grandGalaxyCharacteristics.randomnessPower,
      grandGalaxyCharacteristics.insideColor,
      grandGalaxyCharacteristics.ousideColor,
    );
    grandGalaxy.create();
    grandGalaxy.setPosition(
      grandGalaxyCharacteristics.position.x,
      grandGalaxyCharacteristics.position.y,
      grandGalaxyCharacteristics.position.z,
    );
    grandGalaxy.setScale(
      grandGalaxyCharacteristics.scale.x,
      grandGalaxyCharacteristics.scale.y,
      grandGalaxyCharacteristics.scale.z,
    );
    grandGalaxy.setRotation(
      grandGalaxyCharacteristics.rotation.x,
      grandGalaxyCharacteristics.rotation.y,
      grandGalaxyCharacteristics.rotation.z,
    );
    grandGalaxy.addToScene();
  }
}

export { GalaxyFactory };
