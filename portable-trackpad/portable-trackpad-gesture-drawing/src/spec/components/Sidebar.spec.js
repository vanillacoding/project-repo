import React from "react";
import { render, screen } from "@testing-library/react";
import SideBar from "../../components/Sidebar";
import * as reactRedux from "react-redux";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Sidebar", () => {
  const useSelectorMock = reactRedux.useSelector;

  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) => selector(mockStore));
  });

  afterEach(() => {
    useSelectorMock.mockClear();
  });

  const mockStore = {
    isFoldSideBar: {
      isFoldSideBar: true,
    },
  };

  it("should be applied style isFoldSideBar exist", () => {
    render(<SideBar />);

    const SideBarContainer = screen.getByTestId("SideBarContainer");
    const sidebarTitle = screen.getByTestId("sidebar-title");
    const sidebarTitleDiv = screen.getByTestId("sidebar-title-div");

    expect(SideBarContainer).toHaveStyle({
      transform: ["translateX(-10vmin)"],
    });
    expect(sidebarTitle).toHaveStyle({
      transform: ["translateX(10vmin)"],
    });
    expect(sidebarTitleDiv).toHaveStyle({
      opacity: 0,
    });
  });
});
