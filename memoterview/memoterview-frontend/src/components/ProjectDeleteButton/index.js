import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const DeleteButton = styled.div`
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 1.5em;

  &:hover {
    color: ${({ theme }) => `${theme.Aero}`}
  }
`;

function ProjectDeleteButton({ onClick }) {
  return (
    <DeleteButton onClick={onClick}>
      <FontAwesomeIcon icon={faTimes}/>
    </DeleteButton>
  );
}

export default React.memo(ProjectDeleteButton);
