import React from "react";
import styled from "styled-components";

import IntervieweeDetailComments from "../IntervieweeDetailComments";

const EvaluationDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90vw;
`;

const Label = styled.p`
  display: flex;
  width: 20%;
  margin: 1vh 3vh;
  font-size: 1.5em;
`;

const EvaluationDetailHeader = styled.div`
  display: flex-start;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 3vh;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  font-size: 1.3em;
`;

export default function IntervieweeDetailEvaluationEntry({ createStars, comments }) {
  return (
    <EvaluationDetailWrapper>
      <EvaluationDetailHeader>
        <Label>평가 디테일</Label>
      </EvaluationDetailHeader>
      <IntervieweeDetailComments createStars={createStars} comments={comments}/>
    </EvaluationDetailWrapper>
  );
}
