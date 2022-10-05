import React from "react";
import { shallow } from "enzyme";
import EnergyBattleController from "../components/EnergyBattleController/EnergyBattleController";
import { ROOM_STATUS } from "../constants/constants";
import Button from "../components/shared/Button/Button";

describe("<EnergyBattleController />", () => {
  let component = null;

  it("render counter correctly", () => {
    component = shallow(
      <EnergyBattleController
        counter={"counter"}
        roomStatus={ROOM_STATUS.WAITING}
        onClick={() => {}}
      />
    );

    expect(component.text()).toEqual("counter");
  });

  it("render waiting button and work correctly", () => {
    let count = 0;
    component = shallow(
      <EnergyBattleController
        counter={""}
        roomStatus={ROOM_STATUS.WAITING}
        onClick={() => { count += 1 }}
      />
    );

    expect(component.text()).toEqual(ROOM_STATUS.WAITING);
    component.find(Button).at(0).simulate("click");
    expect(count).toEqual(1);
  });

  it("render waiting ready and work correctly", () => {
    let count = 0;
    component = shallow(
      <EnergyBattleController
        counter={""}
        roomStatus={ROOM_STATUS.READY}
        onClick={() => { count += 1 }}
      />
    );

    expect(component.text()).toEqual(ROOM_STATUS.READY);
    component.find(Button).at(0).simulate("click");
    expect(count).toEqual(1);
  });
});
