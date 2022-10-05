import React from "react";
import styled from "styled-components";

import Header from "../../components/Header";
import HeaderNav from "../../components/HeaderNav";
import TotalResultContentTop from "../../components/TotalResultContentTop";
import TotalResultList from "../../components/TotalResultList";

const TotalResultContentWrapper = styled.div`
  margin: 4.5em auto 0;
  min-width: 1200px;
  max-width: 1600px;
  box-sizing: border-box;
`;

export default function TotalResult({
  interviewees,
  resultInterviewees,
  projectId,
  filters,
  onIntervieweeAddBtnClick,
  onIntervieweeDeleteBtnClick,
  onIntervieweeInviteBtnClick,
  onInterviewRoomEnterBtnClick,
  onLogoutClick,
  onFilterBtnClick,
  onFilterSortBtnClick,
  onResultItemClick,
}) {
  return (
    <>
      <Header>
        <HeaderNav path="/projects" title="Interviews" />
        <HeaderNav path={`/projects/${projectId}/search`} title="Search" />
        <HeaderNav path="/#" onClick={onLogoutClick} title="Logout" />
      </Header>
      <TotalResultContentWrapper>
        <TotalResultContentTop
          interviewees={interviewees}
          onIntervieweeAddBtnClick={onIntervieweeAddBtnClick}
          onIntervieweeDeleteBtnClick={onIntervieweeDeleteBtnClick}
          onIntervieweeInviteBtnClick={onIntervieweeInviteBtnClick}
          onInterviewRoomEnterBtnClick={onInterviewRoomEnterBtnClick}
        />
        <TotalResultList
          interviewees={resultInterviewees}
          filters={filters}
          onFilterBtnClick={onFilterBtnClick}
          onFilterSortBtnClick={onFilterSortBtnClick}
          onResultItemClick={onResultItemClick}
        />
      </TotalResultContentWrapper>
    </>
  );
}
