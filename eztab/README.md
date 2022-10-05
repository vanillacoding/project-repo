# EzTab

Easy Tab lets you have Easy Life

# What is EzTab?

탭 세팅을 관리하는 크롬 익스텐션입니다.

# Who is the target for EzTab?

저처럼 업무를 할 때 탭을 많이 키는걸 선호하는 사람들을 위해서 만들었습니다.

# Why made EzTab

프로그래밍할 때 찾고 찾고 찾다보면 탭이 백개가 넘고 윈도우가 네댓개가 넘어갈 때가 있었는데

그럴 때 컴퓨터 성능저하도 무척 답답하고 껐다가 다시 원할 때 언제든지 어떤 컴퓨터에서든 쓰고 싶어서 만들게 되었습니다.

# HOW?

### Roadmap

[](https://www.notion.so/3332e5e6df834126abcac61d26b1a1dc)

### Note

[](https://www.notion.so/b7613b3688384c6fb4f550666adba90e)

### Tech Stack

- Frontend
  - Javascript -
- Libraries
  - Chrome API - to get tab information
  - Lodash - for debounce
- Bundler
  - Webpack

### Why Webpack?

1. 서로 다른 패키지들의 글로벌 변수때문에 예상치못한 충돌이 발생하는걸 방지
2. ES6 이전에는 모듈이 존재하지 않아서 표준은 아니지만 유명한 AMD나CommonJS같은 모듈 개념이 만들어짐. 차후에 만들어진 ES 모듈이나CommonJS 모듈을 사용하는 라이브러리들에서 혹시 발생하는 충돌 방지
3. 비효율적 http request = 느린 로딩 (http/2의 경우에는 한번에 받을수 있는 방법이 있지만 적게 받는게 기본적으로 더 선호되고 http/1.1 같은경우에는 파이프라인을 사용하더라도 최대 6개만 가능하고 기본적으로 1개씩받아야되서 느림)

## 개발 이슈

1. folder structure

   - 이번에 바닐라 자바스크립트로 코드를 짜면서 폴더 구조에 대해서 무척 많은 고민을 했었다.

   처음에는 리액트처럼 컴퍼넌트 스타일로 하려다가 너무 리액트와 비슷하기도 해서 mvc 모델로 구성을 바꾸었었다. mvc 구조도 무척 다양하여 거기서 가장 간단한 mvc 모델을 차용하여 background랑 communication 하도록 구성했습니다. pubusb은 컨트롤러에서 callback을 넘겨주는걸로 구현했습니다.

2. chrome extension manifest v2→ v3로 변경되는 와중이라 몇몇 기능들이 사용이 안되는데 chrome api document에는 안적혀있는 문제가 있었습니다. 또한 기능따라 promise 지원 여부가 달라서 예상치 못한 버그가 종종 발생하였습니다. chrome api 개발 환경이 실시간으로 바뀌는 걸 볼 수 있는 좋은 경험이었습니다. 또한 사람들이 왜 모듈이나 라이브러리 사용할 때 최신 버전 안쓰고 안정된 버전을 쓰는지 뼈저리게 이해할 수 있었습니다.

### 느낀점

이번에 혼자 개발하면서 팀 개발이 가장 그리웠던 거 같습니다. 팀원들과 소통하며 아이디어, 기획부터 결과를 만들어내기까지의 과정을 혼자 하려하니 더 벅찼던 느낌이었습니다.

하지만 혼자 구조를 짜면서 엎고 다시 만들기도 하고 시행착오를 여럿 겪으면서 자바스크립트 기초를 다시 다질 수 있는 좋은 기회였다고 생각합니다. 분명 배웠지만 기억이 안나던 것도 있었고 이론으로만 알고있던걸 손으로 직접 써보는 계기도 되서 정말 좋았습니다.
