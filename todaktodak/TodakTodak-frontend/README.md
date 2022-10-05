## 토닥토닥
토닥토닥은 개인의 고민을 작성하고, 공유하며 서로를 위로해줄 수 있는 앱입니다.

## Motivation
개인의 고민을 친한 친구들이나 가족들에게 말할 수 있지만 때론 나라는 걸 밝히지 않고,<br>
이야기하고 싶은 고민들을 편하게 털어놓고 싶은 공간이 필요했습니다.

더불어 이와 같은 의도를 가지고 만들기 위해 웹이 좋을지 앱이 좋을지를 생각했습니다.<br>
사용자가 고민이 있을 때 앱이라는 플랫폼을 통해 보다 빠르고 쉽게 접근할 수 있을 것 같아<br>
앱으로 개발하게 되었습니다.

## Feather
- 나의 고민을 작성, 수정, 삭제를 할 수 있습니다.
- 작성된 고민에 좋아요(토닥 토닥) 기능을 사용할 수 있습니다.
- 작성된 고민에 댓글을 달거나, 댓글들을 확인할 수 있습니다.
- 작성된 댓글에 좋아요 및 친구 추가 기능을 사용할 수 있습니다.
- 요청 들어온 친구 목록들을 관리할 수 있습니다.
- 수락된 친구들과 1 대 1 채팅을 할 수 있습니다.
- 내가 읽지 않는 메시지 수를 보여줍니다.

## Installation
### Client
```
SERVER_URL=<IP_ADDRESS>
```

### Server
```
MONGO_URL=<YOUR_MONGO_URL>
SECRET_TOKEN=<SECRET_STRING>
```

- 개인의 MongoDB 계정 및 Cluster가 필요합니다.

## Technology stack
### Client
- React-Native
  - 앱 개발을 위해 React-native를 선택했습니다.
- Expo
  - React-Native의 빠른 개발을 위해 사용했습니다.
- Redux-Toolkit
  - 서버를 통해 받아온 상태값들을 관리하기 위해 사용했습니다.
- Thunk (Redux-Toolkit 제공)
  - thunk를 통해 비동기적 흐름을 제어했습니다.
- Socket.io
  - 실시간 통신 기능 구현을 위해 사용했습니다.

### Server
- Node.js
  - Javascript를 사용한 서버 개발이 가능하기에 사용했습니다.
- Express
  - Node.js 서버 개발 시 가장 보편적으로 사용되는 프레임워크이기에 사용했습니다.
- MongoDB
  - Javascript를 기반으로 하는 Node.js와 호환이 좋기에 사용했습니다.
- Mongoose
  - MongoDB에서 정형화된 Schema 사용을 위해 사용했습니다.
- Socket.io
  - client와 실시간 통신을 위해 사용했습니다.

## Develop period
<2021/05/03 ~ 2021/05/21>

