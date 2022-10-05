import React from "react";
import styled from "styled-components";

import { createStars } from "../../../utils/createStars";
import IntervieweeDetailUserInfo from "../IntervieweeDetailUserInfo";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 10vh;
  padding-bottom: 2vh;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const FinalScore = styled.div`
  font-size: 30px;
`;

const FinalContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.div`
  font-size: 20px;
  margin-left: auto;
  margin-right: 0.5vw;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

function IntervieweeDetailHeader({
  email,
  name,
  commentAvgScore,
}) {
  return (
    <Header>
      <IntervieweeDetailUserInfo email={email} name={name} />
      <FinalScore>
        <FinalContainer>
          <Label>최종 평가</Label>
          <Stars>{createStars(commentAvgScore)}</Stars>
        </FinalContainer>
      </FinalScore>
    </Header>
  );
}

export default IntervieweeDetailHeader;
