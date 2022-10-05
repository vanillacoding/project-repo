import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import IntervieweeDetail from "../pages/IntervieweeDetail";

const Wrapper = styled.div`
  width: 100vw;
`;

export default function IntervieweeDetailContainer() {
  const history = useHistory();

  const { projectId, intervieweeId } = useParams();
  const { intervieweeInfo } = useSelector(({ interviewees: { byId } }) => ({
    intervieweeInfo: getIntervieweeInfo(byId[intervieweeId]),
  }));

  function handleGoBackButtonClick(e) {
    e.preventDefault();

    history.push(`/projects/${projectId}`);
  }

  function getIntervieweeInfo(currentUserInfo) {
    return {
      name: currentUserInfo?.name,
      email: currentUserInfo?.email,
      comments: currentUserInfo?.comments,
      questions: currentUserInfo?.questions,
      commentAvgScore: currentUserInfo?.commentAvgScore,
    };
  }

  function handleGeneratePdfBtnClick(e) {
    window.print();
  }

  return (
    <Wrapper>
      <IntervieweeDetail
        onGeneratePdfBtnClick={handleGeneratePdfBtnClick}
        onGoBackButtonClick={handleGoBackButtonClick}
        intervieweeInfo={intervieweeInfo}
      />
    </Wrapper>
  );
}
