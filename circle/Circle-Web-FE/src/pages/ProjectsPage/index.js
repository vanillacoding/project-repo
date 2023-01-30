import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import styled from "styled-components";

import ProjectHeader from "../../components/project/ProjectHeader";
import NewProjectPage from "../NewProjectPage";
import ProjectDetailPage from "../ProjectDetailPage";
import { getProject } from "../../api/projectApi";
import theme from "../../config/constants/theme";

export default function ProjectsPage() {
  const [currentProject, setCurrentProject] = useState({});

  const [, , , setIsProjectLoaded, isProjectLoaded] = useOutletContext();
  const { projectId } = useParams();

  useEffect(() => {
    if (!projectId) {
      setIsProjectLoaded(true);

      return;
    }

    setIsProjectLoaded(false);

    const fetchGetProject = async (id) => {
      const data = await getProject(id);

      if (data?._id) {
        setCurrentProject(data);
      }

      setIsProjectLoaded(true);
    };

    fetchGetProject(projectId);
  }, [projectId, setIsProjectLoaded]);

  return (
    <Container>
      <ProjectHeader
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
      />
      <ProjectMain>
        {isProjectLoaded && !projectId ? (
          <NewProjectPage />
        ) : (
          <ProjectDetailPage currentProject={currentProject} />
        )}
      </ProjectMain>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin: 40px;
  background-color: ${theme.skyBlue};
`;

const ProjectMain = styled.main`
  width: 1200px;
  height: 100%;
  max-height: 800px;
  margin-top: 30px;
  padding: 60px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  background-color: ${theme.gray};
  border: none;
`;
