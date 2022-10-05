<img src="/readmeAssets/chaekbonnalLogo.png" width="40%" height="auto" alt="Project Logo"></img>

# 책본날

## Table of Contents

1. [ Introduction ](#introduction)
2. [ Prerequisites ](#prerequisites)
3. [ Installation ](#installation)
4. [ Features ](#features)
5. [ Skills ](#skills)
6. [ Challenges ](#challenges)
7. [ Deployment ](#deployment)
8. [ Project Control ](#projectcontrol)
9. [ Things to Do ](#thingstodo)

<a name='introduction'></a>
## Introduction
책본날은 독후감을 공유하거나 사람들에게 책을 추천받을 수 있는 독후감 SNS입니다.

<img src="/readmeAssets/chaekbonnal1.gif" width="80%" height="100%" alt="Project Demo 1"></img><br/>
<img src="/readmeAssets/chaekbonnal2.gif" width="80%" height="100%" alt="Project Demo 1"></img>

- Client: <https://www.chaekbonnal.site>
- Server : <https://api.chaekbonnal.site>

<a name='prerequisites'></a>
## Prerequisites
로컬환경에서 실행하기 위해서 아래 절차가 필요합니다.

### Client
- .env 파일을 루트 디렉토리에 생성하고, 환경변수를 설정해주세요. ( <your_~>를 지우고 발급받은 정보들을 입력해주세요.)
```

REACT_APP_BASE_URL=http://localhost:8080

REACT_APP_GOOGLE_CLIENT_ID=<your_client_id>
REACT_APP_GOOGLE_VISION_API=https://vision.googleapis.com/v1/images:annotate?key=<your_api_key>

```

- [Google Cloud Platform](https://console.cloud.google.com/?hl=ko)
  1. Google 로그인
  2. API 및 서비스 - 대시보드 - API 및 서비스 사용 설정
  3. "Cloud Vision API" 선택 - 사용 설정
  4. API 및 서비스 - 사용자 인증 정보 - 사용자 인증 정보 만들기 - OAuth 2.0 클라이언트 ID (<your_client_id>에 해당)
  5. API 및 서비스 - 사용자 인증 정보 - 사용자 인증 정보 만들기 - API키 (<your_api_key>에 해당)


### Server
- .env 파일을 루트 디렉토리에 생성하고, 환경변수를 설정해주세요. ( <your_~>를 지우고 발급받은 정보들을 입력해주세요.)
```

PORT=8080

MONGO_DB_URL=<your_connection_string>

// JWT 생성을 위한 random string
SECRET_KEY=<your_secret_string>

NAVER_CLIENT_ID=<your_naver_client_id>
NAVER_CLIENT_SECRET=<your_naver_client_secret>

NATIONAL_LIBRARY_OF_KOREA_URL=http://seoji.nl.go.kr/landingPage/SearchApi.do?cert_key=<your_key>&result_style=json&page_no=1&page_size=1&isbn=

AWS_ACCESS_KEY_ID=<your_key_id>
AWS_SECRET_ACCESS_KEY=<your_secret_key>
AWS_REGION=<your_region>

```

- [MongoDB ](https://www.mongodb.com)
  1. MongoDB Atlas 로그인 및 접속
  2. Connect your application - your connection string
 
- [Naver Developers 검색 API 이용 신청](https://developers.naver.com/apps/#/register)
  1. 네이버 로그인 및 애플리케이션 등록
  2. 사용 API "검색"으로 등록
  3. 내 애플리케이션 - 애플리케이션 정보

- [국립중앙도서관 Open API 인증키 신청](https://nl.go.kr/NL/contents/N31101010000.do)
  1. 국립중앙도서관 로그인 및 Open API 인증키 신청하기
  2. 인증키 신청/관리 - 발급된 인증키 정보	
  
- [AWS S3 액세스 키 발급](https://aws.amazon.com/ko/s3)
  1. AWS 로그인
  2. 내 보안 자격증명 - 액세스 키(액세스 키 ID 및 비밀 액세스 키)
  3. 새 엑세스 키 만들기


<a name='installation'></a>
## Installation

### Client
```

$ git clone https://github.com/hyozzang2/ChaekBonNal-client.git
$ cd ChaekBonNal-client

$ npm install
$ npm start

```

### Server
```

$ git clone https://github.com/hyozzang2/ChaekBonNal-server.git
$ cd ChaekBonNal-server

$ npm install
$ npm start

```
<a name='features'></a>
## Features
- Google 소셜 로그인
- 독후감 page filp
- 선호 카테고리 선택 및 메인 페이지 필터링
- 독후감 작성
- 이미지 텍스트 추출 및 인용구 사용
- Naver Books 책 검색
- 국립중앙도서관 ISBN 검색 및 카테고리 대분류 반영
- 독후감 수정 및 삭제
- 내 서재
- 북마크 모아보기
- 댓글 작성 및 삭제
- 북마크 등록 및 해제

<a name='skills'></a>
## Skills

### Client
- ES2015+
- React
- React Router
- Redux

### Server
- ES2015+
- Node.js
- Express
- JSON Web Token (JWT)
- MongoDB
- Mongoose
- AWS Simple Storage Service (S3)
- AWS Elastic Beanstalk (EB)
- AWS Certificate Manager (ACM)
  
 ### Test
 - Jest, Enzyme을 이용한 Unit test

<a name='challenges'></a>
## Challenges
- 독후감 수정 시 불필요한 서버 요청<br/>
수정하는 과정에서 여러 번의 페이지 라우팅이 일어났습니다.<br/>
(e.g. 책 정보를 바꾸기 위해 책 검색 페이지로 이동, 사진 변경을 위해 이미지 첨부 페이지로 이동 등)<br/>
라우팅이 일어날 때마다 서버로 요청되어 속도와 비용 문제가 우려되었고 개선하기 위하여 라우팅될 때 여러가지 모드를 만들었습니다.<br/>
수정모드에서 초기 한 번만 서버 요청을 하였고 이후 라우팅을 할 때는 changedImageInEditMode와 같은 액션을 사용하여 State로 데이터를 관리하였습니다.

- Portal의 사용<br/>
어플리케이션 특성 상 같은 포맷의 모달이 다양한 경로에서 재 사용되어야하고, 시각적으로 pop-up되어야 했습니다.<br/>
react portal은 DOM 트리 구조 어디에서나 있을 수 있고 일반적인 자식 컴포넌트와 같이 이벤트가 버블링된다는 특성 때문에 사용하게 되었습니다.<br/>
따라서 시각적으로 상속성이 없고, 어느 경로에서나 pop-up되어 보여지고, 또한 이벤트 버블링이 되는 원하는 모달을 만들 수 있었습니다.<br/>
간단한 케이스로 사용해보았지만 포탈의 장점을 체험할 수 있었습니다.

<a name='deployment'></a>
## Deployment
### Client
- Netlify
- Custom Domain

### Server
- AWS Elastic Beanstalk
- Custom Domain

<a name='projectcontrol'></a>
## Project Control
- Git, GitHub을 사용한 Version Control
- Notion을 사용한 Task Control

<a name='thingstodo'></a>
## Things to do
- 임시저장
- 계정 팔로우 및 알람
- JSON Web Token (JWT) refresh token
- 책 검색 pagination
- E2E Test
