# Rice Coco #

## Table Contents

- [Rice Coco](#rice-coco)
- [Introduction](#introduction)
- [Features](#features)
- [Tech](#tech)
- [Requirements](#requirements)
- [Installation](#installation)
- [Deploy](#deploy)
- [Project Process](#project-process)
- [Collaboration principle](#collaboration-principle)
- [Challenges(수정 예정)](#challenges수정-예정)
- [Things to do](#things-to-do)

# Introduction
 - Rice coco는 내 주변 익명의 사람들과의 식사 약속 기능을 제공하는, 위치기반 실시간 소셜 네트워크 앱 서비스입니다.
 - Rice coco는 Rice와 동료를 의미하는 co의 합성어 입니다.
 - 해당 프로젝트는 1주간 Idea Brainstorming & Planning, 2주간의 Development 기간을 걸쳐 총 3명의 인원으로 진행되었습니다.(1명은 취업으로 인해 2주차에 중도 하차 하였습니다.)

# Features
- Facebook 소셜 로그인 및 회원가입 기능을 제공합니다.
- 사용자는 가입시 5개의 포인트가 부여되며 상황에 따라 증가 혹은 감소하게 됩니다.(하단에 추가 설명 있음)
- 만남을 희망하고자하는 상대방의 직업군, 나이, 성별을 설정을 통해 필터링을 할 수 있습니다.(사용자도 마찬가지로 상대방의 조건에 따라 필터링 됩니다.)
- 가입 및 설정이 완료되면, 구글 지도에 만남을 희망하고자하는 사람들이 신청해놓은 음식점들의 위치가 밥 모양으로 표시됩니다.
- 지도 우측 하단에 새로고침을 버튼을 누르면, 해당 시점을 기준으로 신청되어있는 음식점들이 업데이트 됩니다.
- 해당 음식점(밥 모양)을 클릭하면 음식점에 대한 간략한 설명과 기다리고 있는 상대방의 닉네임을 확인 할 수 있고 , 참여를 하여 매칭을 성사할 수 있습니다.(포인트가 1개 감소되고, 주변 3km 이내에 있는 음식점만 매칭이 가능합니다.)
- 탭 중앙에 Search 버튼을 클릭하면, 내 주변 3km 이내에 음식점을 검색하여 해당 음식점에서의 만남을 신청 할 수 있습니다. 만남을 신청할 경우, 포인트가 1개 감소합니다.
- (대기자가 있을 경우) 검색한 음식점에 대기자가 있을 경우, 즉시 매칭이 성사됩니다.
- (대기자가 없을 경우) 만남 신청 후 1시간 동안 타임아웃이 실행되고 익명의 상대방으로부터 수락을 받으면, 즉시 매칭이 성사됩니다. 시간 내에 수락을 받지 못한 경우, 종료됩니다.
- 매칭이 성사되면, 실시간으로 서로의 위치가 맵에 표시되고 30분의 타임아웃이 설정됩니다.
- 우측 하단에 대화 버튼을 클릭하면 상대방과 실시간으로 대화할 수 있는 채팅방이 열립니다.
- 시간 안에 음식점 50m 반경 이내에 도착하면 도착 버튼이 생성되고, 해당 버튼을 누르면 포인트가 1개 증가하게 됩니다.
- 양자가 도착 버튼을 누른 상황에서 타임아웃이 종료되면, 상대방을 친구로 추가할 것인지에 대한 질문창이 뜨고 추가하면 상대방을 친구로 등록할 수 있습니다.(그렇지 않은 경우, 다시 메인 지도화면으로 넘어갑니다.)
- 내 정보 창에서 나의 닉네임과 직업을 다시 설정할 수 있고, 선호하는 상대방의 조건을 재설정 할 수 있습니다. 메인 지도에는 해당 재설정한 조건을 기준으로 필터링됩니다.
- 포인트가 0개가 되면 더 이상 만남을 생성하거나 만남에 참여할 수 없게 됩니다. 마이페이지 결제 정보창을 통해 포인트를 구매할 수 있습니다.

# Tech

## Frontend
- ES2015+
- React Native for component-based-architecture
- Redux for state management
- Styled Component for component reusability
- Socket.io for real-time communication
- Jest for unit-test
- Enzyme for component-test

## Backend
- Node.js
- Express for using Node.js simple and flexible
- MongoDB / MongoDB Atlas for data persistence
- Moongoose for implementing MVC pattern
- JSON Web Token Authentication
- Socket.io
- Chai / Sinon for unit-test

# Requirements
 - Android에서만 사용이 가능합니다.

# Installation

Local 환경에서 실행을 위해 환경 변수 설정이 필요합니다.

## Client

Root 디렉토리에 environment.js파일에 아래와 같이 환경변수 값을 입력합니다.
- [페이스북 개발자 계정](https://developers.facebook.com/?no_redirect=1)
- [구글 개발자 계정](https://developers.google.com/)

```javascript
// in environment.js in Root directory
{
  REACT_NATIVE_ANDROID_SERVER_URL=<YOUR_SERVER_URL>
  REACT_NATIVE_GOOGLE_PLACES_API_KEY=<YOUR_GOOGLE_PLACES_API_KEY>
  REACT_NATIVE_FACEBOOK_APP_ID=<YOUR_FACEBOOK_API_ID>
}
```

```javascript
git clone https://github.com/daechidongVibe/Rice-coco-frontend.git
cd Rice-coco-frontend
npm install
npm start
```

## Server
Root 디렉토리에 .env파일에 아래와 같이 환경변수 값을 입력합니다.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
-  [IAMPORT](https://www.iamport.kr/getstarted)
```javascript
// in .env in your directory
PORT=<YOUR_PORT_NUMBER>
DB_URL=<YOUR_MONGODB_URL>
JWT_SECRET=<YOUR_JWT_SECRET>
IAMPORT_KEY=<YOUR_IAMPORT_KEY>
IAMPORT_SECRET=<YOUR_IAMPORT_SECRET>
```

```javascript
git clone https://github.com/daechidongVibe/Rice-coco-backend.git
cd Rice-coco-backend
npm install
npm run dev
```
# Deploy

## Client
  - [Download apk](https://drive.google.com/file/d/1nb26VUUPT02Y3cHzAUnVt52UB0BVLjAP/view?usp=sharing)

## Server
 - AWS Elastic Beanstalk (EB)
 - AWS Code Pipeline for Deployment automation

# Project Process
  ## 1주차
  - 아이디어 결정 + 기술 스택 검토
  - [Figma를 통한 Mockup 작업](https://www.figma.com/file/BkVHNeKMDqsV0hDMkFkC1E/%EB%9D%BC%EC%9D%B4%EC%8A%A4-%EC%BD%94%EC%BD%94-Mock-up?node-id=0%3A1)
  - [LucidChart를 활용한 Database Schema Modeling](https://lucid.app/lucidchart/b58b26aa-50c8-4918-b09f-9ce44058617e/edit?page=0_0#?folder_id=home&browser=icon)
  - [Notion Todo를 활용한 Task Management](https://www.notion.so/5ace08f805444be9bd66d21cfdb07350?v=f22ec679cde14f45b539c8b8dfd04856)
  - Git을 이용한 Version관리 원칙 설정 (Client/Server 분리, Branch 분리)
  ## 2주차
  - React native Navigation 구조 설계
  - Social Login & JWT 토큰 로그인 구현
  - 유저 정보 등록 및 선호하는 파트너 조건 필터링 DB 쿼리 작업
  - Google API를 통한 실시간 위치 확인 및 검색 기능
  - 실시간 채팅 및 위치 정보 공유를 위한 Socket 연결
  - WebView 및 Iamport를 통한 포인트 결제 기능 구현
  ## 3주차
  - Refactoring & Debugging
  - 프론트 App Build 및 배포
  - AWS Elastic Beanstalk를 활용한 백엔드 서버 배포
  - Front & Backend Test code 작성

# Collaboration principle
 ## Principle
  1. 깃 커밋 메시지 통일하기 [(커밋 메시지 Reference)](https://blog.ull.im/engineering/2019/03/10/logs-on-git.html)
  2. 하나의 커밋 메시지에는 하나의 변경 사항만 추가하여 커밋하기
  3. 코드 리팩토링 전까지 타인의 변수명 임의 변경 금지하기
  4. 팀내에서 정한 코드 컨벤션 지키기(화살표 함수, single quote, return문 전 blank 등)
  5. 각자 하루에 맡은 테스크 다음날 오전에 팀원이 확인할 수 있도록 Pull request 해놓기
  6. 팀원 Pull Request시 간단한 코드 리뷰해주기
  7. Pull Request전 불필요한 콘솔 및 주석 제거하기

 ## Evaluation after project by ⭕️, 🔺, ❌
 1. (⭕️) 깃 커밋 메세지는 하나의 구체적인 refernce(위 링크)를 정하고 시작하여, 대체적으로 통일된 커밋 메시지를 작성할 수 있었습니다. 다만, 메세지가 대부분 Add, Fix 등 특정 단어에만 많이 치중되어 사용되는 현상이 있어 더 다채로운 커밋 메세지를 작성하지 못한 부분이 아쉬움으로 남습니다. 차후에는 해당 커밋 상황에 더 알맞고 구체적인 커밋 메세지를 적고자합니다.
 2. (🔺) 커밋 메세지를 통해 어떤 기능이 바뀌었는지 명확히 알기위해 해당 원칙을 정하였고, 초반에는 잘 지켜졌습니다. 하지만 프로젝트 중반~후반 지나고서부터 하나의 커밋 메시지에 여러가지 변경사항들이 반영되어있는 경우가 많았습니다. 여러가지 변경사항들이 하나의 커밋메세지로 압축되다 보니 무엇이 바뀌었는지 확인하기 어려웠습니다. 비록 시간이 부족하더라도 팀원에게 기능별 혹은 단위별 구체적인 커밋 메세지를 남기는 것 협업에서 중요한 부분을 차지한다는 것을 베웠습니다.
 3. (⭕️) 변수를 작명할 때마다 팀원에게 일일이 물어보는 것이 비효울적일 것이라고 판단하여, 중간 리팩토링할 때를 제외하고는 팀원의 변수명을 임의로 바꾸지 않는 다는 것을 원칙으로 정했습니다. 해당 원칙 자체는 잘 지켜졌으나, 차후 리팩토링 과정에서 큰 포션을 차지하는 변수명이 변경되는 경우, 버그 문제가 종종 발생하곤 하여 원칙 자체에 약간의 오류가 있다는 것을 깨달았습니다. 앱에 중요한 포션을 차치할 것이라고 판단되는 변수명은 비록 차후에 변경될지라도 즉각적인 팀원과 상의를 통해 정하는 것이 나을 수도 있겠다고 회고하였습니다.
 4. (⭕️) 코드의 통일성을 위해 코드 컨벤션을 정하였습니다. 예상했던 대로 초반에는 각자의 코드 스타일대로 작성을 하였지만, 지속적으로 팀에서 정한 컨벤션을 피드백해주어 코드 컨벤션은 프로젝트 끝까지 대체로 잘 지켜졌다고 평가하였습니다.
 5. (❌) 해당 원칙은 하루에 각자 맡은 Task가 최대한 밀리지 않기 위해, 그리고 6번 원칙과 연결되게 하기 위해 정하였습니다. 프로젝트 초반에는 잘 지켜졌으나, 각자의 코딩 역량과 맡은 Task의 난이도에서 오는 차이로 인해 프로젝트 초중반부터 지켜지지 못하였습니다. 원칙 자체의 취지는 프로젝트 종료 이후인 지금까지도 팀원 모두가 공감하지만, Task 분배에 원인이 있었다고 분석하였습니다. 차후에 같은 원칙을 세운다면 Task 분배에서부터 신중히 고려하여 프로젝트를 계획해야된다는 것을 배웠습니다.
 6. (❌) 기능 구현에만 초점을 맞추는 것이 아니라, 코드 리뷰를 통해 서로의 코드 스타일과 구현한 로직을  이해하고 피드백하면서 넘어가자라는 취지로 많은 원칙이었지만, 5번 원칙과의 연장선으로 해당 부분은 프로젝트 초중반 이후로 지켜지지 못하였습니다. 하지만 프로젝트 초반 잠깐 pull request에 대해 코드 리뷰해주는 경험 자체는 배우는 점이 많았다는 것이 팀원의 평가입니다.
 7. (🔺) 초반에는 잘 지켜지지 않았지만, 중반 이후부터는 최대한 console과 주석을 지우고자 팀원들 모두가 노력했습니다. 종종 콘솔과 주석이 merge되는 실수가 있긴하였지만 점점 해당 원칙에 대해서는 팀원 모두가 개선되는 모습을 보여 세모로 평가하였습니다. 혼자서 개발을 할 때에는 크게 신경쓰지 않았던 부분이지만, 나의 지우지 않은 콘솔이 가끔 팀원의 디버깅을 방해할 수도 있고, 앱 전체에 영향을 줄 수도 있기 때문에 반드시 불필요한 부분은 지우고 merge를 해야한다는 점을 깨달았습니다.
# Challenges(수정 예정)
 - react native의 navigation 형태
   - MatchWaitingScreen에서 상대방을 기다릴 때 가동되는 Timer가, 만남 성사 이후 MatchSucceessScreen으로 화면이 전환되어 가동되는 Timer의 종료시간(00:00)과 동시에 종료 이벤트가 발생되는 현상이 있었습니다. 디버깅을 지속적으로 한 결과, react native는 web와 달리 해당 페이지에서 다른 페이지로 넘어갈 때, Screen이 Stack으로 쌓이는 구조인 것을 간과했다는 점을 깨달았습니다. 이를 해결하기 위해 대기 화면에서 미팅 성사 화면으로 넘어갈 때 스택을 쌓고 navigate 하는 형태가 아닌 그 전에 있었던 모든 화면 Stack을 리셋하고 화면 전환하는 형태로 navigate 메소드를 변경하였습니다. 추가적으로 다시 뒤로가기가 활성화되면 안되는 상황(대기화면에서 취소버튼이 아닌 휴대폰 뒤로가기 버튼을 눌러 홈 화면으로 돌아가는 상황)에도 이를 적용하여 Navigation 오류 edge case들을 해결하였습니다.
 - 리액트와 소켓
  MatchWaitingScreen에서 MatchSucceessScreen으로 넘어가는 부분에서 대기 유저의 화면이 두번 Mount되는 현상으로 인해, useEffect를 통해 어떠한 소켓 이벤트도 연결되지 않는 오류가 발생하였습니다.
  사실 두번 Mount가 되더라도, unmount후 다시 rendering을 통해 mount되면 다시 소켓 이벤트가 연결될 것 같았지만 그러하지 않았습니다. 처음에는 navigation 메소드에 문제가 있을 것으로 생각하고 조사하였지만 해결책을 찾지 못하였습니다. 많은 시간을 디버깅한 결과, 문제는 2가지가 있었습니다.
  1. 미팅 대기화면(MatchWaitingScreen)과 미팅 성사화면(MatchSucceessScreen)이 같은 소켓 이벤트를(Join meeting)을 공유하고 있었던 점
  2. 위의 오류와 더불어 미팅 대기화면(MatchWaitingScreen)이 unmount 될시 소켓 이벤트(Join meeting)의 remove 시점과 미팅 성사화면(MatchSucceessScreen)으로 전환되어 다시 같은 소켓이벤트가(Join meeting) 연결시점이 콘솔을 찍어본 결과 예상대로 순서대로 이루어지지 않아 두번 랜더링 되면서 전의 remove 함수가 후의 마운트 된 이후 실행되어 아무런 소켓 이벤트도 연결 되지않았던  점이었습니다.
  이를 해결하기 위해 MatchWaitingScreen에서 소켓 이벤트를 Join meeting에서 Create meeting으로 변경하여 세분화하여 상대방의 Join meeting 소켓 이벤트가 더이상 MatchWaitingScreen에 영향을 주지 않도록 변경하였습니다. 결국, 이를 통해 두번 랜더링 되는 현상을 막을 수 있었고, 정상적으로 소켓 연결이 되는 것을 확인할 수 있었습니다.

 - 앱을 종료하고 재접속하였을 때, 해당 방을 찾지 못하는 문제가 있었습니다. (roomName을 결국 몽고비디에서 주는 meetingId로 변경하고 서버에서 socket 파일 내 따로 생성된 room에 대한 정보를 객체로 만들어 재접속하였을 경우 해당 룸에 바로 입장할 수 있게 끔 구현하였다.)
 - 처음에는 간단하게 미팅이 성사되면 간단한 소켓 이벤트 몇가지만 필요할 것이라고 생각하였지만 생각보다 많은 이벤트(방 생성, user 연결, 재연결, 실시간 채팅, 실시간 위치 공유, 내가 미팅을 도중에 취소했을 경우, 상대방에 의해 미팅이 취소되었을 경우, 해당 음식점 장소에 도착했을 경우 등)가 필요했고 구체적으로 세분화되어야한다는 것을 느꼈습니다. 이에 따라 한 container가 가지고 있는 이벤트가 많아지며, 길어짐에 따라 대체 어떤 상황에서 어떤 이벤트가 emit되는지 가독성도 떨어지고 디버깅도 힘들어졌습니다. 이를 해결하기 위해 소켓에 대한 로직을 하나의 파일로 분리하여 관리하였고, 조금이나마 event에 대한 관리가 용이해지는 것을 느꼈습니다.
 - App build 과정
  - 앱을 완성시키고 bulid하여 apk를 만드는 과정 자체는 쉬웠으나, apk파일을 실행하자 splash 화면만 나오고 바로 앱이 종료되는 현상이 발생하였습니다. 어떠한 에러 메세지도 받지 못하고 디버깅하지 못하는 상황에서 stackoverflow나 여러 블로그에서 제시하는 방법을 적용보았지만 해결되지 않았습니다. 결국  공식문서를 통해 build할 때 environment.js파일에서 설정해놓은 releaseChannel를 설정해주어야한다는 점을 알게 되었고(ex. expo build:android --release-channel staging, expo build:android --release-channel prod) 이 부분을 수정하여 앱 Build에 성공할 수 있었습니다.

# Things to do
  - 만남 성사 도중 해당 음식점의 메뉴 추천 기능, 만남 성사 이후 친구와의 재만남 기능 등 더 다채로운 기능을 추가하고자 합니다.
  - 사용자가 어플레케이션 종료&실행을 통해 소켓에 재연결되었을 때, 지속적으로 증가하는 server instance 문제에 대한 대응 로직을 구현해보고 싶습니다,
  - 코드 전체 Refactoring
    - 현재 코드에서 재사용 가능성이 많은 component가 있음에도 불구하고, 미쳐 재사용하지 못한 부분을 다시 리팩토링하고자 합니다.
    - 특정 화면으로의 진입 후 현재 유저의 상태에 따라 navigate되는 분기처리 로직으로 인해 분리하지 못했던 비동기 api 로직들을 컴포넌트 혹은 screen에서 따로 분리하고자 합니다.
    - 전반적인 UI&UX 개선을 통해 더 완성도 있는 어플리케이션으로 개선하고 싶습니다.
    (login 및 signup까지 탭 네비게이션 제거, 한번 만남이 성사되었던 유저는 다른 UI로 지도에 표시되는 기능, 음식점을 검색하였을 때 해당 음식점의 위치가 바로 표시되는 기능 등)
