/* eslint-disable import/first */
import React from "react";
import { act, create } from "react-test-renderer";

jest.mock("../constants/region", () => ({
  korea: {
    latitude: 5,
    longitude: 5,
    latitudeDelta: 10,
    longitudeDelta: 10,
  },
}));
jest.mock("../utils/fetchData");
import fetchData from "../utils/fetchData";
import useCourseSegments from "./useCourseSegments";
import MockedNavigator from "../../testing/MockedNavigator";

describe(">>> HOOK --- USE COURSE SEGMENTS", () => {
  const mockCourse1 = {
    location: {
      latitude: 1,
      longitude: 1,
    },
  };
  const mockCourse2 = {
    location: {
      latitude: 1.5,
      longitude: 1.5,
    },
  };
  const mockCourse3 = {
    location: {
      latitude: 1.9,
      longitude: 1.9,
    },
  };
  const mockCourse4 = {
    location: {
      latitude: 3,
      longitude: 3,
    },
  };
  const mockCourses = [mockCourse1, mockCourse2, mockCourse3, mockCourse4];

  function setup(...args) {
    const returnVal = {};

    function TestComponent() {
      Object.assign(returnVal, useCourseSegments(...args));
      return null;
    }

    create(<MockedNavigator component={TestComponent} />);
    return returnVal;
  }

  beforeEach(() => {
    fetchData.mockImplementation(() => Promise.resolve(mockCourses));
  });

  afterEach(() => {
    fetchData.mockClear();
  });

  it("+++ should split courses to segments", async () => {
    let courseSegmentsData;

    await act(async () => {
      courseSegmentsData = setup(null);
    });

    expect(fetchData).toBeCalledWith("GET", "/course");
    expect(courseSegmentsData.error).toBe(null);
    expect(courseSegmentsData.segments).toEqual([
      [mockCourse1, mockCourse2, mockCourse3],
      [mockCourse4],
    ]);
  });
});
