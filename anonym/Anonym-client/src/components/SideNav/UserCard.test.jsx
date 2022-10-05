import React from "react";
import { shallow } from "enzyme";
import UserCard from "./UserCard";

describe("<UserCard />", () => {
  const context = {
    thumnail: "mock thumnail",
    userName: "mock userName",
  };
  const component = shallow(<UserCard userInfo={context} />);

  it("should render context", () => {
    const img = component.find(".user-thumnail");
    expect(img.props().src).toEqual(context.thumnail);
  
    const userName = component.find(".following-card__user-name");
    expect(userName.text()).toEqual(context.userName);
  });
});
