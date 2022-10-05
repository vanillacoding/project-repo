import viewStore from "../store/viewStore";

class Controls {
  constructor() {
    this.#init();
  }

  #init() {
    this.keys = {
      left: false,
      right: false,
    };

    if (viewStore.deviceType === "desktop") {
      document.addEventListener("keydown", (event) => this.#onKeyDown(event), false);
      document.addEventListener("keyup", (event) => this.#onKeyUp(event), false);
    } else {
      const canvas = document.querySelector("canvas.webgl");

      canvas.addEventListener("touchstart", (event) => this.#onTouchStart(event), false);
      canvas.addEventListener("touchend", (event) => this.#onTouchEnd(event), false);
    }
  }

  #onKeyDown(event) {
    switch (event.key) {
      case "ArrowLeft":
        this.keys.left = true;
        break;
      case "ArrowRight":
        this.keys.right = true;
        break;
    }
  }

  #onKeyUp(event) {
    switch (event.key) {
      case "ArrowLeft":
        this.keys.left = false;
        break;
      case "ArrowRight":
        this.keys.right = false;
        break;
    }
  }

  #onTouchStart(event) {
    event.preventDefault();

    const clientX = event.touches[0].clientX;

    if (clientX > window.innerWidth * 0.5) {
      this.keys.right = true;
    } else {
      this.keys.left = true;
    }
  }

  #onTouchEnd(event) {
    event.preventDefault();

    this.keys.left = false;
    this.keys.right = false;
  }
}

export default Controls;
