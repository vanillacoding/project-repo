import { render, screen, fireEvent } from "@testing-library/react";
import ToolBar from "../../components/ToolBar";

describe("<ToolBar />", () => {
  it("All signs are in the tool bar", () => {
    const handleClick = jest.fn();

    render(<ToolBar handleClick={handleClick} />);

    expect(screen.getByText("<")).toBeInTheDocument();
    expect(screen.getByText(">")).toBeInTheDocument();
    expect(screen.getByText("(")).toBeInTheDocument();
    expect(screen.getByText(")")).toBeInTheDocument();
    expect(screen.getByText("{")).toBeInTheDocument();
    expect(screen.getByText("}")).toBeInTheDocument();
    expect(screen.getByText("[")).toBeInTheDocument();
    expect(screen.getByText("]")).toBeInTheDocument();
    expect(screen.getByText("`")).toBeInTheDocument();
    expect(screen.getByText('""')).toBeInTheDocument();
    expect(screen.getByText("TAB")).toBeInTheDocument();
  });

  it("HandleClick should work when sign is clicked", () => {
    const handleClick = jest.fn();

    render(<ToolBar handleClick={handleClick} />);

    const leftBrace = screen.getByText("{");

    fireEvent.click(leftBrace);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
