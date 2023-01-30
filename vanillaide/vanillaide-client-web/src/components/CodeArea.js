import { useState, useCallback } from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { atomone } from "@uiw/codemirror-theme-atomone";

import debounce from "../utils/debounce";
import integrateCode from "../utils/integrateCode";

import { updatePrevCursor, updateNextCursor } from "../utils/updateCursor";

import { WHITE, DARK_BLUE_150 } from "../constants/color";

function selectLanguageExtension(string) {
  if (string === "html") return [html()];
  if (string === "css") return [css()];
  if (string === "js") return [javascript({ jsx: true })];
}

export default function CodeArea({
  code,
  wholeCode,
  selection,
  handleChange,
  handleUpdate,
  handleCreateEditor,
  selectedLanguage,
  isRunClicked,
  innerHeight,
  handlePrevCursor,
  handleNextCursor,
}) {
  const [currentCode, setCurrentCode] = useState({
    html: wholeCode.html.content,
    css: wholeCode.css.content,
    js: wholeCode.js.content,
  });

  const {
    html: { content: htmlCode },
    css: { content: cssCode },
    js: { content: jsCode },
  } = wholeCode;

  const [isWriting, setIsWriting] = useState({
    html: false,
    css: false,
    js: false,
  });

  const saveContent = (text, prevText, language, currentSelection) => {
    if (text === prevText) return;

    handleChange((prevState) => {
      const { anchor, head } = currentSelection;
      const currentContent = {
        content: text,
        anchor: anchor,
        head: head,
        prev: prevState[language],
        next: null,
      };

      prevState[language].next = currentContent;

      return {
        ...prevState,
        [language]: currentContent,
      };
    });

    setIsWriting((prevState) => ({ ...prevState, [selectedLanguage]: false }));
  };

  const handleBlur = () => {
    saveContentDebounce(
      currentCode[selectedLanguage],
      code,
      selectedLanguage,
      selection[selectedLanguage],
      0,
    );
  };

  const handleClick = () => {
    saveContentDebounce(
      currentCode[selectedLanguage],
      code,
      selectedLanguage,
      selection[selectedLanguage],
      0,
    );
  };

  const handleViewUpdate = (viewUpdate) => {
    const { head, anchor } = viewUpdate.state.selection.ranges[0];
    const { doc } = viewUpdate.state;
    const update = { head, anchor };

    if (
      selection[selectedLanguage]?.head !== head ||
      selection[selectedLanguage]?.anchor !== anchor
    ) {
      handleUpdate((prevState) => ({
        ...prevState,
        [selectedLanguage]: update,
      }));

      if (
        code === currentCode[selectedLanguage] &&
        selection[selectedLanguage]
      ) {
        const { head, anchor } = viewUpdate.startState.selection.ranges[0];

        handleChange((prevState) => {
          prevState[selectedLanguage].anchor = anchor;
          prevState[selectedLanguage].head = head;

          return prevState;
        });
      }
    }

    updatePrevCursor(viewUpdate, doc, head, handlePrevCursor);
    updateNextCursor(viewUpdate, doc, head, handleNextCursor);
  };

  const handleEachCreateEditor = (view) => {
    handleCreateEditor((prevState) => ({
      ...prevState,
      [selectedLanguage]: view,
    }));
  };

  const handleCodeMirrorChange = (value, viewUpdate) => {
    if (!isWriting[selectedLanguage]) {
      const { anchor, head } = selection[selectedLanguage];

      handleChange((prevState) => {
        prevState[selectedLanguage].anchor = anchor;
        prevState[selectedLanguage].head = head;

        return prevState;
      });

      setIsWriting((prevState) => ({ ...prevState, [selectedLanguage]: true }));
    }

    setCurrentCode((prevState) => ({
      ...prevState,
      [selectedLanguage]: value,
    }));

    const { anchor, head } = viewUpdate.state.selection.ranges[0];
    const currentSelection = { anchor, head };
    const keyPress = viewUpdate.transactions[0].changes.inserted
      .toString()
      .slice(-1);

    if (keyPress === " " || keyPress === "\n" || keyPress === "  ") {
      const startValue = viewUpdate.state.doc.toString();

      saveContentDebounce(
        startValue,
        code,
        selectedLanguage,
        currentSelection,
        0,
      );
    } else {
      saveContentDebounce(
        value,
        code,
        selectedLanguage,
        currentSelection,
        1000,
      );
    }
  };

  const saveContentDebounce = useCallback(debounce(saveContent), []);

  return (
    <Container>
      {isRunClicked ? (
        <ResultViewer srcDoc={integrateCode(htmlCode, cssCode, jsCode)} />
      ) : (
        <>
          {selectedLanguage === "html" && (
            <CodeMirror
              value={code}
              theme={atomone}
              height={`${(innerHeight * 72) / 96}px`}
              extensions={selectLanguageExtension(selectedLanguage)}
              onBlur={handleBlur}
              onChange={handleCodeMirrorChange}
              onUpdate={handleViewUpdate}
              onCreateEditor={handleEachCreateEditor}
              onClick={handleClick}
              className="editor"
            />
          )}
          {selectedLanguage === "css" && (
            <CodeMirror
              value={code}
              theme={atomone}
              height={`${(innerHeight * 72) / 96}px`}
              extensions={selectLanguageExtension(selectedLanguage)}
              onBlur={handleBlur}
              onChange={handleCodeMirrorChange}
              onUpdate={handleViewUpdate}
              onCreateEditor={handleEachCreateEditor}
              onClick={handleClick}
              className="editor"
            />
          )}
          {selectedLanguage === "js" && (
            <CodeMirror
              value={code}
              theme={atomone}
              height={`${(innerHeight * 72) / 96}px`}
              extensions={selectLanguageExtension(selectedLanguage)}
              onBlur={handleBlur}
              onChange={handleCodeMirrorChange}
              onUpdate={handleViewUpdate}
              onCreateEditor={handleEachCreateEditor}
              onClick={handleClick}
              className="editor"
            />
          )}
        </>
      )}
    </Container>
  );
}

CodeArea.propTypes = {
  code: PropTypes.string,
  wholeCode: PropTypes.object.isRequired,
  selection: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleCreateEditor: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  isRunClicked: PropTypes.bool.isRequired,
  innerHeight: PropTypes.number.isRequired,
  handlePrevCursor: PropTypes.func.isRequired,
  handleNextCursor: PropTypes.func.isRequired,
};

const Container = styled.div`
  display: flex;
  flex: 14;
  width: 100%;
  height: 100%;
  background: ${DARK_BLUE_150};
  overflow: scroll;

  .editor {
    width: 100%;
    height: 100%;
    outline: none;
  }
`;

const ResultViewer = styled.iframe`
  width: 100%;
  height: 100%;
  background: ${WHITE};
  border: none;
  outline: none;
`;
