import React from "react";

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { solvePassword } from "../actions/game";
import Review from "../components/Review";
import { customRender, store } from "../setupTests";

describe("Review", () => {
  it("matches snapshot", () => {
    const { container } = customRender(<Review />);

    expect(container).toMatchSnapshot();
  });

  it("should not write review if last password is locked", () => {
    customRender(<Review />);
    const notice = screen.getByText("엔딩을 본 이후에 리뷰를 남길 수 있습니다.");

    expect(notice).toBeInTheDocument();
  });
});

describe("write review", () => {
  it("should show validation text if textarea is empty", () => {
    store.dispatch(solvePassword("password5"));
    customRender(<Review />);
    const button = screen.getByRole("button", { name: "등록하기" });

    userEvent.click(button);

    const validationText = screen.getByText("내용을 입력해주세요.");

    expect(validationText).toBeInTheDocument();
  });

  it("should save review", () => {
    store.dispatch(solvePassword("password5"));
    customRender(<Review />);
    const textarea = screen.getByLabelText("리뷰 작성");
    const button = screen.getByText("등록하기");

    userEvent.type(textarea, "Hello, world!");
    userEvent.click(button);

    const review = screen.getByText("Hello, world!");

    expect(review).toBeInTheDocument();
  });
});
