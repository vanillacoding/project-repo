# 🏃🏻 Bits

**Bits**는 자신이 원하는 습관을 구독하고. 팔로우한 친구들과 함께 자신이 구독한 습관을 성취해나가는 앱입니다.

# 🎥 발표영상

<img width="1243" alt="프로젝트 발표" src="https://user-images.githubusercontent.com/72064489/119790455-ea858b80-bf0e-11eb-81e3-f09d760f8916.png">
<a href='https://youtu.be/F8OHnevCS30?t=2523'>유튜브 링크 [ 42분 03초 ~ 47분 15초 ] </a>

# 📌 Table Contents

- [Inspiration](#💡-Inspiration)
- [Features](#⚙️-Features)
- [Tech Stack](#🛠-Tech-Stack)
- [Requirements](#🎯-Requirements)
- [Installation](#📀-Installation)
- [Project Schedule](#🗓-Project-Schedule)
- [What i learend](#🧘🏻‍♂️-What-i-learned)
- [Improvements](#📈-Improvementss)

# 💡 Inspiration

- 나이키 Run 앱을 사용하면서 `달리기`라는 종목에 국한 되지 않고, 다양한 습관들은 이러한 형태로 진행할 수 있으면 어떨까 라는 생각에서 시작하게 되었습니다.
- 단순히 나 혼자 습관을 쌓는데 그치지 않고 내가 구독한 습관을 공유하는 유저에게 자극을 받기도 하고, 반대로 내가 응원하는 사람들에게 지지를 보내 서로가 서로에게 좋은 영향력을 끼칠 수 있는 소셜미디어를 만들고 싶었습니다.
- 작은 습관과, 작은 보상 혹은`성취도`를 통해 내 `정체성`을 형성 하고. 타인과의 공유를 통해 `지속성`을 유지할수 있다고 생각했었습니다.
- 주체 자체는 단순하고, 지루할 순 있지만 휘발적이고 자극적인 앱들에 비해 SNS의 순기능을 잘 이용하고 있는 앱은 부족하다는 생각이 들어 나부터 즐겁게 이용할수 있는 앱을 만들자는 생각에서 부터 시작하게 되었습니다.

# ⚙️ Features

- **구독하고 싶은 습관을 선택해서 등록하고 취소**할 수 있습니다.
- 습관 구독 시 **원하는 달성 목표일과 시간을 설정**할 수 있습니다.
- 구독 습관 완료 시 **프로필 페이지에 완료 습관 목록**으로 설정되고 습관 레벨에 따른 아이콘이 설정됩니다.
- 유저 습관 시작 시 **팔로워 들에게 습관 시작 푸쉬 알림**이 전송됩니다.
- 프로필 달력을 통해 **습관 완료 일에는 체크박스가 표시됩니다**.
- 친추 추천 목록에서 **검색을 통해 내가 원하는 친구**를 찾을 수 있습니다.

# 🛠 Tech Stack

### Frontend

- ES2015+
- React-Native
- Expo
- Redux
- Thunk
- Toolkit

### Backend

- Ndoe.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokne Authentication

### Test

- **Frontend**
  - Jest-expo
  - React-test-renderer
  - Testing-library/jest-native
  - Testing-library/react-native

- **Backend**
  - Mocha
  - Chai
  - Supertest

# 🎯 Requirements

- IOS환경에서의 실행을 권장합니다.

# 📀 Installation

Local환경에서 실행시 아래와 같이 준비가 필요합니다.

### Client

Root 디렉토리에 .env 파일을 만들고 다음과 같이 설정해주세요

```
SERVER_URL=<YOUR_IP_ADDRESS_WITH_PROT>
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

# 🗓 Project-Schedule
전체 기간 **2021. 5. 3(월) ~ 2021. 5. 21(금)** 총 3주

### `1st week - planning`
- 아이디어 구상 + 기술 스택 검토
- [Figma를 이용한 Mockup 작업](https://www.notion.so/Mock-up-02ccbae0324c4527a121f7e23adb41e8)
- GitHub Repository Setting(Client / Server 분리)

### `2nd week - devloping`
- Local Login & JWT TOKEN 로그인
- User data Mongo DB 저장
- React native navigator 흐름 구축
- React native 필요한 screens 생성
- Front Back 연동, 주요 Feature 완성

### `3nd week - testing and deploying`
- Refactoring & Styling
- Frontend & Backend Test code 작성

# 🧘🏻‍♂️ What i learned

### React Native

앱을 구축하는 여러 기술들이 존재하지만 기존에 React를 사옹해왔기 때문에 상대적으로 친숙하고, 러닝커브가 낮은 Native를 이용해 개발을 진행하였습니다. 개발을 진행하기에 앞서 우선적으로 React와 React Native의 차이점이 뭘까에 대한 의문점을 시작으로 React Native만이 가지는 특징들 **핫 리로딩 자동으로 저장된 결과물이 반영 된다는 점**, **가상 Dom 대신 native api를 이용하여 JS code를 React 컴포넌트로 렌더링 할수 있다는 점** 등등 이 있지만 이번 프로젝트를 하면서 가장 크게 느꼇던 차이점은 Native는 **Router**가 아닌 **Navigator**를 통해 Stack 구조의 life cycle을 가진다는 점이였습니다.

Home screen에서 습관 실행버튼을 누르고 완료하게 되면 카운트다운 버튼 컴포넌트가 언마운트 되고 기존의 Home 화면으로 돌아가게 되는 시나리오를 구축했었는데 카운트다운 버튼이 종료되고 navigation hook을 통해 home으로 이동하였지만 여전히 카운트다운 버튼이 남아있는 현상을 겪었었습니다. Home sceen으로 이동하였지만 마지막에 mount된 component가 최상단에 존재하게 되고 pop되지 않는 현상 때문에 문제가 됬었습니다. 그래서 상태값을 통해 rerndering이 일어나게 해줘야 한다고 생각하였고 리액트에서 리렌더링을 시킬 수 있는 경우의 수는 **1. state 변경, 2. porp 변경, 3. key prop 변경, 4. force-rerender** 이 4가지만 존재하기 때문에 Home screen에서 상태값과 조건부 렌더링을 통해 unmount시킨 후 문제를 해결할 수 있었습니다.

새 기술을 접하면서 모든 걸 완벽하게 숙지하고, 구조를 설계한 후 진행 할 순 없겠지만. 직접 코드를 작성해가며 발생한 문제점들과 부딪히면서 사전에 조사한 자료들을 더 잘 이해할 수 있었고, 이런 과정이 반복되야 내 지식으로 체화 시킬수 있겠다고 생각했었습니다.

### Contemplation of using hooks

이번 프로젝트를 진행하면서 기존에 container component를 만들고 하위로 prop을 통해 값을 전달해주는 방식이 아닌, useDispatch, useNavigation, useSelector 등 hook을 통해 상태 값을 handling 해줬습니다. 이런 방식으로 작업을 진행하면서 각각의 작업 방식에 대해 고찰해보게 되었습니다.

**장점으로는** 컴포넌트의 구조에 상관 없이 내가 원하는 컴포넌트에서 값을 조회하고 dispatch를 통해 조정 할 수 있으니 직관적이고, 편리하다고 생각했었습니다. 또 prop에 대한 의존도도 떨어지니 각각의 컴포넌트가 더 독립적으로 존재하게 되고, 기존 컨테이너 컴포넌트에서 모두 가지고 있던 큰 부피의 비지니스 로직들이 분산되어 자식 컴포넌트에서 부담을 나누게 되니 가독성도 좋아졌습니다.

**단점으로는** 모든 로직들이 분산되어있으니 흐름을 추적 하려면 일일이 파일을 다 조회해봐야하기 때문에 동기적인 흐름을 파악하기 어려웠습니다. **container component, presentational component** 형태로 구성되있을 시 container component만 조회 해도 로직이 한 곳에 밀집되있기 때문에 다른 파일들을 조회하지 않아도 로직의 흐름을 이해할 수 있었습니다.

이를 토대로 제가 느낀 점은 SPA를 작업할 때는 hook을 이용한 작업 방식을 채용하고, 팀 단위로 작업하고 확장성을 고려해야하는 프로젝트를 진행할 때에는 container, presentational component를 이용한 작업 방식을 진행해야겠다는 생각이 들었습니다.

### Redux toolkit && thunk

[1차 프로젝트](https://github.com/steeltroop/pong-frontend) 당시 게임을 만들다 보니 비동기 처리가 끝난 후 값을 넘겨줘야 하는 상황이 없었습니다. 이번 프로젝트 에서는 데이터베이스와 교류해야 하는 상황들이 많았고, 이를 제어하기 위해 toolkit과 thunk를 사용하게 되었고 몇 가지 특징들을 체감하게 되었습니다.

**첫번째** 기존 redux 사용 시 1개의 액션을 생성해도 **action type, action creator, reducer** 등의 전부 정의 해줘야 하기 때문에 코드의 양이 엄청나게 늘어날 뿐만 아니라, 저장소 구조 자체도 복잡했었습니다. 하지만 toolkit을 이용하면 이 모든 정의들이 한 파일 구조 내에서 가능하고 조회를 하는 복잡성도 줄어들기 때문에 가독성이 엄청나게 증가했었습니다. 에러가 났을때도 상태값 업데이트와 관련된 오류는 한 파일 내에서 발생한다는 확신이 있으니 수정하는 시간도 줄어들었습니다.

**두번째** 컨테이너 컴포넌트에서 존재하던 비지니스 로직들이 없어지고 thunk에 비동기 관련 처리 액션이 위임되기 때문에 코드가 더 깔끔해졌다는 장점 뿐만 아니라, 비동기 적인 흐름을 직접 제어하기 때문에 비동기가 진행 중인 시점에 원하는 형태로 ui를 조작하거나, 상태값을 비동기 작업이 끝난 후 갱신 시켜주는 등 동기적인 흐름으로 코드를 작성할 수 있었고, 비동기적인 흐름에 대한 주도권을 가질 수 있다는 점이 편리했습니다.

**마지막으로** 두번째 내용에서 언급했듯 비동기 관련 처리 액션이 위임되기 때문에 컴포넌트 입장에서는 코드가 깔끔해졌다고 할 수 있지만, thunk 내부에 있는 로직의 복잡도가 증가했습니다. 프로젝트를 계속 진행해온 개발자의 입장에서는 코드를 이해하는데 어려움이 없지만, 협업을 하는 상황에서 제 3 자의 입장에서는 코드를 이해하는데 들여야 하는 시간이 더 많이 늘어나겠다는 생각을 햇었습니다. 또 각 컴포넌트 내부에서 hook을 통해 값을 조회하기 때문에 테스트 코드를 작성하기 어려웠습니다. 이런 이유 때문에 thunk가 가진 복잡도 때문에 함수가 **순수하지 않다**라고 느껴졌고, functional programming을 왜 지향하는지, 순수한 값을 반환하는 함수, 그 함수가 반환하는 값에 대한 신뢰성에 대한 중요도에 대해서 더 잘 이해할 수 있게 되었습니다. 앱의 규모가 커질수록 순수 함수가 가지는 영향력이 커질것 같다고 생각했습니다.

# 📈 Improvements

- React Native Expo를 이용하면서 **bare workflow 와 managed workflow** 두 가지의 방향으로 작업을 진행할 수 있었습니다. push notification 이나 build service 등 직접 설정해줘야 하는 부분들을 expo에서 자동으로 build 해주기 때문에 편리하게 작업을 할 수 있었습니다. 하지만 작업을 하면서 expo에서 대체해주는 생략된 과정들이 어떤것들인지 직접 겪어봐야 흐름을 이해할 수 있을것 같다는 추후에 앱 작업을 할 일이 생긴다면 bare workflow를 통해 진행해 봐야겠다는 생각이 들었습니다.

- 이번 프로젝트를 하면서 custom hook을 이용해 재사용성을 높여주는 로직을 작성하려고 했습니다. 전체적인 로직들을 다 적고 리팩토링을 시작하려고 하니 함수 내에서 외부에 의존하는 있는 값들이 많아 커스텀 훅으로 추출해내기가 어려웠습니다. 그리고 의존된 값들이 많아질수록 컴포넌트를 테스트 하기도 어려워 졌습니다. 왜 사람들이 순수함수를 지향하는지 알 수 있었고. 믿을 수 있는 값을 반환하는 순수함수를 통해 확장성도 달라질수 있겠다는 생각이 들었습니다.
