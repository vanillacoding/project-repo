# Introduction

Never take notes during your interview again.

Just focus on evaluation,



Memoterview는 면접관을 위해 만들어진 웹 서비스입니다. 

Memoterview와 함께라면, 귀찮은 타이핑 없이 면접 내용과 면접자의 평가를 바로 기록 할 수 있을 것입니다. 

면접 중간 중간, 면접관의 제어에 의해 면접자와의 대화가 바로바로 기록됩니다. 

면접이 끝나고 나면, 점수 및 대화기록을 지원자의 정보와 함께 저장합니다. 

이 정보들은 바로 열람 가능하게 수치화 및 텍스트화 되어, 장소와 상관없이 간편하게 확인할 수 있습니다.



Memoterview는 면접 상황을 다시 리마인드 할 수 있는 도구가 되고자 합니다.

면접의 흐름과 그에 따른 평가들을 기록 함으로써, 그 당시에 느낀 감정, 생각들을 현장감 있게 불러일으키는 것이 저희 서비스의 목적입니다.

꾸준한 개선을 통해, 보다 더 좋은 서비스가 되도록 노력하겠습니다.



# Motivation

신입사원 면접기간 중 면접관 자리에 잠깐의 공석이 생겨 잠깐이나마 면접관을 경험해본 적이 있습니다.

비록 면접을 주도적으로 이끌어가지는 못하고 다른 선배 면접관들을 서포트하는 작업이었지만 그 잠깐의 면접동안 수많은 면접자들을 만나고 답변들 들으면서 느꼈던건 단 하나였습니다.

'이거 기억을 어떻게 하지?'

이로인해 저는 질문과 답변을 듣고 타이핑을하게 되었고 타이핑을 하는 순간에는 면접에 집중하기가 힘들었습니다.



면접관들을 위해 면접을 기록하고 순간순간 느낌과 평가를 기록해서 면접을 회고하는데 리마인더만 시켜주는 것이 있으면 면접에 상당히 큰 도움이 되겠다 생각하였고,

이 순간의 경험 덕분에 오로지 면접관들을 면접에만 집중시킬 수 있는 지금의 Memoterview를 생각하게 되었습니다.



요즘 비대면 면접으로 화상을 통해 인터뷰를 진행하는 회사들이 점점 많아지고 있습니다.

현 시대상황에 맞춰 화상 면접을 진행하는 면접관들을 대상으로 선택하였고,

팀원들과 여러가지 회의를 거쳐 오로지 면접에만 집중할 수 있는 환경을 만들수 있게 노력하였습니다.

Memoterview를 사용해 오로지 면접에만 집중해보세요.



# TechStack

### Frontend

- ES2015+
- React
- React-router-dom
- Redux
- Rexdux-saga
- WebRTC
- Socket io Client
- SpeechRecognition
- Styled-Component

### Backend

- NodeJS
- Express
- Multer
- MongoDB, Atlas
- Mongoose
- Socket.io
- Nodemailer
- AWS S3 (Storage)

### Common

- Git
- JSON Web Token
- ESLint
- Jest, enzyme for unit-test



# Task Tools

- Mockups
  - Mockup 디자인 툴
  - [Link]()
- Lucid Chart
  - Database Schema 제작 툴
  - [Link]()
- Notion
  - 프로젝트 Task 및 이슈 관리
  - [Link]()



# Feature

- Google 소셜 로그인 제공

- 면접 생성 및 관리
  - 다른 면접관 **이메일 검색 및 추가**
  - **커스텀 평가 옵션** 제공
  - 카테고리 설정 (면접 진행시 카테고리에 따른 추천 질문 제공)
  
- 내가 생성한 인터뷰, 내가 참가한 인터뷰 리스팅

- 면접자 추가 제거 
  - 면접자 추가시 **이력서 첨부** 가능
  - 면접자 추가 후 **초대시 이메일 링크** 전달
  - 초대 후 참가시 면접 방 생성
  
- 화상 인터뷰
  - 웹캡을 통한 **실시간 화상 면접** 진행 가능
  - 면접 진행중 탭을 통해 등록한 **이력서 뷰잉**
  - 화상 off / 음성 off 기능 제공
  - **원 버튼**을 통한 면접 진행
    - 면접 시작 -> 질문 -> 질문 종료 -> 답변시작 -> 답변 -> 답변 평가
  - 설정된 카테고리에 맞는 추천질문 제공 (랜덤제공, 버튼 클릭시 리프레시)
  
- 면접관 질문 및 면접자 답변 **실시간 음성인식 및 텍스트 변환**

- 면접 종료시 평가
  - 설정한 커스텀 평가 옵션 별점 평가
  - 코멘트 남기기
  - 면접자 **종합 점수** 별점 평가
  
