import { render, screen, fireEvent } from "@testing-library/react";
import UndoButton from "../../components/FunctionHeader/UndoButton/UndoButton";

describe("<UndoButton />", () => {
  it("HandleClick should work when prev node of selected language code exists", () => {
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

    code[selectedLanguage].prev = {
      content: "prev html",
      prev: null,
      next: code.html,
    };

    const handleClick = jest.fn();

    render(
      <UndoButton
        code={code}
        handleClick={handleClick}
        selectedLanguage={selectedLanguage}
      />,
    );

    const undoButton = screen.getByTestId("undoButton");

    fireEvent.click(undoButton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("HandleClick should not work when prev node of selected language code doesn't exists", () => {
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
      <UndoButton
        code={code}
        handleClick={handleClick}
        selectedLanguage={selectedLanguage}
      />,
    );

    const undoButton = screen.getByTestId("undoButton");

    fireEvent.click(undoButton);

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
