# Boss Diary 부장님의 보고서

   

   ## Introduction

   Boss Diary 부장님의 보고서는 사용자가 작성한 일기를 보고서 형식으로 전환시켜 관리, 저장 및 공유하는 ios기반 모바일 기기 어플리케이션 입니다.

![gif](https://yejinh-gifs.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%AE%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%82%E1%85%B5%E1%86%B7%E1%84%8B%E1%85%B4+%E1%84%87%E1%85%A9%E1%84%80%E1%85%A9%E1%84%89%E1%85%A5.gif)


&nbsp;

   ## Contents

   [Requirements](https://github.com/yejinh/Boss-Diary-client/new/master?readme=1#requirements)

   [Installation](https://github.com/yejinh/Boss-Diary-client/new/master?readme=1#installation)

   [Setting](https://github.com/yejinh/Boss-Diary-client/new/master?readme=1#setting)

   [Features](https://github.com/yejinh/Boss-Diary-client/new/master?readme=1#features)

   [Skills](https://github.com/yejinh/Boss-Diary-client/new/master?readme=1#skills)

   [Challenges](https://github.com/yejinh/Boss-Diary-client/new/master?readme=1#challenges)

   [Things to Do](https://github.com/yejinh/Boss-Diary-client/new/master?readme=1#things-to-do)

   

&nbsp;

   ## Requirements

   - Expo simulator 및 ios 기반 모바일 기기에서 사용 가능합니다.

   - Facebook 계정으로 가입합니다.

     

&nbsp;

   ## Installation

   ### Client

   ```
   git clone https://github.com/yejinh/Boss-Diary-client.git
   cd Boss-Diary-client
   npm install
   yarn ios
   ```



   ### Server

   ```
   git clone https://github.com/yejinh/Boss-Diary-server.git
   cd Boss-Diary-server
   npm install
   npm start
   ```


&nbsp;

   ## Features

   - Iphone xs 기기 기준으로 개발

   - Facebook api 를 이용한 로그인

   - JSON Web Token Authentication

   - 최초 가입시 상여금이 지급되고 원하는 템플릿을 구매하여 보고서(일기) 작성

   - 보고서 작성시 작성자, 일자 자동 생성

   - 미리보기 스크린에서 폰트와 폰트 사이즈 변경

   - 작성된 보고서 사진첩 저장 기능

   - Facebook 계정으로 사용자를 검색하여 보고서 결재 승인 요청 보내기 기능

   - 작성된 보고서 달력에서 날짜 별 확인

     

&nbsp;

   ## Skills

   ### Client

   - React Native

   - Expo

   - Redux

   - React Navigation

   - Native Base

   - Jest / Enzyme for unit-test

     

   ### Server

   - Node.js

   - Express

   - MongoDB

   - Mongoose

   - JSON Web Token Authentication

   - AWS S3

   - Mongo Altas

   - Chai / Mocha / Supertest for unit-test


   &nbsp;

   ## Deployment

   ### Client

   - Apple App Store (진행중)


   ### Server

   - Circle CI (continuous integration)

   - AWS Elastic Beanstalk (EB)


&nbsp;

   ## Project Control

   - Git 기반 진행

   - Notion Todo를 이용한 Task Management


&nbsp;

   ## Version Control


   - Client, Server를 독립적으로 구분하여 Git repository 관리


&nbsp;

## Challenges

   - 기획의 중요성와 그 기획을 기반으로 잡은 스케줄에 차질이 생기지 않도록 하는 것이 쉽지 않다는 것을 깨달았습니다. 
     프로젝트 완성 기간을 2주로 잡고 시작하였는데 React Native를 기반으로 한 프로젝트가 처음이라 기획 - 디자인 - 개발의 단계에서 어느 정도의 시간이 소요될 지 가늠하기가 어려웠습니다. Component 사용, Navigation의 구동 방식 등을 공부하고 파악하며 진행 해야 하다보니 최초 기획에서는 단순하더라도 완성도를 높이는 것을 목표로 하여 간단한 기능만을 넣었는데, 스케줄이 조금 앞당겨진 시기에 공유 기능 추가를 결정하며 더 많은 기능 확장이 가능하도록 스키마 변경을 포함한 코드 수정이 있었습니다. 이후 기능을 추가하고 싶은 욕심이 계속해서 생겨나 마음을 비우는 것이 쉽지 않았는데, 그때마다 기획시 작성한 Tasks에서 벗어나지 않도록 집중하여 기능 추가보다는 기존 코드 내 재활용 가능한 컴포넌트 생성, 중복 코드 제거 및 테스트 코드 작성의 시간을 좀 더 보냈습니다.

   - 여러 종류의 테스트를 경험해보고자 End to End(E2E) 테스트를 시도를 하였으나 테스트 라이브러리에서 React Native Expo 환경을 지원하지 않았습니다.
     [Detox](https://github.com/wix/Detox)와 Appium 모두 빌드된 파일을 필요로 했는데 Android보다 ios 기반 모바일 기기에 맞춰 프로젝트를 진행하여 애플 개발자 등록이 선행되어야 했기에 빌드 파일을 구축할 수가 없었으며, 추가로 Detox는 문서에 따라 빌드 파일을 대신하여 Expo IPA 파일을 추가한 후 세팅하였으나 전혀 구동되지 않았고 해당 라이브러리가 현재 관리되고 있지 않음을 확인했습니다. [Expo Detox 미지원](https://github.com/expo/with-detox-tests) [Detox 미지원](https://github.com/wix/Detox/blob/master/docs/Guide.Expo.md)
      추후 테스트 라이브러리 지원이 될 때 E2E 테스트 작성 할 예정입니다.

     

&nbsp;

   ## Things to Do

   1. 어드민 계정
      현재는 기본 템플릿을 S3 업로드 후 해당 url과 이외의 데이터를 DB에 직접 추가하여 사용하고 있으나 추후 모바일 기기 내의 관리자 페이지에서 템플릿을 추가할 수 있도록 수정하고자 합니다.

   2. 템플릿 그룹 별로 묶어 미리보기 스크린에서 유동적인 스타일 조정
      현재는 템플릿이 많지 않아 하나의 스타일로 정해두었는데 템플릿 스키마에 group항목을 추가해 그룹마다 텍스트 위치 등을 유동적으로 조정하고자 합니다.

   3. 결재 승인 수와 결재자 정보 확인 기능
      시간 관계상 결재 요청 후 승인 시에 도장 이미지만 로딩되도록 설정해두었는데 이후 결재자의 수와 결재자 정보를 확인할 수 있게 하여 사용자 경험을 높히고자 합니다.

   4. Iphone xs이외의 ios 모바일 기기 화면 반응 및 Android 모바일 기기 호환
      Iphone xs 화면을 기준으로 스타일을 맞추었는데 반응형 디자인으로 수정하고 Platform 확인을 통해 Android 모바일도 호환시켜 앱 배포를 계획하고 있습니다.

   5. 코드 리팩토링

      - Alert 창 활용이 많은데 하나의 component로 묶어 재활용할 수 있게 수정

      - 메인 스크린과 승인 요청 스크린에서 페이지네이션시 fatch된 마지막 데이터를 기준으로 하여 다음 정보를 불러오도록 수정

      
