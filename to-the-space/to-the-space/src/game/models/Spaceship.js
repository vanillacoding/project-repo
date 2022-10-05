import * as CANNON from "cannon-es";
import { autorun } from "mobx";

import { STATE } from "../../constants/view";
import { SPACESHIP } from "../../constants/model";

import Model from "./Model";
import Controls from "../Controls";

import playStore from "../../store/playStore";
import viewStore from "../../store/viewStore";

class Spaceship extends Model {
  #input = new Controls();
  #power = 0;

  constructor(model, scene, physicsWorld) {
    super(model, scene, physicsWorld);

    autorun(() => {
      if (playStore.isLaunched) {
        this.#launch();
      }
    });
  }

  #launch() {
    this.#power = playStore.power;

    this.boxBody.applyForce(new CANNON.Vec3(0, this.#power, 0), this.boxBody.position);
  }

  enableControl(sizes) {
    const speed = playStore.speed / 100;
    const maxXPosition = sizes.width * 0.5 - 50;

    if (this.#input.keys.left && this.model.position.x > -maxXPosition) {
      this.boxBody.position.x -= speed;
    }

    if (this.#input.keys.right && this.model.position.x < maxXPosition) {
      this.boxBody.position.x += speed;
    }
  }

  update() {
    this.model.position.copy(this.boxBody.position);
    this.model.quaternion.copy(this.boxBody.quaternion);

    const altitude = Math.floor(this.model.position.y);
    const speed = Math.floor(this.boxBody.velocity.y);

    if (altitude > -1) {
      playStore.setAltitude(altitude);
    }

    if (speed > -1) {
      playStore.setSpeed(speed);
    }

    if (speed < 0) {
      this.setPosition(SPACESHIP.POSITION.X, SPACESHIP.POSITION.Y, SPACESHIP.POSITION.Z);
      this.setRotation(SPACESHIP.ROTATION.X, SPACESHIP.ROTATION.Y, SPACESHIP.ROTATION.Z);

      this.boxBody.position.copy(this.model.position);
      this.boxBody.quaternion.copy(this.model.quaternion);

      viewStore.updateState(STATE.END);
    }
  }
}

export default Spaceship;
