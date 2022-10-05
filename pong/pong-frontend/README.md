# 🎮 PONG

**Pong**은 WebRTC, Socket을 기반으로 한 스낵게임입니다.

Player가 matcing이 이루어지면 game화면과 채팅 화면이 실행됩니다. 카메라 접근을 허용하면 화상연결이 가능합니다.
3점을 먼저 흭득학 유저가 승리하게 됩니다.

# Motivation

실시간 멀티게임은 어떻게 구현되는 거지? 라는 궁금증으로 프로젝트를 시작했습니다.
멀티 유저간의 인터랙션을 높이기 위해 webRtc, socket등 통신 기술을 적용하였고,
모두 처음 접하는 기술이기 때문에 완성도 있는 게임을 구현하기 위해 게임은 유명한 고전게임 핑퐁으로 정했습니다.

<br>

# Preview

[Youtube Rresentation](https://youtube.com)

<img src="https://drive.google.com/uc?id=1uv3qNaTz7npP3qhQ-UG48YqptqKSYCru" alt="gif">

<br>

# Table Contents

- 🛠 [Tech Stack](#-Tech-Stack)
- 📆 [Project Timeline](#-Project-Timeline)
- 🍀 [Deploy](#-Deploy)
- 💿 [Install](#-Install)
- 🕺 [Team work && Work division](#-Team-work-&&-Work-division)
- 🔥 [Issues to overcome](#-Issues-to-overcome)
- 🌎 [Improvements](#-Improvements)

<br>

# 📆 Project Timeline

## `1st week - planning`
- 아이디어 구상 + 기술 스택 검토
- [Moqups를 이용한 Mockup 작업](https://www.notion.so/mockup-412127cf77c2416b8d9d3e44139a5e67)
- GitHub Repository Setting(Client / Server 분리)

## `2nd week - devloping`
- Social Login & Firebase auth & JWT TOKEN 로그인
- User data Mongo DB 저장
- Socket.io를 통한 채팅 구현
- Web RTC를 이용한 화상 채팅 구현
- Ping pong game을 위한 로직 작성
- Socket.io, Web RTC, game 동기적 연결

## `3nd week - testing and deploying`
- 프론트, 백엔드 테스트 케이스 작성
- AWS 백엔드 배포
- Netilify 프론트엔드 배포

<br>

# 🛠 Tech Stack

### Frontend

- React
- Redux
- Socket.io
- Web RTC
- Simple Peer
- Firebase AUTH

### Backend

- Node.js
- Express
- Socket.io
- Mongoose
- MongoDB (Atlas)
- JSON Web Tokne Authentication

### Test

- chai
- enzyme
- testing-library-react
- testing-library-jestDom

<br>

# 🍀 Deploy

- **Frontend**
  - Netlify: application 배포

- **Backend**
  - AWS Elastic Beanstalk (EB)
  - AWS Code Pipeline for Deplyment automation

<br>

# 💿 Install

Local환경에서 실행시 아래와 같이 준비가 필요합니다.

### Client

Firebase 계정이 필요하며 Root 디렉토리에 .env파일을 만들고 다음과 같이 설정해 주세요.

- [Firebase](https://firebase.google.com/)

```
REACT_APP_API_KEY=<YOUR_FIREBASE_API_KEY>
REACT_APP_AUTH_DOMAIN=<YOUR_FIREBASE_AUTH_DOMAIN>
REACT_APP_DATABASE_URL=<YOUR_FIREBASE_DATABASE_URL>
REACT_APP_PROJECT_ID=<YOUR_FIREBASE_PROJECT_ID>
REACT_APP_STORAGE_BUCKET=<YOUR_FIREBASE_STORAGE_BUCKET>
REACT_APP_MESSAGEING_SENDER_ID=<YOUR_FIREBASE_MESSAGEING_SENDER_ID>
REACT_APP_APP_ID=<YOUT_FIREBASE_APP_ID>
REACT_APP_SERVER_URL=http://localhost: + <YOUR_PORT_NUMBER>
```

### Server

MongDB 계정이 필요하며 Root 디렉토리에 .env파일을 만들고 다음과 같이 설정해 주세요.

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

```
PORT=<YOUR_PORT_NUMBER>
JWT_SECRET=<YOUR_JWT_SECRET>
DATABASE=<YOUR_MONGODB_DATABASE_URL>
DATABASE_PASSWORD=<YOUR_MONGODB_PASSWORD>
```

<br>

# 🕺 Team work && Work division

### How we worked ?

처음 협업을 진행할 때 git 공동 작업, 업무 분담, 진행해야 하는 방식 모든 것들이 처음이다 보니 우선 task card로 일별로 해야할 목록들을 정해둔 후 일을 시작하였습니다. webRTC, socket, canvas 이 3가지가 가장 저희 프로젝트에 뼈대가 되는 작업이였고 크게 이 세가지를 기준으로 업무를 나눈 후 일을 진행해갔습니다. 각자 업무를 진행하면서도 최종적으로는 이 세가지 기술들이 유기적으로 연결이 되야 하고, 서로 한 작업만 하는게 아니기 때문에 모든 코드의 흐름을 이해해야 딜레이 없이 작업을 진행할수 있다고 판단하여 매일 하루를 마감하기 전 서로의 코드를 리뷰해주고 알려주는 시간을 가졌었습니다. 그리고 특정 기술에서 막힐때 마다 우선순위가 급한 일부터 같이 해결해가고, 해결이 끝나면 각자가 맡은 업무를 계속 진행하는 방식으로 프로젝트 기간동안 협업했었습니다.

<br>

### 김원모 팀원

- 깃에 대한 협업 작업이 어떻게 이루어지는지 전혀 감히 안 잡혔었는데 이번 팀 프로젝트를 하는 동안 충돌도 겪어보고, pull request, merge 작업도 진행해보게 되면서 각 그룹마다 진행하는 방식은 다르지만, 어떤 흐름으로 협업이 진행되는지 이해하게 되었습니다.
- 업무양에 대한 부담감이 줄어든 만큼 webRTC, socket, canvas 등 새로운 기술을 시도를 할 수 있다는 점이 좋았습니다. 물론 혼자서도 새로운 기술을 적용할수도 있지만 한정된 기간안에 꼭 프로젝트를 끝내야 한다는 압박감이 도전적인 시도보다는 안정적인 기술을 선택해서 더 심도있게 파고들어 제 시간안에 끝내야 한다는 생각을 했을것 같습니다.
- 늘 혼자 고수하던 코드 방식이 아닌 타인이 작성한 코드를 함께 맞춰가는 과정에서 내가 생각지도 못한 부분, 더 clean하게 작성할 수 있는 코드를 참고하면서 서로가 보완해줄수 있는 부분을 흡수하면서 보다 나은 코드를 작성할 수 있게 된것 같습니다.
- 내가 작성한 코드, 혹은 선택한 기술에 대해 팀원에게도 설명을 해줘야 하기 때문에 팀원에게 설명을 하는 과정에서 내가 제대로 이해하지 못했던 부분을 보완해서 넘어 갈 수 있었고, 설명을 하면서 저 스스로도 개념이 더 탄탄하게 자리잡는 다는 느낌을 받았습니다.
- 적극적인 제 성향을 조금 더 다듬을 필요가 있다는 생각을 하였습니다. 결국 일은 이번 협업처럼 타인과 섞여가면서 진행하게 될텐데 내가 가진 의견을 부드럽게 잘 전달하고, 타인이 하는 이야기를 잘 경청하고 함께 조율해가야하는데 충분히 팀원에게 이런 점들이 지켜진것 같지 않아 제 스스로 돌아보게되었습니다. 결국 인격이 근간이 되어있어야 한다는 생각이 들었습니다.

### 임윤수 팀원

- 팀 프로젝트를 진행하며 개발에서 의사소통이 정말 중요하다는 경험을 했습니다.
- 각자의 코드스타일, 취향, 작성 순서, 작업 방식이 다르기 때문에 얘기하며 맞춰가는점이 생각보다 힘든 과정 이었습니다. 기존에는 태스크가 주어지면 혼자 결정하고 바로 적용하며 개발했지만, 협업 하면서는 한가지 기능 구현에서도 각자의 구현 방법 중 좋은 솔루션을 결정하기 위해 대화를 해야 했기 때문에 그 과정에서 혼자 작업하는것보다 에너지가 더 소모 되었습니다. 이렇게 계속 소통할때 내가 생각하는 구현 방법을 상대방에게 설명하면서 로직이 더 정리되고 부족한 부분은 피드백 받을 수 있고, 생각지 못한 다른 방법을 찾을 수 있다는 점에서 장점이 더 많았습니다.

<br>

# 🔥 Issues to overcome

### **canvas**

프로젝트의 게임은 canvas의 이해와 실시간 멀티게임의 이해를 위해 기본적인 핑퐁게임으로 선택하였습니다.

캔버스를 이용한 게임 구현도 어려웠지만 구현 한 뒤에 상대방과 위치 싱크가 맞지 않는 문제, 움직임을 부드럽지 않는 등의 문제에 부딪혔습니다. 이는 멀티 게임 개발에 대해 깊이 조사하지 않고, 못하고 단순히 좌표만 넘겨주면 될거라는 생각으로 작업을 시작했기 때문이었습니다.
문제 인지 후에 멀티 게임 개발에서 유저들 간의 통신을 어떻게 처리 하는지, 유저들 과 움직임 싱크를 어떻게 맞추는지에 대해 다시 조사하였습니다. 일반적으로 중앙 서버에서 유저들의 정보를 받아 다시 유저들 에게 뿌려주는 SC방식, 유저 끼리 정보를 주고받는 P2P방식이 있습니다. 저희는 소켓을 이용하기 위해 SC방식을 채용하였습니다.
클라이언트쪽에 있던 데이터와 로직을 서버로 옮겨 자체 관리하고, 서버가 유저로 부터 키 이벤트를 전달받아 그에 따라 변화되는 좌표값을 유저에게 보내주는 방식으로 리팩토링을 진행했습니다. 리팩토링 후 테스트 해봤더니 싱크는 맞지만 움직임이 부드럽지 못한 문제는 여전했습니다.

해당 문제에 대해 상의한 결과 setInterval로 서버에서 유저들의 키 이벤트에 맞게 데이터를 보내주는 로직이 있는데, 이 로직으로 인해 데이터를 많이 보내주는것이 문제같다는 결론을 내리고, 클라이언트 쪽에서 패들 데이터를 보내주고, 공 데이터만 유저에게 뿌려주는 로직만 서버가 같게 하였습니다. 이렇게 하여 통신량을 반으로 줄일 수 있었고 테스트 결과 움직임이 부드럽게 그려져 네트워킹 문제를 해결 할 수 있었습니다.

로컬에서는 요청을 아무리 많이 주고 받아도 잘 처리할 수 있지만, 서버를 다른곳에 두는 배포 환경에서는 통신 속도에 따라 데이터 처리능력이 확연히 다른다는 점과
지금껏 최적화의 필요성, 효율적인 데이터 전송방법에 대해 생각하지 않고 작성했었는데 이번 기회로 기능 구현시에 최적화가 중요하다는것을 몸소 느낄 수 있는 계기가 되었습니다.

<br>

### **webRTC**

P2P절차, 방화벽과 NAT트래버셜, STURN / TURN 서버 등 처음 접하는 여러 개념들을 유기적으로 어떻게 연결하고 작동시켜야 하는지, peer들이 연결되기 위해 주고 받는 정보들의 흐름을 내가 원하는 시점에 어떻게 컨트롤 하는지 파악하는게 어려웠습니다. WebRTC 구현 중 simple-peer라는 라이브러리를 알게 되었고 ICE candidates , negotiation 과정을 설정해주기 때문에 훨씬 더 직관적이고 가독성이 강하다고 판단하여 simple-peer를 통해 P2P 통신을 구현하였습니다.

<br>

### **socket.io**

게임, 채팅, webRTC를 이용하다보니 양방향 통신이 불가피했습니다. 그래서 socket을 사용하게 되었고 server와의 연동을 통해 이벤트를 주고 받을 수 있게 만들었습니다. on과 emit만 이용하면 socket을 자유자재로 이융하는데 문제가 없다고 생각했지만, 상대방과의 게임이 끝나고 매칭이 다시 일어나게 됬을 때 텍스트 메시지가 2번, 3번 중첩되어 발송되서 원인을 찾지 못했었는데 socket으로 구독한 이벤트를 컴포넌트가 언마운트 될 때 이벤트 구독을 취소 해줘야 한다는 사실을 알게 됬었습니다. 기술을 단순히 구현한다고만 해서 내가 이 기능을 제대로 이해하고 사용한다는 말은 아니구나 라고 생각이 들었었습니다. socket의 공식 문서에 나와있던 내용이고 똑같은 내용의 문서도 내가 겪은 경험에 따라 이해도나 보여지는게 확 달라지는구나, 단순히 한 두번 읽고 이해했다고 끝나는게 아니라 중첩되고 반복되서 이해하고 코드로 작성해보는 담글질의 과정이 필요하겠다고 생각했습니다.

<br>

### **making sync in both user**

socket, webRTC, game 이 3가지가 한 컴포넌트 내에 동시에 진행하다 보니 정확히 동기적인 흐름을 잡아주고 가지 않으면 모든 로직들이 뒤섞여 엉망이 되었었습니다. 각자 하는 작업은 다르지만 서로가 서로의 로직에 영향을 미치기 때문에 게임 로직을 작성하면서도 채팅, webRTC를 고려하고 채팅, webRTC를 작성하면서도 게임 로직을 고려하면서 작업을 진행하였고 마지막에 세 작업물을 합쳤을 때 유기적으로 세 로직이 작동하게 수정해주는 부분이 가장 어려웠던 것 같습니다.

<br>

### **useRef**

카운트 다운 로직을 작성하던 중 setInterval을 통해 state의 값을 바꿔줘야하는 로직이 있었습니다. 값은 원하는 대로 줄어들지만 timerId가 컴포넌트가 리렌더링이 진행되면서 새로 생성 되서 clearInterval을 해주지 못하여 계속해서 숫자가 줄어드는 상황이 발생했었습니다. useState를 통해서 값을 저장하고 다시 설정을 해주어도 새로운 클로저가 형성되기 때문에 계속 초기화된 값을 기억하면서 어떻게 최초에 할당한 timerID를 유지시킬수 있을지 고민했었습니다. 리액트 공식 문서를 읽던 중 useRef.current를 통해 리렌더링을 일으키지 않고 할당한 값을 기억하게 할 수 있는 기능이 있다는걸 알게 되었습니다. useRef를 통해 timerID를 할당한 후 원하는 시점에 ref.current에 할당된 timerID로 clearInterval을 실행시켜주니 원하는 대로 작동되었습니다. 이 상황 외에도 리렌더링을 일으키지 않고 원하는 시점의 값을 state처럼 기억해주고 싶을 때 ref를 사용하였고 단순히 태그를 조작할때가 아닌 이런 방식을 위해서 ref가 존재한다는 걸 더 명확하게 이해할 수 있었습니다.

<br>

# 🌎 Improvements

리팩토링을 계속하며 게임 최적화가 어느정도 됐지만, 인터넷 속도에 따라 레이턴시가 발생하는 문제는 해결 되지 않았습니다. 랜선 환경에서는 문제가 없고, 와이파이 환경에서는 문제가  이 문제에 대해 팀회의를 한 결과 데이터를 socket을 통해 주고 받을때, 서버를 한번 거치면서 그 시간사이에 딜레이로 인해 퍼포먼스에 문제가 생기는것이라고 결론 내렸습니다.

만약 소켓이 아닌 webRTC로 게임 데이터를 주고 받았다면 네트워크 환경이 좋지 않더라도 좋은 퍼포먼스가 나왔을것 같다고 생각해봤습니다. 초기 기획을 socket이 아닌 webRTC로 설계하였다면 더 좋은 퍼포먼스의 P2P 게임으로 만들 수 있지 않았을까 하는 아쉬움이 남습니다.

이번 프로젝트로 우리는 데이터 전달할때 방식과 횟수가 적절한지 고민해야 한다는 점과 초기 기획의 중요성에 대해 경험했습니다.
