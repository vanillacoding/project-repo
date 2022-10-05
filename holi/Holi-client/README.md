# HOLI

## Introduction
![holi](https://user-images.githubusercontent.com/53928987/79687883-4948f200-8285-11ea-8298-c4c57e19dd0d.gif)

HOLI는 워킹 홀리데이 정보를 제공하고 사용자들이 서로 후기를 공유할 수 있는 반응형 웹 어플리케이션 입니다. 워킹 홀리데이를 갈 수 있는 국가들이 지도에 표시되고, 지역 / 나이 / 지원 기간에 따라 국가를 필터링할 수 있습니다. 또한 사용자들이 서로 후기를 공유할 수 있고, 해시태그를 이용하여 관련 후기들을 조회할 수 있습니다.

## Features
- 반응형 및 모바일 가능
- Google, Facebook 소셜 로그인
- 워킹 홀리데이를 갈 수 있는 국가들을 지도로 시각화
- 지역, 나이, 지원 기간에 따라 국가 필터링 기능
- 각 국가의 워킹 홀리데이 정보를 제공
- 국가별 좋아요 및 조회 기능
- 해시태그 작성 및 조회 기능
- 워킹 홀리데이 후기 작성 및 좋아요, 조회, 삭제 기능

## Requirements
- 로그인 시 Google 또는 Facebook 계정 필요
- Chrome 브라우저 권장

## Installation
__Client__
```
  git clone https://github.com/davinjeong/Holi-client.git
  cd Holi-client
  npm install
  npm start
```
__Server__
```
  git clone https://github.com/davinjeong/Holi-server.git
  cd Holi-server
  npm install
  npm start
```

## Skills
__Client__
- ES2015+
- React
- React Router
- Redux
- D3.js
- SCSS

__Server__
- ES2015+
- Node.js
- Express
- MongoDB, Atlas
- Mongoose
- JSON Web Token Authentication

## Test
__Client__
- Jest와 Enzyme를 이용한 Component 및 Reducer 단위 테스트
- Cypress를 이용한 End to End(E2E) 테스트

## Project Control
- Moqups를 이용한 목업 작업
- LucidChart를 이용한 스키마 디자인
- Notion을 이용한 Task 관리

## Version Control
- Git Repo를 구분하여 Client와 Server를 독립적으로 관리

## Deployment
- Amazon Web Service(AWS)의 Elastic Beanstalk을 이용한 서버 배포

## Challenges
- 국가 데이터를 지도로 시각화하기 위해 D3.js를 사용하였습니다. 지도를 구현하고 원하는 효과를 넣는 것에 어려움이 있었으나 문서와 참고 자료들을 보며 차근차근 해결했습니다. 막막하기만 했던 지도 구현을 성공하고 나니 D3.js를 이용하여 다양한 데이터 시각화에 도전해보고 싶다는 생각이 들었습니다.
- 처음에 익숙하지 않았던 svg와 path 태그를 다루는 것에도 어려움이 있었습니다. 활성화된 지역을 클릭하면 해당 국가 상세페이지로 이동해야 했는데, 처음엔 각각의 path를 a 태그로 감싸서 구현하려 했습니다. 하지만 D3.js로 a 태그를 다루는 게 쉽지 않았고, 대신 활성화된 path를 클릭하면 `window.location`으로 해당 페이지 이동시킨 뒤 `fetch`로 데이터를 요청하는 방식으로 구현하였습니다.

## Things to do
HOLI는 2주라는 기한을 정해두고 시작한 프로젝트입니다. 초기 기획대로 완성하는 것을 1차 목표로 두었고, 작업을 하면서 필요하다고 느꼈던 기능들을 추가하여 서비스를 보완하는 것을 2차 목표로 두려고 합니다.
- 후기 삭제 기능
- 국가 및 후기를 좋아요 순으로 시각화하여 표현
- Code Refactoring
- Unit 테스트 및 E2E 테스트 추가
- 버그 수정
