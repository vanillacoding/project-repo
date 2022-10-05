import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { configure, mount } from "enzyme";
import Ranking from "../components/ranking/Ranking";

configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({});

describe("<ChatRoom />", () => {
  it("should render div node", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Ranking />
      </Provider>
    );

    expect(wrapper.find("div")).toHaveLength(8);
  });

  it("should render span node", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Ranking />
      </Provider>
    );

    expect(wrapper.find("span")).toHaveLength(5);
    expect(wrapper.find("span").first().text()).toBe("RANKING");
    expect(wrapper.find("span").at(1).text()).toBe("RANK");
    expect(wrapper.find("span").at(2).text()).toBe("NAME");
    expect(wrapper.find("span").at(3).text()).toBe("SCORE");
    expect(wrapper.find("span").at(4).text()).toBe("PONG!");
  });
});
