![sool-tok](/readmeAssets/logo.jpg)

## Table of Contents

- [Introduction](#Introduction)
- [Features](#Features)
- [Usage](#Usage)
- [Stack](#Stack)
- [Deploy](#Deploy)
- [Project Process](#Project-Process)
- [Team Log](#Team-Log)

## Introduction

술톡은 친구들과 함께 화상통화를 하며 게임을 즐길 수 있는 멀티 스트리밍 웹 애플리케이션 입니다.

#### 시연 영상

[![구동 영상](/readmeAssets/sool-tok-gif.gif)](https://youtu.be/FXCxWlxejZ0)

[유튜브 링크](https://youtu.be/FXCxWlxejZ0)

#### 배포 사이트

[배포 링크](https://www.sool-tok.live)

#### Repository

- [Frontend](https://github.com/sool-tok/sool-tok-frontend)
- [Backend](https://github.com/sool-tok/sool-tok-backend)

#### 프로젝트 기간

2020년 11월 9일 ~ 11월 27일

- 기획, 구조 설계 (1주)
- 개발 진행 (2주)

#### 프로젝트 멤버

김도희, 나소인, 신현창

#### 개발 목적

비즈니스 목적으로 주로 활용되고 있는 화상 통화 기능을 재밌게 사용할 수 있는 방법이 없을까?라는 아이디어에서 시작했습니다. 직접 만나지 않고도, 집에서 편하게 한잔하면서 친구와 화상 통화로 이야기하며 간단한 게임으로 흥을 돋우는 서비스 입니다.

## Features

- JSON Web Token 을 이용한 사용자 인증
- WebRTC & Peer, Socket을 이용한 다자간 실시간 화상 및 음성 통화 기능
- Speech Recognition API와 Socket을 이용한 음성 인식 미니게임
- MongoDB Atlas를 이용한 사용자 정보 및 친구 목록 관리
- 실시간 텍스트 Chat 기능
- Canvas를 활용한 동적인 애니메이션 효과

## Usage

#### Requirements

- 최신 버전의 크롬 브라우저 사용을 권장합니다.
- 마이크 / 카메라 접근 권한이 필요합니다.

#### Installation

Local 환경에서 실행하기 위한 사전 준비가 필요합니다.

- [Firebase API key](https://firebase.google.com/?hl=ko)
- [MongoDB](https://www.mongodb.com/)
- [Open SSL](https://www.ibm.com/support/knowledgecenter/SSMNED_5.0.0/com.ibm.apic.cmc.doc/task_apionprem_gernerate_self_signed_openSSL.html)

#### Frontend

Root 디렉토리에 `.env` 파일을 생성하고, 사전에 준비한 Firebase API Key를 입력합니다.

```

REACT_APP_FIREBASE_API_KEY=<YOUR Firebase API Key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<Your Firebase Auth Domain>
REACT_APP_FIREBASE_PROJECT_ID=<Your Firebase Project ID>
REACT_APP_FIREBASE_APP_ID=<Your Firebase APP ID>

```

```

git clone https://github.com/sool-tok/sool-tok-frontend
cd sool-tok
npm install
npm start

```

#### Backend

Root 디렉토리에 `.env` 파일을 생성하고, 사전에 준비한 MongoDB Url과 JWT의 Secret Key를 입력합니다.

```

MONGODB_URL=<Your MongoDB URL>
TOKEN_SECRET_KEY=<Your JWT Signature Secret KEY>

```

```

git clone https://github.com/sool-tok/sool-tok-backend
cd sool-tok
npm install
npm start

```


## Stack

#### Frontend

- JavaScript ES2015+
- React
- Redux
- Redux-saga
- WebRTC
- Socket.io
- Speech Recognition API
- Styled-components
- Jest for unit-test
- Enzyme for component-test
- ESLint

#### Backend

- JavaScript ES2015+
- Node.js
- Express
- MongoDB & Mongoose
- Json Web Token Authentication
- Socket.io
- Chai / Mocha / Supertest for unit-test
- ESLint

## Deploy

#### Frontend

- Netlify를 사용하여 애플리케이션 배포 및 관리

#### Backend

- AWS Elastic Beanstalk를 사용하여 애플리케이션 배포 및 관리
- Amazon ACM (AWS Certificate Manager)을 사용하여 SSL 관리
- https-client와 http-server 간의 연결을 위해 load-balancer 사용
- 파이프라인 연결 후 배포 자동화 구현

## Project Process

- 기술 스택 검토
- figma를 이용한 목업 설계
- 데이터베이스 스키마 설계
- Notion을 이용한 태스크 매니지먼트
- Git Repo를 구분하여 Client와 Server를 독립적으로 관리
- Git flow를 이용한 기능별 브랜치 관리

## Team Log

#### 팀원들 간 태스크 분배

새로운 기술들을 고루고루 사용할 수 있게끔 태스크를 분배하는 일에서 어려움을 겪었습니다. peer 연결과 게임 알고리즘 모두 변수가 쉽게 발생할 수 있었기 때문에 여러 명이 함께 구현하기에 불필요한 시간이 소요될 수 있다고 판단되어 한 명 당 한 기능을 맡아서 기능 구현을 하게 되었습니다. 기획 의도대로 지켜지지 못해서 아쉬웠지만, 결과적으론 예상 시간보다 빠르게 프로젝트가 완성되었고, 팀원이 작성한 코드 이해, 기존 코드 내 재활용 가능한 컴포넌트 생성, 중복 코드 제거 및 테스트 코드 작성에 시간을 좀 더 보낼 수 있었습니다.

#### WebRTC 다중 피어 연결
peer-to-peer로만 작동하는 WebRTC를 다중으로 연결하는 부분이 까다로웠습니다. 멤버 각자의 비디오 스트림을 socket io를 통해 signaling 하고, 멤버 구성의 변화가 생길 경우를 대응하기 위해서 멤버의 socket 아이디와 peer를 매칭해두었습니다. 각자의 스트림을 일대다 방식으로 모두에게 signaling 하는 것이 아니라, 한 멤버마다 다른 멤버들의 peer를 일대일로 모두 매핑하여야 했기 때문에 특정 멤버의 입장과 퇴장 시 로직을 꼼꼼하게 구현해야 했습니다.

#### Socket 연결
리액트 내에서 socket을 어느 시점에 연결해야 하는지 그리고 socket을 어디에서 관리해야 하는지에 대한 이슈가 있었습니다. (redux에서 관리를 해야 할지, 파일로 분리를 해야 할지 등) 결과적으로 redux가 socket 상태를 관리해야 할 이유를 분명히 하기 어려웠고 리액트 렌더링 과정에서 매번 socket id가 변경될 수 있는 문제를 해결하기 위해 파일 분리와 최초 로드를 통해 socket을 연결함으로써 이슈를 정리하였습니다. 더불어 컴포넌트가 직접적으로 socket과 연결되는 부분에서 코드량이 늘어남에서 야기되는 가독성 저하, 유지 보수의 불편함도 파일 분리로 동시에 해결할 수 있었습니다. 다만, redux 미들웨어를 통해 socket 이벤트 관리가 가능하다는 점을 뒤늦게 알게 되었고, 추후 이 방법을 적용해 볼 예정입니다.

#### 리액트 상태 관리와 게임 컴포넌트
게임 컴포넌트에서는 플레이어의 턴인가 아닌가에 따라 로직을 분기시킬 필요가 있었습니다. socket 또한 얽혀있었기 때문에 내부적으로 변화되는 값과 리액트 렌더 사이클을 적절히 컨트롤해야 했습니다. 또한 `setTimeout` 등의 비동기 함수가 변화되는 리액트 상태를 감지하지 못하여 게임을 적절히 진행하기 어려운 문제도 있었습니다. 첫째로 비동기 함수가 올바른 값을 서버에게 전달하기 위해 `useRef`를 활용하여 변화되는 값을 저장하고, 두 번째 디스플레이되어야 하는 정보는 렌더에 영향을 주는 hook을 활용하여 레이어를 나누어 위의 문제들을 해결하였습니다. 아쉬운 점은 게임 로직이 하나의 컴포넌트에서 실행 분기 처리가 되어있다 보니 상태 변화 추적이 어려웠고, 컴포넌트를 설계할 때 상태에 따라 컴포넌트를 더욱 세분화하여 라이프 사이클을 처리하였으면 더욱 효율적으로 상태 관리가 되지 않았을까라는 생각이 들었습니다.

#### Speech Recognition
음성 인식 API 자체는 우수한 성능을 보이지만, 불규칙한 에러 발생이 문제가 되었습니다. 이에 따라 에러가 일어났을 때 게임을 초기화하는 방식으로 문제를 해결하였습니다. 느낀 점은 기술 스택을 결정할 때 해당 기술의 에러, 버그 등에 대한 기술 안정성을 반드시 검토하고 적용할 필요가 있다는 생각이 들었습니다.

#### 비동기 처리와 Redux-Saga
친구 목록 불러오기, 친구 추가 등과 같은 axios 데이터 요청과 그 결과에 따른 상태변화를 유연하게 관리하기 위해 redux-saga를 도입하게 되었습니다. 전반적인 redux 미들웨어의 작동 메커니즘을 좀 더 깊이 이해해 볼 수도 있고, generator 함수와 같이 자주 사용해보지 못한 JS 문법을 사용해 볼 수 있는 기회가 될 수 있을 것 같다는 생각에 기존에 사용해본 thunk가 아닌 saga를 선택하게 되었습니다. generator 함수를 이용하여 코드를 작성하기 때문에 마치 동기 코드처럼 읽히는 부분에 대한 장점이 있었고, 상태 변화에 영향을 끼치는 비동기 로직이 하나의 디렉토리에 모여져 있어 유지 보수에 용이했습니다.
