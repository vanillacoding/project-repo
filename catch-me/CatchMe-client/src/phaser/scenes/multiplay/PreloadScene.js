import PreloadScene from "../common/PreloadScene";

import createHeroAnimations from "../../animations/Hero";

export default class MultiPreloadScene extends PreloadScene {
  create() {
    super.create();

    createHeroAnimations(this.anims);
  }

  completeLoading() {
    this.scene.start("multi");
  }
}
