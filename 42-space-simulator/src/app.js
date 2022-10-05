import "./style.css";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { autorun } from "mobx";

import { loadAllModel } from "./utils/loaders";
import { PointLockWithY } from "./controller/pointLockController";

import { PlanetFactory } from "./factory/planetFactory";
import { GalaxyFactory } from "./factory/galaxyFactory";
import { AsteroidFactory } from "./factory/asteroidFactory";
import { Model } from "./objects/model";
import { Stars } from "./objects/stars";

import { counterStore } from "./store/counterStore";
import { captionStore } from "./store/captionStore";
import { soundStore } from "./store/soundStore";

class Simulator {
  constructor() {
    this._startSimulator();
  }

  async _initialize() {
    this.canvas = document.querySelector("canvas.webgl");
    this.scene = new THREE.Scene();
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.clock = new THREE.Clock();
    this.previousTime = 0;
    this.objectsToUpdate = [];

    const modelStorage = {};
    [
      modelStorage.starTexture,
      modelStorage.polymapTexture,
      modelStorage.whaleModel,
      modelStorage.cubeMapModel,
      modelStorage.sunModel,
      modelStorage.mecuryModel,
      modelStorage.venusModel,
      modelStorage.earthModel,
      modelStorage.marsModel,
      modelStorage.jupiterModel,
      modelStorage.saturnModel,
      modelStorage.uranusModel,
      modelStorage.neptuneModel,
      modelStorage.plutoModel,
      modelStorage.cloudModel,
      modelStorage.leftGloveModel,
      modelStorage.rightGloveModel,
      modelStorage.spaceStationModel,
      modelStorage.astronautModel,
    ] = await loadAllModel();
    this.modelStorage = modelStorage;

    autorun(() => {
      counterStore.update(counterStore.count);
    });

    autorun(() => {
      captionStore.showCounterCaption(counterStore.count);
    });

    autorun(() => {
      this._endSimulator(counterStore.count);
    });

    autorun(() => {
      if (counterStore.count === 30) {
        soundStore.lowerVolume(soundStore.breathingSound);
      }

      if (counterStore.count === 10) {
        soundStore.lowerVolume(soundStore.breathingSound);
      }
    });

    soundStore.playSound(soundStore.breathingSound, 1);
    soundStore.playSound(soundStore.spaceSound, 0.7);

    this._addLight();

    this._addCamera();

    this._addRenderer();

    this._addPhysics();

    this._addPostProcessor();

    this.camera.position.set(1170624, 212379, 29717);

    this.controls = new PointLockWithY(
      this.camera,
      true,
      3000,
      0.825,
      this.canvas,
      this.scene,
    );
    this.scene.add(this.controls.camera);
    this.controls.addListner();
    this.controls.addPhysicsPointer(this.world, this.defaultMaterial);

    this.solarSystem = new PlanetFactory(this.scene, this.modelStorage);
    this.solarSystem.realize();

    const stars = new Stars(this.scene, 7000, 7000000, 1500);
    stars.realize();

    const galaxys = new GalaxyFactory(this.scene);
    galaxys.realize();

    const asteroids = new AsteroidFactory(this.scene);
    asteroids.realize();

    this.leftGlove = new Model(this.scene, this.modelStorage.leftGloveModel);
    this.leftGlove.realize();
    this.leftGlove.setShadow();
    this.leftGlove.setScale(6);

    this.rightGlove = new Model(this.scene, this.modelStorage.rightGloveModel);
    this.rightGlove.realize();
    this.rightGlove.setShadow();
    this.rightGlove.setScale(28);

    const spaceStaion = new Model(
      this.scene,
      this.modelStorage.spaceStationModel,
    );
    spaceStaion.realize();
    spaceStaion.setShadow();
    spaceStaion.setScale(800);
    spaceStaion.setPosition(1080000, 200000, 50000);

    const astronaut = new Model(this.scene, this.modelStorage.astronautModel);
    astronaut.realize();
    astronaut.setShadow();
    astronaut.setScale(40);
    astronaut.setPosition(1189000, 200000, 0);
    astronaut.addPhysics(this.objectsToUpdate, this.world);
    astronaut.model.rotation.x = 1;

    this._tick();

    window.addEventListener(
      "resize",
      () => {
        this._onWindowResize();
      },
      false,
    );
  }

