import * as THREE from "three";

import { Object } from "./object";

class Model extends Object {
  constructor(scene, model, animationMixer = null) {
    super();
    this.scene = scene;
    this.model = model.scene;
    this.animationMixer = animationMixer;
    this.counter = 0;
  }

  rotate(rotateSpeedRate, rotateAxis) {
    this.model.rotation[rotateAxis] += rotateSpeedRate;
  }

  animate(animationNumber) {
    this.animationMixer = new THREE.AnimationMixer(this.model);
    const animation = this.animationMixer.clipAction(
      this.model.animations[animationNumber],
    );
    animation.play();
  }

  moveAlongPath(verticeArray) {
    const path = new THREE.CatmullRomCurve3(verticeArray);

    if (this.counter <= 1) {
      const axis = new THREE.Vector3();
      const up = new THREE.Vector3(0, 0, 0);

      this.model.position.copy(path.getPointAt(this.counter));
      const tangent = path.getTangentAt(this.counter).normalize();
      axis.crossVectors(up, tangent).normalize();
      var radians = Math.acos(up.dot(tangent));
      this.model.quaternion.setFromAxisAngle(axis, radians);
      this.counter += 0.00005;
    } else {
      this.counter = 0;
    }
  }

  realize() {
    this.scene.add(this.model);
  }
}

const createObject = (scene, model, animationMixer = null) => {
  let counter = 0;

  return {
    scene,
    model,
    animationMixer,

    setShadow() {
      this.model.castShadow = true;
      this.model.receiveShadow = true;
    },

    setScale(scale) {
      this.model.scale.set(scale, scale, scale);
    },

    setPosition(x, y, z) {
      this.model.position.set(x, y, z);
    },

    rotate(rotateSpeedRate, rotateAxis) {
      this.model.rotation[rotateAxis] += rotateSpeedRate;
    },

    animate(animationNumber) {
      this.animationMixer = new THREE.AnimationMixer(this.model);
      const animation = this.animationMixer.clipAction(
        this.model.animations[animationNumber],
      );
      animation.play();
    },

    moveAlongPath(verticeArray) {
      const path = new THREE.CatmullRomCurve3(verticeArray);

      if (counter <= 1) {
        const axis = new THREE.Vector3();
        const up = new THREE.Vector3(0, 0, 0);

        this.model.position.copy(path.getPointAt(counter));
        const tangent = path.getTangentAt(counter).normalize();
        axis.crossVectors(up, tangent).normalize();
        var radians = Math.acos(up.dot(tangent));
        this.model.quaternion.setFromAxisAngle(axis, radians);
        counter += 0.00005;
      } else {
        counter = 0;
      }
    },

    realize() {
      this.scene.add(this.model);
    },
  };
};

export { createObject, Model };
