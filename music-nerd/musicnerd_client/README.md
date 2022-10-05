![cover](./readmeAssets/cover.png)

# MusicNerd

## 1. Introduction
**Music Nerd**는 게임에 참여한 player들의 선호 아티스트에 기반, 실시간으로 아티스트의 음원을 30초 간 재생하여 음원의 전주를 듣고 가수 이름과 노래 제목을 맞추는 게임입니다.
- 본 프로젝트의 아이디어는 한 예능 프로그램 코너에서 착안하였습니다.([링크](https://www.youtube.com/watch?v=b93AbJQseNk))

## 2. Preview
**배포 링크**
- client: https://xenodochial-clarke-1b25e1.netlify.app
- server: http://musicnerd-env.eba-key7sapf.ap-northeast-2.elasticbeanstalk.com
- 현재 Amazon Certificate 관련 문제로 HTTPS 설정이 되지 않아 배포 링크로 게임 진행은 불가능합니다.

![MusicNerd Preview](./readmeAssets/musicnerd.gif)

## 3. Features
- Local 회원가입 및 로그인
- 선호가수 선택 기능
- 게임방 생성 및 입장
- 실시간 채팅
- 실시간 음원 재생
- player들의 채팅 메시지를 통한 정/오답 판별
- 선호 음원 좋아요 기능
- 유저 정보 및 플레이 기록, 선호 가수 및 선호 음원 기록 확인

## 4. Requirements
- 최신 Chrome Browser의 사용을 권장합니다.

## 5. Prerequisites
### Client
`.env` 파일을 생성하고 아래 코드를 입력한 후, root 디렉토리에 저장해야 합니다.

```
REACT_APP_SERVER_URI=http://localhost:8080
```

### Server
`.env` 파일을 생성하고 아래 `<>`에 환경변수를 입력한 후 root 디렉토리에 저장해야 합니다.

```
PORT=8080
MONGODB_URI=<mongoDB-connection-string>
JWT_SECRET_KEY=<jwt-secret-key>
AMAZON_S3_URI=https://musicnerd.s3.ap-northeast-2.amazonaws.com
```

## 6. Installation
### Client
```
git clone https://gitlab.com/soldonii/musicnerd_client.git
cd musicnerd_client

## 위에서 생성한 .env 파일을 root 디렉토리에 추가합니다.
npm install
npm start
```

### Server
```
git clone https://gitlab.com/soldonii/musicnerd_server.git
cd musicnerd_server

## 위에서 생성한 .env 파일을 root 디렉토리에 추가합니다.
npm install
npm start
```

## 7. Skills
### 1) Client
- ES2015+
- React
- React Router
- Redux
- Redux Persist
- Socket.io
- Styled Component

### 2) Server
- ES2015+
- Node.js
- Express
- MongoDB, Atlas
- Mongoose
- JSON Web Token
- Socket.io

### 3) Tests
#### (1) Client
- Jest, Enzyme을 이용하여 Component 및 Reducer Unit test를 작성했습니다.
- Cypress를 이용하여 End To End(E2E) Test를 작성했습니다.

#### (2) Server
- Mocha, Chai

## 8. Project Control
- Version Control: Git, Gitlab
- Task Control: Trello

## 9. Deployment
### Client
- Netlify

### Server
- Amazon Web Service(AWS) Elastic Beanstalk

## 10. Challenges
본격적으로 다뤄보지 못했던 socket을 프로젝트의 핵심 기술 중 하나로 활용하면서 수 많은 시행착오를 겪게 되었습니다. 2주 간의 프로젝트 기간 동안 가장 큰 병목이었던 socket과 관련된 다양한 시행착오 및 극복 방안을 정리하였습니다.

### 1) 특정 Route에서 서버와 socket 연결하기
첫번째 시행착오는 정확한 타이밍, 즉 client에서 원하는 route로 이동했을 때 클라이언트와 서버의 socket을 연결하는 로직에서 발생했습니다. 프로젝트 초반에는 user 로그인 및 선호가수 선택 기능에서는 실시간 통신이 필요하지 않기 때문에, user가 게임방을 생성하여 해당 방으로 이동할 때 서버 쪽의 socket을 활성화시킨 후 연결해야 한다고 생각했습니다.

그래서 서버에서의 socket 활성화 및 연결 로직을 게임방 생성과 관련된 express router에서 middleware처럼 다뤄야한다고 생각했으나, 원하는대로 연결이 이뤄지지 않았습니다. 많은 시행착오 끝에 서버에서는 application이 구동될 때 먼저 socket을 활성화시킨 후, user가 게임방에 입장하고 client 쪽 socket에서 connection event를 보내주면, 서버에서는 해당 이벤트를 받아서 user를 이미 활성화된 socket의 room에 join시켜주어야 한다는 것을 깨달았습니다.

### 2) React에서 socket 다루기
socket의 연결 타이밍 뿐 아니라, socket을 통해 client와 server가 이벤트를 주고받아 redux state가 변경되도록 초기 세팅을 하는데에도 많은 시행착오를 겪었습니다. 처음에는 게임방 입장 때 렌더링되는 `<GameContainer>` 컴포넌트에서 `useEffect`를 이용하여 컴포넌트가 mount 되기 전에 socket이 연결시켰습니다. 그러나 새로운 user가 게임방에 입장할 때마다 동일한 socket을 공유하지 못하고, 매번 새로운 socket 인스턴스가 생성되어 여러 user가 실시간으로 연결되지 못한다는 문제를 확인했습니다.
이를 해결하기 위해, 모든 user가 공통으로 도달할 수 밖에 없는 `<WaitingContainer>` 컴포넌트에서 서버와의 socket 연결을 1회만 활성화시키고, `<GameContainer>` 컴포넌트에서는 해당 게임방의 `gameId`에 기반하여 이미 연결한 socket의 room에 join만 되도록 로직을 수정하여 해결하였습니다.

또한 socket 연결은 `<WaitingContainer>`에서 하지만 이벤트를 주고 받는 행위는 `<GameRoom>` 컴포넌트 내부에서 이뤄져야 하는데, `<WaitingContainer>`에 존재하는 socket 인스턴스를 `<GameRoom>` 컴포넌트에서 활용하도록 세팅하는 것 또한 큰 난관이었습니다. 최초에는 socket 인스턴스를 redux state에 저장하여 해당 state를 `<GameRoom>` 컴포넌트에서 활용하는 방법을 생각했지만, socket과 같은 'non-serializable items'를 redux의 state로 저장하는 것이 best practice는 아니라고 생각했습니다. 차선책으로 현재는 하나의 파일에서 socket을 서버와 연결한 후, 해당 socket instance를 필요한 `<GameRoom>` 컴포넌트에서 불러와서 event를 emit하도록 수정했습니다. 하지만 best practice는 redux의 middleware에서 socket을 다루는 것이라는 것을 추후 진행하면서 알게 됐습니다. 2주라는 시간 제약 상 socket을 redux middleware로 옮기지는 못했으나 모든 과정이 끝난 후 수정하여 best practice에 가깝도록 개선할 예정입니다.

### 3) 게임 내 다양한 user event 처리
멀티플레이가 가능하고, 꽤 많은 user event가 발생하는 게임은 처음인지라, 작은 규모의 게임에도 제가 예상한 것보다 훨씬 많은 user event가 존재한다는 것을 체감했습니다. user의 입/퇴장, ready 여부, 방장 확인, 실시간 채팅, 실시간 음원 전송, 실시간 정/오답 판별, 정답 시 user 점수 update, 음원 종료 시 재생되던 음원 정보 보여주기 등 최초 기획 시에는 생각하지 못했던 많은 이벤트들을 다뤄야 했습니다. 많은 이벤트들을 다루기 위해 최초에는 통합되어 있던 리듀서를 waiting reducer와 game reducer로 나눠 관리가 용이하도록 수정했으며, 최대한 이벤트들을 잘게 쪼개 서버 쪽에서 하나의 이벤트 당 최소한의 작업만 수행하여 최소한의 정보만 클라이언트에 보내도록 노력하였습니다. 하나의 이벤트당 관리할 redux state가 적어지다보니 조금이나마 event에 대한 state 관리가 수월해지는 것을 느꼈습니다.

## 11. Things to do
- client socket 로직 redux middleware로 적용
- React component 재사용성 높이기
- client 최적화
