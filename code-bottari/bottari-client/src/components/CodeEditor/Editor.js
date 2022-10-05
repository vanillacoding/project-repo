import AceEditor from "react-ace";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import "ace-builds/webpack-resolver";

const StyledAceEditor = styled(AceEditor)`
  border-radius: 0px 0px 5px 5px;

  ${({ type }) => {
    if (type === "preview") {
      return css`
        .ace_gutter,
        .ace_scroller {
          cursor: pointer;
        }
      `;
    }
  }}
`;

const languageModes = {
  Python: "python",
  Java: "java",
  JavaScript: "javascript",
  "C#": "csharp",
  "C/C++": "c_cpp",
  PHP: "php",
  R: "r",
  "Objective-C": "objectivec",
};

export default function Editor({ width, height, language, code, onEdit, editorOptions, type }) {
  const {
    theme,
    fontSize,
    readOnly,
    tab,
  } = editorOptions;

  const convertedLanguage = languageModes[language];

  const editCode = (value) => {
    onEdit(value);
  };

  return (
    <StyledAceEditor
      placeholder="이곳에 코드를 작성해 주세요!"
      name="editor"
      width={width}
      height={height}
      mode={convertedLanguage}
      theme={theme}
      type={type}
      fontSize={Number(fontSize)}
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={true}
      wrapEnabled={true}
      readOnly={readOnly}
      defaultValue={code}
      setOptions={{
        showLineNumbers: true,
        tabSize: Number(tab),
      }}
      onChange={(value) => editCode(value)}
    />
  );
}

Editor.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  editorOptions: PropTypes.object.isRequired,
  type: PropTypes.string,
};
