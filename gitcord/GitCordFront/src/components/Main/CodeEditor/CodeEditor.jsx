import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { IoIosArrowDropupCircle } from "react-icons/io";
import {
  Controlled as ControlledEditor
} from "react-codemirror2";
import styled from "styled-components";
import { throttle } from "lodash";
import PropTypes from "prop-types";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";

import EditCodeEditor from "./EditCodeEditor/EditCodeEditor";

import {
  START_TYPING,
  STOP_TYPING
} from "../../../constants/socketEvents";

const CodeEditorContainer = styled.div`
  position: relative;
  width: 60%;
  height: 80%;
  margin: 1em;

  .CodeMirror {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 5px;
    border-radius: 20px;
    overflow: hidden;
    z-index: 4;
  }

  .typing-user {
    position: absolute;
    left: 1rem;
    bottom: 0;
    color: #ffffff;
    z-index: 4;
  }

  .editor-button {
    position: absolute;
    width: 3em;
    height: 3em;
    left: 47%;
    bottom: -12%;
    font-weight: bold;
    border: none;
    border-radius: 50%;
    color: #ffffff;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 0, 0.6);
      color: #ff7f50;
    }
  }

  .show {
    transform: rotate(180deg);
    transition: transform .5s linear;
  }

  .hide {
    transform: rotate(0deg);
    transition: transform .5s linear;
  }
`;

function CodeEditor({
  currentUser,
  typingUsers,
  socket,
  roomId,
  contents
}) {
  const [isShowPrivateEditor, setIsShowPrivateEditor] = useState(false);

  const handlePrivateButtonClick = useCallback(() => {
    setIsShowPrivateEditor((isShowPrivateEditor) => !isShowPrivateEditor);
  }, []);

  const refreshTypingUser = useCallback(() => {
    const typingInfo = {
      typingUser: currentUser,
      roomId
    };

    socket.emit(STOP_TYPING, typingInfo);
  }, [currentUser, roomId, socket]);

  const throllingRefreshTypingUser = useMemo(() =>
    throttle(refreshTypingUser, 3000),
    [refreshTypingUser]
  );

  useEffect(() => {
    throllingRefreshTypingUser();
  }, [contents, throllingRefreshTypingUser]);

  const handleChange = useCallback((editor, data, value) => {
    const typingInfo = {
      value,
      typingUser: currentUser,
      roomId
    };

    socket.emit(START_TYPING, typingInfo);
  }, [currentUser, roomId, socket]);

  const throllingTypingUser = useMemo(() =>
    throttle(handleChange, 75),
    [handleChange]
  );

  return (
    <CodeEditorContainer>
      <ControlledEditor
        onBeforeChange={throllingTypingUser}
        value={contents}
        options={{
          lineWrapping: true,
          lineNumbers: true,
          lint: true,
          mode: "javascript",
          theme: "material",
          extraKeys: { Enter: false }
        }}
      />
      <article className="typing-user">
        { typingUsers.length > 0 && `${typingUsers.join(", ")} is typing...` }
      </article>
      <IoIosArrowDropupCircle
        className={isShowPrivateEditor ? "editor-button show" : "editor-button hide"}
        onClick={handlePrivateButtonClick}
      />
      { isShowPrivateEditor && <EditCodeEditor /> }
    </CodeEditorContainer>
  );
}

CodeEditor.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  typingUser: PropTypes.array,
  socket: PropTypes.object.isRequired,
  roomId: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired
};

export default React.memo(CodeEditor);
