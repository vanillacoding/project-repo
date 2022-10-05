# Treasue Hunt

## Introduction

여행을 다녀온 후 더이상 사용하지 않는 유심, 교통카드, 입장권 등을 '보물찾기' 형식으로 나눔할 수 있는 Android 어플리케이션입니다.

<div>
<img style="display : block;" src="https://user-images.githubusercontent.com/48754671/79684777-f49a7c80-826e-11ea-80ca-fdc122dd5cbe.gif" />
<img style="display : block;" src="https://user-images.githubusercontent.com/48754671/79684811-37f4eb00-826f-11ea-8ae1-b3eb688a7f20.gif" />
<img style="display : block;" src="https://user-images.githubusercontent.com/48754671/79685026-98385c80-8270-11ea-83d5-791fae248129.gif" />
</div>


## Contents

* [Introduction](https://github.com/thms200/treasure-hunt-client#introduction)
* [Feature](https://github.com/thms200/treasure-hunt-client#feature)
* [Installation](https://github.com/thms200/treasure-hunt-client#installation)
* [Skills](https://github.com/thms200/treasure-hunt-client#skills)
* [Deployment](https://github.com/thms200/treasure-hunt-client#deployment)
* [Project Process](https://github.com/thms200/treasure-hunt-client#Project-Process)
* [Challenges](https://github.com/thms200/treasure-hunt-client#challenges)
* [Things to Do](https://github.com/thms200/treasure-hunt-client#things-to-do)


## Feature

* Expo-Facebook을 이용한 페이스북 소셜 로그인

* 나눔하고 싶은 물품(Treasure)을 등록
  - Google Map을 활용하여 Treasure의 위치에 대한 Marker 등록
  - Camera, Gallery를 활용하여 숨긴 위치에 대한 사진 등록
  - Calendar를 활용하여 Treasure의 유효 기간을 설정 등

* 나눔받고 싶은 물품(Treasure) List를 확인할 수 있는 페이지 구현
  - Country, Category에 따라 필터링 기능 제공

* 등록된 물품(Tresure)에 대한 상세 정보 페이지 구현
  - 등록자, 유효 기간, 숨긴 위치(Map, Photo) 등
  - 현재 누가 가져갔는지, 대기중인지 List 화면에서 확인 가능

* Side Bar에 유저가 등록한 물품 List, 가져간 물품 List 메뉴 페이지 구현
  - 자신이 등록한 물품은 상세 페이지에서 삭제 가능
  - 자신이 등록한 물품이 현재 대기 중인지 누군가 가져갔는지 확인 가능

* 로그인 하지 않은 유저는 Side Bar에서 서비스 메뉴 확인 불가능


## Installation

### [Client](https://github.com/thms200/treasure-hunt-client)
```
git clone https://github.com/thms200/treasure-hunt-client.git
cd treasure-hunt-client
npm install
npm start
```

### [Server](https://github.com/thms200/treasure-hunt-server)
```
git clone https://github.com/thms200/treasure-hunt-server.git
cd treasure-hunt-server
npm install
npm start
```

### Environment Variable
* [Google Map API](https://cloud.google.com/maps-platform?hl=ko)
* [Facebook Development Tool](https://developers.facebook.com/?no_redirect=1)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* [AWS S3](https://aws.amazon.com/ko/s3/)

```Javascript
//Client
GOOGLE_MAP_API_KEY = <YOUR GOOLE MAP KEY>
FACEBOOK_APP_ID = <YOUR FACEBOOK APP ID>
API_URL = <YOUR API URL>
```
```Javascript
//Server
ATLAS_URI = <YOUR MONGO_DB ATLAS CONNECTION URL>
SECREY_KEY = <YOUR JWT SECRET KEY>
AWS_ACCESS_KEY = <YOUR AWS ACCESS KEY>
AWS_SECRET_ACCESS_KEY = <YOUR AWS SECRET ACCSS KEY>
```


## Skills

### Client Side

* React Native
* Expo
* Redux
* React Navigation
* Google Map API
* Jest for unit-test
* Enzyme for component-test
* ESLint

### Server Side

 * Node.js
 * Express
 * MongoDB / Mongo Altas
 * Mongoose
 * JSON Web Token Authentication
 * AWS S3
 * Chai / Mocha / Supertest for unit-test
 * ESLint


## Deployment

### Client
* [Download apk](https://drive.google.com/open?id=1q8cBekyx3GrfTzwyRdbkS1QdjfFSg_iq)

### Server
* Circle CI (continuous integration)
* AWS Elastic Beanstalk (EB)


## Project Process

* 기술 Stack 검토
* [moqups을 이용한 Wireframe 작업](https://app.moqups.com/XVR8rDTtv7/view/page/ae8fe8eb0?ui=0&fit_width=1)
* [Database schema 설계](https://www.notion.so/Backend-new-treasure-DB-c8698048abec45e992ee8a47c40931d0#44a86d559e614d0ba397c6237fb0aea6)
* [Notion Todo를 이용한 Task Management](https://www.notion.so/23d7f29e6672407899e75027ed136480?v=c6915c23b4cb4a8799dd0fcd0e42ed76)
* Git을 통한 Version 관리 (Client/Server 분리, Branch 분리)


## Challenges
 * React Navigation Lifecycle
   - A Page -> B Page -> A Page로 되돌아올 때, 화면에 마지막 State가 초기화 되지 않고 남아 있었습니다. \
     왜냐하면 기존 Web과 React Native의 Lift Cycle이 달라서 Unmount되지 않았기 때문입니다. \
     Web에서는 페이지를 이동하면 전 페이지가 Unmount 되는데, 앱에서는 Unmonut 되지 않고 Stack에 쌓여 있는 구조입니다.\
     React Navigation의 'focus' Event를 활용하여 유저가 다른 페이지에서 되돌아오면 다시 Fetch 요청을 해서 \
     Mount되는 조건과 동일하게 구현하였습니다.

 * App Build 및 배포 ([Issue 관리(Notion)](https://www.notion.so/Frontend-039c4690f6b34607af67a2a072d94a67))
   - 배포 과정에서 해야하는 다양한 설정과 관련된 여러 가지 프로그램 or 모듈을 설치하는 과정이 쉽지 않았습니다. 
  
   - 배포를 위해 가장 선행되어야 하는 과정은 앱 Build 입니다. 
     그러나 build한 app을 설치하여 실행해 보면 splash 페이지까지만 나오고 종료되는 에러가 지속 발생하였습니다. \
     빌드한 앱에 대한 디버깅 방법이 어려워서 발생하는 원인을 정확히 확인하지 못한채 공식문서, stackover flow, 블로그에서 \
     나온 여러 가지 방법을 적용하다보니 시간이 많이 소요되었습니다. \
     그 중 환경 변수 설정을 위해 __DEV__를 활용한 부분에서 staging or production mode에서는 어떤 값도 적용되지 않는 \
     오류를 발견했고, 이 부분을 수정하여 앱 Build에 성공할 수 있었습니다.

   - AWS EB을 이용해 서버를 배포한 뒤 treasure를 등록하는 페이지에서 413 error(request entity too large)가 지속 발생하였습니다.\
     AWS는 웹 서버인 nginx를 사용하고 있는데, nginx는 업로드하는 파일의 크기를 1MB로 제한하고 있습니다. \
     현재 기능에서는 총 3개의 Image가 한꺼번에 업로드 되기 때문에 허용 용량을 초과하는 경우가 쉽게 발생하고 있었습니다. \
     처음에는 nginx의 기본 설정을 확장하려고 했으나 고화질의 사진을 저장해야 하는 경우가 아니라서 \
     Expo ImageManipulator를 통해 이미지의 사이즈를 줄여 서버로 fetch를 요청하는 방법으로 개선하였습니다.



## Things to Do
* 본인이 등록한 물품(Treasure)에 대한 수정 기능을 구현하고자 합니다.

* End to End(E2E) Test를 진행하고자 합니다.
  - E2E Test를 지원하는 Cypress는 [native 기반의 app에 대해 support 하지 않으며,](https://docs.cypress.io/faq/questions/general-questions-faq.html#Do-you-support-native-mobile-app) \
    Mobile app 기반의 E2E Test를 지원하는 detox는 [Expo와 함께 사용하는 것을 Support하지 않습니다.](https://github.com/wix/Detox/blob/master/docs/Guide.Expo.md) \
    마지막 방안으로 찾은 appium은 build한 app이 필요했는데, 상위에 언급한 내용 대로 앱 build에 계속 실패해서 E2E Test까지 적용을 못하였습니다.
  
* 코드 전체 Refactoring
  - 프로젝트 중간에 1차 리팩토링을 진행했고, 조금 더 추상화 시켜서 component를 재사용할 수 있을 것 같습니다. \
    2주라는 짧은 프로젝트 기간안에 모든 것을 수행할 수 없어서 미처 반영하지 못한 부분입니다.

  - 전반적인 UI를 개선하여 좋은 사용자 경험을 제시하고 싶습니다. \
    (ex, 선택한 Category, Country는 기존 항목과 다른 색으로 구분, Side Bar에서 선택된 항목은 배경 색 변경 등)
