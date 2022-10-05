import React from "react";
import styled from "styled-components";

import ProjectAddButton from "../ProjectAddButton";
import ProjectsEntry from "../ProjectsEntry";
import ProjectStatusMenus from "../ProjectStatusMenus";

const ProjectsContentWrapper = styled.div`
  padding: 20px;
`;

export default function ProjectsContent({
  onStatusMenuChange,
  projects,
  onProjectItemClick,
  onProjectAddBtnClick,
  onProjectDeleteBtnClick,
  handleProjectItemClick,
}) {
  return (
    <ProjectsContentWrapper>
      <ProjectStatusMenus onStatusMenuChange={onStatusMenuChange} />
      <ProjectsEntry
        projects={projects}
        onProjectItemClick={onProjectItemClick}
        handleProjectItemClick={handleProjectItemClick}
        onProjectDeleteBtnClick={onProjectDeleteBtnClick}
      />
      <ProjectAddButton onClick={onProjectAddBtnClick} />
    </ProjectsContentWrapper>
  );
}
