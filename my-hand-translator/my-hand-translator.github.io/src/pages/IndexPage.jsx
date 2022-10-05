import React from "react";

import { styled } from "../config/stitches.config";
import { GET_STARTED } from "../constants/url";

import Container from "../components/Container";
import Article from "../components/Article";
import Button from "../components/Button";
import ContentWithImage from "../components/ContentWithImage";
import ButtonToGoAnotherSite from "../components/ButtonToGoAnotherSite";

function App() {
  return (
    <main>
      <MainStyled>
        <Container>
          <HeroStyled>
            <h1>MY HAND TRANSLATOR</h1>
            <h2>기술 용어를 원하는 단어로 번역</h2>
            <ButtonWrap className="button-wrap">
              <Button to={GET_STARTED}>Get Started</Button>
              <ButtonToGoAnotherSite
                href="https://chrome.google.com/webstore/detail/my-hand-translator/iidfgdkckfjpabpfphlejemhoncclbdp"
                target="_blank"
              >
                Download Now
              </ButtonToGoAnotherSite>
            </ButtonWrap>
            <HeroImage>
              <img src="images/my-hand-translation.gif" alt="서비스_사진" />
            </HeroImage>
          </HeroStyled>
        </Container>
      </MainStyled>

      <Container id="intro">
        <Article css={{ marginBottom: "40px" }}>
          <h2>Intro</h2>
          <p>
            My Hand Translator은 기술 문서를 번역할 때 개발 용어가 다른 뜻으로 번역되는 불편함을
            해결하기 위해 시작되었습니다.
          </p>
        </Article>
      </Container>

      <section id="feature">
        <ContentWithImage
          style={{
            backgroundColor: "#f7f9fa",
          }}
          title="Feature"
          imgSrc="images/index/edit_glossary.png"
          descriptions={[
            {
              id: 1,
              text: "용어집을 통해 영어로 된 기술 용어를 자신이 원하는 한글 단어로 변경하여 번역 할 수 있습니다.",
            },
          ]}
        />

        <ContentWithImage
          imgSrc="images/index/other_glossary.png"
          title="서버 연동 시에 추가되는 기능"
          descriptions={[
            { id: 1, text: "다른 사람 용어집 열람하고 나의 용어집에에 적용할 수 있습니다." },
          ]}
        />

        <ContentWithImage
          style={{
            backgroundColor: "#f7f9fa",
          }}
          imgSrc="images/index/other-translation.png"
          title="서버 연동 시에 추가되는 기능"
          descriptions={[
            {
              id: 1,
              text: "서버 DB를 이용해 다른 사람이 번역했던 내역이 있으면 우선적으로 보여주어 Google Translation API 요청을 아낄 수 있습니다",
            },
          ]}
        />
      </section>
    </main>
  );
}

const HeroImage = styled("div", {
  display: "flex",
  width: "85%",
  margin: "auto",
  marginBottom: "30px",
  overflow: "hidden",
  borderRadius: "10px",
  boxShadow:
    "rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px",

  "& img": {
    width: "100%",
  },
  "@medium": {
    width: "100%",
  },
});

const ButtonWrap = styled("div", {
  display: "flex",
  margin: "40px 0",

  "@medium": {
    flexDirection: "column",
  },
});

const HeroStyled = styled("section", {
  paddingTop: "50px",
  color: "#ffffff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "& h1": {
    fontSize: "2.5em",
  },
  "& h2": {
    fontSize: "1.5em",
    margin: "15px 0",
  },
});

const MainStyled = styled("section", {
  marginBottom: "180px",
  maxHeight: "770px",
  backgroundColor: "$lightBlue",

  "@medium": {
    marginBottom: "50px",
  },
});

export default App;
