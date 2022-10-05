import * as THREE from "three";

class Coin {
  #name = "Coin";

  constructor() {
    const geometry = new THREE.TetrahedronGeometry(8, 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffd700,
      shininess: 0,
      specular: 0xffffff,
      flatShading: true,
    });

    this.mesh = new THREE.Mesh(geometry, material);

    geometry.dispose();
    material.dispose();
  }

  get Name() {
    return this.#name;
  }
}

export default Coin;