### 05/03 ~ 05/06
- 개발 아이디어 선정 및 Figma를 통한 mockup design 및 Schema 작성
  - Figma 주소: [https://www.figma.com/file/wCZKddLMLTedTdmOQCdiCU/토닥-토닥?node-id=0%3A1&frame-preset-name=iPhone 11 Pro %2F X](https://www.figma.com/file/wCZKddLMLTedTdmOQCdiCU/%ED%86%A0%EB%8B%A5-%ED%86%A0%EB%8B%A5?node-id=0%3A1&frame-preset-name=iPhone%2011%20Pro%20%2F%20X)

  - Schema 주소: https://lucid.app/lucidchart/invitations/accept/inv_64ccebb4-c87b-4aa6-8b8d-cb89bd36c925

### 05/06 ~ 07
- Client쪽 초기 Layout 작업 및 Server 초기 상태 구축, schema 작성

### 05/08 ~ 14
- 메인 기능에 대한 상세 Layout 작업 및 Server DB 메인 기능 controller logic 구현

### 05/15 ~ 16
- Redux Toolkit을 통한 상태 관리

### 05/17 ~ 21
- 버그 수정 및 코드 리팩토링 작업

## 구현 중 어려웠고, 고민했던 점

### React Native Navigator
React에서 Router가 있다면 React Native에서는 Navigator이 있습니다.<br>
Stack Navigation을 통해 Screen을 이동했을 경우 Stack 구조로 해당 Screen들이 쌓이게 되는데 이 때 한 번 <br>
실행했던 Screen을 이 후에 다시 이동하더라도 웹처럼 unmount가 되는 형태가 아닌 기존의 Stack에 쌓여있던 Screen을<br>
그대로 보여준다는 점이 특징입니다.

웹에서는 페이지 이동시 componentWillUnmount을 통해 unmount가 되며, 이 후 다시 해당 페이지로 돌아올 때 mount가 되는<br>
life cycle을 기반으로 로직을 구성했는데 React Native에서도 비슷한 맥락으로 매 Screen이 focus 될 때마다 실행되는<br> useEffect 로직을 구성했습니다. 그러나 위에서 언급한 Stack 구조로 쌓이는 형태로 인해  useEffect가 실행되지 않고,<br>
계속해서 맨 처음의 상태값을 토대로 렌더링을 하는 문제를 겪게 되었습니다.

React Native 공식 문서와 구글링을 통해 해당 특징과 해결 방안을 찾아보았고 React Native Navigation에서는<br>
사용자가 해당 Screen에서 벗어났을 때, 다시 돌아왔을 때를 Screen 별 화면 구성 요소에 이벤트를 내 보낸다는 점을 알게 되었습니다.<br>
화면에 다시 때는 focus, 화면에서 떠났을 경우에는 blur라는 이벤트를 통해 스크린 이동을 감지할 수 있고,<br>
이를 기반으로 navigation.addListener("focus", () => {})라는 방식으로 useEffect 내의 로직을 실행할 수 있었고,<br>
두 번째 방법으로는 useFocusEffect라는 react-navigation에서 제공하는 hook을 통해<br>
내부의 로직을 원하는 시점에 실행할 수 있었습니다. 현재는 useFocusEffect hook 방식을 사용하고 있습니다.<br>

처음 프로젝트 진행 전 사용할 기술 스택에 대해서 특징들을 알아보고, 이러한 특징들이 있구나 라고 파악하고 들어갔지만,<br>
결국은 직접적으로 문제에 직면해봐야 알아봤던 특징들 그리고 문제점들을 알 수 있었습니다.<br>
여러 레퍼런스, 자료에 대한 이해도가 부족했기에 발생된 문제점이었고 이는 이러한 과정들을 수없이 반복해야 한다는 걸<br>
몸소 느낄 수 있었습니다.

### DB 요청과 사용자 경험에 대한 고민
초기 앱 설계 단계에서 Public Screen에 대한 로직을 구성할 때 각 카테고리 별로 이동 시<br>
계속해서 갱신된 데이터를 받아오는 방식으로 기능 구현을 진행했습니다.<br>
위와 같은 방식은 여러 문제점을 야기했습니다.<br>
❗️Category 이동 시 계속 로딩창이 보이면서 사용자 경험이 현저히 떨어집니다.<br>
❗️ DB에 요청하는 횟수가 굉장히 잦아 나중에 트래픽이 증가한다면 문제의 원인이 될 수 있습니다.<br>
❗️갱신된 정보가 없을 경우 불필요하게 똑같은 데이터를 요청하는 경우가 발생합니다.<br>

문제 해결을 위해 첫 번째로 적용한 해결 방책은 `**Pagination으로 요청하는 데이터 양을 통제**`하는 것입니다.<br>
구현을 하면서 많은 데이터를 한 번에 불러오는 것이 아닌 일정한 데이터 양을 요청한다는 점에서<br>
DB에 부담을 줄여줄 수 있을거라고 생각했습니다.<br>
**이를 구현하기 위해 mongoose의 skip, limit을 사용했으며, skip은 가져오는 데이터를 정해진 수량에 의해 건너 뛰는 기능이며, limit은 가져오는 데이터의 양을 제한을 걸어주는 기능을 해줍니다.**

기능 구현을 한 후 문제 해결의 근본적인 해결책은 아닌 듯하여 기능은 유지하지만 다른 방법을 생각해보았습니다.

해당 문제를 해결하기 위해 나온 여러 솔루션들에 대해서 멘토님, 동기들과 공유하며 제가 바라보는 관점 그리고 다른 분들의 관점들을<br> 참고하며, 검증 절차를 걸쳐 두 번째 해결방안을 적용했습니다.

두 번째 해결방안은 매번 DB 요청 함수를 실행하는 것이 아닌 Redux를 통한 상태 관리를 기반으로 <br>
처음으로 **확인한 Category인 경우 DB에서 요청 후 Redux 상태값으로 관리하고, 이 후에는 DB가 아닌 Redux의 상태값을 통해 렌더링하는 방식**으로 로직을 수정했습니다.

이를 통해 Category 이동 시 매번 로딩창이 보이는 횟수, DB에 요청하는 횟수를 줄일 수 있었고, 유저가 갱신을 원할 경우를 위해<br> **FlatList의 refreshControl를 이용하여 최상단에서 위로 스크롤할 경우 데이터를 갱신하는 방식을 사용했습니다.**

위 해결 방안은 매번 DB 요청 함수를 실행하는 것이 아닌 Redux를 통한 상태 관리를 기반으로 한 번 가져왔던 내역은<br>
상태 관리를 하고 이 후 해당 카테고리에 내용은 Redux state에서 데이터를 가져오는 방식을 사용했습니다.<br>
위 방식을 통해 문제점들을 해소할 수 있었습니다.

### Redux & Redux-Toolkit
위의 사용자 경험에 대한 고민의 해결 방식이었던 Redux를 통한 상태 관리 과정에서 기본 Redux가 아닌 Redux-Toolkit을<br> 사용했습니다. 두 가지 방식을 사용하면서 느낀 차이점들이 있었습니다.

**Redux flow를 위한 기본 코드 양**
기본 Redux를 사용하기 위해서는 굉장히 많은 기본 파일, 코드들이 요구되었습니다.<br>
action, action type, reducer가 존재하는데 이는 코드의 흐름을 파악하기 위해<br>
여러 파일을 확인해야한다는 점과 같은 불편함이 존재했습니다. 일률적인 상태값 관리 흐름을 만들어준다는<br>
강점이 있지만 이와 같은 불편함을 해소할 수 있는 방법을 찾으면서 Redux-Toolkit을 알게 되었고,<br>
이는 기존 Redux에서 겪었던 불편함들을 해소시켜주었습니다.<br>
하나의 파일에서 action creator, reducer를 관리하며 문제 발생 시 더욱 빠른 추적을 할 수 있었습니다.

기존 Redux의 reducer에서는 switch를 사용하지만, Redux-Toolkit에서는 사용하지 않는다는 점과<br>
내부적으로 immer와 같은 불변성을 지켜주는 기능이 존재하여 이전에<br>
불변성을 위해 배열에서는 map을 사용하고, 객체에서는 Object.assign 사용하는 로직들을<br>
사용하지 않는다는 부분도 장점으로 느껴졌습니다.

**비동기 함수에 대한 제어 방식 - createAsyncThunk**
관리하고자 하는 상태값들이 대부분 DB에서 받는 데이터이므로 thunk를 통한 비동기 제어는 필수였습니다.<br>
기존 Redux-Toolkit에서는 createAsyncThunk를 제공해줌으로서 비동기 함수를 제어했습니다.<br>
createAsyncThunk에 대해서 공부하면서 굉장히 큰 이점을 발견할 수 있었습니다.<br>
바로 해당 action에 대한 상태명을 통해 상태값들을 제어할 수 있다는 점이였습니다.<br>
pending, fulfilled, rejected와 같은 promise에서 보았던 상태값들을 확인할 수 있었고,<br>
pending 상태일 경우에는 loading 상태값을 true로 바꿔 로딩창을 보여주고,<br>
rejected, fulfilled일 경우 false로 바꾼 후 각각의 상태에 맞춰서 상태값들을 바꾸는 형태로 로직을 구현할 수 있었습니다.

## Comment
이번 프로젝트 개발을 통해 기획, 디자인, 일정 관리, Server, Client와 같은 전체적인 개발 프로세스를 경험하며<br>
위 과정 간에 유기적인 흐름에 대해서 이전에 비해 이해도가 높아졌다는 느낌을 받았습니다.<br>
단편적으로 Client 개발, Server 개발 각각의 과정을 따로 공부했을 때는<br>
이 과정들이 어떻게 일련의 과정으로 업무가 진행되는 거지? 와 같은 의문점이 들었기에<br>
특히 이번 프로젝트 기간이 뜻 깊었습니다.

특히 이번 기간 동안 앱을 만들면서 다른 분들에게 한 번씩 사용하면서 불편한 점을 피드백 받는 것이<br>
굉장히 중요하다는 점을 다시금 느낄 수 있었습니다.<br>
개발을 하고 있는 개발자 입장에서는 굉장히 많은 테스트를 통해 하나의 기능을 추가하게 되고,<br>
이 과정에서 익숙함으로 인해 불편함을 느끼는 부분이 현저히 줄어든다는 점이 느껴졌습니다.<br>
주변 동기 분들에게 한 번씩 테스트를 부탁드리며 어떤 점이 불편한지 왜 불편한지에 대한 피드백을 들으면서<br>
소통의 중요성을 느낀 시간이기도 했습니다.<br>

더불어 다른 SNS 어플리케이션을 설치 후 사용하며, 저와 비슷한 기능들
예를 들면 Category 별 post에 대한 UI/UX를 어떤 방식으로 처리했는지를 살펴보면서<br>
"왜 이렇게 처리했을까?"에 대한 의문을 품으며 스스로 생각하고 깨달음을 얻으면서 제 앱에 적용해보는 과정을 통해<br>
무언가를 개발할 때 여러 커뮤니티와 상용 앱들을 최대한 많이 사용해보면서 경험하는 것도<br>
굉장히 중요하다는 점을 느낄 수 있었습니다.
