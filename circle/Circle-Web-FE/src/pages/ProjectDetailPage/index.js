/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import React from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { AiOutlineBell, AiFillSnippets } from "react-icons/ai";
import ReactMarkdown from "react-markdown";

import { PROJECT_INFO } from "../../config/constants";
import theme from "../../config/constants/theme";
import useToast from "../../hooks/useToast";

export default function ProjectDetailPage({ currentProject }) {
  const [, , , , isProjectLoaded] = useOutletContext();
  const [Toast, toggleToast] = useToast();

  const projectInfo = isProjectLoaded
    ? { id: currentProject._id, key: currentProject.secretKey }
    : { id: "가져오는 중...", key: "생성중..." };

const cdnText = `
  <script src="https://cdn.jsdelivr.net/gh/Team-TTT/Circle-script@ttt/snippet/index.js"></script>
  <script>circle("${projectInfo.id}", "${projectInfo.key}")</script>
`;

const markdown = `
\`\`\`


${cdnText}


\`\`\`
`;

  const handleCopyClipBoard = async () => {
    try {
      const text = cdnText.trim();
      await navigator.clipboard.writeText(text);
      toggleToast(PROJECT_INFO.COPY_SUCCESS);
    } catch {
      toggleToast(PROJECT_INFO.COPY_FAILED);
    }
  };

  return (
    <>
      <ConfigContainer>
        <KeyContainer>
          <p>프로젝트 ID</p>
          <KeyWrapper>{projectInfo.id}</KeyWrapper>
        </KeyContainer>
        <KeyContainer>
          <p>Secret-key</p>
          <KeyWrapper>{projectInfo.key}</KeyWrapper>
        </KeyContainer>
      </ConfigContainer>
      <InfoContainer>
        <BellIcon />
        <StyledDescription>{PROJECT_INFO.DESCRIPTION}</StyledDescription>
      </InfoContainer>
      <InfoContainer>
        <CopyButton onClick={handleCopyClipBoard}>
          <CopyIcon />
        </CopyButton>
        <StyledCode>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </StyledCode>
      </InfoContainer>
      <Toast />
    </>
  );
}

ProjectDetailPage.propTypes = {
  currentProject: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const ConfigContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: 30px;
`;

const KeyContainer = styled.div`
  margin-right: 80px;
`;

const KeyWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-width: 360px;
  padding: 12px;
  border-radius: 5px;
  background-color: ${theme.lightGray};
  font-size: 18px;
`;

const InfoContainer = styled.div`
  margin-bottom: 30px;
  border: 1px solid black;
`;

const StyledDescription = styled.p`
  padding: 19px 52px 19px;
  font-size: 18px;
  white-space: pre-wrap;
`;

const StyledCode = styled.div`
  padding: 18px;
  background-color: #2f2f2f;
  font-size: 16px;
  color: #eee;
  white-space: pre-wrap;
`;

const CopyIcon = styled(AiFillSnippets)`
  font-size: 16px;
`;

const CopyButton = styled.button`
  position: absolute;
  margin: 10px 0px 0px 10px;
  cursor: pointer;
`;

const BellIcon = styled(AiOutlineBell)`
  position: absolute;
  margin: 18px 12px;
  font-size: 34px;
`;
