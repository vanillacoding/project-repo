import React from "react";
import { FcFile } from "react-icons/fc";
import { IoIosCloseCircle } from "react-icons/io";
import styled from "styled-components";
import PropTypes from "prop-types";

import { deleteDocument } from "../../../../../../api/documentApi";
import { SET_CONTENTS } from "../../../../../../constants/socketEvents";
import {
  UPLOAD_DOCUMENT,
  DELETE_FAIL
} from "../../../../../../constants/message";

const DocumentFileContainer = styled.div`
  display: block;
  width: 20%;
  height: auto;
  margin-right: 0.5em;
  font-size: 0.7rem;
  color: #000000;

  .close-icon {
    display: block;
    float: right;
    cursor: pointer;
  }
`;

function DocumentFile({
  alertMessages,
  setAlertMessages,
  title,
  contents,
  socket,
  roomId,
  documentId,
  hideDocumentList
}) {
  function handleFileClick() {
    const uploadMessage = UPLOAD_DOCUMENT;
    const contentsInfo = {
      value: contents,
      roomId
    };

    socket.emit(SET_CONTENTS, contentsInfo);
    setAlertMessages([...alertMessages, uploadMessage]);
    hideDocumentList();
  }

  async function handleDeleteClick() {
    try {
      const response = await deleteDocument(documentId);

      setAlertMessages([...alertMessages, response.message]);
    } catch (err) {
      const errorMessage = DELETE_FAIL;

      setAlertMessages([...alertMessages, errorMessage]);
    }

    hideDocumentList();
  }

  return (
    <DocumentFileContainer>
      <IoIosCloseCircle
        size={15}
        className="close-icon"
        onClick={handleDeleteClick}
      />
      <FcFile
        size={50}
        cursor="pointer"
        onClick={handleFileClick}
      />
      <div>{title}</div>
    </DocumentFileContainer>
  );
}

DocumentFile.propTypes = {
  alertMessages: PropTypes.array.isRequired,
  setAlertMessages: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired,
  roomId: PropTypes.string.isRequired,
  documentId: PropTypes.string.isRequired,
  hideDocumentList: PropTypes.func.isRequired
};

export default DocumentFile;
