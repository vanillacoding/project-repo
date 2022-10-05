import { makeObservable, observable, action } from "mobx";

class UserStore {
  nickname = "";

  constructor() {
    makeObservable(this, {
      nickname: observable,
      setNickname: action,
    });
  }

  setNickname(nickname) {
    this.nickname = nickname;
  }
}

const userStore = new UserStore();

export default userStore;
