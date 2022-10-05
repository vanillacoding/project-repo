import React from "react";
import styled from "styled-components";

import ProjectsContent from "../../components/ProjectsContent";
import ProjectsSideNavBar from "../../components/ProjectsSideNavBar";

const SplitLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100vh;
`;

export default function Projects({
  userInfo,
  projects,
  onSideMenuChange,
  onProjectDeleteBtnClick,
  onProjectAddBtnClick,
  onLogoutBtnClick,
  onProjectItemClick,
  onStatusMenuChange,
}) {
  return (
    <>
      <SplitLayout>
        <ProjectsSideNavBar
          userInfo={userInfo}
          onSideMenuChange={onSideMenuChange}
          onLogoutBtnClick={onLogoutBtnClick}
        />
        <ProjectsContent
          onStatusMenuChange={onStatusMenuChange}
          onProjectItemClick={onProjectItemClick}
          onProjectAddBtnClick={onProjectAddBtnClick}
          onProjectDeleteBtnClick={onProjectDeleteBtnClick}
          projects={projects}
        />
      </SplitLayout>
    </>
  );
}
