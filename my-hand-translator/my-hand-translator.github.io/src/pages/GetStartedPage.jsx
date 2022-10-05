import React from "react";

import Container from "../components/Container";
import { styled } from "../config/stitches.config";

function GetStartedPage() {
  return (
    <Main>
      <Container>
        <h1>GET STARTED</h1>

        <p>
          My Hand Translator은 사용자 개인의 Google Cloud Translator API를 이용합니다. Cloud
          Translator API는{" "}
          <a
            href="https://cloud.google.com/translate/pricing?hl=ko"
            target="_blank"
            rel="noreferrer"
          >
            월 50만자까지
          </a>{" "}
          무료로 이용 할 수 있기 때문에 My Hand Translator 프로젝트를 장기적으로 유지하기 위해
          결정되었습니다. 따라서 My Hand Translator을 사용하기 위해서는{" "}
          <a href="https://cloud.google.com/" target="_blank" rel="noreferrer">
            구글 클라우드 플랫폼
          </a>{" "}
          회원 가입이 필요합니다.
        </p>
      </Container>

      <Container>
        <h2>회원 가입 후 사전준비 과정</h2>
        <ul>
          <li>
            <ListContainer>
              <h3>1. 프로젝트 생성 하기</h3>
              <img
                srcSet="images/getStarted/1_create_project_1200.png 1200w,
                  images/getStarted/1_create_project_768.png 768w"
                src="images/getStarted/1_create_project_1200.png"
                alt="1_create_project"
              />
            </ListContainer>
          </li>
          <li>
            <ListContainer>
              <h3>
                2. API 및 서비스 - 대시보드 - 상단에 API 및 서비스 사용 및 설정 - Cloud Translation
                API 사용
              </h3>
              <img
                srcSet="images/getStarted/2_1_create_api_1200.png 1200w,
                  images/getStarted/2_1_create_api_768.png 768w"
                src="images/getStarted/2_1_create_api_1200.png"
                alt="2_1_create_api"
              />
              <img
                srcSet="images/getStarted/2_2_use_api_1200.png 1200w,
                  images/getStarted/2_2_use_api_768.png 768w"
                src="images/getStarted/2_2_use_api_1200.png"
                alt="2_2_use_api"
              />
            </ListContainer>
          </li>
          <li>
            <ListContainer>
              <h3>
                3. OAuth 동의 화면 구성 - 외부 선택 - 앱 이름과, 사용자 지원 이메일, 개발자 연락처
                정보 입력, 아래 저장 버튼 클릭
              </h3>
              <img
                srcSet="images/getStarted/3_1_create_OAuth_1200.png 1200w,
                  images/getStarted/3_1_create_OAuth_768.png 768w"
                src="images/getStarted/3_1_create_OAuth_1200.png"
                alt="3_1_create_OAuth"
              />
              <img
                srcSet="images/getStarted/3_2_create_OAuth_1200.png 1200w,
                  images/getStarted/3_2_create_OAuth_768.png 768w"
                src="images/getStarted/3_2_create_OAuth_1200.png"
                alt="3_2_create_OAuth"
              />
              <img
                srcSet="images/getStarted/3_3_create_OAuth_1200.png 1200w,
                  images/getStarted/3_3_create_OAuth_768.png 768w"
                src="images/getStarted/3_3_create_OAuth_1200.png"
                alt="3_3_create_OAuth"
              />
              <ListContainer>
                <p>OAuth 동의 화면에서 앱 게시 클릭 </p>
                <img
                  srcSet="images/getStarted/3_4_create_OAuth_1200.png 1200w,
                  images/getStarted/3_4_create_OAuth_768.png 768w"
                  src="images/getStarted/3_4_create_OAuth_1200.png"
                  alt="3_4_create_OAuth"
                />
              </ListContainer>
            </ListContainer>
          </li>
          <li>
            <ListContainer>
              <h2> OAuth 클라이언트 ID 만들기 </h2>
              <img src="images/getStarted/3_5_create_OAuth.png" alt="3_5_create_OAuth" />
            </ListContainer>
            <ListContainer>
              <p>어플리케이션 유형으로 크롬 앱 선택하기 </p>
              <img src="images/getStarted/3_6_create_OAuth.png" alt="3_6_create_OAuth" />
            </ListContainer>
            <ListContainer>
              <p>애플리케이션 ID에 확장프로그램 ID 작성해 만들기 </p>
              <img
                srcSet="images/getStarted/3_7_create_OAuth.png"
                src="images/getStarted/3_7_create_OAuth.png"
                alt="3_6_create_OAuth"
              />
            </ListContainer>
            <ListContainer>
              <p>Oauth2의 사용자 인증 정보와 프로젝트 아이디를 복사합니다. </p>
              <img src="images/getStarted/3_8_create_OAuth.png" alt="3_8_create_OAuth" />
            </ListContainer>
          </li>
          <li>
            <ListContainer>
              <h3>
                4. 확장프로그램이 설치되어 있는 경로의 manifest.json 파일에 클라이언트 ID와 프로젝트
                ID를 붙여넣습니다.
              </h3>
              <img src="images/getStarted/3_9_create_OAuth.png" alt="3_9_create_OAuth" />
              <ListContainer>
                <p>Google 로그인 후 권한 동의를 합니다.</p>
              </ListContainer>
            </ListContainer>
          </li>
          <li>
            <ListContainer>
              <h3>
                5. 브라우저의 확장 프로그램 아이콘을 클릭하면, 구글 OAuth2 인증이 시작될 것입니다.
              </h3>
            </ListContainer>
          </li>
        </ul>
      </Container>
    </Main>
  );
}

const ListContainer = styled("section", {
  margin: "1em",

  "& p": {
    marginBottom: "0.7em",
  },
  "& img": {
    width: "60%",
    marginBottom: "1em",
    display: "block",
    overflow: "hidden",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",

    "@medium": {
      width: "100%",
    },
  },
});

const Main = styled("main", {
  fontSize: "20px",
  lineHeight: 1.5,

  "& h1": {
    margin: "1em 0",
    fontSize: "1.5em",
    fontWeight: 600,
  },
  "& h2": {
    margin: "1em 0",
    fontSize: "1.2em",
    fontWeight: 600,
  },
  "@medium": {
    fontSize: "15px",

    "& h1": {
      fontSize: "1.3em",
      marginTop: "0",
    },
  },
});

export default GetStartedPage;
