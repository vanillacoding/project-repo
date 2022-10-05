# **🎙 V-LIVE**

<img width="800px" src="readme.asset/play.gif" alt="intro">

**V-LIVE** 는 드라마나 영화의 한 장면을 **실시간 스트리밍**으로 보면서 **직접 연기하면서 배우가 되어 보는 경험**을 사람들과 공유할 수 있는 라이브 게임입니다.

#### 🔗 **[V-LIVE 시연 영상 (소리가 나옵니다 🔊) ](https://awwdwd.s3.ap-northeast-2.amazonaws.com/vlive_%E1%84%89%E1%85%B5%E1%84%8B%E1%85%A7%E1%86%AB+%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%89%E1%85%A1%E1%86%BC.mp4)**

#### 🔗 **[DEMO LINK](https://www.vlive.live/)**

<br>
<br>

# **𝌞 CONTENTS**

- [🎙 V-LIVE](#-V-LIVE)
- [🎤 INTRODUCTION](#-INTRODUCTION)
- [📸 FEATURES](#-FEATURES)
- [🕋 STACK](#-STACK)
- [🕹 USAGE](#-USAGE)
- [🎞 DEPLOY](#-DEPLOY)
- [🎥 TECHNICAL LOG](#-TECHNICAL-LOG)

<br>
<br>

# **🎤 INTRODUCTION**

### **프로젝트 기간**

2021.08.30 ~ 2021.09.18 : 3주

- 아이디어 기획, 목업작성, 애자일 스프린트 플랜 : 1주
- 개발 진행, 배포, 테스트 : 2주

### **프로젝트 멤버**

🐞 [버그잡기 달인 **김은빈**](https://github.com/stitchy11)<br>
🤹 [디테일의 달인 **양하윤**](https://github.com/mycolki)<br>
😃 [화이팅의 달인 **조효정**](https://github.com/julian-jeong)

### **프로젝트 동기**

흔히 짤이라고 일컬어지는 **드라마나 영화의 한 장면**이 온라인에서 공유되고, <br>많은 사람들이 이를 따라하며 즐거워하는 것에서 영감을 얻어 **V-LIVE** 를 제작하게 되었습니다.

### **프로젝트 프로세스**

- 아이디어 기획
- 기술 스택 검토
- [**Figma를 이용한 Mockup**](https://www.figma.com/file/JoxQgsA29zX7TaaEXHeIkC/Dubbing-Game?node-id=0%3A1)설계
- 데이터베이스 Schema설계
- **Agile Sprint** 기반의 태스크 매니지먼트
- Git Repo를 Frontend와 Backend 로 **각각 구분**하여 독립적으로 관리

### **Git Work Flow**

- branch: master & feature branches
- 기능별로 feature branch를 생성하고 코드 작성
- master 브랜치로 병합 (rebase 전략)

<br>
<br>

# **📸 FEATURES**

- Firebase 소셜 로그인 및 JSON Web Token을 이용한 사용자 인증
- MongoDB Atlas를 이용한 채널정보 및 사용자 정보 관리
- Socket.io, Simple-Peer를 이용한 화상 채팅 기능
- Socket.io을 이용한 실시간 업데이트
  - 실시간 채팅 기능
  - 채널 개설, 입장/퇴장, 게임 진행 여부 채널 목록에 반영
  - 게임 준비 상태 및 드라마 역할 선택 반영
- 투표하기 및 투표 결과 공유 기능
- 에피소드 영상을 미리 볼 수 있는 프리뷰 재생 기능
- 채널 히스토리 저장

<br>
<br>

|<img style="width: 500px" src="readme.asset/landing.jpg" alt="landing">|<img style="width: 500px" src="readme.asset/history.jpg" alt="history">|
|:---:|:---:|
|랜딩 화면|히스토리|

|<img style="width: 500px" src="readme.asset/channel-list.jpg" alt="channel-list">|<img style="width: 500px" src="readme.asset/create-channel.jpg" alt="create-channel">|
|:---:|:---:|
|채널 목록|채널 생성|

<br>
<br>

# **🕋 STACK**

### **Frontend**

- JavaScript ES2015+
- Next.js
- SWR
- Simple-Peer
- Socket.io & Socket.io Client
- Firebase
- Emotion
- Jest
- React Testing Library
- ESLint

### **Backend**

- JavaScript ES2015+
- Node.js
- Express
- MongoDB & Mongoose
- JSON Web Token Authentication
- Joi
- Chai
- Mocha
- Supertest for unit-test
- ESLint

<br>
<br>

# **🕹 USAGE**

### **Requirements**

- 최신 버전의 Chrome Browser 사용을 권장합니다.
- 마이크 / 카메라 접근 권한 승인이 필요합니다.
- Local에서 실행하기 위해 사전 준비가 필요합니다.
  - [Firebase API Key](https://firebase.google.com/?hl=ko)
  - [MongoDB](https://www.mongodb.com/)

### **Installation**

- Frontend

Root 디렉토리에 `.env.local` 파일을 생성하고, 다음 환경변수를 입력하고 실행합니다.

  ```jsx
  NEXT_PUBLIC_FIREBASE_API_KEY>
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN>
  NEXT_PUBLIC_FIREBASE_PROJECT_ID>
  NEXT_PUBLIC_FIREBASE_STORAGEBUCKET>
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID>
  NEXT_PUBLIC_FIREBASE_APP_ID>
  NEXT_PUBLIC_FIREBASE_DATABASE_URL>
  NEXT_PUBLIC_API_URL=https://api.vlive.live
  ```

  ```jsx
  $ git clone https://github.com/voicelive/VLive_frontend.git
  $ cd VLive_frontend
  $ npm install
  $ npm start
  ```

- Backend

Root 디렉토리에 `.env` 파일을 생성하고, 다음 환경변수를 입력하고 실행합니다.

  ```jsx
  MONGO_DB_URL>
  TOKEN_SECRET_KEY>
  ```

  ```jsx
  $ git clone https://github.com/voicelive/VLive_backend.git
  $ cd VLive_backend
  $ npm install
  $ npm start
  ```

<br>
<br>

# **🎞 DEPLOY**

- AWS Elastic Beanstalk를 사용하여 애플리케이션 배포 및 관리
- Pipeline을 이용한 배포 자동화 구현

- **Frontend** : https://www.vlive.live

- **Backend** : https://api.vlive.live

<br>
<br>

# **🎥 TECHNICAL LOG**

### **팀 프로젝트 협업**

 팀원 모두 협업이 처음이었기 때문에 프로젝트 초반에는 Github을 이용한 Git Work Flow를 따라가는 데에 어려움이 있었습니다. 실시간으로 정보가 업데이트되어야하는 V-LIVE 게임의 특성상, 대부분의 기능들이 소켓 이벤트 기반이었기 때문에 팀원 각자가 작성한 코드 간의 연속성과 의존성이 높았습니다. 결국 프로젝트 초반, 충돌 코드에 대한 Rebase 처리가 완벽히 되지 않아 에러가 발생하는 코드가 Master브랜치로 Merge되는 상황이 발생하였습니다.

이를 해결하기 위해 Merge하기 전 **오프라인 코드 리뷰 시스템**을 도입하였습니다. 각자의 코드를 Master브랜치로 Merge하기 전에 코드가 올바른 방향으로 Rebase가 진행되었는지, 결과 코드에서 에러가 발생하진 않는지 함께 모여 확인 후 Merge를 진행하였습니다.

그 결과 Master 브랜치에는 에러가 발생하지 않는 안전한 코드가 업데이트되었습니다. 그리고 코드리뷰를 진행하면서 다른 팀원들의 코드를 이해하고, 또 각자의 코드를 다른 팀원들에게 설명하는 과정을 통해 협업 시에 필요한 커뮤니케이션 스킬을 향상시킬 수 있었고 어떻게 하면 더 나은 코드로 개선할 수 있을지 함께 고민하는 과정에서 코드의 퀄리티 또한 높일 수 있었습니다.

이를 해결하기 위해 github에서 branch protection rules을 적용해 Master브랜치로 Merge하기 전 **코드 리뷰 시스템**을 도입하였고 그 결과 에러가 발생하지 않는 안정적인 코드가 업데이트 되었습니다.

데일리 스크럼을 도입해 팀원의 업무 상황에 대해 파악하고 논의하면서 안정적으로 프로젝트를 진행할 수 있었습니다.

### **프로젝트 배포 시행착오**

Next.js를 이용해 Socket을 연결하기 위해 http를 이용하여 커스텀 서버를 구축하였습니다. 하지만 Vercel에서는 커스텀 서버의 배포는 지원하지 않는 것을 배포 단계에서 알게 되었고 다음 솔루션으로 시도했습니다.

1. Next.js 의 page 폴더에 API 엔드 포인트를 추가하고<br>해당 엔드포인트로 기존 커스텀 서버의 Socket 로직을 옮기는 방법
2. AWS 를 이용해 배포하는 방법

첫 번째 방법으로 시도하고 재배포했으나, 기대와 달리 새로 작성한 API 요청이 전달되지 않았습니다. 코드를 옮기는 데에 실수가 있거나 로직적인 결함은 없었지만 추측에 기대어 실행했던 방법이었기 때문에 보다 확실한 두 번째 방법으로 진행했고 성공적으로 배포가 되었습니다. 다만
next.js의 build와 배포 자동화를 도와주는 Versel을 이용하지 못한 점에서 아쉬움이 남습니다. 배포 시행착오를 거듭하면서 사전 조사의 중요성에 대해 강한 교훈을 얻게 되었습니다.

### **Socket 이벤트 성능 해결**

게임 진행 특성상 소켓 이벤트가 2개 이상의 컴포넌트에서 다중으로 연결되어 있는 경우가 많아서 잦은 테스트와 충돌을 보완하는 데에 생각보다 많은 시간이 걸렸습니다. 사용자의 채널 입장/퇴장을 관리하는 컴포넌트에서 useSWR 이 반환한 mutate 를 이용해 소켓 이벤트로 받은 유저정보를 DB 에 업데이트하는 과정에서 서버 단으로 불필요한 HTTP 요청이 과도하게 들어가는 등, 결과적으로 실시간성이 보장되지 않고 렌더링이 늦어지는 문제가 생겼습니다. 확인 결과 hook 의 리턴값으로 활용하던 socketClient 내부에서 이벤트리스너가 제거되지 않아 생긴 누수 문제임을 파악하고 클린업함수를 추가하는 방법으로 문제를 해결할 수 있었습니다

### **WebRTC & Socket Event**

사용자가 채널에 입장했을 때 peer 연결 및 비디오 스트리밍을 위해 `Channel` 컴포넌트에서 입장한 유저의 정보를 채널의 타 사용자들에게 전달하는 소켓 이벤트를 발생시켰으나, 하위의 `Video` 컴포넌트에 있던 이벤트리스너가 정상적으로 해당 이벤트를 수신하지 못해 peer 연결과 스트리밍이 잘 이루어지지 않았습니다. 하위 `Video` 컴포넌트의 useEffect 내부의 stream 을 생성하는 비동기함수가 실행된 다음에 이벤트리스너가 생성되도록 작성되어 있었기 때문에,
상위 컴포넌트에서 이벤트를 보내는 함수가 먼저 실행되었고, 해당이벤트를 수신할 리스너의 부재가 원인이었습니다.

실시간으로 빠르게 이루어지는 소켓의 특성을 이해하고 순서가 보장되도록 `Channel` 컴포넌트에서 stream 및 소켓이벤트 관련 로직을 동시에 컨트롤하는 방향으로 문제를 해결할 수 있었습니다.
비동기작업과 소켓 이벤트의 실시간성을 함께 고려하지 못한 부분에서 비롯된 이슈었지만, 결과적으로 상위 컴포넌트에서는 소켓과 peer 를 연결하는 비즈니스로직을 담당하고 하위 컴포넌트에서는 생성된 stream 을 렌더링만 하도록 관심사를 분리할 수 있었습니다.