- 면접자 결과 리스트잉
  - 각 면접관들의 평가에 대한 평균점수 제공
  - **리스트 필터 컬럼 설정** 가능
  - 각 필터당 **소팅** 기능 제공
  
- 상세 면접자 결과 뷰
  - 면접관 코멘트, 총점 리스팅
  - 질의 응답 텍스트 리스팅
  - 페이지 버튼을 통해 인쇄 기능 제공
  
- **질문 검색**기능 제공

  

# Getting Started

* 최신 버전의 크롬 브라우저 사용을 권장합니다.
* Local 환경에서 실행하기 위해 환경변수(env) 설정이 필요합니다.
* 관련 사이트
  * [구글 개발자](https://developers.google.com/)
  * [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  * [AWS](https://aws.amazon.com/)
  * Node mailer 전용 Gmail 계정

## Frontend

* 프로젝트 클론, dependency 설치

~~~(javascript
git clone https://github.com/VACO-TEAM3/memoterview-frontend.git
cd memoterview-frontend
yarn
~~~

* 프로젝트 root 디렉토리에 .env파일을 생성한 후, 아래 형식에 맞게  환경변수 값을 입력합니다.

~~~(javascript)
REACT_APP_GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
REACT_APP_GOOGLE_CLIENT_SECRET=<YOUR_GOOGLE_CLIENT_SECRET>

REACT_APP_SERVER_PORT_DEVELOPMENT=<YOUR_SERVER_PORT>
REACT_APP_INTERVIEW_SOCKET_SERVER_DEVELOPMENT=<YOUR_INTERVIEW_SOCKET_SERVER>
~~~

* 프로젝트 실행

~~~javascript
yarn start
~~~



## Backend

* 프로젝트 클론, dependency 설치

~~~(javascript
git clone https://github.com/VACO-TEAM3/memoterview-backend.git
cd memoterview-backend
yarn
~~~

* 프로젝트 root 디렉토리에 .env파일을 생성한 후, 아래 형식에 맞게  환경변수 값을 입력합니다.

~~~(javascript)
MONGO_DB_URL=<YOUR_MONGO_DB_URL>

ACCESS_TOKEN_SECRET=<YOUR_ACCESS_TOKEN_SECRET>
ACCESS_TOKEN_EXPIRES_IN=<YOUR_ACCESS_TOKEN_EXPIRES_IN>
CLIENT_URI=<YOUR_CLIENT_URI>

AWS_BUCKET_NAME=<YOUR_AWS_BUCKET_NAME>
AWS_REGION=<YOUR_AWS_REGION>
AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_KEY_ID>
AWS_SECRET_ACCESS_KEY=<YOUR_AWS_SECRET_ACCESS_KEY>
AWS_USER_ARN=<YOUR_AWS_USER_ARN>

GOOGLE_MAIL_ID=<YOUR_GOOGLE_MAIL_ID>
GOOGLE_MAIL_PASSWORD=<YOUR_GOOGLE_MAIL_PASSWORD>
~~~

* 프로젝트 실행

~~~javascript
yarn dev
~~~

# Usage



# Deploy

### Client

- Netlify

### Server

- Amazon Web Service(AWS) Elastic Beanstalk

# History

### WebRTC

기획시엔 webRTC 라이브러리를 사용하지 않고 직접 모든 과정을 스케줄링해서 구현하는 것이 목표였습니다. webRTC 1 : 1 셋팅에 성공하고 저희의 목표인 다대다로 바꾸는 과정에서, 다양한 버그가 발생했습니다. 렌더링 시점이 제대로 캐치가 되지 않고, 커넥션이 갑자기 끊기기도 하고, ICE candidate의 순서가 꼬이기도 했습니다. 가장 문제점은 이와 같은 버그들이 예측할 수 없는 타이밍에 발생한다는 점이었습니다. 저희의 프로젝트 우선 순위 상 직접 webRTC를 적용하는 것은 차선으로 미뤄야 한다고 판단하였고, simple-peer 라이브러리를 이용하게 되었습니다. Simple-peer를 도입하니 시그널링 과정이 간편해져서 한결 더 쉽게 코드를 작성 할 수 있게 됐습니다. 최초의 실패를 교훈으로 삼아 소켓 하나하나의 포인트 단위로 로그를 찍어 디버깅을 하며 비교적 쉽게 다대다 연결에 성공했습니다. 이미 존재하는 사용자는 새로 들어오는 사용자들의 피어를 모두 받을 수 있게 하고, 새로 들어오는 사용자는 이미 존재하는 모든 사용자들에게 피어를 모두 보내는 식으로 로직을 작성했습니다. 수 많은 디버깅을 겪어야만 했지만 그만큼 보람있는 작업이었고, 추후 web RTC 공부를 추가로 해서 다음엔 라이브러리 없이 직접 구현해보는 것이 목표입니다.

### Speech To Text

저희 핵심기능 중 하나인 음성을 인식하고 택스트로 변환하는 기능을 구현하기위해 Speech-To-Text 관련 API를 먼저 서칭하였습니다.
관련 API로 구글, 아마존, IBM 등 다양한 API들을 찾았지만 다 무료제공에 제한이 있었고, 그 중 무료로 제공이 가장 크고 Socket 서버를 제공해 실시간 음성 인식이 가능한 IBM의 Watson STT를 사용하기로 결정을 하였습니다.

실시간 인식이 가능해 인식 과정을 스크립트로 바로 보여줄 수 있어 매우 매력적이라고 판단하였지만,
Watson STT모델 자체가 비즈니스 관련 인식에 특화되어있지, 면접 대화에 관해 전문적으로 학습된 모델이 아니었기 때문에 인식률이 저희가 기대했던 것 보다 좋지않았습니다.

그렇게 인식률을 위해 타 API 모델들 보다 한국어로 학습이 많이 되어있을 것이라 판단한 카카오 STT API로 눈길을 돌렸고, 이전의 IBM Watson STT 처럼 Socket을 사용해 실시간 인식을 할 수 없는, 음성 파일을 받아 인식결과를 Response로 보내주는 RESTFul API였지만 오히려 모든 문맥을 다 듣고 인식을 해 주기 때문에 문맥파악으로 좀 더 인식률이 좋다고 판단하였습니다. 또한 질문, 답변 나눠서 인식만 해주면 되기 때문에 저희가 제공하는 면접 서비스에 음성인식 부분이 실시간 음성인식이 아니라도 큰 타격이 없을것이라 판단하기도 하였습니다.

카카오 STT API를 구현하면서도 이슈가 몇가지 있었습니다.

첫째로, 음성을 녹음하고 카카오 STT API에 맞는 파일 포멧으로 변환한 뒤 보내주어야 한다는 것이었습니다.
저희 버튼 프로세스 상 녹음 시작부분, 종료부분을 명확히 캐치 하여 녹음 및 녹음 파일 생성에는 큰 무리가 없었지만 녹음 파일을 카카오 STT API가 요구하는 파일 포맷으로 바꾸는데 시행착오를 겪었습니다.

두번째로, 카카오 STT API는 브라우저에서 API Request를 했을 때 CORS애러가 발생하였습니다. 브라우저에서 CORS를 우회할 방법이 딱히 생각이 나지 않았기 때문에 카카오 STT API를 사용하는 중계 서버 즉, 저희 서버에 EndPoint를 만들기로 하였고 브라우저에서 저희 서버로 음성파일을 전달, 서버에서 음성파일을 카카오 STT API로 요청 및 응답을 받는 중계 API가 완성이 되었습니다.

그렇게 잘 되는 듯 하였으나, 또 문제가 발생하였습니다.

카카오 STT API가 지원하는 음성파일의 시간이 30초밖에 되지 않았던 것입니다.
답변을 조금 길게하였는데 음성인식 결과가 제대로 나오지 않았고 결국 저희는 다른 방법을 또 찾기 시작했습니다.

Web API 중 브라우저에 제공되어있지만 Experimental 기능으로 지원 브라우저가 적기 때문에 사용을 배제했던 Speech Recognition을 테스트해보았고,
음성 인식률이 생각보다 좋았습니다. Web API로 기본 빌트인 되어있기 때문에 사용하기가 다른 API들 보다 훨씬 간편하다는 점과 인식률이 좋다는 점에서 브라우저 호환성을 포기하고 
Speech Recognition으로 최종 결정하였습니다.

Web RTC와 같은 면접페이지에서 구현되어야 하는 기능이기 때문에 Web RTC 로직에 영향을 주지않기 위해 Custom Hooks로 구현을 하였고, Speech Recognition은 Util, Custom Hook등으로 관심사 분리를 하려고 많이 노력하였습니다.

### S3

유저의 pdf 파일 업로드를 위해 storage로 Amazon S3를 선택해 사용 중이었습니다.
AWS elastic beanstalk으로 배포 한 후 로컬 환경 구동에서 발생하지 않았던 pdf 파일 업로드 용량 제한 에러가 발생했고, AWS의 nginx 용량 제한을 늘려주는 conf 파일을 만들어 해결하였으나, 유저의 pdf 파일 자체 용량을 업로드 시 한 번 줄여서 서버로 보내 storage에 업로드 되도록 개선하고 싶습니다.

### PDF 생성

유저 면접 디테일 페이지 레이아웃을 pdf로 다운로드 하는 기능을 구현하기 위해 react-to-pdf 라이브러리를 처음 사용해 보았습니다.
하지만 pdf 생성 시 로컬 이미지 asset이 아닌 외부 이미지 파일들이 생성된 pdf에 제대로 나타나지 않는 문제가 생겼고, 이를 해결하기 위해 puppeteer로 해당 페이지에 접근해 캡쳐본을 pdf 파일로 변환시키는 작업을 시도했습니다. 하지만 페이지의 Auth process를 미리 고려하지 않아 puppeteer로 해당 페이지에 접근하는 것이 어려웠고, node-persist를 도입해 localStorage를 이용한 token 인증 방식을 시도하려고 했지만, over engineering이라고 판단해 프론트의 pdf 다운로드 버튼에 window.print를 적용하여 인쇄, pdf 파일 저장 기능을 추가하였습니다.
라이브러리 사용을 고려한다면 생성된 pdf 파일에서 제대로 보이지 않는 이미지들을 base64 형식으로 일일히 변환해 페이지에 넣어주는 방식으로 리팩토링 할 수 있을 것 같고, over engineering에 대해 생각해 볼 수 있는 좋은 경험이었다고 생각합니다.

### Socket io

실시간으로 multiple 라이브 스트리밍이 이루어지면서 동시에 음성 인식과 같은 이벤트를 처리해야하는 프로젝트의 특성상 소켓의 역할이 아주 중요했습니다. 사용자의 버튼 컨트롤 및 상태 하나하나를 각 소켓으로 보내서 다른 사용자들에게 뿌려준 후, 이를 UI 및 기능 컨트롤에 적용했습니다. 서버에 소켓의 방을 개설하여 유저들의 데이터와 방의 id를 저장하고 전체 이벤트가 끝날 시 데이터들을 삭제하는 방식으로 소켓을 셋팅했습니다. 
서버에서 사용자들에게 emit 해주는 과정에 socket-io의 메소드들을 이용하여 효율적으로 원하는 사용자들 에게만 보낼 수 있었습니다. 
최초에 소켓의 구동 시점이 잘못되어 여러번 다시 연결되는 바람에 Join기능을 이용해서 공통적으로 사용하던 socket의 id가 바뀌는 버그를 겪었습니다. 이를 해결하기 위해 컴포넌트가 렌더링 될때 변동되지 않도록 useMemo를 사용해서 리 렌더링을 막아주었습니다. 추후 외부나 혹은 리덕스로 소켓 로직을 변동해 줄 예정입니다.

### Redux-Saga

프로젝트 목록 불러오기, 인터뷰이의 목록을 불러오기 등 비동기적으로 로직을 작성해야 할 일이 많았습니다. 따라서 효율적으로 비동기 처리를 할 수 있게 해준다는 redux saga를 도입하기로 했습니다. Redux saga는 thunk와 달리 로직을 수행하는 부분이 액션과 사가로 구분이 되고, 액션의 결과가 항상 객체라는 점이 일관적이어서 좋았습니다. 도입 결과, Generator 함수를 통해 외부에선 request만 해줘도 알아서 saga가 비동기 처리를 진행해주어서 따로 모듈을 적용하지 않아도 코드가 깔끔해졌습니다. 또한 여러 요청 시에도 마지막 요청만 들어갈 수 있게 코드를 짤 수 있어서 추가적으로 비동기 요청 시작을 막는 로직을 넣지 않아도 된다는 점이 유용했습니다. 다만 redux 특성 상 여전히 액션을 추가 할 때에 추가적으로 코드를 많이 작성해야 한다는 점이 조금 불편하기는 합니다. 이는 redux tool kit 등을 적용하면 개선되지 않을까 생각합니다.

# Future plan

- Reselect 도입 & react 개선을 통한 최적화
  - Redux-saga를 최초 도입하면서, 상대적으로 redux의 최적화에 많은 시간을 들이지 못했습니다. 현재는 props를 가져오는 과정에 reselect를 적용하지 않아 받아와야 할 props가 변경되지 않았을 때에도 새로 렌더링 과정을 거칩니다. 추후 reselect를 적용하여, 필요하지 않은 props가 변경되었을 때의 리 렌더링을 막고자 합니다.
    또한 useCallback, useMemo등을 적재적소에 적용하여 렌더링을 최적화하고 이에 대한 퍼포먼스를 테스트하고자 합니다.
- Redux Toolkit
  - Redux는 액션을 추가 할 때마다 부가적으로 작성해야 하는 코드의 양이 많습니다. redux-toolkit을 이용하면 중복되는 코드의 양을 줄일 수 있는 것으로 알고 있습니다. 추가적으로 redux-toolkit 공부를 해서 관련 옵션들을 추가하는 것이 목표입니다.
- Access Token, Referesh Token
- Test Code
- Search, List 가져오기 등 GET 관련 API 최적화 (페이지네이션, 인덱싱 등)

