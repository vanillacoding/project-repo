import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProvider } from "./test-utils";
import { BUTTON } from "../config/constants";

describe("Game 컴포넌트", () => {
  it("다음게임 버튼 클릭시 다음 스테이지로 이동", async () => {
    const user = userEvent.setup();

    renderWithProvider(["/game/stage1"]);

    await user.click(screen.getByText(BUTTON.NEXT_GAME));
    expect(screen.getByText(/나무/i)).toBeInTheDocument();

    await user.click(screen.getByText(BUTTON.NEXT_GAME));
    expect(screen.getByText(/사막 탈출/i)).toBeInTheDocument();

    await user.click(screen.getByText(BUTTON.NEXT_GAME));
    expect(screen.getByText(/바람개비/i)).toBeInTheDocument();

    await user.click(screen.getByText(BUTTON.NEXT_GAME));
    expect(screen.getByText(/꼬불꼬불/i)).toBeInTheDocument();
  });
});
