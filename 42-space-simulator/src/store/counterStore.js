import { observable, action, makeObservable } from "mobx";

const counter = document.querySelector(".counter");

class CounterStore {
  constructor() {
    this.count = 42;

    makeObservable(this, {
      count: observable,
      decrease: action,
      update: action,
      step: action,
    });
  }

  step() {
    if (this.count === 0) {
      return;
    }

    setTimeout(() => {
      this.decrease();
      this.step();
    }, 3000);
  }

  decrease() {
    this.count = this.count - 1;
  }

  update(count) {
    counter.innerHTML = count;
  }
}

const counterStore = new CounterStore();

export { counterStore };
