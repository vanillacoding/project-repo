# Vanilla-ab-test

<center><div style="text-align: center"><img style="margin: 0 auto" width="400" alt="Logo" src="https://user-images.githubusercontent.com/39963468/55374791-bbe51380-5544-11e9-995e-8c1fbbe5fb89.png"></div></center>

## Contents
- Introduction
- Feature
- Installation
- Usage
- Tech
- Things to do
- Version Control
- Other tools
- Deployment
- Sincere Thanks

### Introduction
자신이 등록한 프로젝트 및 웹페이지 별 방문자 분석 정보를 제공하는 웹 애플리케이션. 애플리케이션에서 제공하는 페이지 별 스크립트 태그를 분석을 원하는 자신의 페이지에 추가 후 이용 가능함.
<br>
![](vanilla-ab-test.gif)

### Features
- 등록한 프로젝트 및 웹페이지 별 방문자 분석 데이터 제공.
- 페이지 별 클라이언트의 방문, 재방문 수 데이터 제공.
- 페이지 별 전환율 데이터 제공.
- 페이지 별 머문 시간 확인.
- Public I/P를 이용한 대략적인 위치 정보.
- 클릭이벤트 시각화.
- 접속 시 이용한 클라이언트 브라우저 정보 제공.

### Installation
    git clone https://github.com/ChanwheKim/ab-test.git
    cd ab-test
    npm install
    npm start

### Usage
1) 새 프로젝트 리스트 생성.
2) 프로젝트 내부에서 새로운 테스트 페이지 리스트 생성.
3) 코드 아이콘 클릭.
4) 클릭 후 생성된 페이지 고유의 스크립트 태그를 분석을 원하는 자신의 페이지에 추가.
5) 방문자 분석 데이터 확인.

### Tech
- Javascript (ES2015+)
- React, for component-based-architecture
- State management using redux
- Routing using react-router
- Node.js
- Using express, simple and flexible Node.js web application framework
- Mongo DB
- Mongoose, object data modeling library for Mongo DB
- D3, for data-driven-manipulation of documents
- Sass, for clearer and easy-to-understand stylesheet

### Challenge
프로젝트를 진행하며 저의 여러 부족한 점들을 알 수 있었고, 향후 보완을 위해 아래와 같이 주요 사항들을 정리했습니다.
- 서버에서 데이터를 받은 후 대시보드의 각 차트에 데이터를 효율적인 로직으로 전달.
- 재사용성 향상을 위한 React Component 구조화.

### Things to do
- 유닛 테스트, 테스트케이스 추가
- Intergration Test.
- Test Page 개별 리스트 별 대시보드 확인.
- 로그인 기능 추가.
- 반응형 대응.
- 데이터 양의 증가에 따른 성능 최적화

### Version Control
- Version Control을 위해 git을 사용.
- 개발 시 별도의 브랜치 생성 후, 각 기능 구현 후 master 브랜치에 병합함.

### Other tools
- Trello를 이용한 task 세분화 및 스케줄 관리.
- Lucidchart를 이용한 schema design.
- OmniGraffle을 이용한 Mockup design.

### Deployment
- AWS Elastic Beanstalk

### Sincere Thanks
[Ken Huh](https://github.com/Ken123777) / Vanilla Coding
