import { makeObservable, observable, action } from "mobx";

import { STATE } from "../constants/view";

const mainContainer = document.getElementById("ui");

class ViewStore {
  currentState = STATE.LOAD;
  deviceType = "";

  constructor() {
    makeObservable(this, {
      currentState: observable,
      deviceType: observable,
      updateState: action,
      setDeviceType: action,
    });
  }

  updateState(newState) {
    for (const key in STATE) {
      mainContainer.classList.remove(STATE[key]);
    }

    mainContainer.classList.add(newState);

    this.currentState = newState;
  }

  setDeviceType(deviceType) {
    this.deviceType = deviceType;
  }
}

const viewStore = new ViewStore();

export default viewStore;
