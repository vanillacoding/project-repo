import * as THREE from "three";

import { Object } from "./object";

class Galaxy extends Object {
  constructor(
    scene,
    count,
    size,
    radius,
    branches,
    spin,
    randomness,
    randomnessPower,
    insideColor,
    ousideColor,
  ) {
    super();
    this.scene = scene;
    this.count = count;
    this.size = size;
    this.radius = radius;
    this.branches = branches;
    this.spin = spin;
    this.randomness = randomness;
    this.randomnessPower = randomnessPower;
    this.insideColor = insideColor;
    this.ousideColor = ousideColor;
  }

  create() {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({
      size: this.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });
    const positions = new Float32Array(this.count * 3);
    const colors = new Float32Array(this.count * 3);
    const colorInside = new THREE.Color(this.insideColor);
    const colorOutside = new THREE.Color(this.ousideColor);

    for (let i = 0; i < this.count; i++) {
      const i3 = i * 3;

      const radius = Math.random() * this.radius;
      const spinAngle = radius * this.spin;
      const branchAngle = ((i % this.branches) / this.branches) * Math.PI * 2;
      const randomX =
        Math.pow(Math.random(), this.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        this.randomness *
        radius;
      const randomY =
        Math.pow(Math.random(), this.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        this.randomness *
        radius;
      const randomZ =
        Math.pow(Math.random(), this.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        this.randomness *
        radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = 0 + randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / 5);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particles = new THREE.Points(geometry, material);

    this.model = particles;
  }
}

const createGalaxy = (
  scene,
  count,
  size,
  radius,
  branches,
  spin,
  randomness,
  randomnessPower,
  insideColor,
  ousideColor,
  model = null,
) => {
  return {
    scene,
    count,
    size,
    radius,
    branches,
    spin,
    randomness,
    randomnessPower,
    insideColor,
    ousideColor,
    model,

    realize() {
      const geometry = new THREE.BufferGeometry();
      const material = new THREE.PointsMaterial({
        size: this.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
      });
      const positions = new Float32Array(this.count * 3);
      const colors = new Float32Array(this.count * 3);
      const colorInside = new THREE.Color(this.insideColor);
      const colorOutside = new THREE.Color(this.ousideColor);

      for (let i = 0; i < this.count; i++) {
        const i3 = i * 3;

        const radius = Math.random() * this.radius;
        const spinAngle = radius * this.spin;
        const branchAngle = ((i % this.branches) / this.branches) * Math.PI * 2;
        const randomX =
          Math.pow(Math.random(), this.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          this.randomness *
          radius;
        const randomY =
          Math.pow(Math.random(), this.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          this.randomness *
          radius;
        const randomZ =
          Math.pow(Math.random(), this.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          this.randomness *
          radius;

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = 0 + randomY;
        positions[i3 + 2] =
          Math.sin(branchAngle + spinAngle) * radius + randomZ;

        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / 5);

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const particles = new THREE.Points(geometry, material);

      this.model = particles;
      this.scene.add(particles);
    },
    setScale(x, y, z) {
      this.model.scale.set(x, y, z);
    },

    setPosition(x, y, z) {
      this.model.position.set(x, y, z);
    },

    setRotation(x, y, z) {
      this.model.rotation.set(x, y, z);
    },
  };
};

export { createGalaxy, Galaxy };
