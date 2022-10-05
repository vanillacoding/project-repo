import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, mount } from "enzyme";
import ScoreBoard from "../components/scoreBoard/ScoreBoard";

configure({ adapter: new Adapter() });

describe("<ScoreBoard />", () => {
  it("should render div node", () => {
    const wrapper = mount(<ScoreBoard />);

    expect(wrapper.find("div")).toHaveLength(1);
    expect(wrapper.find("div").first().hasClass("count")).toBe(true);
    expect(wrapper.find("div").first().text()).toBe("READY! ");
  });

  it("should show score more nodes when playing game", () => {
    const wrapper = mount(<ScoreBoard isPlaying={true} />);

    expect(wrapper.find("div")).toHaveLength(7);
    expect(wrapper.find("div").first().hasClass("score")).toBe(true);
    expect(wrapper.find("div").at(2).text()).toBe("PANDA 🐼");
    expect(wrapper.find("div").at(5).text()).toBe("BEAR 🐻");
  });
});
