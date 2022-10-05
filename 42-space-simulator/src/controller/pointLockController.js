import * as THREE from "three";
import * as CANNON from "cannon-es";

class PointLockWithY {
  constructor(camera, enabled, movementSpeed, lookSpeed, canvas, scene) {
    this.camera = camera;
    this.enabled = enabled;
    this.movementSpeed = movementSpeed;
    this.lookSpeed = lookSpeed;
    this.domElement = canvas;
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.target = new THREE.Vector3(0, 0, 0);
    this.movementX = 0;
    this.movementY = 0;
    this.lat = 0;
    this.lon = 0;
    this.phi = 0;
    this.theta = 0;

    this.mouse = new THREE.Vector2();
    this.rayCaster = new THREE.Raycaster();
    this.scene = scene;
  }

  update(delta) {
    if (!this.enabled) {
      return;
    }

    const actualMoveSpeed = delta * this.movementSpeed;
    const actualLookSpeed = delta * this.lookSpeed;

    if (this.moveForward) {
      this.camera.translateZ(-actualMoveSpeed);
    }
    if (this.moveBackward) {
      this.camera.translateZ(actualMoveSpeed);
    }

    if (this.moveLeft) {
      this.camera.translateX(-actualMoveSpeed);
    }
    if (this.moveRight) {
      this.camera.translateX(actualMoveSpeed);
    }

    if (this.moveUp) {
      this.camera.translateY(actualMoveSpeed);
    }
    if (this.moveDown) {
      this.camera.translateY(-actualMoveSpeed);
    }

    this.lon += 20 * this.movementX * actualLookSpeed;
    this.lat -= 20 * this.movementY * actualLookSpeed;
    this.movementX = 0;
    this.movementY = 0;

    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = ((90 - this.lat) * Math.PI) / 180;
    this.theta = (this.lon * Math.PI) / 180;

    this.target.x =
      this.camera.position.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
    this.target.y = this.camera.position.y + 100 * Math.cos(this.phi);
    this.target.z =
      this.camera.position.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);

    this.rayCaster.setFromCamera(this.mouse, this.camera);
    this.camera.lookAt(this.target);

    this.cannonBody.position.copy(this.camera.position);
  }

  onMouseMove(event) {
    this.movementX = event.movementX || 0;
    this.movementY = event.movementY || 0;

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  onKeyDown(event) {
    switch (event.keyCode) {
      case 38:
      case 87:
        this.moveForward = true;
        break;

      case 37:
      case 65:
        this.moveLeft = true;
        break;

      case 40:
      case 83:
        this.moveBackward = true;
        break;

      case 39:
      case 68:
        this.moveRight = true;
        break;

      case 82:
        this.movementSpeed = 80000;
        break;
      case 70:
        this.moveDown = true;
        break;

      case 81:
        this.freeze = !this.freeze;
        break;
    }
  }

  onKeyUp(event) {
    switch (event.keyCode) {
      case 38:
      case 87:
        this.moveForward = false;
        break;

      case 37:
      case 65:
        this.moveLeft = false;
        break;

      case 40:
      case 83:
        this.moveBackward = false;
        break;

      case 39:
      case 68:
        this.moveRight = false;
        break;

      case 82:
        this.movementSpeed = 3000;
        break;
      case 70:
        this.moveDown = false;
        break;
    }
  }

  lock() {
    this.domElement.requestPointerLock();
  }

  addListner() {
    window.addEventListener(
      "contextmenu",
      function (event) {
        event.preventDefault();
      },
      false,
    );
    window.addEventListener("mousemove", this.onMouseMove.bind(this), false);
    window.addEventListener("keydown", this.onKeyDown.bind(this), false);
    window.addEventListener("keyup", this.onKeyUp.bind(this), false);
    window.addEventListener("click", this.lock.bind(this), false);
  }

  addPhysicsPointer(cannonWorld, material) {
    const shape = new CANNON.Sphere(700);
    const body = new CANNON.Body({
      mass: 10,
      position: new CANNON.Vec3(0, 0, 0),
      shape: shape,
      material: material,
    });
    this.cannonBody = body;

    cannonWorld.addBody(this.cannonBody);
  }
}

export { PointLockWithY };
