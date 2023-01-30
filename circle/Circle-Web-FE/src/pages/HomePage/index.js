import React from "react";
import styled from "styled-components";

import DownIcon from "../../components/shared/DownIcon";
import useLogin from "../../hooks/useLogin";
import theme from "../../config/constants/theme";
import appImage1 from "../../assets/images/app2.png";
import appImage2 from "../../assets/images/app3.png";

export default function HomePage() {
  const handleOnLogin = useLogin();

  const handleScrollToDown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container>
      <StartGuideWrapper>
        <TitleWrapper>
          <Title>
            실시간 그룹콜
            <br />
            지금 바로 시작하세요
          </Title>
        </TitleWrapper>
        <StartProjectButton type="button" onClick={handleOnLogin}>
          프로젝트 시작하기
        </StartProjectButton>
        <DownIcon onClick={handleScrollToDown} />
      </StartGuideWrapper>
      <AppDescriptionWrapper>
        <ImagesWrapper>
          <ImageCard src={appImage1} alt="서비스앱 홈화면" />
          <ImageCard src={appImage2} alt="서비스앱 채널화면" />
        </ImagesWrapper>
        <TextBox>
          <Description>현재 웹사이트 에서 바로 소통에 참여하세요</Description>
        </TextBox>
      </AppDescriptionWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: calc(200% - 60px);
  background-color: ${theme.skyBlue};
`;

const StartGuideWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(50% - 30px);
  padding: 150px 0px;
`;

const TitleWrapper = styled.div`
  font-size: 42px;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: 500;
`;

const StartProjectButton = styled.button`
  margin: 50px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: ${theme.blue};
  font-size: 32px;
  color: ${theme.white};
  text-decoration: none;
  cursor: pointer;
`;

const AppDescriptionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(50% - 30px);
`;

const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 620px;
  margin: 0 auto;
`;

const ImageCard = styled.img`
  width: 300px;
  border-radius: 5px;
`;

const TextBox = styled.div`
  margin: 30px auto;
  margin-bottom: 70px;
  max-width: 1000px;
`;

const Description = styled.p`
  letter-spacing: 1px;
  font-size: 28px;
  color: ${theme.black};
  font-weight: 600px;
`;
