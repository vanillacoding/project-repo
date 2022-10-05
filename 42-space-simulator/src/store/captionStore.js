import { observable, action, makeObservable } from "mobx";

import {
  emptyLine,
  introCaptions,
  counterCaptions,
  endingLine,
} from "../constant/caption";

const caption = document.querySelector(".caption");
const introPageText = document.querySelector(".intro-text");

class CaptionStore {
  constructor() {
    this.currentCaption = emptyLine;

    makeObservable(this, {
      currentCaption: observable,
      showOpeningCaption: action,
      showCounterCaption: action,
      showEndingCaption: action,
      clearCaption: action,
      changeCaption: action,
      pause: action,
    });
  }

  async showOpeningCaption() {
    await this.pause(3000);
    introPageText.innerHTML = introCaptions.line0;
    await this.pause(3000);
    introPageText.innerHTML = introCaptions.line1;
    await this.pause(3000);
    introPageText.innerHTML = introCaptions.line2;
    await this.pause(3000);
    introPageText.innerHTML = introCaptions.line3;
    await this.pause(3000);
    introPageText.innerHTML = introCaptions.line4;
    await this.pause(3000);
    introPageText.innerHTML = emptyLine;
  }

  async showEndingCaption() {
    await this.pause(8000);
    introPageText.innerHTML = endingLine;
  }

  changeCaption(caption) {
    this.currentCaption = caption;
  }

  async showCounterCaption(count) {
    switch (count) {
      case 40:
        this.changeCaption(counterCaptions.line1);
        caption.innerHTML = this.currentCaption;
        await this.pause(4000);
        caption.innerHTML = "";

        break;

      case 36:
        this.changeCaption(counterCaptions.line2);
        caption.innerHTML = this.currentCaption;
        await this.pause(4000);
        caption.innerHTML = "";
        break;

      case 30:
        this.changeCaption(counterCaptions.line3);
        caption.innerHTML = this.currentCaption;
        await this.pause(4000);
        caption.innerHTML = "";
        break;

      case 25:
        this.changeCaption(counterCaptions.line4);
        caption.innerHTML = this.currentCaption;
        await this.pause(4000);
        caption.innerHTML = "";
        break;

      case 10:
        this.changeCaption(counterCaptions.line5);
        caption.innerHTML = this.currentCaption;
        await this.pause(4000);
        caption.innerHTML = "";
        break;

      case 1:
        this.changeCaption(counterCaptions.line6);
        caption.innerHTML = this.currentCaption;
        await this.pause(1000);
        caption.innerHTML = "";
        break;
    }
  }

  clearCaption() {
    this.currentCaption = emptyLine;
  }

  pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

const captionStore = new CaptionStore();

export { captionStore };
