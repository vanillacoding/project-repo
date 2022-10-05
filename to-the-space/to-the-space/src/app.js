import "./style";

import gsap from "gsap";
import * as THREE from "three";
import { autorun } from "mobx";

import playStore from "./store/playStore";
import userStore from "./store/userStore";
import viewStore from "./store/viewStore";

import { STATE } from "./constants/view";

import database from "./utils/database";
import transition from "./utils/transition";
import detectDevice from "./utils/detectDevice";

import World from "./game/World";

class App {
  #nickname = "";
  #score = "";

  constructor() {
    this.dom = {
      mainContainer: document.getElementById("ui"),
      canvas: document.querySelector("canvas.webgl"),
      gameLoading: document.querySelector(".game-loading"),
      gameStart: document.querySelector(".game-start"),
      gameSetting: document.querySelector(".game-setting"),
      gamePlay: document.querySelector(".game-play"),
      gameOver: document.querySelector("game-end"),
      scoreboard: document.querySelector(".scoreboard"),
      input: {
        nickname: document.querySelector(".nickname-input"),
      },
      button: {
        start: document.querySelector(".start-button"),
        launch: document.querySelector(".launch-button"),
        restart: document.querySelector(".restart-button"),
      },
      loading: {
        bar: document.querySelector(".loading-bar"),
        percentage: document.querySelector(".loading-percentage"),
      },
      energy: {
        guide: document.querySelector(".space-bar-guide"),
        bar: document.querySelector(".energy-bar"),
      },
      text: {
        speed: document.querySelector(".speed"),
        altitude: document.querySelector(".altitude"),
        countDown: document.querySelector(".count-down"),
        inputError: document.querySelector(".input-error"),
        userScore: document.querySelector(".user-score"),
      },
    };

    const currentDeviceType = detectDevice();
    viewStore.setDeviceType(currentDeviceType);

    autorun(() => {
      switch (viewStore.currentState) {
        case STATE.LOAD:
          this.#loading();
          break;
        case STATE.START:
          this.#starting();
          break;
        case STATE.SET:
          this.#setting();
          break;
        case STATE.PLAY:
          this.#playing();
          break;
        case STATE.LAUNCH:
          this.#launching();
          break;
        case STATE.END:
          this.#ending();
          break;
      }
    });

    autorun(() => {
      this.dom.text.speed.textContent = playStore.speed;
      this.dom.text.altitude.textContent = playStore.altitude;
    });

    viewStore.updateState(STATE.LOAD);

    this.world = new World(this.dom.canvas, this.loadingManager);
  }

  #loading() {
    this.loadingManager = new THREE.LoadingManager();

    this.loadingManager.onLoad = () => {
      gsap.delayedCall(0.5, () => {
        viewStore.updateState(STATE.START);

        transition.showView(this.dom.canvas, 1);
        transition.showView(this.dom.gameStart, 1);
      });
    };

    this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const progressRatio = itemsLoaded / itemsTotal;
      const percentage = Math.floor(progressRatio * 100);

      this.dom.loading.bar.style.transform = `scaleX(${progressRatio})`;
      this.dom.loading.percentage.textContent = `${percentage}%`;
    };
  }

  #starting() {
    this.dom.button.start.addEventListener(
      "click",
      () => {
        const nicknameInput = this.dom.input.nickname.value;

        if (!nicknameInput) {
          transition.showInputError(this.dom.text.inputError, "please input your nickname");
          return;
        }

        transition.showView(this.dom.gameSetting, 1);
        this.dom.text.inputError.textContent = "";

        userStore.setNickname(nicknameInput);
        viewStore.updateState(STATE.SET);
      },
      false,
    );
  }

  #setting() {
    this.dom.button.launch.addEventListener(
      "click",
      () => {
        playStore.reset();
        viewStore.updateState(STATE.PLAY);
      },
      false,
    );
  }

  #playing() {
    let count = 5;
    let energy = 0;

    this.dom.energy.bar.style.height = `${energy}%`;

    const handleSpaceBarDown = (event) => {
      event.preventDefault();

      if (event.repeat) {
        return;
      }

      if (event.key === " " && energy < 100) {
        energy += 1.5;

        this.dom.energy.bar.style.height = `${energy}%`;

        playStore.addPower();
      }
    };

    const handlePointerDown = (event) => {
      event.preventDefault();

      if (energy < 100) {
        energy += 1.5;

        this.dom.energy.bar.style.height = `${energy}%`;

        playStore.addPower();
      }
    };

    const timeline = gsap.timeline({ repeat: -1 });
    timeline.to(this.dom.energy.guide, { backgroundColor: "#D3D3D3", duration: 0.1 });
    timeline.to(this.dom.energy.guide, { backgroundColor: "#080808", duration: 0.1 });

    if (viewStore.deviceType === "desktop") {
      this.dom.energy.guide.textContent = "TAB SPACE BAR";
      document.addEventListener("keydown", handleSpaceBarDown, false);
    } else {
      this.dom.energy.guide.textContent = "TOUCH SCREEN";
      document.addEventListener("pointerdown", handlePointerDown, false);
    }

    const intervalID = setInterval(() => {
      count--;

      this.dom.text.countDown.textContent = count;

      if (count < 0) {
        this.dom.text.countDown.textContent = 5;
        clearInterval(intervalID);
      }
    }, 1000);

    setTimeout(() => {
      timeline.clear();

      if (viewStore.deviceType === "desktop") {
        document.removeEventListener("keydown", handleSpaceBarDown);
      } else {
        document.removeEventListener("pointerdown", handlePointerDown);
      }

      playStore.setIsLaunched(true);
      viewStore.updateState(STATE.LAUNCH);
    }, 5000);
  }

  #launching() {
    this.dom.text.altitude.textContent = playStore.altitude;
    this.dom.text.speed.textContent = playStore.speed;
  }

  async #ending() {
    this.#nickname = userStore.nickname;
    this.#score = playStore.altitude;

    this.dom.text.userScore.textContent = this.#score;

    database.postUserScore(this.#nickname, this.#score);

    const scoreList = await database.getScoreList();

    scoreList.map((info, index) => {
      const scoreElement = document.createElement("li");
      scoreElement.classList.add("score-element");

      const nickname = document.createElement("span");
      nickname.textContent = `${index + 1}.  ${info.nickname}`;
      nickname.classList.add("nickname");
      scoreElement.append(nickname);

      const score = document.createElement("span");
      score.textContent = `${info.score} KM`;
      score.classList.add("score");
      scoreElement.append(score);

      this.dom.scoreboard.append(scoreElement);
    });

    this.dom.button.restart.addEventListener(
      "click",
      () => {
        while (this.dom.scoreboard.children.length > 1) {
          this.dom.scoreboard.removeChild(this.dom.scoreboard.lastChild);
        }

        viewStore.updateState(STATE.SET);
      },
      false,
    );
  }
}

new App();
