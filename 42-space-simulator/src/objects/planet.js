import * as THREE from "three";

import { Object } from "./object";

class Planet extends Object {
  constructor(
    scene,
    model,
    startPosition,
    revolutionSpeedRate,
    rotationSpeedRate,
    distanceFromAxis,
    rotationHeight,
  ) {
    super();
    this.scene = scene;
    this.model = model.scene;
    this.startPosition = startPosition;
    this.revolutionSpeedRate = revolutionSpeedRate;
    this.rotationSpeedRate = rotationSpeedRate;
    this.distanceFromAxis = distanceFromAxis;
    this.rotationHeight = rotationHeight;
  }

  setOrbit(radius, thickness, segments, color, xAxis) {
    const orbitGeometry = new THREE.TorusGeometry(
      radius,
      thickness,
      segments,
      segments,
    );
    const orbitMaterial = new THREE.MeshStandardMaterial({
      color: "white",
      side: THREE.DoubleSide,
    });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.castShadow = true;
    orbit.receiveShadow = true;
    orbit.rotation.x = xAxis;
    this.scene.add(orbit);
  }

  revolve(timer) {
    this.model.position.set(
      Math.cos(timer * this.revolutionSpeedRate + this.startPosition) *
        this.distanceFromAxis,
      Math.sin(timer * this.revolutionSpeedRate + this.startPosition) *
        this.rotationHeight,
      Math.sin(timer * this.revolutionSpeedRate + this.startPosition) *
        this.distanceFromAxis,
    );
  }

  rotate() {
    this.model.rotation.y += this.rotationSpeedRate;
  }
}

const createPlanet = (scene, model, startPosition, outlineBaseModel) => {
  return {
    scene,
    model: model.scene,
    startPosition,
    outlineBaseModel,

    setShadow() {
      this.model.castShadow = true;
      this.model.receiveShadow = true;
    },

    setOutLine(outLineMaterial, outLineWidth) {
      const cloneModel = this.model.clone();
      cloneModel.traverse((child) => {
        if (child.isMesh) child.material = outLineMaterial;
      });
      cloneModel.scale.multiplyScalar(outLineWidth);
      this.outlineBaseModel = cloneModel;
      this.scene.add(cloneModel);
    },

    setScale(scale) {
      this.model.scale.set(scale, scale, scale);
    },

    setPosition(x, y, z, distanceFromAxis) {
      this.model.position.set(x + distanceFromAxis, y, z);
    },

    setOrbit(radius, thickness, segments, color, xAxis) {
      const orbitGeometry = new THREE.TorusGeometry(
        radius,
        thickness,
        segments,
        segments,
      );
      const orbitMaterial = new THREE.MeshStandardMaterial({
        color,
        side: THREE.DoubleSide,
      });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbit.castShadow = true;
      orbit.receiveShadow = true;
      orbit.rotation.x = xAxis;
      this.scene.add(orbit);
    },

    revolve(
      timer,
      rotationSpeedRate,
      startPosition,
      distanceFromAxis,
      rotationHeight,
    ) {
      this.model.position.set(
        Math.cos(timer * rotationSpeedRate + startPosition) * distanceFromAxis,
        Math.sin(timer * rotationSpeedRate + startPosition) * rotationHeight,
        Math.sin(timer * rotationSpeedRate + startPosition) * distanceFromAxis,
      );
    },

    rotate(rotateSpeedRate) {
      this.model.rotation.y += rotateSpeedRate;
    },

    realize() {
      this.scene.add(this.model);
    },
  };
};

export { createPlanet, Planet };
