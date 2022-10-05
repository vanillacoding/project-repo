import React from "react";
import styled from "styled-components";

import IntervieweeDetailEvaluationEntry from "../../components/IntervieweeDetails/IntervieweeDetailEvaluationEntry";
import IntervieweeDetailHeader from "../../components/IntervieweeDetails/IntervieweeDetailHeader";
import IntervieweeDetailNavBar from "../../components/IntervieweeDetails/IntervieweeDetailNavBar";
import IntervieweeDetailScript from "../../components/IntervieweeDetails/IntervieweeDetailScript";

const MainLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  margin: 2vw;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 85vh;
`;

export default function IntervieweeDetail({
  onGeneratePdfBtnClick,
  intervieweeInfo,
  onGoBackButtonClick,
}) {
  const { email, name, comments, questions, commentAvgScore } = intervieweeInfo;

  return (
    <MainLayoutWrapper>
      <IntervieweeDetailNavBar
        onGoBackButtonClick={onGoBackButtonClick}
        onGeneratePdfBtnClick={onGeneratePdfBtnClick}
      />
      <IntervieweeDetailHeader
        name={name}
        email={email}
        comments={comments}
        commentAvgScore={commentAvgScore}
      />
      <Main>
        <IntervieweeDetailEvaluationEntry comments={comments} />
        <IntervieweeDetailScript questions={questions} />
      </Main>
    </MainLayoutWrapper>
  );
}
