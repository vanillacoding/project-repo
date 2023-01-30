import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProvider } from "./test-utils";
import { BUTTON, WINDOW } from "../config/constants";

describe("Home 컴포넌트", () => {
  it("Home 컴포넌트 렌더링시 element 렌더 정상여부체크", () => {
    renderWithProvider(["/"]);

    expect(screen.getByText(BUTTON.TUTORIAL)).toBeInTheDocument();
    expect(screen.getByText(BUTTON.GAME_SELECTION)).toBeInTheDocument();
  });

  it("연습하기 버튼 클릭시 연습하기 페이지로 이동", async () => {
    renderWithProvider(["/"]);

    const user = userEvent.setup();

    await user.click(screen.getByText(BUTTON.TUTORIAL));

    expect(screen.getByText(WINDOW.BLOCKS_SELECTION)).toBeInTheDocument();
    expect(screen.getByText(/어느 방향일까?/i)).toBeInTheDocument();
  });

  it("게임하기 버튼 클릭시 게임리스트 페이지로 이동", async () => {
    renderWithProvider(["/"]);

    const user = userEvent.setup();

    await user.click(screen.getByText(BUTTON.GAME_SELECTION));

    expect(
      screen.getByText(/도전하고 싶은 맵을 선택하세요./i),
    ).toBeInTheDocument();
  });
});
