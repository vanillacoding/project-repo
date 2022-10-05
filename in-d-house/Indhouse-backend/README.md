# 🎧 In-d house
사용자의 취향에 맞는 음악을 추천하고, 취향을 시각적으로 제공하는 웹 서비스

# Motivation

인디 음악을 좋아하지만 마음에 드는 노래가 찾기 힘들 때! 내 취향에 맞게 음악을 추천해 주는 서비스가 있으면 좋겠다는 생각으로 프로젝트를 기획하였습니다.</br>
그리고 내 취향을 시각적으로 확인하면 재미있을 것 같아 좋아하는 음악과 그 음악들의 가수 이름을 시각적으로 보여주는 기능도 기획하였습니다.

<br>

# Preview

📺 [유튜브 데모 발표 영상](https://youtu.be/F8OHnevCS30) 4시간 26분 부터 데모 발표 시작</br>
🖥 [배포 주소](https://www.indhouse.club)

- ### 선호 장르에 기반한 음악 추천 페이지
유저가 첫 로그인시 선택한 장르를 기반으로 추천 음악을 제공합니다.
<img src="https://drive.google.com/uc?id=1Evl-omDa3w-AFO7fNbFiHxTHzB1M3LwA" alt="main-page">
</br>
</br>

- ### 협업 필터링에 기반한 음악 추천 페이지
유저 간 취향 상관도를 비교하여 상관도가 가장 높은 유저들이 좋아하는 추천 음악을 제공합니다.
<img src="https://drive.google.com/uc?id=187iG4YzAdxQwez8R-ACXrnWhIKsRkaft" alt="recommend-page">
</br>
</br>

- ### 가수 시각화 페이지
유저 간 취향 상관도를 비교하여 상관도가 가장 높은 유저들이 좋아하는 추천 음악을 제공합니다.
<img src="https://drive.google.com/uc?id=1eSIXfklMZGqwZsIuV1kpk2IALdd7s174" alt="artist-visualization-page">
</br>
</br>

- ### 취향 시각화 페이지
유저가 좋아하는 음악의 장르를 기간별로 분류하여 특정 기간의 내 취향을 확인할 수 있도록 시각적으로 제공합니다.
<img src="https://drive.google.com/uc?id=1LEOaQeODGGlN2NlpXdEkKz3B0zdIrtBm" alt="taste-visualization-page">

<br>

# Table Contents

- 🛠 [Tech Stack](#-Tech-Stack)
- 📆 [Project Timeline](#-Project-Timeline)
- 🍀 [Deploy](#-Deploy)
- 💿 [Install](#-Install)
- 🔥 [Issues to overcome](#-Issues-to-overcome)

<br>

# 📆 Project Timeline

## `1st week - planning`
- 아이디어 구상 + 기술 스택 검토
- [Figma를 사용하여 Mockup 작업](https://www.figma.com/file/58sM0bFaaQIyw3EfpxVJkY/In-d-house.final?node-id=0%3A1)
- [Trello를 사용하여 개발 일정 수립](https://trello.com/b/b3HNeFQq/in-d-house)

## `2nd week - devloping`
- 코사인 유사도를 활용하여 음악 추천 시스템 구현
- D3로 유저의 취향 시각화

## `3nd week - testing and deploying`
- 프론트, 백엔드 테스트 케이스 작성
- AWS 백엔드 배포
- Netilify 프론트엔드 배포

<br>

# 🛠 Tech Stack

### Frontend

- Javascript
- React
- Redux (Redux-toolkit)
- Redux-Saga
- D3.js
- Styled Components
- Firebase AUTH

### Backend

- Node.js
- Express
- Mongoose
- MongoDB (Atlas)
- S3
- JSON Web Tokne Authentication

### Test

- Chai
- React Testing Library

<br>

# 🍀 Deploy
(음악 데이터를 개인 DB에 보관하고 있기 때문에 배포된 주소에서 이용하기를 권장합니다.)

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
REACT_APP_PROJECT_ID=<YOUR_FIREBASE_PROJECT_ID>
REACT_APP_APP_ID=<YOUT_FIREBASE_APP_ID>
REACT_APP_SERVER_URL=http://localhost: + <YOUR_LOCAL_SERVER_PORT>
```

### Server

MongDB 계정이 필요하며 Root 디렉토리에 .env파일을 만들고 다음과 같이 설정해 주세요.

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

```
PORT=<YOUR_PORT_NUMBER>
DATABASE_PASSWORD=<YOUR_MONGODB_PASSWORD>
MONGO_DB_URL=<YOUR_MONGODB_DATABASE_URL>
AWS_ACCESS_KEY=<YOUR_AWS_ACCESS_KEY>
AWS_SECRET_KEY=<YOUR_AWS_SECRET_KEY>
AWS_MUSIC_PHOTO_BUCKET=<YOUR_PHOTO_BUCKET>
AWS_USER_PHOTO_BUCKET=<YOUR_PHOTO_BUCKET>
AWS_REGION=<YOUR_AWS_REGION>
JWT_SECRET_KEY=<YOUR_JWT_SECRET>
SALT_ROUND=<YOUT_SALT_NUMBER>
```

<br>

# 🔥 Challenge

### **Recommend System**

유튜브나 넷플릭스의 추천 시스템을 참고하여 알고리즘을 구현해보려고 했습니다.</br>
대부분의 서비스에서 협업 필터링과 콘텐츠 기반 필터링을 조합해서 사용하는듯했고, 콘텐츠가 적은 현재 저의 프로젝트에서는 유저의 확실한 취향을 이용한 **협업 필터링**을 적용하였습니다.</br>
**코사인 유사도**를 활용하여, 동일한 장르를 선택했다면 상관도가 높은 유저로 판단하여 해당 유저가 좋아하는 음악을 추천하는 시스템으로 구성했습니다. 추천 알고리즘의 구현 자체는 어렵지 않았으나 추천 시스템이 적용될 서비스에 적합한 방식을 정하는 것이 더 중요하다고 느낍니다.</br>
현 프로젝트의 추천 방식은 추천 시스템을 이해하는 정도에 그쳤습니다. 새로운 시도들을 많이 하다가 추천 알고리즘을 정교하게 구성하지 못한 것 같아 아쉽고, 어떻게 하면 더 적합한 시스템으로 구성할 수 있을지 계속 고민하고 있습니다.

<br>

### **D3.js**

이전 프로젝트에서 **canvas**로 게임을 구현했었는데, 이번에는 새롭게 **svg**에 데이터를 시각화 해보고싶었습니다.</br>
**D3 라이브러리**가 **svg**에 데이터를 매핑하는 다양한 메서드를 제공하고, 커뮤니티도 활발하기 때문에 D3 라이브러리로 시각화 기능을 구현하기로 결정했습니다.</br>
D3 라이브러리 사용하는 것으로 결정하고 두 가지 고민이 있었습니다. 첫째는 라이브러리를 잘 습득해서 사용할 수 있을 것인가에 대한 걱정, 둘째는 일반적인 그래프가 아닌 유저의 흥미를 유발할 수 있게 어떻게 보여줄 것인가입니다.</br>
처음 계획은 시각화 기능 구현에 할당된 4~5일 동안 라이브러리를 습득하여 목업처럼 구현하는 것이었습니다. 하지만 계획했던 목업의 디자인으로 구현하기에 할당된 기간은 짧았고 확실히 이해하고 구현할 수 있는 다른 디자인으로 수정했습니다. 난이도를 낮춘 디자인으로 작업하는데도 라이브러리의 메서드들이 낯설어 쉽지 않았습니다.</br>
그래서 이전에 **canvas**로 게임을 구현했을 때 정리한 빠르게 습득하여 적용하는 **방법**을 사용했습니다. 먼저 쉬운 예제를 보며 개념을 잡고, 기본 개념만 가지고 **간단하게 구현**해보고, 그다음 좀 더 어려운 예제를 따라 해 보면서 큰 흐름을 잡고 **응용**하면서 새로운 메서드가 익숙해지도록 **반복**하는 방법입니다.</br>
이 방법으로 첫 번째 고민인 라이브러리 사용법을 습득하였습니다. 그 뒤로 응용을 해나가면서 기본적으로 원을 나열했던 모습에서 유저의 관심을 사로잡게 화면을 꽉 채우며 스스로 움직이고, 드래그도 가능한 인터렉티브한 그래프로 만들 수 있었습니다.

<br>

### **Redux-Saga**

리액트, 리덕스는 함수형 프로그래밍을 지향하며 사이드 이펙트에 의한 영향을 받으면 안 된다고 알고 있었는데, 그동안 제가 사이드 이펙트를 고민하며 코드를 작성하지 않았던 것 같았습니다. 그래서 이번 프로젝트에서만큼은 제대로 사이드 이펙트를 관리해 보고 싶어서 사이드 이펙트 관리를 위해 만들어진 **Redux-Saga**를 프로젝트에 적용해보았습니다. </br>
확실히 **yield** 구문을 통해 원하는 시점에 비동기 요청을 순차적으로 처리하여 사이드 이펙트를 관리하고, 액션 함수는 항상 순수 객체를 반환하여 **리듀서**를 순수함수로 유지하여 **thunk**보다 리액트, 리덕스에 어울리는 라이브러리라고 느꼈습니다.</br>
이번 한 번의 사용으로 **Saga**를 다 이해했다고 할 순 없겠지만 **Workflow**는 이해할 수 있었습니다. 액션을 통한 상태변화, 이 사이에서 **Saga**는 액션을 관찰하며 액션에 맞는 동작을 실행하도록 합니다. 처음에는 이 **관찰**이라는 것을 정확히 이해하지 못했습니다. 액션이 리듀서로 가기 전에 Saga가 받아서 함수를 실행하고 리듀서로 넘기는 것으로 생각했는데, 모든 액션은 리듀서로 가장 먼저 도착하고 **Saga**는 말 그대로 **리듀서**로 가는 액션을 **관찰**하며 지나가는 액션에 맞게 동작하는 방식이었습니다.</br>
확실히 진입장벽이 높긴 하지만 **Saga**를 통한 비동기 처리가 정말 매력적이라 생각 들고, 앞으로 문서를 더 보며 탄탄하게 작성해보고 싶습니다.
