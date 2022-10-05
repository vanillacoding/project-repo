# Streetcat - 길냥이 어딨냥

## Introduction

길냥이 어딨냥은 길거리에서 유저들이 발견한 고양이들을 어느 누구나와 자유롭게 공유를 할 수 있는 위치기반형 안드로이드 어플리케이션입니다. 

![Farmers Market Finder Demo](demo/demoApp.gif)

## Table of contents

- Deployment
- Project Control
- Technologies
- Setup
- Features
- Challenges
- Things  to Do

## Deployment

### Clinet

- 안드로이드 스토어 배포 필요

### Server

- 아마존의 Elastic Beanstalk를 통해 배포

## Project Control

- Git Branch를 통해서 개발이 진행되었습니다.
- 노션을 통해서 개발 일정, 작업이 조율이 되었습니다.

## Technologies

이 애플리케이션은 아래에 기재된 기술들로 만들어졌습니다.

### Front-end

- Redux
- React-native
- Expo
- Native-base
- Jest/ Enzyme
- ES2015+
- React navigation

### Back-end

- Node JS
- Express
- Mongo DB
- Mongoose
- AWS S3
- Atas
- ES2015+
- JWT

## Setup

    https://github.com/dizkek/Streetcat-Client
    cd  Streetcat-Client
    npm install
    npm start or npm run server

    https://github.com/dizkek/Streetcat-Server
    cd Streetcat-Server
    npm install
    npm start

## Features

- 이 애플리케이션은 안드로이드의 대표적인 레퍼런스 폰인 구글의 픽셀3를 기준으로 개발되었습니다.
- 사용자들이 길고양이들을 등록하고, 삭제, 수정하는 기본적인 CRUD 기능들이 가능합니다.
- 위치정보를 기반으로 사용자 주위 500m 안의 고양이들을 표시하고, 맵을 클릭했을 때 사용자가 원하면 이동이 가능합니다.
- 사용자들이 상호작용을 할 수 있는 코멘트를 남기거나, '좋아요'를 할 수 있습니다.
- 각각의 사용자들이 찾은 고양이나 '좋아요'를 한 고양이를 확인 가능합니다.
- 좋아요 숫자에 따라서 랭킹 순으로 1위부터 10위 고양이까지 확인이 가능합니다.

## Challenges

- 개발자에게 중요한 자질 중의 하나는 프로젝트를 진행하기 전에 상세하게 계획을 짜고, 그 일정에 맞춰서 당일 당일의 태스크들을 진행하는 것이로 생각합니다. 그날 그날 정해진 일정들을 최대한 진행하려고 노력을 해보았지만, 경험이 미숙한 탓에 일정이 지연되면서, 일정을 맞추기 위해서 기획했된 것보다 애플리케이션의 기능들이 단순화를 시켰습니다. 이 경험을 바탕으로 다음 프로젝트에서는 계획을 짤 때 더 신중하고 가능한 계획을 짜면서 프로젝트 진행이 필요하다는 교훈을 얻었습니다.
- 프로젝트를 진행하면서 필요할 때 컨테이너를 만들면서 컨테이너 컴포넌트를 하나씩 추가를 하였습니다. 컨테이너 컴포넌트가 많아지면서, 과연 이게 구조적으로 괜찮은 건지 또는 컨테이너 컴포넌트가 필요로 하는가에 대해서 많은 생각을 해봤습니다. 만약 한두개의 컴포넌트에서 모든 프랍을 뿌려준다면 리덕스를 사용하는 의미가 없는 거 같아서 고민 한끝에 여러 가지 컨테이너 컴포넌트들을 사용하게 되었습니다.
- 프로젝트를 진행하면서  유즈 이펙트 안에서 사용하는 이벤트나, 비동기로 인한 메모리 누수가 종종 일어났습니다. 이 부분을 수정하기 위해서 이벤트 클린업을 적절하게 실행을 하고 또한,  공식문서를 참조해서 유즈이펙트 안에서 집적  비동기 함수를 만들어서 그 함수를 실행하라는 부분을 보고 해결을 하게 되었습니다.

## Things to Do

- 반응형 디자인 적용
- 안드로이드 스토어에 배포
- 고양이 페이지에서 수정을 눌렀을때 인풋 포커싱 적용
- 새로고침기능
