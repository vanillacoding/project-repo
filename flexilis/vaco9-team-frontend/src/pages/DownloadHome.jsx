import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import electron from '../assets/electron.png';
import vaco from '../assets/vaco.png';
import feature from '../assets/feature.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  font-family: 'Nanum Barun Gothic';
`;

const Header = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  height: 80px;
  width: 100%;
  min-width: 900px;
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.8);;
`;

const LeftSection = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 50%;
  height: 100%;
  margin: auto 10%;
`;

const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 50%;
  height: 100%;
  margin: auto 10%;
`;

const HeaderItemWrapper = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;
  margin: auto 30px;
`;

const HeaderItem = styled.div`
  margin: auto;
  cursor: pointer;
  font-size: ${props => props.fontSize || '20px'}
`;

const HeaderLink = styled(Link)`
display: flex;
height: fit-content;
margin: auto;
justify-content: center;
align-content: center;
text-decoration: none;
color: inherit;
transition: 0.3s;
  &: hover {
  color: #4D543B;
}
`;

const HomeSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 160px;
height: 100vh;
`;

const Title = styled.h1`
margin: 0;
`;

const SubTitle = styled.span`
margin: 24px;
`;

const DownloadLink = styled.a`
cursor: pointer;
text-align: center;
text-decoration: none;
color: inherit;
font-size: 18px;
font-weight: 500;
border-radius: 4px;
border: none;
min-width: 150px;
padding: 20px 40px;
margin: 20px 0 40px 0;
background-color: #d2d6ae;
transition: transform 0.3s ease;
  &: hover {
  background-color: #ced1b8;
  transform: scale(1.03);
}
`;

const Image = styled.img`
width: ${ props => props.width || '840px'}
height: ${ props => props.height || '500px'}
`;

const Feature = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: ${ props => props.margin}
`;

const FeatureWrapper = styled.div`
position: relative;
left: 80px;
display: flex;
justify-content: center;
align-items: space-evenly;
width: 60vw;
margin: 40px;
`;

const ParagraphWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
padding-left: 60px;
`;

const Paragraph = styled.p`
width: 40vw;
line-height: 30px;
`;

const Logo = styled.img`
width: 240px;
height: 80px;
margin: 20px 0 60px 0;
`;

export default function DownloadHome() {
  return (
    <Container>
      <Header>
        <LeftSection>
          <HeaderItemWrapper>
            <HeaderItem fontSize="30px" onClick={scrollTop}>Flexilis</HeaderItem>
          </HeaderItemWrapper>
        </LeftSection>
        <RightSection>
          <HeaderItemWrapper>
            <HeaderItem onClick={scrollBottom}>Feature</HeaderItem>
          </HeaderItemWrapper>
          <HeaderItemWrapper>
            <HeaderLink to="/main">앱에 광고 등록하기</HeaderLink>
          </HeaderItemWrapper>
        </RightSection>
      </Header>
      <HomeSection>
        <Title>스트레칭, Flexilis와 함께</Title>
        <SubTitle>Flexilis는 스트레칭 알람 데스크탑 앱입니다.</SubTitle>
        <DownloadLink href={process.env.REACT_APP_DOWNLOAD_URL} download>
          Download Now
        </DownloadLink>
        <Image width="840px" height="500px" src={electron} alt="electron" />
      </HomeSection>
      <Feature onClick={scrollBottom} margin="70px">
        <Title>Feature</Title>
        <FeatureWrapper>
          <div>
            <Image width="640px" height="420px" src={feature} alt="feature" />
          </div>
          <div>
            <ParagraphWrapper>
              <h3>원하는 시간에 스트레칭 알림을 받고싶으셨나요?</h3>
              <Paragraph>Flexilis는 부위별 스트레칭 영상과 함께<br />
              알람이 등록된 시간에 선택한 부위의 스트레칭 영상이 팝업으로 재생됩니다.<br />
              커스텀 영상으로 나만의 스트레칭 루틴을 만들어보세요.<br />
              팝업 3분 전 푸시 알람을 띄워줍니다.<br />
              </Paragraph>
            </ParagraphWrapper>
          </div>
        </FeatureWrapper>
      </Feature>
      <Feature margin="20px">
        <SubTitle>Sponsored By</SubTitle>
        <Logo src={vaco} alt="vaco" />
      </Feature>
    </Container>
  );
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollBottom() {
  window.scrollTo({ top: 870, behavior: 'smooth' });
}
