import React from "react";
import styled from "styled-components";

const Questions = styled.div`
`;

const Question = styled.div`
`;

function IntervieweeDetailScript({ questions }) {
  return (
    <Questions>
      <Question>
        {
          questions.length ?
            questions.map(question =>
              <>
                <ul>
                  <li>문제: {question.title}</li>
                  <li>답변: {question.answer}</li>
                </ul>
              </>
            )
            : "faBatteryEmpty..."
        }
      </Question>
    </Questions>
  );
}

export default IntervieweeDetailScript;
