import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";

import DownIcon from "../../components/shared/DownIcon";
import { MESSAGE } from "../../config/constants";
import theme from "../../config/constants/theme";

export default function NewProjectPage() {
  const [projects, , sendToast] = useOutletContext();
  const navigate = useNavigate();

  const navigateToMyProject = (event) => {
    event.preventDefault();

    if (!projects?.length) {
      sendToast(MESSAGE.NO_PROJECT);

      return;
    }

    const projectId = projects[0]._id;

    navigate(`/console/projects/${projectId}`, { replace: true });
  };

  return (
    <Container>
      <StyledHeading>지금 바로 첫 프로젝트를 시작해보세요!</StyledHeading>
      <StyledText>이미 Circle을 사용중이신가요?</StyledText>
      <DownIcon />
      <StyledButton type="button" onClick={navigateToMyProject}>
        나의 프로젝트 불러오기
      </StyledButton>
    </Container>
  );
}

const StyledHeading = styled.h1`
  margin-top: 100px;
  text-align: center;
  vertical-align: middle;
  font-size: 50px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledText = styled.p`
  margin-top: 80px;
  margin-bottom: 20px;
  font-size: 30px;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  width: 300px;
  margin-top: 50px;
  padding: 28px;
  border: none;
  border-radius: 5px;
  background-color: ${theme.blue};
  font-size: 26px;
  color: ${theme.black};
  cursor: pointer;

  &:hover {
    background-color: ${theme.blue};
    color: ${theme.white};
    transition: all 1s ease;
  }
`;
