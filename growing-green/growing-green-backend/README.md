# **Growing Green 🪴**
온라인상에서 가상의 반려 식물을 키울 수 있는 **식물 키우기 시뮬레이션 게임**입니다.

<img width="970" alt="landing-page" src="https://user-images.githubusercontent.com/43979066/140797763-f979fa1e-a6d1-4a43-818b-9cf7d5369307.gif">

<br>

# **🗂 CONTENTS**

- [🌱 INTRODUCTION](#-INTRODUCTION)
- [📸 FEATURES](#-FEATURES)
- [🕋 STACK](#-STACK)
- [🕹 USAGE](#-USAGE)
- [🌵 DEPLOY](#-DEPLOY)
- [🌳 TECHNICAL LOG](#-TECHNICAL-LOG)
- [💡 THINGS TO DO](#-THINGS-TO-DO)

<br>

# **🌱 INTRODUCTION**

### **프로젝트 기간**

2021.09.27 ~ 2021.10.15: 3주

- 아이디어 기획, 목업작성, 애자일 스프린트 플랜 : 1주
- 개발 진행, 배포, 테스트 : 2주

### **프로젝트 동기 및 기획 의도**

예전부터 직접 식물을 키워보기를 시도했지만 매번 실패했었습니다. 
저와 같이 식물을 키우고싶지만 키우지 못하는 사람들을 위해 **온라인상에서 가상의 반려식물**을 키울 수 있는 **시뮬레이션 게임**을 구상하게 되었습니다.

- 캔버스를 이용하여 **식물의 자연스러운 움직임**을 구현하고 마우스 이벤트에 따라 더욱 **정교하고 디테일한 애니메이션 효과**를 구현하고자 하였습니다.
  
- 현재 날씨나 시간 등 **실제 환경을 최대한 반영**하여 실제로 식물을 키우는듯한 느낌을 주었습니다.
    
### **프로젝트 프로세스**

- 아이디어 기획
- 기술 스택 검토
- [**Figma를 이용한 Mockup**](https://www.figma.com/file/iZVPM5NQPU0BDtzesr72Wj/growing-plants?node-id=0%3A1)설계
- 데이터베이스 Schema설계
- [**Agile Sprint** 기반의 태스크 매니지먼트](https://www.notion.so/fe898423ea8b4a56abb22443ebab7ec3?v=e46eaf6188d2407b95daace2b82ad992)
- Git Repo를 Frontend와 Backend 로 **각각 구분**하여 독립적으로 관리

<br>

# **🛠 FEATURES**

- Firebase 소셜 로그인 및 JSON Web Token을 이용한 사용자 인증
- 로그인 상태별 관리를 위한 Private Route 구현
- MongoDB Atlas를 이용한 식물정보 및 사용자 정보 관리
- Puppeteer를 이용해 [외부 식물 정보 제공 사이트](https://www.treeinfo.net/)로부터 식물의 상세 정보 크롤링
  - 검색어와 유사한 식물 이름 리스트
  - 식물의 상세 정보(학명, 물주기, 광도 등)
  
<br>

- 새로운 식물 추가하기
    <img width="970" alt="growth-effect" src="https://user-images.githubusercontent.com/43979066/140799839-d39c8543-e02a-47d4-b532-3ff27f9d8ccd.gif">
  
<br>

- PIXI를 이용해 다양한 애니메이션 효과 구현

    |식물 물주기|블라인드 열고 닫기|식물 성장 미리보기|
    |:---:|:---:|:---:|
    |<img width="300" alt="growth-effect" src="https://user-images.githubusercontent.com/43979066/140728477-558718b0-5db0-4a76-9c7f-29dd083d8355.gif">|<img width="300" alt="growth-effect" src="https://user-images.githubusercontent.com/43979066/140729270-c4b7b5d5-5ad3-4842-8211-e43370f6006d.gif">|<img width="300" alt="growth-effect" src="https://user-images.githubusercontent.com/43979066/140742024-435210c2-97a2-4b5b-b235-88958051ea97.gif">|
  
<br>

- 식물의 실시간 상태를 반영하여 식물의 향후 일주일 동안의 모습을 보여주는 **Time Traveling** 기능
  
  <img width="970" alt="growth-effect" src="https://user-images.githubusercontent.com/43979066/140730734-45f1b48c-d325-45ff-a226-46f7dac23b18.gif">
  
  ✔️ 블라인드가 닫혀있는 경우 광합성 게이지 감소 <br>
  ✔️ 식물의 물주기 날짜에 물 게이지 비워짐 <br>
  ✔️ 식물의 성장주기 날짜에 다음 단계로 성장

  <details>
  <summary><b>식물 게이지 및 감점 상세 기준</b></summary>

    💧 물주기 게이지

    - 물 게이지는 물주기 날짜에 따라 1칸, 3칸, 5칸으로 설정됩니다.
    - 물조리개로 물을 주면 한 칸이 채워집니다.
    - 물주기 날짜마다 게이지가 비워집니다.
    - 비오는 날은 게이지가 모두 채워집니다.

    🌞 광합성 게이지

    - 24시간동안 창문을 열어놓으면 게이지가 증가합니다.
    - 24시간동안 창문을 닫아놓으면 게이지가 감소합니다.

    ✔️ 감점 기준

    - 물주기 게이지가 꽉 찬 상태에서 물을 더 줄 경우
    - 양지식물)광합성 게이지가 모두 소모되고 창문이 닫힌 상태에서 24시간이 지나는 경우
    - 음지식물)광합성 게이지가 가득 찬 상태에서 창문이 열린 상태에서 24시간이 지나는 경우

    🚨10점 이상 감점시 해당 식물이 죽습니다.
</details>
<br>

- Error Handling
  - React: React Error Boundary를 이용한 에러 핸들링 
  - Express: Custom Error Class를 이용한 에러 핸들링

- Test Case
  - FrontEnd: Unit | Reducer | E2E Test 작성
    <img width="900" alt="landing-page" src="https://user-images.githubusercontent.com/43979066/143600266-c542c12d-3595-4e60-adb3-6ed78106542b.gif">
  - BackEnd: Unit Test 작성

<br>

# **🕋 STACK**

- **Frontend**
  - JavaScript ES2015+
  - Firebase Auth
  - React
  - Redux(ToolKit)
  - PIXI
  - Date-Fns
  - Styled-component
  - React Testing Library
  - Jest
  - <details>
      <summary>MSW</summary>
      Redux Thunk를 이용한 백엔드 서버로의 http요청을 검증하기 위해 MSW(Mock Service Worker)를 사용하였습니다. <br>
      MSW는 Mock 서버를 구축하지 않아도 API를 네트워크 수준에서 Mocking 할 수 있도록 해주는 라이브러리로 Redux Thunk에서 발생한 HTTP 요청을 가로채 코드의 서비스 로직을 변경하지 않고도 실제 API요청을 핸들링할 수 있습니다. 
    </details>

- **Backend**
  - JavaScript ES2015+
  - Node.js
  - Express
  - MongoDB & Mongoose
  - Puppeteer
  - JSON Web Token Authentication
  - Mocha
  - Chai
  - Supertest
  - ESLint

<br>

# **🕹 USAGE**

### **Requirements**

- 최신 버전의 Chrome Browser 사용을 권장합니다.
- Local에서 실행하기 위해 사전 준비가 필요합니다.
  - [Firebase API](https://firebase.google.com/?hl=ko)
  - [Open Weather Map](https://openweathermap.org/)
  - [MongoDB](https://www.mongodb.com/)

### **Installation**

Root 디렉토리에 `.env` 파일을 생성하고, 다음 환경변수를 입력하고 실행합니다.

- Frontend

  ```jsx
  REACT_APP_FIREBASE_API_KEY=<YOUR_FIREBASE_API_KEY>
  REACT_APP_FIREBASE_AUTH_DOMAIN=<YOUR_FIREBASE_AUTH_DOMAIN>
  REACT_APP_FIREBASE_PROJECT_ID=<YOUR_FIREBASE_PROJECT_ID>
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<YOUR_FIREBASE_MESSAGING_SENDER_ID>
  REACT_APP_FIREBASE_APP_ID=<YOUR_FIREBASE_APP_ID>
  REACT_APP_BASE_URL=https://growing-green-server.online
  REACT_APP_WEATHER_API_URL=http://api.openweathermap.org/data/2.5/weather?q=seoul&appid={YOUR_APP_ID}
  ```

  ```jsx
  $ git clone https://github.com/growing-green/growing-green-frontend.git
  $ cd growing-green-frontend
  $ npm install
  $ npm start
  ```

- Backend

  ```jsx
  TOKEN_SECRET_KEY={YOUR_TOKEN_SECRET_KEY}
  MONGO_DB_URL={YOUR_MONGO_DB_URL}
  ```

  ```jsx
  $ git clone https://github.com/growing-green/growing-green-backend.git
  $ cd growing-green-backend
  $ npm install
  $ npm start
  ```

<br>

# **🌵 DEPLOY**

- **Frontend** : Netlify를 이용한 Client 배포
  - 배포 주소: https://growing-green.online

<br>

- **Backend** : AWS Elastic Beanstalk을 이용한 Server 배포
  - 배포 주소: https://growing-green-server.online

<br>

# **🌳 TECHNICAL LOG**

  >PIXI를 선택한 이유
  >- ❌ `Canvas API`: 짧은 시간 안에 많은 양의 코드를 작성해야 했기때문에 라이브러리의 도움을 받기로 선택했습니다. 
  >- ❌ `Phaser`: 게임에 최적화된 프레임워크이기 때문에 게임에 특화된 다양한 메서드를 이용할 수 있지만 이 프로젝트에서 그러한 기능까지는 불필요하다고 판단하였습니다. 
  >- ⭕️ `PIXI`: 2D webGL을 렌더링해주는 라이브러리로 비슷한 라이브러리들 중 가장 사용자수가 많고 지속적으로 업데이트가 되고있어 선택하였습니다.
  >- ❌ `React-Pixi` 또는 `React-Pixi-Fiber`: 리액트의 컴포넌트 생명주기에 맞춰서 로직을 적절히 변형해주어 마치 컴포넌트를 작성하듯이 이미지 객체를 생성할 수 있게 해줍니다.
  그러나 이번에 처음으로 `Canvas API`를 접하는 저로서는 추상화된 메서드를 가져다 쓰는 것보다는 직접 구현해보는 것이 좋은 경험이 될 것 같다고 생각하였습니다.

### **식물 상세 페이지 렌더링 최적화**

|BEFORE|AFTER|
|:---:|:---:|
|<img width="400" alt="growth-effect" src="https://user-images.githubusercontent.com/43979066/140772925-e3e06da9-a359-440e-9e7d-4622e03da698.gif">|<img width="400" alt="growth-effect" src="https://user-images.githubusercontent.com/43979066/140772915-92520c93-a155-46a9-a4dc-b2f77b5712cf.gif">|

식물 페이지(`<PlantPage>`)가 기존에는 React Router를 이용한 페이지 라우팅 방식으로 페이지가 전환되어 화면 간 전환이 매끄럽지 않았습니다. 그래서 식물 페이지가 라우트될 때 모든 Plant의 Container를 미리 생성하고 화살표 버튼을 클릭하면 Canvas Application 내에서 Plant Container를 교체하는 방식으로 로직을 수정하였습니다. 

결과적으로 식물 페이지의 첫 로딩 시간이 길어졌고 페이지 새로고침시 첫 번째 식물로 돌아가게 된다는 단점이 있지만 좀 더 자연스럽고 효율적인 렌더링을 구현할 수 있게 되었습니다.

### **Canvas 로직 내에서 State를 사용하지 못함**

하나의 Root div내에 여러 개의 컴포넌트가 렌더링되는 리액트와 유사하게 PIXI에서도 하나의 Root Container개념인 `Stage`내에 `Display Object`로 만들어진 여러 개의 이미지 객체들이 그려지게 됩니다.

처음에 상태 변화를 고려하지 않고 `Stage`를 화면의 영역별로 `Container`로 나누어 코드를 작성했을 때는 리액트에서 컴포넌트를 분리하듯이 `Container`를 분리할 수 있었습니다. 그러나 리덕스를 사용하여 해당 값들을 DB에서 불러와 식물의 상태를 State로 관리하자 식물의 변화가 제대로 화면에 보여지지 않았고 이벤트가 중첩되어 애니메이션 효과가 버벅거리거나 아예 작동이 되지 않는 경우가 발생했습니다.

원인은 컴포넌트가 리렌더링 될 때마다 캔버스 Application이 새로 정의되면서 Root Conatiner 역할을 하는 `Stage`도 매번 새로 생겨나기 때문이었습니다. 그래서 이벤트가 발생해 식물의 상태가 변화할 때, 리렌더링은 일어나지 않으면서 식물의 변화된 상태가 화면에 렌더링되어야했습니다.

그래서 컴포넌트 내에 let 변수들을 선언하고 식물 이미지 객체를 변수에 저장하여 이벤트가 발생하면 리덕스 dispatch로 식물의 상태 변화를 DB로 전달하고 동시에 변수로 선언되어있는 이미지 객체에 속성값을 할당함으로써 문제를 해결하였습니다. 결과적으로 식물의 상태를 let 변수와 리덕스 두 곳에서 관리하게 되어 비효율적인 코드를 작성하게 되었다는 점에서 아쉬움이 남습니다.

### **Firebase 버전 업데이트**

Firebase를 이용한 구글 로그인 구현중 Firebase라이브러리에서 임포트한 firebase 객체가 `undefined`로 출력되었습니다. 로직 상의 문제라고 생각해 firebase가 `undefined`로 나오는 경우에 대한 구글링을 열심히 해봤지만 해결방법을 찾지 못했습니다. 바로 전 프로젝트 때 구글 로그인을 구현하는 데 까지 성공했기 때문에 그때 코드를 그대로 가져오고, firebase에서 프로젝트도 여러 번 다시 만들어 보며 문제점을 찾으려 했지만 꽤 오랜 시간동안 찾지 못했습니다.

꽤 많은 시간을 허비하고나서 알고보니 Firebase 라이브러리 버전 업데이트로 인한 문제였습니다. Firebase의 Release Note를 살펴보니 불과 얼마 전 `8.x.x`에서 `9.x.x`으로 major한 업데이트가 있었고 firebase 객체를 임포트하는 로직에도 변화가 있었습니다. 업데이트된 버전에 맞추어 로직을 수정함으써 문제를 해결할 수 있었습니다.  

앞으로 라이브러리를 사용하기 전에 꼭 Github Issue페이지와 버전 업데이트 내역에 대해서도 꼼꼼히 살펴본 후 사용해야겠다는 다짐을 하게 되었습니다.

<br>

# **💡 THINGS TO DO**

- **개화기에 따라 꽃피워주기**
  
  현재 날짜가 해당 식물의 개화기이고, 식물의 성장단계가 3단계라면 식물에서 꽃 피는 효과 구현하기

- **Puppeteer 검색 로딩 시간 최적화하기**
  
  한 번 이상 검색된 식물은 DB에 저장하기

- **통합 테스트 작성하기**(완료)

  - ~~상위 컴포넌트 단에서 Integration 테스트작성하기~~
  - ~~브라우저 환경에서 어플리케이션의 전체 동작을 테스트하는 E2E 테스트 작성하기~~
  
- **외부 사이트에 대한 의존도 줄이기**

  - [식물 정보 제공 사이트](https://www.treeinfo.net/)에 등록되어있는 모든 식물 정보(약 6300종)를 DB에 저장해 사용하기
  - 사용자가 임의로 식물의 물주기와 광도를 설정하여 식물을 등록할 수 있도록 추가하기
  - 의존하는 외부 사이트를 여러개 마련하기(한 사이트에서 에러가 발생하면 다른 사이트에서 검색)
