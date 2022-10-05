# 💰 **CryptoFolio**

![Main]()

## 📌 &nbsp; What is CryptoFolio?

<br>

## 📌 &nbsp; Project Overview

 <!-- <img src="./README_assets/energyBattle_gif.gif" alt="EnergyBattle" width="70%" /> -->

<br>

## 📌 &nbsp; Github Repository

📁 &nbsp; [**Frontend** Repository](https://github.com/voice-game/front)

📁 &nbsp; [**Backend** Repository](https://github.com/voice-game/back)

<br>

---

<br>

## Project Description

🤔 &nbsp; [Motivation](#-Motivation)

📆 &nbsp; [Schedule](#-Schedule)

🛠 &nbsp; [Tech Stack](#-TechStack)

🔎 &nbsp; [Feature](#-Feature)

🧗‍♀️ &nbsp; [Challenge](#-Challenge)

✍️ &nbsp; [History](#-Hisotry)

🙇🏻‍♂️ &nbsp; [Conclusion](#-Conclusion)

<br>

---

<br>

## Motivation

<br>

## Schedule

### **`2021.05.03~05.21 총 제작기간 19일`**

### **`1주차` - 기획 단계**

- 프로젝트 주제 선정
- Mock-Up 제작
- DB-Schema 및 Redux State 구조 설계
- 구현 가능 여부 검토
- DB 연결 및 라우팅 기초 설계

### **`2주차` - 구현 단계**

**Front End**

- 기능 구현

**Back End**

### **`3주차` - 마무리 단계**

- 구현 마무리
- 리팩토링
  - 전체 코드 일관성 유지
  - Prop-types 추가
- 테스트 코드 작성
- 프론트엔드, 백엔드 배포
  - Netlify, AWS Elastic Beanstalk

<br>

## TechStack

| Stack                 | Remarks                                              |
| :-------------------- | :--------------------------------------------------- |
| ES2015+               | -                                                    |
| React                 | MERN-STACK 기반 구현                                 |
| React-router-dom      | -                                                    |
| Redux-thunk           | Redux Store 비동기 작업 (서버요청, 이미지 로딩) 관리 |
| Styled-components     | 공통 컴포넌트 재사용성                               |
| Firebase              | Social Login 구현                                    |
| Socket.io-client      | 멀티플레이를 위한 실시간 통신                        |
| Pusher-js             | 실시간 DB 변화 구독                                  |
| Jest                  | React Component Test                                 |
| Enzyme                | React Component Test                                 |
| React-testing-library | TBD                                                  |
| Redux-logger          | TBD                                                  |

| Stack                | Remarks                       |
| :------------------- | :---------------------------- |
| NodeJS               | JavaScript Runtime으로 npm    |
| Express              | JavaScript 서버 애플리케이션  |
| MongoDB              | MERN-STACK 기반 구현          |
| Mongoose             | MongoDB JavaScript ODM        |
| JWT (JSON Web Token) | 토큰 기반 인증                |
| Soket.io             | 멀티플레이를 위한 실시간 통신 |
| Pusher               | 실시간 DB 변화 알림           |
| Mocha                | 서버 엔드포인트 테스트        |
| supertest            | 서버 엔드포인트 테스트        |
| AWS                  | TBD                           |

<br>

## Feature

<br>

## Challenge

### **`Socket IO`**

Voice Game에서 socket 통신이 필요한 부분은 아래와 같습니다.

1. 방 입퇴장 관련 통신 (join-room, leave-room)
2. 게임 중 유저 정보 통신 (start-game, player-input)

대부분의 동작은 수월하게 구현했으나, `disconnect`를 조작하는 과정에서 어려움이 있었습니다. 유저가 의도적으로 방을 나간 경우에는 `useEffect`에서 이벤트를 emit하여 핸들링할 수 있으나 새로고침, 인터넷 연결 종료 등의 특정 상황에서는 socket에 기본적으로 내장되어있는 `disconnect` 이벤트가 자동으로 실행되기 때문에 콜백함수에 인자를 전달하기 어렵기 때문입니다.

인자를 전달하는 것이 중요했던 이유는, '누가 나갔는지'에 대한 정보가 필요했기 때문입니다. 단지 socket에서 누군가 `disconnect`되었다는 사실은 그 상태로도 확인할 수 있었으나 '방장'이 나갈 경우에는 특정한 동작을 수행할 필요가 있었습니다.

인자 전달 없이도 `disconnect` 동작을 올바르게 작동하도록 하기 위해서는 socket 내부 기능에 대한 보다 깊은 이해가 필요했습니다. 상세한 해결 절차는 아래와 같습니다.

[방장이 나간 사실을 어떻게 감지할까? - socket.io](https://www.notion.so/canwefly89/disconnect-leave-socket-io-950fbef3ed9a4c789f4e850af2dad3e7)

<br>

## History

<br>

## Conclusion

<br>

## Contact

### **`서성주`** canwefly89@gmail.com
