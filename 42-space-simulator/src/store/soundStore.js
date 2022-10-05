import { observable, action, makeObservable } from "mobx";

class SoundStore {
  constructor() {
    this.breathingSound = new Audio("/sounds/slowBreathingSound.mp3");
    this.alarm1 = new Audio("/sounds/alarm1.mp3");
    this.alarm2 = new Audio("/sounds/alarm2.mp3");
    this.spaceSound = new Audio("/sounds/spaceSound.mp3");

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

  playSound(sound, volume) {
    sound.autoplay = true;
    sound.loop = true;
    sound.currentTime = 0;
    sound.volume = volume;

    sound.play();
  }

  pauseSound(sound) {
    sound.pause();
  }

  lowerVolume(sound) {
    sound.volume = sound.volume - 0.4;
  }
}

const soundStore = new SoundStore();

export { soundStore };
