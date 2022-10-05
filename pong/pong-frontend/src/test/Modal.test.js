import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, mount } from "enzyme";
import Modal from "../components/modal/Modal";

configure({ adapter: new Adapter() });

describe("<Modal />", () => {
  it("should render div node", () => {
    const wrapper = mount(<Modal />);

    expect(wrapper.find("div")).toHaveLength(5);
    expect(wrapper.find("div").first().hasClass("wrapper")).toBe(true);
    expect(wrapper.find("div").at(1).hasClass("modalWrapper")).toBe(true);
    expect(wrapper.find("div").at(2).hasClass("arc")).toBe(true);
    expect(wrapper.find("div").at(3).hasClass("arc2")).toBe(true);
    expect(wrapper.find("div").at(4).hasClass("contentWrapper")).toBe(true);
  });
});
