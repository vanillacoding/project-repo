import React from "react";
import styled from "styled-components";

const ScriptWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1vh;
  width: 90vw;
  height: 60%;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);

`;

const ScriptHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 5vh;
  border-radius: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const Label = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 1.5vw;
  font-size: 1.5em;
`;

const ScriptList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1vh;
  list-style: none;
  margin-left: 1.5vw;
`;

const Script = styled.div`
  display: flex;
  margin: 0.5vh;
  font-size: 1.3em;
  font-weight: 300;
`;

function IntervieweeDetailScript({ questions }) {
  return (
    <ScriptWrapper>
      <ScriptHeader><Label>스크립트</Label></ScriptHeader>
      {
        questions ?
          questions.map(question =>
            <div key={question._id}>
              <ScriptList>
                <Script>문제: {question.title}</Script>
                <Script>답변: {question.answer}</Script>
              </ScriptList>
            </div>
          )
          : "No script available"
      }
    </ScriptWrapper>
  );
}

export default IntervieweeDetailScript;
