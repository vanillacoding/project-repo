import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useSelector } from "react-redux";
import MockTheme from "./mockTheme";
import { Route, MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

import Detail from "../pages/Detail";
import getApi from "../api/category";

const mockUserState = { user: { id: "mockUserId" } };
const mockFriendState = { user: { id: "friendId" } };
const mockGuestState = { user: { id: "guestId" } };

const mockData = {
  category: "Activity",
  date: new Date().toISOString(),
  type: "Walking",
  duration: 60,
  rating: {
    heartCount: 0,
    text: "mock test 123456",
  },
};

const mockComments = [
  {
    _id: "commentId1",
    category: "Activity",
    ratingId: "ratingId1",
    creator: {
      _id: "mockUserId",
      name: "mockUser",
      profileUrl: "none",
    },
    date: new Date().toISOString(),
    content: "mock comment1",
  },
  {
    _id: "commentId2",
    category: "Activity",
    ratingId: "ratingId1",
    creator: {
      _id: "friendId",
      name: "mockFriend",
      profileUrl: "none",
    },
    date: new Date().toISOString(),
    content: "mock comment2",
  },
];

const mockPostComment = jest.fn();
const mockEditCommentById = jest.fn();
const mockDeleteCommentById = jest.fn();

jest.mock("react-redux", () => ({ useSelector: jest.fn() }));
jest.mock("../api/category", () => jest.fn());

async function setUp() {
  getApi.mockImplementation(() => ({
    getById: () => Promise.resolve({
      ...mockData,
      comments: mockComments,
    }),
    postComment: mockPostComment,
    editCommentById: mockEditCommentById,
    deleteCommentById: mockDeleteCommentById,
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
}

describe("Detail Component's comment part", () => {
  describe("render comment", () => {
    beforeEach(async () => {
      useSelector.mockImplementation((selector) => selector(mockUserState));
      await setUp();
    });
    afterEach(() => getApi.mockClear());

    test("should render comment", () => {
      expect(screen.getByText("mock comment1")).toBeInTheDocument();
      expect(screen.getByText("mock comment2")).toBeInTheDocument();
    });
  });

  describe("create comment", () => {
    beforeEach(async () => {
      useSelector.mockImplementation((selector) => selector(mockUserState));
      await setUp();
    });
    afterEach(() => getApi.mockClear());

    test("should create comment", async () => {
      const $commentTextarea = screen.getByPlaceholderText("코멘트를 입력해주세요.");
      const $saveButton = $commentTextarea.parentNode.lastChild.lastChild;

      expect($commentTextarea).toBeInTheDocument();
      expect($saveButton).toBeInTheDocument();
      expect($commentTextarea.value).toBe("");
      expect($saveButton.textContent).toBe("COMMENT");

      await act(async () => {
        await fireEvent.change($commentTextarea, { target: { value: "new comment" } });
        await fireEvent.click($saveButton);
      });

      expect(mockPostComment).toBeCalledTimes(1);
      expect(mockPostComment).toHaveBeenCalledWith(
        "mockUserId",
        "ratingId1",
        {
          content: "new comment",
          date: expect.anything(),
        },
      );
    });
  });

  describe("handle comment delete button for rating creator", () => {
    beforeEach(async () => {
      useSelector.mockImplementation((selector) => selector(mockUserState));
      await setUp();
    });
    afterEach(() => getApi.mockClear());

    test("should render delete buttons for rating creator", () => {
      const $mockUserComment = screen.getByText("mock comment1").parentNode;
      const $friendComment = screen.getByText("mock comment2").parentNode;

      const $mockUserButtons = $mockUserComment.lastChild;
      const $friendButtons = $friendComment.lastChild;

      expect($mockUserButtons.lastChild).toBeTruthy();
      expect($friendButtons.lastChild).toBeTruthy();

      expect($mockUserButtons.lastChild.textContent).toBe("DELETE");
      expect($friendButtons.lastChild.textContent).toBe("DELETE");
    });

    test("should call delete api when delete button is clicked", async () => {
      const $mockUserCommentDelete = screen.getByText("mock comment1").parentNode.lastChild.lastChild;

      await act(async () => {
        await fireEvent.click($mockUserCommentDelete);
      });

      expect(mockDeleteCommentById).toBeCalledTimes(1);
      expect(mockDeleteCommentById).toBeCalledWith("mockUserId", "ratingId1", "commentId1");
    });

    test("should also handle creator's delete request for other user's comment", async () => {
      const $friendCommentDelete = screen.getByText("mock comment2").parentNode.lastChild.lastChild;

      await act(async () => {
        await fireEvent.click($friendCommentDelete);
      });

      expect(mockDeleteCommentById).toBeCalledTimes(1);
      expect(mockDeleteCommentById).toBeCalledWith("mockUserId", "ratingId1", "commentId2");
    });
  });

  describe("handle comment delete button for not rating creator", () => {
    afterEach(() => getApi.mockClear());

    test("should render delete buttons for comment creator", async () => {
      useSelector.mockImplementation((selector) => selector(mockFriendState));
      await setUp();

      const $mockUserComment = screen.getByText("mock comment1").parentNode;
      const $friendComment = screen.getByText("mock comment2").parentNode;

      const $mockUserButtons = $mockUserComment.lastChild;
      const $friendButtons = $friendComment.lastChild;

      expect([...$mockUserButtons.childNodes].length).toBe(0);
      expect($friendButtons.lastChild).toBeTruthy();

      expect($friendButtons.lastChild.textContent).toBe("DELETE");
    });

    test("should not render delete buttons for neither rating creator nor comment creator", async () => {
      useSelector.mockImplementation((selector) => selector(mockGuestState));
      await setUp();

      const $mockUserComment = screen.getByText("mock comment1").parentNode;
      const $friendComment = screen.getByText("mock comment2").parentNode;

      const $mockUserButtons = $mockUserComment.lastChild;
      const $friendButtons = $friendComment.lastChild;

      expect([...$mockUserButtons.childNodes].length).toBe(0);
      expect([...$friendButtons.childNodes].length).toBe(0);
    });
  });

  describe("handle comment edit button", () => {
    beforeEach(async () => {
      useSelector.mockImplementation((selector) => selector(mockUserState));
      await setUp();
    });
    afterEach(() => getApi.mockClear());

    test("should render edit buttons for comment creator's own comment", () => {
      const $mockUserComment = screen.getByText("mock comment1").parentNode;
      const $friendComment = screen.getByText("mock comment2").parentNode;

      const $mockUserButtons = $mockUserComment.lastChild;
      const $friendButtons = $friendComment.lastChild;

      expect($mockUserButtons.firstChild).toBeTruthy();
      expect([...$friendButtons.childNodes].length).toBe(1);

      expect($mockUserButtons.firstChild.textContent).toBe("EDIT");
      expect($friendButtons.firstChild.textContent).toBe("DELETE");
    });

    test("should render comment edit form when edit button is clicked", () => {
      const $mockUserComment = screen.getByText("mock comment1").parentNode;
      const $editButton = $mockUserComment.lastChild.firstChild;

      fireEvent.click($editButton);

      const $commentTextarea = screen.getByPlaceholderText("코멘트를 입력해주세요.");
      const $saveEditButton = $commentTextarea.parentNode.lastChild.lastChild;

      expect($commentTextarea).toBeInTheDocument();
      expect($saveEditButton).toBeInTheDocument();
      expect($commentTextarea.value).toBe("mock comment1");
      expect($saveEditButton.textContent).toBe("EDIT");
    });

    test("should call edit api when edit button is clicked", async () => {
      const $mockUserComment = screen.getByText("mock comment1").parentNode;
      const $editButton = $mockUserComment.lastChild.firstChild;

      await act(async () => {
        await fireEvent.click($editButton);
      });

      const $commentTextarea = screen.getByPlaceholderText("코멘트를 입력해주세요.");
      const $saveEditButton = $commentTextarea.parentNode.lastChild.lastChild;

      await act(async () => {
        await fireEvent.change($commentTextarea, { target: { value: "updated mock comment" } });
        await fireEvent.click($saveEditButton);
      });

      expect(mockEditCommentById).toBeCalledTimes(1);
      expect(mockEditCommentById).toHaveBeenCalledWith(
        "mockUserId",
        "ratingId1",
        "commentId1",
        {
          category: "Activity",
          date: expect.anything(),
          ratingId: "ratingId1",
          content: "updated mock comment",
        },
      );
    });
  });
});