  _addLight() {
    const ambientLight = new THREE.AmbientLight("white", 1);
    const sunLight = new THREE.PointLight("indianred", 11, 60000000);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(1024, 1024);
    sunLight.position.set(1, 1, 1);

    this.scene.add(ambientLight, sunLight);
  }

  _addCamera() {
    const camera = new THREE.PerspectiveCamera(
      75,
      this.size.width / this.size.height,
      1,
      250000000,
    );

    this.camera = camera;
  }

  _addRenderer() {
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      logarithmicDepthBuffer: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(new THREE.Color("#030303"));

    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 0.6;

    this.renderer = renderer;
    this.scene.background = this.modelStorage.cubeMapModel;
  }

  _addPhysics() {
    const world = new CANNON.World();
    world.broadphase = new CANNON.SAPBroadphase(world);
    world.gravity.set(0, 0, 0);

    const defaultMaterial = new CANNON.Material("default");

    this.world = world;
    this.defaultMaterial = defaultMaterial;
  }

  _addPostProcessor() {
    const effectComposer = new EffectComposer(this.renderer);
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    effectComposer.setSize(this.size.width, this.size.height);

    const dotScreenPass = new DotScreenPass();
    const unrealBloomPass = new UnrealBloomPass();
    const renderPass = new RenderPass(this.scene, this.camera);

    effectComposer.addPass(renderPass);
    effectComposer.addPass(dotScreenPass);
    effectComposer.addPass(unrealBloomPass);

    unrealBloomPass.strength = 0.804;
    unrealBloomPass.radius = 0.1691;
    unrealBloomPass.threshold = 0.136;

    this.effectComposer = effectComposer;
  }

  _tick() {
    const elapsedTime = this.clock.getElapsedTime();
    const deltaTime = elapsedTime - this.previousTime;
    this.previousTime = elapsedTime;

    this.controls.update(deltaTime);

    this.world.step(1 / 60, deltaTime, 3);

    for (const object of this.objectsToUpdate) {
      object.model.position.copy(object.body.position);
      object.model.quaternion.copy(object.body.quaternion);
    }

    this.solarSystem.planets.forEach((planet) => {
      planet.revolve(elapsedTime);
      planet.rotate();
    });

    this.leftGlove.model.position.copy(this.camera.position);
    this.leftGlove.model.rotation.set(
      this.camera.rotation.x,
      this.camera.rotation.y,
      this.camera.rotation.z,
    );

    this.leftGlove.model.translateZ(-5);
    this.leftGlove.model.translateY(-5);
    this.leftGlove.model.translateX(-6);
    this.leftGlove.model.rotateX(-1);
    this.leftGlove.model.rotateY(2);

    this.rightGlove.model.position.copy(this.camera.position);
    this.rightGlove.model.rotation.set(
      this.camera.rotation.x,
      this.camera.rotation.y,
      this.camera.rotation.z,
    );

    this.rightGlove.model.translateZ(-7);
    this.rightGlove.model.translateY(-5);
    this.rightGlove.model.translateX(7);
    this.rightGlove.model.rotateX(-1);
    this.rightGlove.model.rotateY(1);

    this.effectComposer.render();
    this.requestAnimationFrameId = requestAnimationFrame(this._tick.bind(this));
  }

  _onWindowResize() {
    this.size.width = window.innerWidth;
    this.size.height = window.innerHeight;

    this.camera.aspect = this.size.width / this.size.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.size.width, this.size.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
  }

  _endSimulator(counter) {
    if (counter === 0) {
      soundStore.pauseSound(soundStore.breathingSound);

      cancelAnimationFrame(this.requestAnimationFrameId);
      const counter = document.querySelector(".counter");
      const caption = document.querySelector(".caption");
      const introPage = document.querySelector(".intro");

      this.canvas.classList.toggle("fadeIn");
      counter.classList.toggle("hidden");
      caption.classList.toggle("hidden");

      introPage.classList.toggle("fadeOut");
      captionStore.showEndingCaption();
    }
  }

  _startSimulator() {
    const askPermission = () => {
      this._initialize();
    };

    window.addEventListener("click", askPermission.bind(this), { once: true });
  }
}

const app = new Simulator();
