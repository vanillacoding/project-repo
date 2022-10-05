import * as PIXI from "pixi.js";
import Tween from "@tweenjs/tween.js";
import { canvasSize } from "../config";
import Loader from "../container/Loader";
import MainMenu from "../container/MainMenu";
import Battle from "../container/Battle";
import generateRandomString from "../utils/generateRandomString";
import globalStore from "../globalStore";

export default class App {
  constructor() {
    this.app = null;
    this.loader = null;

    this.currentScene = null;
    this.battleScene = null;
    this.playerId = generateRandomString();

    this.subscribeScene();
  }

  async run() {
    try {
      this.app = new PIXI.Application({
        width: canvasSize.width,
        height: canvasSize.height,
        backgroundColor: 0xeeeeee,
      });

      this.app.stage.sortableChildren = true;

      const $container = document.querySelector(".container");
      $container.appendChild(this.app.view);

      this.restrictMouseRightClick();

      await this.loading();

      globalStore.setStore("scene", new MainMenu(this.playerId));

      this.addTicker();
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error(err);
      }
    }
  }

  addTicker() {
    this.app.ticker.add((delta) => {
      Tween.update();

      if (this.battleScene && this.battleScene.isPlaying) {
        this.battleScene.update();
      }
    });
  }

  restrictMouseRightClick() {
    this.app.view.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }

  subscribeScene() {
    globalStore.subscribe((newStore) => {
      const { scene: newScene } = newStore;

      if (newScene && this.currentScene !== newScene) {
        if (this.currentScene instanceof Battle) {
          this.battleScene = null;
        }

        this.changeScene(newScene);
      }
    });
  }

  async loading() {
    this.loader = new Loader(this.app.loader);
    this.app.stage.addChild(this.loader.container);
    await this.loader.preload();
    this.app.stage.removeChild(this.loader.container);
  }

  changeScene(newScene) {
    if (this.currentScene) {
      this.app.stage.removeChild(this.currentScene.container);
    }

    this.currentScene = newScene;

    if (this.currentScene instanceof Battle) {
      this.battleScene = this.currentScene;
    }

    this.app.stage.addChild(this.currentScene.container);
  }
}
