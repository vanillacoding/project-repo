# Mi-Sleep Diary

[http://www.mi-sleep-diary.com/](http://www.mi-sleep-diary.com/)   
개발기간) 2020.04.05. ~ 2020.04.18.  

Mi band(Xiaomi Wearable Device)로 수집된 수면데이터를 연동하여   
수면 패턴(깊은 수면, 얕은 수면)을 차트로 확인하고, 말/행동 점수와 함께 그 날의 컨디션을 작성할 수 있는 모바일웹 어플리케이션입니다.   
※ Mi band 수면 정보 측정 기능 사용자를 대상으로 하는 서비스로, 연동된 데이터가 있을 경우 사용 가능합니다.   

![mi-sleep-diary_minji](./assets/mi-sleep-diary_minji.gif)   
[Youtube에서 보기 >](https://youtu.be/b0b6znfjeHM)

사람마다 자신에게 꼭 맞는 수면시간이 있으며 이를 확보하지 못하면 다음날 컨디션, 특히 자신에게 있는 나쁜 습관을 제어하는 능력이 줄어   
합리적인 행동을 망친다는 한 심리학 교수님의 강연을 들었던 적이 있습니다.   
자신이 몇 시간 잤는지와 그 날의 말&행동의 점수를 기록해 보라는 조언을 듣고 나서, 자바스크립트 공부를 하고 프로젝트를 만든다면 꼭 만들어보고싶었던 서비스입니다.   
단순히 입력형 다이어리에서 좀 더 나아가 **스마트기기와 연동, 시각화를 함께 해주는 다이어리**로 기획하여 진행해보았습니다.


## Features

- Google OAuth 2.0을 이용한 로그인 구현
  - Google Fit 민감정보 데이터 접근권한 필요
  - Google Fit으로 연동되는 Mi Band(Xiaomi Fitness)의 수면세션 활용
- 수면세션 데이터를 기반으로 정보 구조화 및 D3.js를 활용한 시각화
- 지난 밤 수면정보 요약
- 수면정보 바탕 일기 작성기능
- 수면정보 & 일기 리스트, 상세페이지
- 데일리 수면패턴 차트
  - 시간의 흐름에 따른 Light Sleep(얕은 수면), Deep Sleep(깊은 수면) 타입별 패턴
- 최근 7일 수면패턴 차트
  - 총 수면시간, 수면 타입별 시간, 하루 중 Deep Sleep 비율

## Installation

### Client

```
$ git clone https://github.com/minnnji/Mi-SleepDiary_client
$ cd Mi-SleepDiary_client
$ yarn install (or npm install)
$ yarn start (or npm start)
```

### Server

```
$ git clone https://github.com/minnnji/Mi-SleepDiary_server
$ cd Mi-SleepDiary_server
$ yarn install (or npm install)
$ yarn start (or npm start)
```

## Skills

### FrontEnd

- 모던 자바스크립트 ES2015+
- React를 활용, 컴포넌트 베이스 UI 아키텍처 구현
- React Router를 활용한 routing
- CSS Module을 통한 리액트 컴포넌트 스타일링
- Redux를 활용한 Flux 아키텍처 기반 설계
- Promise 베이스의 axios로 HTTP 요청
- D3.js(Data-Driven Documents)를 통한 웹브라우저 내 동적 정보시각화
- Google OAuth 2.0
- Google Fit REST API
- Jest와 Enzyme를 이용, Component 단위 테스트 구현

### BackEnd

- 모던 자바스크립트 ES2015+
- V8 engine기반 Node.js
- Node.js 웹 애플리케이션 프레임워크 Express
- NoSQL 데이터베이스, MongoDB
- MongoDB 기반의 Node.js 전용 ODM 라이브러리 Mongoose
- Mongo DB Atlas

## Deployment

- FrontEnd : Netlify를 통한 client 배포 및 테스트 자동화
- BackEnd : Amazon Web Services(AWS) Elastic Beanstalk 으로 배포
- Custom Domain

## ETC

- Web, Server의 독립적인 관리를 위한 GIT Repo 구분
- Notion To do를 이용한 Task 및 스케쥴 관리 [notion에서 보기 >](https://www.notion.so/minnnji2326/03f787fc26264f39b2a8d9597c6b698c?v=37c4f56adcc646158652b17c66011a49)
- Moqups를 활용한 Wireframe & UI Prototyping <img src="./assets/mockup.png" width="90%">
- Lucidchart를 활용한 Schema design <img src="./assets/schema.png" width="90%">


## Challenges

- Mi band API에서 수면 세션 데이터를 직접적으로 제공해주지 않아 이를 획득하고 활용하는 데 어려움이 있었습니다.   
결과적으로 Mi band와 Google Fit이 연동되어 Google Fit REST API를 통해 측정된 데이터를 응답으로 받을 수 있었습니다.   
Google API의 공식문서 내용과 달리 Mi band로는 REM Sleep 데이터가 측정되지 않으며, 수면 타입(light, deep)이 Activity type으로 구분되어 들어오지 않아 기획상 원하던 결과를 받아서 활용하는 데 많은 시행착오가 있었습니다.   
이를 통해 REST API를 좀 더 친숙하게 사용하게 되었고, 결과를 얻는 과정에서 끈기있게 탐색해보는 시간을 가지는 데 의미가 있었습니다.
- 처음 접한 D3.js를 활용해 보유한 시간데이터로 원하는 내용의 차트를 그리는 것이 쉽지 않았습니다.   
구현하는 과정에서 몇가지 정보를 표현하는 데 한계가 있어 다른 형태들로 변형을 시도해보며 구조를 조금 더 익히게 되었습니다.   
특히 데일리 차트에서 13자리 숫자로 구성된 시간데이터를 y값으로 사용하는 동시에 툴팁의 상세내용에 활용해야 했는데,   
숫자가 큰 탓에 시각적으로 거의 균등한 차트가 나와서 아쉬웠습니다. 추후 시각적으로 좀 더 의미있는 차트로 개선할 예정입니다.
- 2주의 기한을 잡고 task & 일정 관리부터 구현 ~ 배포까지, 기획 업무 이후로 진행되는 한 사이클을 경험하였습니다.   
추가 기능들이 계속 떠올라 욕심이 났지만 기본 기능부터 완성하는 데 초점을 두고 작업하며 일정 관리의 중요성을 느끼는 계기가 되었습니다.

## Things to do
- 하루 수면시간 + 말/행동 점수 차트 추가 구현
- 말/행동 점수가 높은 최적 수면시간을 통계로 제공 및 개인화 문구 노출 (ex. ?시간 잤을 때 가장 똘망똘망한 ㅇㅇㅇ님 등)
- 버그 수정
- HTTPS 세팅
- Server Test
- Client Test 보완
- integration test, end-to-end test
- Code Refactoring
