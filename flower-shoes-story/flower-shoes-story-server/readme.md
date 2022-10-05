# 🌷 [Flower Shoes Story](https://www.flower-shoes-story.online/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/90dc8a4b-6b8c-4117-8068-dae5f22cf8ff/deploy-status)](https://app.netlify.com/sites/mystifying-thompson-bf9bf4/deploys)

https://user-images.githubusercontent.com/79728856/141252459-d9a8b600-d5c7-43c9-8059-54d9972147f1.mp4

대한민국 현역 군인들, 그리고 그들을 기다리는 일명 "곰신"들을 위한 웹 서비스입니다.

배포 주소: https://www.flower-shoes-story.online

<br>

## 📖 Table of Contents

- [🔗 Link](#-link)
- [🌸 Motivation](#-motivation)
- [🌺 Feature](#-feature)
- [🌹 Duration](#-Duration)
- [🍃 Deploy](#-Deploy)
- [🌼 Installation](#-installation)
- [🌻 Tech Stack](#-tech-stack)
- [🎉 Technical Log](#-technical-log)

<br>

## 🔗 Link

- [Frontend Repository](https://github.com/flower-shoes-story/flower-shoes-story-client)
- [Backend Repository](https://github.com/flower-shoes-story/flower-shoes-story-server)

<br>

## 🌸 Motivation

Flower Shoes Story는 실시간으로 통신하는 Socket.io, Interative한 서비스를 고민하다 떠오른 아이디어입니다.

특별한 소재를 찾다가 군인, 곰신이라는 테마를 정해보았습니다.

<br>

## 🌺 Feature

- 최초 로그인시 파트너의 메일을 입력하여 커플 요청을 보냅니다.
  ![register](https://user-images.githubusercontent.com/79728856/141176634-2480ec04-65bb-416c-a87c-5c695724a06f.png)

- 상대방이 수락할 시 채팅방이 열리고 커플이 등록됩니다.
  ![queue](https://user-images.githubusercontent.com/79728856/141176741-6b04fa29-caa9-4d29-b313-4041b19bdd69.png)

- 캘린더 페이지에서 면회, 휴가, 기념일 등 이벤트를 등록할 수 있습니다.
  ![calendar](https://user-images.githubusercontent.com/79728856/141176107-e8d36534-6c63-49d9-8e09-72db5026a9fa.png)

- 특정단어를 채팅창에 입력시 (ex. 사랑해, 바보) 캐릭터가 계단을 점프해서 올라가거나 내려갈 수 있습니다.
- 10칸을 올라갔을 시 꽃을 획득합니다.

<br>

## 🌹 Duration

2021.09.27 ~ 2021.10.15 / 3주

1주차 - 아이디어 구체화, UX/UI, DB Schema 설계 <br>
2주차 - UI layout setting, 소셜 로그인 구현, 채팅 구현 <br>
3주차 - 배포, 코드 리펙토링

<br>

## 🍃 Deploy

Front-end

- Netlify를 사용하여 애플리케이션 배포 및 관리

Back-end

- AWS Elastic Beanstalk를 사용하여 애플리케이션 배포 및 관리
- AWS 파이프라인 연결 후 배포 자동화 구현

<br>

## 🌼 Installation

> Local 환경에서 실행을 위해 환경 변수 설정이 필요합니다.

### Client

Root 디렉토리에 .env파일을 생성하고 아래와 같이 환경변수 값을 입력합니다.

```
REACT_APP_API_KEY=<YOUR_FIREBASE_API_KEY>
REACT_APP_AUTH_DOMAIN=<YOUR_FIREBASE_AUTH_DOMAIN>
REACT_APP_PROJECT_ID=<YOUR_FIREBASE_PROJECT_ID>
REACT_APP_APP_ID=<YOUR_FIREBASE_APP_ID>
REACT_APP_BASE_URL=<YOUR_PORT_NUMBER>
REACT_APP_SOCKET_URL=<YOUR_PORT_NUMBER>
```

```
git clone https://github.com/flower-shoes-story/flower-shoes-story-client.git
cd flower-shoes-story-client
npm install
npm start
```

### Server

Root 디렉토리에 .env파일을 생성하고 아래와 같이 환경변수 값을 입력합니다.

```
ORIGIN_URI_DEV=<YOUR_PORT_NUMBER>
DB=<YOUR_MONGODB_URL>
COOKIE_SECRET_KEY=<YOUR_COOKIE_SECRET_KEY>
JWT_SECRET_KEY=<YOUR_JWT_SECRET_KEY>
```

```
git clone https://github.com/flower-shoes-story/flower-shoes-story-server.git
cd flower-shoes-story-server
npm install
npm run dev
```

<br>

## 🌻 Tech Stack

### Frontend

- React
- React query
- Redux Toolkit
- Redux Persist
- Styled Component
- Socket.io

### Backend

- Node.js
- Express
- Mongo DB
- JSON Web Token (JWT)
- Firebase Authentication

<br>

## 🎉 Technical Log

### Socket.io

실시간 통신을 하기 위한 방법으로는 1:1로 통신할 수 있는 private 통신, 1대 다수로 통신할 수 있는 public 방식이 있습니다. 1:1 채팅 구현을 위해 소켓에서 지원하는 private socketID를 이용하여 이벤트 통신을 했습니다. 이로써 유저가 connect 됐을 때 일시적인 socketID가 부여되어 private한 실시간 채팅을 구현할 수 있었습니다. 그러나 대화 상대 중 한명이라도 온라인 상태가 아니면 채팅 저장이 되지 않는 이슈가 발생했습니다. 원인은 유저가 접속할 때 마다 socketID가 변경되기 때문에 유저가 disconnect 됐을 시 일시적으로 부여받았던 socketID가 사라져 메세지를 송출할 수 없었기 때문이였습니다. 따라서 유저의 로그인 상태와 상관없이 일관적으로 유지되는 room을 만들어 해당 room 안에 있는 유저에게 채팅이 송출될 수 있도록 로직을 수정하여 이슈를 해결할 수 있었습니다. <br>
단방향 통신인 HTTP 통신에만 익숙해져있던 터라 server와 client가 계속 연결을 유지하는 양방향 통신이 매우 신선했고, 실시간 통신을 할 때 어떤 식으로 이벤트 관리를 하는지, 어떻게 양방향 통신을 하는지 숙지할 수 있었던 뜻깊은 시간이였습니다.

### Animation Rendering Issue

사용자가 특정단어를 입력했을 경우 기존 state에서 1을 더하거나 빼는 방식으로 캐릭터 이동을 구현했는데, 점프의 방향이 바뀌는 단어를 연속으로 입력했을 경우 의도한 시작 위치에서 애니메이션의 실행되는 문제가 발생했습니다.

점프의 방향이 변경되는 단어 없이 캐릭터가 최종 목적지인 마지막 index에 도달하는 애니메이션은 안정적으로 작동하였으나, 방향이 변경되는 단어가 입력되면 시작점이 의도한 index에서 시작되지 않는 문제가 있었습니다.

첫번째로, 기존에 작성해두었던 state를 변경하는 로직을 디버깅해보았으나, state는 의도한대로 정상 작동했습니다.

두번째로, 애니메이션을 렌더링하는 로직을 디버깅해보았습니다. props로 캐릭터의 위치 index를 전달받아 포물선의 좌표값을 계산합니다. 올라가는 단어를 입력했을 시에는 이미 state는 +1이 된 상태이기 때문에 애니메이션을 시작 위치를 의도적으로 -1을 했던 것이 랜더링 오류의 원인이였습니다. 로직에 문제가 있다는 사실을 깨닫고, 해당 캐릭터를 기준으로 움직이는 범위만 계산하여 로직을 변경했습니다. 결과적으로 포물선 로직을 수정하여 의도한 대로 애니메이션을 렌더링할 수 있었습니다.
