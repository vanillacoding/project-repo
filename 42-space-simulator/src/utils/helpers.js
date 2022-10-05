import * as THREE from "three";

const useHelpers = (scene, axeLength, gridSize) => {
  const axesHelper = new THREE.AxesHelper(axeLength);
  const gridHelper = new THREE.GridHelper(gridSize, gridSize);
  scene.add(axesHelper, gridHelper);
};

export { useHelpers };
