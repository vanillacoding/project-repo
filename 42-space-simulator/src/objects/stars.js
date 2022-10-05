import * as THREE from "three";

class Stars {
  constructor(scene, count, diffusionRate, size) {
    this.scene = scene;

    this.count = count;
    this.diffusionRate = diffusionRate;
    this.size = size;
  }

  realize() {
    const starGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.count * 3);

    for (let i = 0; i < this.count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * this.diffusionRate;
    }

    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    const starMaterial = new THREE.PointsMaterial({
      transparent: true,
      depthWrite: false,
    });
    starMaterial.size = this.size;
    starMaterial.sizeAttenuation = true;

    const stars = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(stars);
  }
}

const createStars = ({ scene, texture, count, diffusionRate, size }) => {
  const starGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * diffusionRate;
  }

  starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );

  const starMaterial = new THREE.PointsMaterial({
    alphaMap: texture,
    transparent: true,
    depthWrite: false,
  });
  starMaterial.size = size;
  starMaterial.sizeAttenuation = true;

  const stars = new THREE.Points(starGeometry, starMaterial);

  scene.add(stars);
};

export { createStars, Stars };
