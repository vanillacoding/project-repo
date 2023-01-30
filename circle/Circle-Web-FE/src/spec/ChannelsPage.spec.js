import { fireEvent, render, screen } from "@testing-library/react";
import ChannelsPage from "../pages/ChannelsPage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: () => [[]],
  useNavigate: jest.fn,
}));

describe("ChannelsPage", () => {
  it("채널 추가하기 버튼이 있어야 합니다.", () => {
    render(<ChannelsPage />);
    expect(screen.getByTestId("channel-create-button")).toBeInTheDocument();
  });

  it("채널 추가하기를 누르면 입력 폼이 있는 모달창이 띄워져야합니다.", () => {
    render(<ChannelsPage />);
    fireEvent.click(screen.getByTestId("channel-create-button"));
    expect(screen.getByTestId("channel-form")).toBeInTheDocument();
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
});
