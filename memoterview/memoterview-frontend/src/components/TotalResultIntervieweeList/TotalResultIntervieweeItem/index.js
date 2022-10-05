import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

import TotalResultIntervieweeColumn from "../TotalResultIntervieweeColumn";
import TotalResultIntervieweeRow from "../TotalResultIntervieweeRow";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 5px 20px;
  width: 70px;
  height: 30px;
  background-color: ${({ theme }) => theme.ButtonGreen};
  border-radius: 5px;
  box-sizing: border-box;
  transition: opacity 0.3s linear;
  cursor: pointer;
  border: none;

  &:hover {
    opacity: ${({ disabled }) => disabled ? 1 : 0.7};
  }
`;

export default function TotalResultIntervieweeItem({
  interviewee,
  onDeleteBtnClick,
  onInviteBtnClick,
  onRoomEnterBtnClick,
}) {
  const {
    id: intervieweeId,
    name: intervieweeName,
    email: intervieweeEmail,
  } = interviewee;

  function handleDeleteBtnClick() {
    onDeleteBtnClick({ intervieweeId });
  }

  function handleInviteBtnClick() {
    onInviteBtnClick({ intervieweeId, intervieweeEmail });
  }

  function handleRoomEnterBtnClick() {
    onRoomEnterBtnClick({ interviewee });
  }

  return (
    <TotalResultIntervieweeRow>
      <TotalResultIntervieweeColumn>
        {intervieweeName}
      </TotalResultIntervieweeColumn>
      <TotalResultIntervieweeColumn>
        {intervieweeEmail}
      </TotalResultIntervieweeColumn>
      <TotalResultIntervieweeColumn>
        <Button onClick={handleInviteBtnClick} disabled={interviewee.isRoomOpened}>면접 초대</Button>
        <Button onClick={handleRoomEnterBtnClick} disabled={!interviewee.isRoomOpened}>면접 입장</Button>
      </TotalResultIntervieweeColumn>
      <TotalResultIntervieweeColumn>
        <FontAwesomeIcon icon={faTimes} onClick={handleDeleteBtnClick} />
      </TotalResultIntervieweeColumn>
    </TotalResultIntervieweeRow>
  );
}
