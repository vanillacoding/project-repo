import React from "react";
import styled from "styled-components";

const Script = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
`;

const Question = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 150px;
  margin-top: 1vh;
  border-bottom: 3px solid ${({ theme }) => theme.QuestionContentGray };
`;

const Answer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 150px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: 1vw;
  padding: 3px 0;
  font-size: 18px;
  font-weight: 600;
`;

const Body = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 95%;
  height: 100px;
  overflow-y: scroll;
  border: 2px solid ${({ theme }) => theme.LinkWater };
  border-radius: 3px;
  font-size: 12px;
`;

export default function ScriptBox({ question, answer }) {
  return (
    <Script>
      <Question>
        <Title>질문 :</Title>
        <Body>{question}</Body>
      </Question>
      <Answer>
        <Title>답변 :</Title>
        <Body>{answer}</Body>
      </Answer>
    </Script>
  );
}
