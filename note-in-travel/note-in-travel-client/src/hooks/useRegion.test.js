import React from "react";
import { act, create } from "react-test-renderer";

import useRegion from "./useRegion";

import REGION from "../constants/region";

describe(">>> HOOKS --- USE REGION", () => {
  const mockRegion1 = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 2,
    longitudeDelta: 2,
  };
  const mockRegion2 = {
    latitude: 2,
    longitude: 2,
    latitudeDelta: 4,
    longitudeDelta: 4,
  };

  function setup(...args) {
    const returnVal = {};

    function TestComponent() {
      Object.assign(returnVal, useRegion(...args));
      return null;
    }

    create(<TestComponent />);
    return returnVal;
  }

  it("+++ pass region for one location", () => {
    const regionData = setup(REGION.korea);

    expect(regionData.region).toEqual(REGION.korea);
  });

  it("+++ pass region for one location to changeRegion method", () => {
    const regionData = setup(REGION.korea);

    expect(regionData.region).toEqual(REGION.korea);

    act(() => {
      regionData.changeRegion(mockRegion1);
    });

    expect(regionData.region).toEqual(mockRegion1);

    act(() => {
      regionData.changeRegion(mockRegion2);
    });

    expect(regionData.region).toEqual(mockRegion2);
  });

  it("+++ pass region list to changeRegion method", () => {
    const regionData = setup(REGION.korea);
    const viewPadding = 1;
    const expected = {
      latitude: 1,
      longitude: 1,
      latitudeDelta: 2,
      longitudeDelta: 2,
    };

    expect(regionData.region).toEqual(REGION.korea);

    act(() => {
      regionData.changeRegion([mockRegion1, mockRegion2], viewPadding);
    });

    expect(regionData.region).toEqual(expected);
  });
});
