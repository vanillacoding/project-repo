import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import theme from "../../config/constants/theme";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <ErrorWrapper>
        <ErrorImage />
        <ErrorMessage>존재하지 않는 페이지에 대한 요청입니다.</ErrorMessage>
      </ErrorWrapper>
      <HomeButton onClick={() => navigate("/")}>
        <Home>홈으로</Home>
      </HomeButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.white};
  height: 100%;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorImage = styled.img.attrs({
  src: "https://s3-alpha-sig.figma.com/img/e558/c9ca/3bc0c09c04ff82e3696a07b73b057b86?Expires=1667174400&Signature=dQpoc-s~3lw7B405biW9c~YxJMjUqCgpbi8DRd8oeoIWjM~qZaS-wVWqRsWKooTSgCVItfIHiqiQSaND23lhmCgYGEuES3VPT0Nf-LyqnI2U0gdE87JSoRSQLrDCWAiJ~~VZxZVvWBm~XwxWjxCfwu4I4J5Ufck-JiRwKhGSPJgbAqwS2HUpo07FJ9eU7AIou9vwWCVilLzTdwDdt7XiHsNqHSPm3eO~NWIZ00v22Y3PJZtZ9XB4yT6ZmCIlYOJ4li3XpadhKiBYwoz~B8~QbeAS-r2CPUvvT6PpVmug2zl3xQ7mmeyTTg~VeDXpcTqYZwkEmFgIE3usAhzYHXqVzg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
  alt: "not found image",
})`
  width: 715px;
  height: 440px;
`;

const ErrorMessage = styled.p`
  font-size: 20px;
`;

const HomeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
  padding: 10px;
  border: 1.5px solid black;
  border-radius: 5px;
  background-color: ${theme.white};
  cursor: pointer;

  &:hover {
    background-color: ${theme.gray};
    color: ${theme.black};
    transition: all 0.1s ease-in-out;
  }
`;

const Home = styled.span`
  font-size: 20px;
`;
