import React, { useCallback, useState } from "react";
import { AiFillSave } from "react-icons/ai";
import styled from "styled-components";
import PropTypes from "prop-types";

import { postDocument } from "../../../../../api/documentApi";
import { UNKNOWN_ERROR, NEED_DOCUMENT_TITLE } from "../../../../../constants/message";

import InputWithLabelStyle from "../../../../publicComponents/InputWithLabel/InputWithLabel";

const SavingToolbarContainer = styled.div`
  position: fixed;
  left: 15%;
  bottom: 20%;
  display: flex;
  align-items: center;
  padding: 0.5em;
  background-color: #ED9ED1;
  border-radius: 10px;
  z-index: 10;
  outline: none;

  .save-icon {
    margin-left: 1em;
    color: #ffffff;
    cursor: pointer;
  }
`;

function SavingToolbar({
  contents,
  user,
  hideToolbar,
  alertMessages,
  setAlertMessages
}) {
  const [documentTitle, setDocumentTitle] = useState("");

  const handleDocumentTitleChange = useCallback((event) => {
    setDocumentTitle(event.target.value);
  }, []);

  async function handleSaveIconClick() {
    if (!documentTitle.trim()) {
      setAlertMessages([...alertMessages, NEED_DOCUMENT_TITLE]);

      return;
    }

    const documentInfo = {
      title: documentTitle,
      contents,
      user: user.email
    };

    hideToolbar();

    try {
      const saveResult = await postDocument(documentInfo);

      setAlertMessages([...alertMessages, saveResult.message]);
    } catch (err) {
      setAlertMessages([...alertMessages, UNKNOWN_ERROR]);
    }
  }

  return (
    <SavingToolbarContainer>
      <InputWithLabelStyle
        width="20vh"
        heigth="10vh"
        placeholder="저장할 파일의 이름"
        onChange={handleDocumentTitleChange}
        value={documentTitle}
        type="text"
      />
      <AiFillSave
        size={30}
        className="save-icon"
        onClick={handleSaveIconClick}
      />
    </SavingToolbarContainer>
  );
}

SavingToolbar.propTypes = {
  contents: PropTypes.string.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  hideToolbar: PropTypes.func.isRequired,
  alertMessages: PropTypes.array.isRequired,
  setAlertMessages: PropTypes.func.isRequired
};

export default SavingToolbar;
