import * as PIXI from "pixi.js";
import globalStore from "../../globalStore";
import loaderConfig from "./loaderConfig";
import { canvasSize } from "../../config";
import createBox from "../../pixiUtils/createBox";

export default class Loader {
  constructor(loader) {
    this.loader = loader;
    this.resources = loaderConfig;
    this.container = new PIXI.Container();

    this.wrapper = null;
    this.title = null;
    this.loadingPercentageText = null;
    this.createWrapper();
    this.createTitle();
    this.createLoadingPercentageText();

    this.render();
  }

  preload() {
    return new Promise((resolve, reject) => {
      for (const key in this.resources) {
        this.loader.add(key, this.resources[key]);
      }

      this.loader.onProgress.add((e) => {
        if (this.loadingPercentageText) {
          this.loadingPercentageText.text = `${Math.ceil(e.progress)}%`;
        }
      });

      this.loader.onError.add((err) => {
        reject(err);
      });

      this.loader.load((loader, resources) => {
        globalStore.setStore("resources", resources);

        resolve();
      });
    });
  }

  createWrapper() {
    this.wrapper = createBox({
      width: 500,
      height: 350,
      x: canvasSize.width / 2,
      y: canvasSize.height / 2,
      color: 0xffffff,
    });
  }

  createTitle() {
    this.title = new PIXI.Text("Loading", {
      fontFamily: "sans-serif",
      fontSize: 80,
      align: "center",
    });
    this.title.anchor.set(0.5, 0.5);
    this.title.x = canvasSize.width / 2;
    this.title.y = canvasSize.height / 2 - 50;
  }

  createLoadingPercentageText() {
    this.loadingPercentageText = new PIXI.Text("0%", {
      fontFamily: "sans-serif",
      fontSize: 80,
      align: "center",
    });
    this.loadingPercentageText.anchor.set(0.5, 0.5);
    this.loadingPercentageText.x = canvasSize.width / 2;
    this.loadingPercentageText.y = canvasSize.height / 2 + 70;
  }

  render() {
    this.container.addChild(
      this.wrapper,
      this.title,
      this.loadingPercentageText
    );
  }
}
