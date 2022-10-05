import * as THREE from "three";
import * as CANNON from "cannon-es";
import gsap from "gsap";
import { autorun } from "mobx";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import Model from "./models/Model";
import Spaceship from "./models/Spaceship";

import SolarSystem from "./SolarSystem";
import ObstacleHolder from "./obstacles/ObstacleHolder";

import { STATE } from "../constants/view";
import { GLTF, CUBE_TEXTURE } from "../constants/url";
import { SPACESHIP, EARTH, MOON } from "../constants/model";

import viewStore from "../store/viewStore";
class World {
  #clock = new THREE.Clock();
  #oldElapsedTime = 0;

  constructor(canvas, loadingManager) {
    this.canvas = canvas;
    this.loadingManager = loadingManager;

    autorun(() => {
      if (viewStore.currentState === STATE.SET) {
        this.#createCoin();
        this.#createMeteor();

        this.control.reset();

        gsap.to(this.camera.position, {
          duration: 1,
          x: 0,
          y: 0,
          z: 500,
          onUpdate: () => {
            this.control.enabled = false;
            this.control.update();
          },
        });
      }

      if (viewStore.currentState === STATE.END) {
        this.camera.position.set(0, 0, 1500);

        this.control.enabled = true;
        this.control.update();

        this.scene.remove(this.coinHolder.mesh);
        this.scene.remove(this.meteorHolder.mesh);
      }
    });

    this.#loadAllModel();
  }

  async #loadAllModel() {
    const gltfLoader = new GLTFLoader(this.loadingManager);
    const cubeTextureLoader = new THREE.CubeTextureLoader(this.loadingManager);

    const [moon, earth, spaceship, backgroundTexture] = await Promise.all([
      gltfLoader.loadAsync(GLTF.MOON),
      gltfLoader.loadAsync(GLTF.EARTH),
      gltfLoader.loadAsync(GLTF.SPACESHIP),
      cubeTextureLoader.loadAsync(CUBE_TEXTURE),
    ]);

    this.modelStorage = {};
    this.modelStorage.moon = moon.scene;
    this.modelStorage.earth = earth.scene;
    this.modelStorage.spaceship = spaceship.scene;

    this.textureStorage = {};
    this.textureStorage.background = backgroundTexture;

    this.#initialize();
  }

  #initialize() {
    this.scene = new THREE.Scene();

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.#addLight();
    this.#addPhysicsWorld();
    this.#addCamera(this.sizes);
    this.#render(this.canvas, this.sizes);
    this.#addControl(this.camera, this.canvas);

    this.scene.background = this.textureStorage.background;

    this.solarSystem = new SolarSystem(this.scene);
    this.moon = new Model(this.modelStorage.moon, this.scene);
    this.earth = new Model(this.modelStorage.earth, this.scene);
    this.spaceship = new Spaceship(this.modelStorage.spaceship, this.scene, this.physicsWorld);

    this.moon.setScale(MOON.SCALE);
    this.moon.setPosition(MOON.POSITION.X, MOON.POSITION.Y, MOON.POSITION.Z);
    this.moon.receiveShadow();

    this.solarSystem.add(this.moon.model);

    this.earth.setPosition(EARTH.POSITION.X, EARTH.POSITION.Y, EARTH.POSITION.Z);
    this.earth.receiveShadow();
    this.earth.addToScene();

    this.spaceship.setScale(SPACESHIP.SCALE);
    this.spaceship.setPosition(SPACESHIP.POSITION.X, SPACESHIP.POSITION.Y, SPACESHIP.POSITION.Z);
    this.spaceship.setRotation(SPACESHIP.ROTATION.X, SPACESHIP.ROTATION.Y, SPACESHIP.ROTATION.Z);
    this.spaceship.createPhysicsBox(SPACESHIP.PHYSICS.X, SPACESHIP.PHYSICS.Y, SPACESHIP.PHYSICS.Z);
    this.spaceship.castShadow();
    this.spaceship.addToScene();

    this.#tick();

    window.addEventListener("resize", () => this.#onWindowResize());
  }

  #addCamera(sizes) {
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 20000);

    camera.position.set(0, 0, 1500);

    this.scene.add(camera);
    this.camera = camera;
  }

  #addControl(camera, canvas) {
    const control = new OrbitControls(camera, canvas);

    control.enableDamping = true;
    control.enablePan = false;
    control.maxDistance = 1500;

    this.control = control;
  }

  #addLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(30, 100, 100);
    directionalLight.castShadow = true;

    directionalLight.shadow.mapSize.width = 512;
    directionalLight.shadow.mapSize.height = 512;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;

    this.scene.add(ambientLight, directionalLight);
  }

  #render(canvas, sizes) {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    this.renderer = renderer;
  }

  #addPhysicsWorld() {
    const world = new CANNON.World();

    world.broadphase = new CANNON.SAPBroadphase(world);
    world.allowSleep = true;
    world.gravity.set(0, -20, 0);

    this.physicsWorld = world;
  }

  #createCoin() {
    this.coinHolder = new ObstacleHolder("Coin", 3, this.spaceship.model);
    this.scene.add(this.coinHolder.mesh);
  }

  #createMeteor() {
    this.meteorHolder = new ObstacleHolder("Meteor", 5, this.spaceship.model);
    this.scene.add(this.meteorHolder.mesh);
  }

  #tick() {
    const elapsedTime = this.#clock.getElapsedTime();
    const deltaTime = elapsedTime - this.#oldElapsedTime;
    this.#oldElapsedTime = elapsedTime;

    if (viewStore.currentState === STATE.LAUNCH) {
      this.physicsWorld.step(1 / 60, deltaTime, 3);

      this.spaceship.enableControl(this.sizes);
      this.spaceship.update();

      this.camera.position.y = this.spaceship.model.position.y + 170;
      this.meteorHolder.spawn();
      this.meteorHolder.update(this.spaceship.boxBody, deltaTime);

      this.coinHolder.spawn();
      this.coinHolder.update(this.spaceship.boxBody, deltaTime);
    } else {
      this.solarSystem.update(elapsedTime);
    }

    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.#tick.bind(this));
  }

  #onWindowResize() {
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;

    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
  }
}

export default World;
