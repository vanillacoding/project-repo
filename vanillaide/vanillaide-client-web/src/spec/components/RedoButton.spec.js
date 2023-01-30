import { render, screen, fireEvent } from "@testing-library/react";
import RedoButton from "../../components/FunctionHeader/RedoButton/RedoButton";

describe("<RedoButton />", () => {
  it("HandleClick should work when next node of selected language code exists", () => {
    const selectedLanguage = "html";
    const code = {
      html: {
        content: "html",
        prev: null,
        next: null,
      },
      css: { content: "css", prev: null, next: null },
      js: { content: "js", prev: null, next: null },
    };

    code[selectedLanguage].next = {
      content: "next html",
      prev: code.html,
      next: null,
    };

    const handleClick = jest.fn();

    render(
      <RedoButton
        code={code}
        handleClick={handleClick}
        selectedLanguage={selectedLanguage}
      />,
    );

    const redoButton = screen.getByTestId("redoButton");

    fireEvent.click(redoButton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("HandleClick should not work when next node of selected language code doesn't exist", () => {
    const selectedLanguage = "html";
    const code = {
      html: {
        content: "html",
        prev: null,
        next: null,
      },
      css: { content: "css", prev: null, next: null },
      js: { content: "js", prev: null, next: null },
    };

    const handleClick = jest.fn();

    render(
      <RedoButton
        code={code}
        handleClick={handleClick}
        selectedLanguage={selectedLanguage}
      />,
    );

    const redoButton = screen.getByTestId("redoButton");

    fireEvent.click(redoButton);

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
