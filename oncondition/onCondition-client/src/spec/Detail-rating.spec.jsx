import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useSelector } from "react-redux";
import MockTheme from "./mockTheme";
import { Route, MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

import Detail from "../pages/Detail";
import getApi from "../api/category";

const mockUserState = { user: { id: "mockUserId" } };

const mockActivityData = {
  category: "Activity",
  date: new Date().toISOString(),
  type: "Walking",
  duration: 60,
  rating: {
    heartCount: 0,
    text: "mock activity 123456",
  },
};

const mockMealData = {
  category: "Meal",
  date: new Date().toISOString(),
  url: "mock url",
  rating: {
    heartCount: 0,
    text: "mock meal 123456",
  },
};

const mockEditById = jest.fn();
const mockDeleteById = jest.fn();

jest.mock("react-redux", () => ({ useSelector: jest.fn() }));
jest.mock("../api/category", () => jest.fn());

describe("Detail Component", () => {
  describe("handle without picture", () => {
    beforeEach(async () => {
      useSelector.mockImplementation((selector) => selector(mockUserState));

      getApi.mockImplementation(() => ({
        getById: () => Promise.resolve({ ...mockActivityData }),
        editById: mockEditById,
        deleteById: mockDeleteById,
      }));

      await act(async () => {
        await render(
          <MockTheme>
            <MemoryRouter initialEntries={["/mockUserId/Activity/ratingId1"]}>
              <Route path="/:creatorId/:category/:ratingId">
                <Detail />
              </Route>
            </MemoryRouter>
          </MockTheme>,
        );
      });
    });

    afterEach(() => {
      getApi.mockClear();
    });

    test("should render data for existing category", () => {
      expect(screen.getByText("mock activity 123456")).toBeInTheDocument();
      expect(screen.getByText("Walking (60)")).toBeInTheDocument();
    });

    test("should render edit form when edit button is clicked", () => {
      const $editButton = screen.getByText("EDIT");

      expect($editButton).toBeInTheDocument();

      fireEvent.click($editButton);

      expect(screen.getByPlaceholderText("내용을 입력해주세요")).toBeInTheDocument();
    });

    test("should call edit api when edit button is clicked", async () => {
      fireEvent.click(screen.getByText("EDIT"));

      const $ratingTextarea = screen.getByPlaceholderText("내용을 입력해주세요");
      const $heartCounter = screen.getByRole("slider", { type: "range" });
      const $saveButton = screen.getByText("SAVE");

      expect($heartCounter).toBeInTheDocument();
      expect($saveButton).toBeInTheDocument();

      await act(async () => {
        await fireEvent.change($heartCounter, { target: { value: 4 } });
        await fireEvent.change($ratingTextarea, { target: { value: "mock rating content" } });
        await fireEvent.click($saveButton);
      });

      expect(mockEditById).toBeCalledTimes(1);
      expect(mockEditById).toBeCalledWith(
        "mockUserId",
        "ratingId1",
        {
          date: expect.anything(),
          heartCount: 4,
          text: "mock rating content",
        },
      );
    });

    test("should render confirm modal when delete button is clicked", async () => {
      const $deleteButton = screen.getByText("DELETE");

      expect($deleteButton).toBeInTheDocument();

      await act(async () => {
        await fireEvent.click($deleteButton);
      });

      const $confirmButton = screen.getByText("Confirm");

      expect(screen.getByText("정말로 삭제하시겠어요?")).toBeInTheDocument();
      expect($confirmButton).toBeInTheDocument();
    });

    test("should call delete api when delete button is clicked and confirmed", async () => {
      await act(async () => {
        await fireEvent.click(screen.getByText("DELETE"));
        await fireEvent.click(screen.getByText("Confirm"));
      });

      expect(mockDeleteById).toBeCalledTimes(1);
      expect(mockDeleteById).toBeCalledWith("mockUserId", "ratingId1");
    });
  });

  describe("handle with picture", () => {
    beforeEach(async () => {
      useSelector.mockImplementation((selector) => selector(mockUserState));

      getApi.mockImplementation(() => ({
        getById: () => Promise.resolve({ ...mockMealData }),
        editById: mockEditById,
        deleteById: mockDeleteById,
      }));

      await act(async () => {
        await render(
          <MockTheme>
            <MemoryRouter initialEntries={["/mockUserId/Meal/ratingId2"]}>
              <Route path="/:creatorId/:category/:ratingId">
                <Detail />
              </Route>
            </MemoryRouter>
          </MockTheme>,
        );
      });
    });

    afterEach(() => {
      getApi.mockClear();
    });

    test("should render data for existing category", () => {
      expect(screen.getByText("mock meal 123456")).toBeInTheDocument();
      expect(screen.getByRole("img", { src: "mock url" })).toBeInTheDocument();
    });

    test("should render edit form when edit button is clicked", () => {
      const $editButton = screen.getByText("EDIT");

      expect($editButton).toBeInTheDocument();

      fireEvent.click($editButton);

      expect(screen.getByPlaceholderText("내용을 입력해주세요")).toBeInTheDocument();
    });

    test("should set disable file input (modifying img should not be allowed)", () => {
      fireEvent.click(screen.getByText("EDIT"));

      const $imageInput = document.querySelector(".imageInput");

      expect($imageInput.disabled).toBeTruthy();
    });
  });
});
