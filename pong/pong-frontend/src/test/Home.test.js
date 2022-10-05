import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { configure, mount } from "enzyme";
import Home from "../components/home/Home";

configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({
  user: {
    email: "",
    name: "",
    socketId: ""
  }
});

describe("<Home />", () => {
  it("should render div node", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(wrapper.find("div")).toHaveLength(5);
  });

  it("should render 1 span node", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(wrapper.find("span")).toHaveLength(1);
  });

  it("should render 1 button node", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("should render title with pong text", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(wrapper.find("span").text()).toBe("PONG!");
  });

  it("should render button with START text", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(wrapper.find("button").text()).toBe("START");
  });

  it("should render div with press text", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(wrapper.find("div").at(4).text()).toBe("press start to play");
  });
});
