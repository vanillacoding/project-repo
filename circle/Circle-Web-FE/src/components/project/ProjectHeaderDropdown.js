import React from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";

export default function ProjectHeaderDropdown() {
  const [projects, , , , isProjectLoaded] = useOutletContext();
  const { projectId } = useParams();
  const navigate = useNavigate();

  if (!projects?.length || !isProjectLoaded || !projectId) {
    return <StyledSelect />;
  }

  const initialOption = projects.find((project) => project?._id === projectId);

  return (
    <Container>
      <StyledSelect
        key={initialOption?._id}
        defaultValue={initialOption?._id}
        onChange={(event) => {
          navigate(`/console/projects/${event.target.value}`);
        }}
      >
        {projects.map((project) => {
          return (
            <option key={project._id} value={project._id}>
              {project.title}
            </option>
          );
        })}
      </StyledSelect>
    </Container>
  );
}

const Container = styled.div`
  flex: 6;
`;

const StyledSelect = styled.select`
  appearance: none;
  width: 240px;
  padding: 6px;
  border-radius: 5px;
  font-size: 22px;
`;
