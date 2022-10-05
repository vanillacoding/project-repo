import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import mainImg from '../assets/mainImg.jpeg';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  height: calc(100vh - 80px);
  width: 100%;
  font-family: 'Nanum Barun Gothic';
`;

const HomeSection = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 80px);
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props => props.height || '50%'};
  margin: auto;
`;

const Title = styled.h2`
  font-family: 'Nanum Barun Gothic Bold';
  font-size: 4rem;
  margin-bottom: 10px;
`;

const SubTitle = styled.span`
  font-family: 'Nanum Barun Gothic Bold';
  font-size: 2rem;
  margin-bottom: 30px;
`;

const ImgContainer = styled.div`
  display: flex;
  width: 70%;
  height: 70%;
  margin: 10% 90% 0 0;
`;

const Button = styled.button`
  width: 200px;
  height: 50px;
  margin: 20px 0;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.theme.SUB};
  &:hover {
    background-color: ${props => props.theme.HOVER};
    color: black;
  }
  &:focus {
    outline: none;
  }
`;

const ButtonText = styled.span`
  font-family: 'Nanum Barun Gothic Bold';
  font-size: 1rem;
`;

export default function HomeMain() {
  const history = useHistory();

  function handleCampaignButtonClick() {
    history.push('/campaign/new');
  }

  return (
    <HomeWrapper>
      <HomeSection>
        <ContentWrapper>
          <Content>
            <Title>
              헬스케어 기업을 위한<br />
              최적의 광고 플랫폼
            </Title>
            <SubTitle>
              니즈가 명확한 고객을 확보하세요
            </SubTitle>
            <Button onClick={handleCampaignButtonClick}>
              <ButtonText>
                캠페인 시작하기
              </ButtonText>
            </Button>
          </Content>
        </ContentWrapper>
        <ContentWrapper>
          <ImgContainer>
            <img src={mainImg} alt="mainImg" />
          </ImgContainer>
        </ContentWrapper>
      </HomeSection>
    </HomeWrapper>
  );
}
