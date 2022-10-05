import { observable, action, makeObservable } from "mobx";

class ControlStore {
  constructor() {
    this.currentControlMode = "";

    makeObservable(this, {
      breathingSound: observable,
      alarm1: observable,
      alarm2: observable,
      spaceSound: observable,
      playSound: action,
      pauseSound: action,
      lowerVolume: action,
    });
  }

  changeControlMode() {}
}

const controlStore = new ControlStore();

export { controlStore };
