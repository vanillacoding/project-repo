import PreloadScene from "../common/PreloadScene";

import createHeroAnimations from "../../animations/Hero";

export default class SinglePreloadScene extends PreloadScene {
  create() {
    super.create();

    createHeroAnimations(this.anims, true);
  }
  
  loadHeroResource() {
    super.loadHeroResource();

    this.load.atlas("hero-die-left", "hero-die-left.png", "hero-die-left.json");
    this.load.atlas("hero-die-right", "hero-die-right.png", "hero-die-right.json");
  }
}
