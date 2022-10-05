import React from "react";
import styled from "styled-components";

import ProjectDeleteButton from "../ProjectDeleteButton";

const ProjectItemWrapper = styled.div`
  position: relative;
  display: flex;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.Whisper};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.ItemHoverColor }
  }

  &:not(:first-child) {
    border-top: none;
  }
`;

const ColumnItem = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1em;
`;

function ProjectItem({ project, onClick = () => {}, onDeleteBtnClick = () => {} }) {
  function handleProjectItemClick() {
    onClick(project.id);
  }

  function handleDeleteButtonClick(e) {
    e.stopPropagation();
    onDeleteBtnClick(project.id);
  }

  return (
    <ProjectItemWrapper onClick={handleProjectItemClick}>
      <ColumnItem>{project.title}</ColumnItem>
      <ColumnItem>{project.candidateNum}</ColumnItem>
      <ColumnItem>{project.createAt}</ColumnItem>
      <ProjectDeleteButton onClick={handleDeleteButtonClick}/>
    </ProjectItemWrapper>
  );
}

export default React.memo(ProjectItem);
