import React from "react";
import styled from "styled-components";

import { ELLIPSIZE_LENGTH } from "../../../constants/ellipsizeLength";
import { createStars } from "../../../utils/createStars";
import { changeDateFormat } from "../../../utils/date";
import { ellipsizeText } from "../../../utils/ellipsizeText";

const IntervieweeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const Label = styled.div`
  display: flex;
  margin-right: 0.5vw;
  font-weight: 450;
`;

const DataWrapper = styled.div`
  display: flex;
  min-width: 0;
`;

const ResultWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  padding: 0.5vh;
  font-size: .9em;
`;

export default function Interviewee({ searchResult }) {
  const ellipsizedAnswewr = ellipsizeText(searchResult.answer, ELLIPSIZE_LENGTH.ANSWER);
  const formattedInterviewDate = changeDateFormat(searchResult.interviewDate, "yyyy-MM-dd");

  return (
    <IntervieweeWrapper>
      <ResultWrapper>
        <Label>답변자:</Label>
        <DataWrapper>{searchResult.intervieweeName}</DataWrapper>
      </ResultWrapper>
      <ResultWrapper>
        <Label>답변날짜:</Label>
        <DataWrapper>{formattedInterviewDate}</DataWrapper>
      </ResultWrapper>
      <ResultWrapper>
        <Label>답변:</Label>
        <DataWrapper>{ellipsizedAnswewr}</DataWrapper>
      </ResultWrapper>
      <ResultWrapper>
        <Label>점수:</Label>
        <DataWrapper>{createStars(searchResult.score)}</DataWrapper>
      </ResultWrapper>
    </IntervieweeWrapper>
  );
}
