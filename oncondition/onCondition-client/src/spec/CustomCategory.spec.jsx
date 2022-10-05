import React from "react";
import { render } from "@testing-library/react";
import MockTheme from "./mockTheme";
import { Route, MemoryRouter } from "react-router-dom";

import CustomCategory from "../pages/CustomCategory";
import * as CustomAlbum from "../pages/CustomAlbum";
import * as CustomGrid from "../pages/CustomGrid";
import { setError } from "../features/errorSlice";
import STATUS_CODES from "../constants/statusCodes";
import { ERROR } from "../constants/messages";

const mockState = {
  user: { customCategories: [
    {
      category: "바코10기사진첩",
      categoryType: "album",
    },
    {
      category: "포도",
      categoryType: "grid",
    },
  ] },
};

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useSelector: (selector) => selector(mockState),
  useDispatch: () => mockDispatch,
}));

describe("CustomCategory Component", () => {
  test("should set error for not existed category", () => {
    const { container } = render(
      <MockTheme>
        <MemoryRouter initialEntries={["/creator1234/존재하지 않는 카테고리"]}>
          <Route path="/:creatorId/:category">
            <CustomCategory />
          </Route>
        </MemoryRouter>
      </MockTheme>,
    );

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith(setError({
      statusCode: STATUS_CODES.NOT_FOUND,
      message: ERROR.NOT_FOUND,
    }));
    expect(container.children.length).toBe(0);
  });

  test("should render custom album", () => {
    const spyCustomAlbum = jest.spyOn(CustomAlbum, "default");

    const { getByText } = render(
      <MockTheme>
        <MemoryRouter initialEntries={["/creator1234/바코10기사진첩"]}>
          <Route path="/:creatorId/:category">
            <CustomCategory />
          </Route>
        </MemoryRouter>
      </MockTheme>,
    );

    expect(getByText("바코10기사진첩")).toBeInTheDocument();
    expect(getByText("add album")).toBeInTheDocument();
    expect(spyCustomAlbum).toBeCalledTimes(1);
  });

  test("should render custom grid", () => {
    const spyCustomGrid = jest.spyOn(CustomGrid, "default");

    const { container, getByText } = render(
      <MockTheme>
        <MemoryRouter initialEntries={["/creator1234/포도"]}>
          <Route path="/:creatorId/:category">
            <CustomCategory />
          </Route>
        </MemoryRouter>
      </MockTheme>,
    );

    expect(getByText("포도")).toBeInTheDocument();
    expect(container.querySelector(".grid")).toBeInTheDocument();
    expect(spyCustomGrid).toBeCalledTimes(1);
  });
});
