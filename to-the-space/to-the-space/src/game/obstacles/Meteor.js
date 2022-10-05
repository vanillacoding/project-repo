import * as THREE from "three";

class Meteor {
  #name = "Meteor";

  constructor() {
    const randomRadius = 10 + Math.floor(Math.random() * 30);

    const geometry = new THREE.TetrahedronGeometry(randomRadius, 4);
    const material = new THREE.MeshPhongMaterial({
      color: 0x808080,
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

export default Meteor;
