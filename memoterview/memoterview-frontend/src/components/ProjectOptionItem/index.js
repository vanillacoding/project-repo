import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const ProjectOptionItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 20px;
  width: 80%;
  height: 25px;
  font-size: 1em;
`;

const OptionText = styled.span`
  padding: 3px 10px 0;
  width: 80%;
  height: 20px;
  font-size: .9em;
`;

const DeleteButton = styled.span`
  &:hover {
    color: ${({ theme }) => `${theme.Aero}`}
  }
`;

export default function ProjectOptionItem({ id, option, onOptionDelete }) {
  function handleOptionDeleteBtnClick() {
    onOptionDelete(id);
  }

  return (
    <ProjectOptionItemWrapper>
      <OptionText>
        {option}
      </OptionText>
      <DeleteButton onClick={handleOptionDeleteBtnClick}>
        <FontAwesomeIcon icon={faTimes} />
      </DeleteButton>
    </ProjectOptionItemWrapper>
  );
}
