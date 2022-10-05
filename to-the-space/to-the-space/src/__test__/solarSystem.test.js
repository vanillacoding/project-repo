import * as THREE from "three";
import SolarSystem from "../game/SolarSystem";

describe("SolarSystem", () => {
  const scene = new THREE.Scene();
  const solarSystem = new SolarSystem(scene);

  test("defines solarSystem method", () => {
    expect(typeof solarSystem.add).toBe("function");
    expect(typeof solarSystem.update).toBe("function");
  });

  test("add()", () => {
    const addSpy = jest.spyOn(solarSystem, "add");
    const mesh = new THREE.Object3D();
    const result = solarSystem.add(mesh);

    expect(result).toBeUndefined();
    expect(addSpy).toHaveBeenCalledWith(mesh);

    addSpy.mockClear();
  });

  test("update()", () => {
    const updateSpy = jest.spyOn(solarSystem, "update");
    const elapsedTime = 0.01;
    const result = solarSystem.update(elapsedTime)

    expect(result).toBeUndefined();
    expect(updateSpy).toHaveBeenCalledWith(elapsedTime);

    updateSpy.mockClear();
  });
});
