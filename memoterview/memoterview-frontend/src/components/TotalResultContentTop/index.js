import React from "react";
import styled from "styled-components";

import Calendar from "../Calendar";
import TotalResultIntervieweeList from "../TotalResultIntervieweeList";

const TotalResultContentTopWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 0.6fr;
  grid-gap: 50px;
  margin-bottom: 40px;
  height: 320px;
  box-sizing: border-box;
`;

export default function TotalResultContentTop({
  interviewees,
  onIntervieweeAddBtnClick,
  onIntervieweeDeleteBtnClick,
  onIntervieweeInviteBtnClick,
  onInterviewRoomEnterBtnClick,
}) {
  return (
    <TotalResultContentTopWrapper>
      <Calendar />
      <TotalResultIntervieweeList
        interviewees={interviewees}
        onAddBtnClick={onIntervieweeAddBtnClick}
        onItemDeleteBtnClick={onIntervieweeDeleteBtnClick}
        onItemInviteBtnClick={onIntervieweeInviteBtnClick}
        onItemRoomEnterBtnClick={onInterviewRoomEnterBtnClick}
      />
    </TotalResultContentTopWrapper>
  );
}
