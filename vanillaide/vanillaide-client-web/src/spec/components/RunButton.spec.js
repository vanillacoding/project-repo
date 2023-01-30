import { render, screen, fireEvent } from "@testing-library/react";
import RunButton from "../../components/FunctionHeader/RunButton/RunButton";

describe("<RunButton />", () => {
  it("HandleClick should work when run icon is clicked", () => {
    const handleClick = jest.fn();

    render(<RunButton handleClick={handleClick} />);

    const runButton = screen.getByTestId("runButton");

    fireEvent.click(runButton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
