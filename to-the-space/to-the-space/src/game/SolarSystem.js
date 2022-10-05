import * as THREE from "three";

class SolarSystem {
  #objects = [];
  #solarSystem = new THREE.Object3D();

  constructor(scene) {
    this.scene = scene;

    this.#init();
  }

  #init() {
    this.#solarSystem.position.set(0, -300, 0);

    this.#objects.push(this.#solarSystem);
    this.scene.add(this.#solarSystem);
  }

  add(mesh) {
    this.#objects.push(mesh);
    this.#solarSystem.add(mesh);
  }

  update(elapsedTime) {
    this.#objects.forEach((object) => {
      object.rotation.y = elapsedTime * 0.5;
    });
  }
}

export default SolarSystem;
