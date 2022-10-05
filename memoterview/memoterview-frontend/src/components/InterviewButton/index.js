import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
  width: 200px;
  height: 60px;
  opacity: 0.9;
  color: white;
  cursor: pointer;
  background: ${({ normalColor }) => normalColor};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 5px;
  z-index: 2;

  :hover {
    background: ${({ hoverColor }) => hoverColor};
    opacity: 0.6;
  }

  .button-content {
    display: flex;
    justify-content: center;
    align-items: center;

    .button-icon {
      font-size: 1.5em;
      margin-right: 0.5em;
      /* top: 30%; */
    }

    .button-name {
      font-size: 1.7em;
    }
  }
`;

export default function InterviewButton({ isButtonDisabled, onClick, state }) {
  return (
    <ButtonWrapper 
      hoverColor={state.color.hoverColor} 
      normalColor={state.color.normalColor} 
      onClick={onClick}
      disabled={isButtonDisabled}
    >
      <div className="button-content">
        <FontAwesomeIcon icon={state.icon} className="button-icon" />
        <span className="button-name">{state.state}</span>
      </div>
    </ButtonWrapper>
  );
}
