import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import EditorBar from "./EditorBar";
import Editor from "./Editor";

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function CodeEditor({ width, height, language, code, onEdit, onLanguageSelect }) {
  const [editorOptions, setEditorOption] = useState({
    theme: "monokai",
    fontSize: 14,
    readOnly: false,
    tab: 2,
  });

  const updateOption = (optionName) => {
    return ({ target }) => {
      setEditorOption({
        ...editorOptions,
        [optionName]: target.value,
      });
    };
  };

  return (
    <EditorWrapper>
      <EditorBar
        width={width}
        height={height}
        language={language}
        optionTypes={editorOptions}
        onLanguageSelect={onLanguageSelect}
        onOptionSelected={updateOption}
      />
      <Editor
        width={width}
        height={height}
        language={language}
        code={code}
        onEdit={onEdit}
        editorOptions={editorOptions}
      />
    </EditorWrapper>
  );
}

CodeEditor.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  language: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onLanguageSelect: PropTypes.func.isRequired,
};
