import { render, screen, fireEvent } from "@testing-library/react";
import LanguageBar from "../../components/LanguageBar";

describe("<LanguageBar />", () => {
  it("Three languages are shown in the language bar", () => {
    const selectedLanguage = "html";
    const handlePress = jest.fn();

    render(
      <LanguageBar
        selectedLanguage={selectedLanguage}
        handlePress={handlePress}
      />,
    );

    expect(screen.getByText("HTML")).toBeInTheDocument();
    expect(screen.getByText("CSS")).toBeInTheDocument();
    expect(screen.getByText("JS")).toBeInTheDocument();
  });

  it("LanguageBar component should show correct color when target bar language is same with selectedLanguage", () => {
    const selectedLanguage = "css";
    const handlePress = jest.fn();

    render(
      <LanguageBar
        selectedLanguage={selectedLanguage}
        handlePress={handlePress}
      />,
    );

    const cssBar = screen.getByText("CSS");
    expect(cssBar).toHaveStyle("background: #D9D9D9");
  });

  it("LanguageBar component should show correct color when target bar language is different with selectedLanguage", () => {
    const selectedLanguage = "html";
    const handlePress = jest.fn();

    render(
      <LanguageBar
        selectedLanguage={selectedLanguage}
        handlePress={handlePress}
      />,
    );

    const cssBar = screen.getByText("CSS");
    expect(cssBar).toHaveStyle("background: #313842");
  });

  it("HandlePress should work when target language bar is clicked", () => {
    const selectedLanguage = "html";
    const handlePress = jest.fn();

    render(
      <LanguageBar
        selectedLanguage={selectedLanguage}
        handlePress={handlePress}
      />,
    );

    const cssBar = screen.getByText("CSS");

    fireEvent.click(cssBar);

    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
