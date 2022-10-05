import * as THREE from "three";

import Coin from "./Coin";
import Meteor from "./Meteor";

class ObstacleHolder {
  #obstacleArray = [];
  #obstaclePool = [];
  #counter = 0;

  constructor(name, obstacleNumber, target) {
    this.name = name;
    this.target = target;
    this.obstacleNumber = obstacleNumber;

    this.mesh = new THREE.Object3D();

    for (let i = 0; i < this.obstacleNumber; i++) {
      const obstacle = this.name === "Coin" ? new Coin() : new Meteor();

      this.#obstaclePool.push(obstacle);
    }
  }

  spawn() {
    this.#counter++;

    if (this.#counter % 80 !== 0) {
      return;
    }

    for (let i = 0; i < this.obstacleNumber; i++) {
      let obstacle = null;

      if (this.#obstaclePool.length) {
        obstacle = this.#obstaclePool.pop();
      } else {
        obstacle = this.name === "Coin" ? new Coin() : new Meteor();
      }

      const minXAxis = -window.innerWidth * 0.5;
      const maxXAxis = window.innerWidth;

      const minYAxis = this.target.position.y + window.innerHeight;
      const maxYAxis = window.innerHeight;

      obstacle.mesh.position.x = minXAxis + Math.floor(Math.random() * maxXAxis);
      obstacle.mesh.position.y = minYAxis + Math.floor(Math.random() * maxYAxis);
      obstacle.mesh.position.z = 10;

      this.mesh.add(obstacle.mesh);
      this.#obstacleArray.push(obstacle);
    }
  }

  update(targetPhysics, deltaTime) {
    for (let i = 0; i < this.#obstacleArray.length; i++) {
      const obstacle = this.#obstacleArray[i];

      obstacle.mesh.position.x += Math.sin(deltaTime);

      obstacle.mesh.rotation.y += Math.random() * 0.1;
      obstacle.mesh.rotation.z += Math.random() * 0.1;

      const obstaclePosition = obstacle.mesh.position.clone();
      const differentPosition = this.target.position.clone().sub(obstaclePosition);
      const distance = differentPosition.length();
      const maxDistance = this.target.position.y - 1000;

      if (distance < 50 + obstacle.mesh.scale.x) {
        this.#obstaclePool.unshift(this.#obstacleArray.splice(i, 1)[0]);
        this.mesh.remove(obstacle.mesh);

        if (this.name === "Coin") {
          targetPhysics.velocity.y += 50;
        } else {
          targetPhysics.velocity.y -= 150;
        }

        i--;
      }

      if (obstacle.mesh.position.y < maxDistance) {
        this.#obstaclePool.unshift(this.#obstacleArray.splice(i, 1)[0]);
        this.mesh.remove(obstacle.mesh);

        i--;
      }
    }
  }
}

export default ObstacleHolder;
