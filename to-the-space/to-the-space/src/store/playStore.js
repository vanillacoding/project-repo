import { makeObservable, observable, action } from "mobx";

class PlayStore {
  speed = 0;
  power = 0;
  altitude = 0;
  isLaunched = false;

  constructor() {
    makeObservable(this, {
      power: observable,
      speed: observable,
      altitude: observable,
      isLaunched: observable,
      reset: action,
      addPower: action,
      setSpeed: action,
      setIsLaunched: action,
      setAltitude: action,
    });
  }

  setIsLaunched(state) {
    this.isLaunched = state;
  }

  setSpeed(newSpeed) {
    this.speed = newSpeed;
  }

  setAltitude(newAltitude) {
    this.altitude = newAltitude;
  }

  addPower() {
    this.power += 1500;
  }

  reset() {
    this.speed = 0;
    this.power = 0;
    this.altitude = 0;
    this.isLaunched = false;
  }
}

const playStore = new PlayStore();

export default playStore;
