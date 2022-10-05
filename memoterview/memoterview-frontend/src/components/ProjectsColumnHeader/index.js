import React from "react";
import styled from "styled-components";

const ProjectsColumnHeaderWrapeer = styled.div`
  display: flex;
  height: 50px;
  margin: 0 20px;
  border-top: 1px solid ${({ theme }) => theme.Snow };
  background-color: ${({ theme }) => theme.ItemColor };
  border-radius: 3px;
`;

const ColumnTitle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1.1em;
`;

function ProjectsColumnHeader({ columnTitles }) {
  return (
    <ProjectsColumnHeaderWrapeer>
      {columnTitles.map((title) => <ColumnTitle key={title}>{title}</ColumnTitle>)}
    </ProjectsColumnHeaderWrapeer>
  );
}

export default React.memo(ProjectsColumnHeader);
