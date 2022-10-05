import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

import { loadingManager } from "../utils/loadingManger";

const gltfLoader = new GLTFLoader(loadingManager);
const fbxLoader = new FBXLoader(loadingManager);
const textureLoader = new THREE.TextureLoader(loadingManager);
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);

const _loadModel = (url, loader) => {
  return new Promise((resolve) => {
    loader.load(url, resolve);
  });
};

const _promisyfyModels = () => {
  const loadStarTexture = _loadModel("/textures/stars/star.png", textureLoader);

  const loadPolymapTexture = _loadModel(
    "/textures/skybox/panorama.png",
    textureLoader,
  );

  const loadFbxTexture = _loadModel(
    "/textures/objects/whale/whale.fbx",
    fbxLoader,
  );

  const loadcubeTexture = _loadModel(
    [
      "/textures/skybox/SkyboxX-.png",
      "/textures/skybox/SkyboxX+.png",
      "/textures/skybox/SkyboxY-.png",
      "/textures/skybox/SkyboxY+.png",
      "/textures/skybox/SkyboxZ-.png",
      "/textures/skybox/SkyboxZ+.png",
    ],
    cubeTextureLoader,
  );

  const gltfUrls = [
    "/textures/planets/sun.gltf",
    "/textures/planets/mercury.gltf",
    "/textures/planets/venus.gltf",
    "/textures/planets/earth.gltf",
    "/textures/planets/mars.gltf",
    "/textures/planets/jupiter.gltf",
    "/textures/planets/saturn.gltf",
    "/textures/planets/uranus.gltf",
    "/textures/planets/neptune.gltf",
    "/textures/planets/pluto.gltf",
    "/textures/objects/cloud/cloud.gltf",
    "/textures/gloves/leftGlove/scene.gltf",
    "/textures/gloves/rightGlove/rightGlove.gltf",
    "/textures/spaceStation/scene.gltf",
    "/textures/astronaut/scene.gltf",
  ];

  const gltfPromises = gltfUrls.map((url) => {
    return _loadModel(url, gltfLoader);
  });

  return [
    loadStarTexture,
    loadPolymapTexture,
    loadFbxTexture,
    loadcubeTexture,
    ...gltfPromises,
  ];
};

const loadAllModel = () => {
  return Promise.all(_promisyfyModels());
};

export { loadAllModel };
