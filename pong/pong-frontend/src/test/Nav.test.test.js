import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { configure, mount } from "enzyme";
import Nav from "../components/nav/Nav";

configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({
  roomMatch: {
    isMatched: false,
    partner: {
      socketId: "",
      name: ""
    },
    chats: [],
    webcam: {
      isCalling: false,
      isCallAccepted: false,
      callerSignal: null
    },
    gameBoard: {
      isModerator: false,
    }
  },
  user: {
    email: "",
    name: "",
    socketId: ""
  }
});

describe("<Nav />", () => {
  it("should render div node", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Nav />
      </Provider>
    );

    expect(wrapper.find("div")).toHaveLength(1);
  });

  it("should render span node", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Nav />
      </Provider>
    );

    expect(wrapper.find("span")).toHaveLength(2);
    expect(wrapper.find("span").first().text()).toBe("Home");
    expect(wrapper.find("span").at(1).text()).toBe("Ranking");
  });

  it("should render button node", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Nav />
      </Provider>
    );

    expect(wrapper.find("button")).toHaveLength(2);
    expect(wrapper.find("button").first().hasClass("headerBtn")).toBe(true);
    expect(wrapper.find("button").at(1).hasClass("headerBtn")).toBe(true);
  });
});
