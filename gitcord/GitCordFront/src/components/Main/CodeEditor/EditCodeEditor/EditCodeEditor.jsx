import React, { useState } from "react";
import {
  Controlled as ControlledEditor
} from "react-codemirror2";
import styled from "styled-components";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-light.css";
import "codemirror/mode/javascript/javascript";

const EditCodeEditorContainer = styled.div`
  position: relative;
  width: 40%;
  height: 50%;
  margin: 1em;

  .CodeMirror {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 140%;
    padding: 5px;
    border-radius: 20px;
    overflow: hidden;
    z-index: 4;
    animation: upSlide .5s ease-in-out;
  }

  @keyframes upSlide {
    from {
      transform: translateY(1000px);
    }
    to {
      transform: translateY(0px);
    }
  }
`;

function EditCodeEditor() {
  const [code, setCode] = useState("");

  function handleChange(editor, data, value) {
    setCode(value);
  }

  return (
    <EditCodeEditorContainer>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={code}
        options={{
          lineWrapping: true,
          lineNumbers: true,
          lint: true,
          mode: "javascript",
          theme: "base16-light",
          extraKeys: { Enter: false }
        }}
      />
    </EditCodeEditorContainer>
  );
}

export default EditCodeEditor;
