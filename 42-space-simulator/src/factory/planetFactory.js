import { Planet } from "../objects/planet";
import {
  sunCharacteristics,
  mercuryCharacteristics,
  venusCharacteristics,
  earthCharacteristics,
  marsCharacteristics,
  jupiterCharacteristics,
  saturnCharacteristics,
  uranusCharacteristics,
  neptuneCharacteristics,
  plutoCharacteristics,
} from "../constant/planet";

class PlanetFactory {
  constructor(scene, modelStorage) {
    this.scene = scene;
    this.modelStorage = modelStorage;
    this.planets = [];
  }

  realize() {
    const sun = new Planet(
      this.scene,
      this.modelStorage.sunModel,
      sunCharacteristics.startPosition,
      sunCharacteristics.revolutionSpeedRate,
      sunCharacteristics.rotationSpeedRate,
      sunCharacteristics.distanceFromAxis,
      sunCharacteristics.rotationHeight,
    );
    sun.setShadow();
    sun.setScale(sunCharacteristics.scale);
    sun.addToScene();

    const mercury = new Planet(
      this.scene,
      this.modelStorage.mecuryModel,
      mercuryCharacteristics.startPosition,
      mercuryCharacteristics.revolutionSpeedRate,
      mercuryCharacteristics.rotationSpeedRate,
      mercuryCharacteristics.distanceFromAxis,
      mercuryCharacteristics.rotationHeight,
    );
    mercury.setShadow();
    mercury.setScale(mercuryCharacteristics.scale);
    mercury.setOrbit(
      mercuryCharacteristics.distanceFromAxis,
      mercuryCharacteristics.orbit.thickness,
      mercuryCharacteristics.orbit.segment,
      mercuryCharacteristics.orbit.color,
      mercuryCharacteristics.orbit.xAxis,
    );
    mercury.addToScene();

    const venus = new Planet(
      this.scene,
      this.modelStorage.venusModel,
      venusCharacteristics.startPosition,
      venusCharacteristics.revolutionSpeedRate,
      venusCharacteristics.rotationSpeedRate,
      venusCharacteristics.distanceFromAxis,
      venusCharacteristics.rotationHeight,
    );
    venus.setShadow();
    venus.setScale(venusCharacteristics.scale);
    venus.setOrbit(
      venusCharacteristics.distanceFromAxis,
      venusCharacteristics.orbit.thickness,
      venusCharacteristics.orbit.segment,
      venusCharacteristics.orbit.color,
      venusCharacteristics.orbit.xAxis,
    );
    venus.addToScene();

    const earth = new Planet(
      this.scene,
      this.modelStorage.earthModel,
      earthCharacteristics.startPosition,
      earthCharacteristics.revolutionSpeedRate,
      earthCharacteristics.rotationSpeedRate,
      earthCharacteristics.distanceFromAxis,
      earthCharacteristics.rotationHeight,
    );
    earth.setShadow();
    earth.setScale(earthCharacteristics.scale);
    earth.setOrbit(
      earthCharacteristics.distanceFromAxis,
      earthCharacteristics.orbit.thickness,
      earthCharacteristics.orbit.segment,
      earthCharacteristics.orbit.color,
      earthCharacteristics.orbit.xAxis,
    );
    earth.addToScene();

    const mars = new Planet(
      this.scene,
      this.modelStorage.marsModel,
      marsCharacteristics.startPosition,
      marsCharacteristics.revolutionSpeedRate,
      marsCharacteristics.rotationSpeedRate,
      marsCharacteristics.distanceFromAxis,
      marsCharacteristics.rotationHeight,
    );
    mars.setShadow();
    mars.setScale(marsCharacteristics.scale);
    mars.setOrbit(
      marsCharacteristics.distanceFromAxis,
      marsCharacteristics.orbit.thickness,
      marsCharacteristics.orbit.segment,
      marsCharacteristics.orbit.color,
      marsCharacteristics.orbit.xAxis,
    );
    mars.addToScene();

    const jupiter = new Planet(
      this.scene,
      this.modelStorage.jupiterModel,
      jupiterCharacteristics.startPosition,
      jupiterCharacteristics.revolutionSpeedRate,
      jupiterCharacteristics.rotationSpeedRate,
      jupiterCharacteristics.distanceFromAxis,
      jupiterCharacteristics.rotationHeight,
    );
    jupiter.setShadow();
    jupiter.setScale(jupiterCharacteristics.scale);
    jupiter.setOrbit(
      jupiterCharacteristics.distanceFromAxis,
      jupiterCharacteristics.orbit.thickness,
      jupiterCharacteristics.orbit.segment,
      jupiterCharacteristics.orbit.color,
      jupiterCharacteristics.orbit.xAxis,
    );
    jupiter.addToScene();

    const saturn = new Planet(
      this.scene,
      this.modelStorage.saturnModel,
      saturnCharacteristics.startPosition,
      saturnCharacteristics.revolutionSpeedRate,
      saturnCharacteristics.rotationSpeedRate,
      saturnCharacteristics.distanceFromAxis,
      saturnCharacteristics.rotationHeight,
    );
    saturn.setShadow();
    saturn.setScale(saturnCharacteristics.scale);
    saturn.setOrbit(
      saturnCharacteristics.distanceFromAxis,
      saturnCharacteristics.orbit.thickness,
      saturnCharacteristics.orbit.segment,
      saturnCharacteristics.orbit.color,
      saturnCharacteristics.orbit.xAxis,
    );
    saturn.addToScene();

    const uranus = new Planet(
      this.scene,
      this.modelStorage.uranusModel,
      uranusCharacteristics.startPosition,
      uranusCharacteristics.revolutionSpeedRate,
      uranusCharacteristics.rotationSpeedRate,
      uranusCharacteristics.distanceFromAxis,
      uranusCharacteristics.rotationHeight,
    );
    uranus.setShadow();
    uranus.setScale(uranusCharacteristics.scale);
    uranus.setOrbit(
      uranusCharacteristics.distanceFromAxis,
      uranusCharacteristics.orbit.thickness,
      uranusCharacteristics.orbit.segment,
      uranusCharacteristics.orbit.color,
      uranusCharacteristics.orbit.xAxis,
    );
    uranus.addToScene();

    const neptune = new Planet(
      this.scene,
      this.modelStorage.neptuneModel,
      neptuneCharacteristics.startPosition,
      neptuneCharacteristics.revolutionSpeedRate,
      neptuneCharacteristics.rotationSpeedRate,
      neptuneCharacteristics.distanceFromAxis,
      neptuneCharacteristics.rotationHeight,
    );
    neptune.setShadow();
    neptune.setScale(neptuneCharacteristics.scale);
    neptune.setOrbit(
      neptuneCharacteristics.distanceFromAxis,
      neptuneCharacteristics.orbit.thickness,
      neptuneCharacteristics.orbit.segment,
      neptuneCharacteristics.orbit.color,
      neptuneCharacteristics.orbit.xAxis,
    );
    neptune.addToScene();

    const pluto = new Planet(
      this.scene,
      this.modelStorage.plutoModel,
      plutoCharacteristics.startPosition,
      plutoCharacteristics.revolutionSpeedRate,
      plutoCharacteristics.rotationSpeedRate,
      plutoCharacteristics.distanceFromAxis,
      plutoCharacteristics.rotationHeight,
    );
    pluto.setShadow();
    pluto.setScale(plutoCharacteristics.scale);
    pluto.setOrbit(
      plutoCharacteristics.distanceFromAxis,
      plutoCharacteristics.orbit.thickness,
      plutoCharacteristics.orbit.segment,
      plutoCharacteristics.orbit.color,
      plutoCharacteristics.orbit.xAxis,
    );
    pluto.addToScene();

    this.planets.push(sun);
    this.planets.push(mercury);
    this.planets.push(venus);
    this.planets.push(earth);
    this.planets.push(mars);
    this.planets.push(jupiter);
    this.planets.push(saturn);
    this.planets.push(uranus);
    this.planets.push(neptune);
    this.planets.push(pluto);
  }
}

export { PlanetFactory };
