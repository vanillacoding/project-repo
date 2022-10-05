import * as THREE from "three";
import * as CANNON from "cannon-es";
import { threeToCannon, ShapeType } from "three-to-cannon";

class Object {
  setShadow() {
    this.model.castShadow = true;
    this.model.receiveShadow = true;
  }

  setScale(scale) {
    this.model.scale.set(scale, scale, scale);
  }

  setPosition(x, y, z) {
    this.model.position.set(x, y, z);
  }

  setRotation(x, y, z) {
    this.model.rotation.set(x, y, z);
  }

  addToScene() {
    this.scene.add(this.model);
  }

  addPhysics(objectsToUpdate, physicsWorld) {
    const canonShape = threeToCannon(this.model, {
      type: ShapeType.BOX,
    });

    const body = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(0, 0, 0),
      shape: canonShape.shape,
      material: this.defaultMaterial,
    });
    body.position.set(
      this.model.position.x,
      this.model.position.y,
      this.model.position.z,
    );

    physicsWorld.addBody(body);

    objectsToUpdate.push({ model: this.model, body });
  }
}

export { Object };
