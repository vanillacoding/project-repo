import * as THREE from "three";
import * as CANNON from "cannon-es";
import Model from "../game/models/Model";

describe("Model", () => {
  const mesh = new THREE.Object3D();
  const scene = new THREE.Scene();
  const physicsWorld = new CANNON.World();

  const model = new Model(mesh, scene, physicsWorld);

  test("defines model method", () => {
    expect(typeof model.setScale).toBe("function");
    expect(typeof model.setPosition).toBe("function");
    expect(typeof model.setRotation).toBe("function");
  });

  test("setScale() is called with arguments", () => {
    const setScaleSpy = jest.spyOn(model, "setScale");
    const scale = 8;
    const result = model.setScale(scale);

    expect(result).toBeUndefined();
    expect(mesh.scale.x).toBe(scale);
    expect(setScaleSpy).toHaveBeenCalledWith(scale);

    setScaleSpy.mockClear();
  });

  test("setPosition() is called with arguments", () => {
    const setPositionSpy = jest.spyOn(model, "setPosition");
    const XYZPositions = [1, 2, 3];
    const result = model.setPosition(...XYZPositions);

    expect(result).toBeUndefined();
    expect(mesh.position.x).toBe(XYZPositions[0]);
    expect(mesh.position.y).toBe(XYZPositions[1]);
    expect(mesh.position.z).toBe(XYZPositions[2]);
    expect(setPositionSpy).toHaveBeenCalledWith(...XYZPositions);

    setPositionSpy.mockClear();
  });

    test("setRotation() is called with arguments", () => {
      const setRotationSpy = jest.spyOn(model, "setRotation");
      const XYZRotations = [4, 5, 6];
      const result = model.setRotation(...XYZRotations);

      expect(result).toBeUndefined();
      expect(mesh.rotation.x).toBe(XYZRotations[0]);
      expect(mesh.rotation.y).toBe(XYZRotations[1]);
      expect(mesh.rotation.z).toBe(XYZRotations[2]);
      expect(setRotationSpy).toHaveBeenCalledWith(...XYZRotations);

      setRotationSpy.mockClear();
    });
});
