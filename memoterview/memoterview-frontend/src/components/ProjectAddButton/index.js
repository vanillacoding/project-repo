import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const ProjectAddButtonWrapper = styled.div`
  position: fixed;
  right: 50px;
  bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  font-size: 1.2em;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.TotalResultPageButtonGreen };
  color: white;
  cursor: pointer;
  transition: transform .3s linear;

  &:hover {
    transform: rotate(90deg);
  }
`;

function ProjectAddButton({ onClick }) {
  return (
    <ProjectAddButtonWrapper onClick={onClick}>
      <FontAwesomeIcon icon={faPlus}/>
    </ProjectAddButtonWrapper>
  );
}

export default React.memo(ProjectAddButton);
