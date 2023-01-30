import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowDown, FaRegWindowMinimize } from "react-icons/fa";

import axios from "axios";
import styled, { keyframes, css } from "styled-components";

import CONFIG from "../config/constants/config";
import THEME_COLORS from "../config/constants/themeColors";
import PPT_DATA_TYPES from "../config/constants/pptDataTypes";
import TOAST_MESSAGES from "../config/constants/toastMessages";
import { useToast } from "../hooks/useToast";
import useDragAndDrop from "../hooks/useDragAndDrop";
import { registerData } from "../features/pptDataReducer";
import { changeNextSequence } from "../features/sequenceReducer";
import pptxParser from "../utils/pptxParser";

function FileAttachment({ fileType }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const dragAndDropRef = useRef(null);

  const registerPptxFile = async (pptxFile, fileName) => {
    try {
      const pptData = await pptxParser(pptxFile);
      const response = await axios.post(`${CONFIG.API_SERVER_URL}/ppts/save`, {
        pptData,
        fileName,
      });
      dispatch(
        registerData({ type: fileType, pptId: response.data, data: pptData }),
      );
      dispatch(changeNextSequence());
    } catch (error) {
      navigate("/error");
    }
  };

  const handleFileUpload = (event) => {
    const pptxFile = event.target.files[0];
    const fileName = pptxFile.name.replace(".pptx", "");

    registerPptxFile(pptxFile, fileName);
  };

  const handleDragAndDropFileUpload = (event) => {
    const pptxFile = event.dataTransfer.files[0];

    if (
      pptxFile.type !==
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      return toast(TOAST_MESSAGES.INVALID_FILE_MESSAGE);
    }

    const fileName = pptxFile.name.replace(".pptx", "");

    return registerPptxFile(pptxFile, fileName);
  };

  const handleSampleFileUpload = async () => {
    let fileUrl = null;

    if (fileType === PPT_DATA_TYPES.ORIGINAL_PPT_DATA) {
      fileUrl = CONFIG.SAMPLE_ORIGINAL_FILE_URL;
    } else if (fileType === PPT_DATA_TYPES.COMPARABLE_PPT_DATA) {
      fileUrl = CONFIG.SAMPLE_COMPARABLE_FILE_URL;
    } else {
      return navigate("/error");
    }

    try {
      const response = await axios.get(fileUrl, {
        responseType: "arraybuffer",
      });
      registerPptxFile(response.data, "samplePptxFile");
    } catch (error) {
      navigate("/error");
    }

    return null;
  };

  const isDragging = useDragAndDrop({
    onChange: handleDragAndDropFileUpload,
    dragAndDropRef,
  });

  return (
    <Container>
      <FileInputLabel ref={dragAndDropRef} isDragging={isDragging}>
        <IconContainer>
          <DownIcon />
          <LineIcon />
        </IconContainer>
        <FileInput
          type="file"
          accept=".pptx"
          onChange={(event) => handleFileUpload(event)}
        />
      </FileInputLabel>
      <SampleFileAttachement onClick={handleSampleFileUpload}>
        Sample 파일 첨부
      </SampleFileAttachement>
    </Container>
  );
}

const Container = styled.section`
  position: sticky;
  width: 100%;
  height: 100%;
`;

const iconAnimation = keyframes`
  0% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(-55px);
  }
  100% {
    transform: translateY(-10px);
  }
`;

const DownIcon = styled(FaArrowDown)`
  margin: 1rem 0 -2rem;
  font-size: 5rem;
  fill: ${THEME_COLORS.MAIN_COLOR};
`;

const LineIcon = styled(FaRegWindowMinimize)`
  width: 5rem;
  height: 5rem;
  margin-bottom: 2rem;
  fill: ${THEME_COLORS.MAIN_COLOR};
`;

const FileInputLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  ${DownIcon} {
    animation: ${({ isDragging }) =>
      isDragging &&
      css`
        ${iconAnimation} 1s ease infinite
      `};
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30vw;
  height: 40vh;
  border: 2px dashed ${THEME_COLORS.MAIN_COLOR};
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const SampleFileAttachement = styled.p`
  position: absolute;
  width: 9rem;
  height: 2rem;
  top: calc(50% + 20vh - 2rem);
  left: calc(50% + 15vw - 9rem);
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    font-weight: 900;
    color: #000000;
  }
`;

export default FileAttachment;
