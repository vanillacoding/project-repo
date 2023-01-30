# Vanillaide

<p align="center">
  <img style="width:500px" src="https://user-images.githubusercontent.com/99792713/199458778-30b3b65a-cb14-4807-bf07-7fbeb6a91a6b.png" alt="vanillaide-logo" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/React Native-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/Expo-000000?style=flat-square&logo=Expo&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/>
  <a href="https://app.netlify.com/sites/rococo-cucurucho-d38b30/deploys"  title="Netlify-deploy-status">
    <img src="https://api.netlify.com/api/v1/badges/2af3c3e4-7d8c-4e2d-97fe-df89463460d7/deploy-status"  alt="Netlify-deploy-status">
  </a>
  <img  src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/>
</p>

## Introduction

**Make your own websites on your phone**

Vanillaide는 코드 작성부터 배포까지 한번에 가능한 모바일 코드 에디터 어플리케이션입니다.
HTML, CSS, Javascript 코드를 작성할 수 있고, 배포 후에는 친구에게 링크를 공유할 수 있습니다.

<br/>

## Motivation

매일 대중교통에서 보내는 자투리 시간에 틈틈이 핸드폰으로 코딩 연습을 할 수 있었으면 좋겠다는 생각을 했습니다.
다른 모바일 코드 에디터 어플리케이션을 이용해보았지만 모바일 환경에 최적화 되어있지 않아 불편함을 느꼈습니다.
코딩 시 자주 사용되는 괄호나 세미콜론 등은 기호 화면으로 이동하여 입력해야 하고, 커서 이동 시 직접 손으로 화면을 터치해야 하는 등의 아쉬운 점이 있었습니다.

따라서 모바일에서도 편하게 코딩할 수 있는 어플리케이션인 **Vanillaide**를 제작하게 되었습니다.

<br/>
<br/>

# Contents

- [Vanillaide](#vanillaide)
- [Contents](#contents)
- [Features](#features)
- [Challenges](#challenges)
- [What we can do to improve](#what-we-can-do-to-improve)
- [Tech Stacks](#tech-stacks)
- [Github Repositories](#github-repositories)
- [Directory Structure](#directory-structure)
- [How to start](#how-to-start)
- [Planning](#planning)
- [Member](#member)

<br/>
<br/>

# Features

<table>
  <tr align="center">
    <td>Page</td>
    <td>Screenshot</td>
    <td>Features</td>
  </tr>
  <tr>
    <td align="center">
      Sign up, Sign in
    </td>
    <td align="center">
      <img style="width:200px" src="https://user-images.githubusercontent.com/110377189/204216191-23e25683-ff80-43b5-9876-97c4553fd19d.gif"/>
    </td>
    <td>
    <ul>
      <li>username, email, password, password Confirm 4가지를 올바른 형식에 맞게 입력해야 합니다.</li>
      <li>중복된 이메일로는 가입할 수 없습니다.</li>
      <li>email, password 두 가지를 모두 가입한 내용과 일치하게 입력해야 로그인됩니다.</li>
      <li>로그인 성공 후 토큰이 발급되며 토큰은 사용자의 기기 내에 저장되어 로그인이 유지됩니다.</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td align="center">
      My projects
    </td>
    <td align="center">
      <img style="width:200px" src="https://user-images.githubusercontent.com/110377189/204216351-a018f1b0-173e-4166-b47e-51e195b6f507.gif"/>
    </td>
    <td>
    <ul>
      <li>유저가 생성한 프로젝트 리스트를 볼 수 있습니다.</li>
      <li>하단 오른쪽의 + 버튼 클릭 시 프로젝트 생성 모달 창이 나타나며 프로젝트 이름 입력 시 프로젝트가 생성되며 에디터 화면으로 이동합니다.</li>
      <li>각 프로젝트 카드 클릭 시 해당 프로젝트의 에디터 화면으로 이동합니다.</li>
      <li>배포한 프로젝트는 프로젝트명 옆에 deployed가 표시됩니다.</li>
      <li>각 프로젝트 카드의 3 dots menu 클릭 시 상세 메뉴가 나타납니다. 상세 메뉴는 배포 여부(deployed)에 따라 다른 내용이 나타납니다.</li>
      <li>상단 왼쪽의 햄버거 메뉴 아이콘 클릭 시 다음의 정보가 나타납니다 : 로그인한 사용자 정보, 로그아웃 버튼, My Projects 메뉴</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td align="center">
      Editor
    </td>
    <td align="center">
      <img style="width:200px" src="https://user-images.githubusercontent.com/110377189/204216347-60c4941e-a55a-4bc6-af19-cdf2378cd17a.gif"/>
    </td>
    <td>
    <ul>
      <li>최상단 왼쪽 햄버거 메뉴 클릭 시 로그인 한 사용자 정보, 로그아웃, My Projects, 현재 프로젝트 정보를 볼 수 있습니다.</li>
      <li>최상단 오른쪽 메뉴(왼쪽부터 순서대로) Play 아이콘(현재 작성된 코드의 실행 결과 미리보기), Undo 버튼, Redo 버튼, disk 아이콘(현재까지 작성한 코드 DB에 저장)</li>
      <li>HTML, CSS, JS탭: 언어별로 코드 작성 가능</li>
      <li>하단 오른쪽 방향 키: 커서를 상, 하, 좌, 우로 이동할 수 있는 키</li>
      <li>하단 툴바(코드 작성 시 키보드 위쪽): 코드 작성 시 자주 사용하는 기호(괄호, 세미콜론, tab 등)를 바로 입력 가능</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td align="center">
      Deploy
    </td>
    <td align="center">
      <img style="width:500px" src="https://user-images.githubusercontent.com/110377189/204216341-9adf4c9d-262d-4ec1-8863-a04717318610.gif"/>
    </td>
    <td>
    <ul>
      <li>프로젝트를 배포할 수 있습니다.</li>
      <li>deploy 클릭 시 배포가 시작됩니다.</li>
      <li>배포 완료 후에는 배포 완료 페이지로 이동합니다.</li>
      <li>go to 클릭 시 배포된 페이지로 바로 이동하며, 클립 버튼 클릭 시 클립보드에 배포된 링크가 복사됩니다.</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td align="center">
      Performance
    </td>
    <td align="center">
      <img style="width:200px" src="https://user-images.githubusercontent.com/110377189/204216352-bb2de1d9-df2a-4504-a161-c53c4832cfec.gif"/>
    </td>
    <td>
    <ul>
      <li>사용자가 배포된 웹사이트의 성능을 측정하는 페이지 입니다.</li>
      <li>start measuring 클릭 시 lighthouse 성능 측정이 시작됩니다.</li>
      <li>성능 측정 결과는 프로젝트명과 함께 바 그래프로 표시됩니다. 측정 항목은 Performance, Accessibility, Best Practices, SEO, PWA 입니다.</li>
    </ul>
    </td>
  </tr>
</table>

<br/>
<br/>

# Challenges

### React Native Life Cycle 이해

브라우저에서 실행되는 React와 다르게, React native는 스크린 화면이 stack 구조로 쌓이고, componentWillUnmount가 다르게 동작하여, 새로운 페이지에서 기존 Project list 페이지로 다시 이동하더라도 useEffect가 실행되지 않는 문제점이 있었습니다.

이 문제를 해결하기 위하여 React Navigation에서 제공하는 useFocusEffect hook을 사용하여, Project list 페이지로 다시 이동하였을 때, api 요청을 다시 보내, 직전에 생성한 프로젝트가 리스트에 반영될 수 있도록 수정하였습니다.

<br/>

### Undo/Redo

원래 CodeMirror는 Ctrl+z, Ctrl+Shift+z로 undo와 redo기능을 제공하고 있습니다.

하지만 모바일 환경에서 Undo, Redo를 버튼으로 동작하게 하기위해서, code의 data structure를 linked list로 구현하였습니다.

<details>
<summary>Code Data Structure</summary>

```jsx
{
	content: "your code", // 코드의 내용이 string type으로 저장됩니다.
	anchor: number, // undo, redo시 이 곳에서부터 caret까지 텍스트가 선택됩니다.
	head: number, // undo, redo시 위치할 caret의 위치입니다.
	prev: node, // 이전 상태가 저장됩니다.
	next: node, // 다음 상태가 저장됩니다.
}
```

</details>

<br/>

### Code의 노드 정보를 저장하는 시점

<details>
<summary>Code 노드 정보 저장 Cases</summary>

```
|는 저장된 커서 위치

1. 연속으로 빠르게 입력할 때에는 상태를 저장하지 않음
[node1]
|

[node2]
abcdefghijklmnopqrstuvwxyz| - 각 입력 term이 500ms 이내

2. 연속으로 빠르게 입력하지 않을 때에는 일정 간격으로 상태를 저장
[node1]
|

[node2]
abcd| - d 입력 이후 500ms 경과

[node3]
abcdefghijklmnopqrstuvwxyz| - e~z까지 각 입력 term이 500ms 이내

3. 스페이스바, 탭, 엔터 등 특정 입력시에 즉시 상태 저장
[node1]
|

[node2]
abcd |

[node3]
abcd efg |

[node4]
abcd efg
|

[node5]
abcd efg
nopqrstuvwxyz| - 각 space, enter 입력마다 상태 저장

4. caret 이동 후 입력 시작시 '현재상태의 anchor, head 변경'
[node1]
abcdefg|

[node1] -> c와 d사이에서 입력 시작
abc|defg

[node2]
abchij|defg

5. 범위 선택 시
[node1]
abcdefg - anchor(텍스트 선택 시작지점), head(텍스트 선택 끝지점)

[node2]
ahij|g

6. 포커스 해제시
다른 언어 탭 선택, tool bar 사용 등 코드area에서 포커스 해제시 상태 저장
```

</details>

상태를 저장하는 시점을 정하는 것, 그리고 그 시점에 맞는 caret의 위치를 저장하는 부분이 상당히 어려웠지만,

위와 같이 모든 상태의 caret 위치를 기록함으로서 undo 및 redo 이후 caret위치를 적절하게 보여줄 수 있었습니다.

<br/>

### 상태저장 debounce

위에서 언급된 1~3번을 구현하기 위해 커스텀 debounce 함수를 만들어 사용했습니다.

연속으로 빠르게 입력할 때에는 저장하지 않지만 입력이 없는 상태로 특정 시간이 경과하면(e.g. 500ms) 상태를 저장하게 됩니다.

이 때 특정 입력이 감지되면 바로 저장을 해야되는데 이 때 이전 debounce의 setTimeOut을 clear 해야 하므로 timer에 대한 서로 같은 closer를 가지고 있어야 했고,

따라서 같은 debounce 함수를 실행하면서도 각기 delay가 다른 함수를 사용할 수 있어야 했습니다. 그래서 debounce함수 선언시 delay를 정하는 것이 아닌,

사용 시 delay를 정하는 형태로 debounce함수를 별도로 만들었습니다.

<br/>

### 특정 키 입력 감지

모바일에서 입력된 keyPress를 웹 클라이언트의 onKeyPress 이벤트 리스너로 감지하지 못하는 이슈가 있었습니다.

검색을 해보니 이미 알려진 이슈이지만 고쳐지지 않고 있다는 것을 알게되었습니다. 그래서 CodeMirror에서 제공하는 “업데이트 된 문자” 항목을 찾아냈고,

이를 통해 업데이트 된 문자의 마지막이 `“ “`(공백)이거나 `\n`(줄바꿈)인 것을 감지하여 onKeyPress 이벤트 리스너와 유사한 동작을 구현할 수 있었습니다.

<br/>

### 입력이 시작되는 시점

위에서 언급된 4번 항목을 구현하기 위해서는 입력이 시작되는 시점을 저장하는 것이 필요하였습니다.

따라서, 입력이 시작되었음을 감지하여 입력이 시작되는 시점의 caret위치를 현재 node의 anchor와 head에 반영하였습니다.

입력이 시작되었음을 state boolean값으로 관리하여 입력되는 동안에는 caret 위치를 현재 node에 쓰지 않게 함으로써 undo시에 적절한 caret위치로 돌아갈 수 있게 되었습니다.

상태가 저장되면 state boolean값을 변경함으로써 다시 입력이 시작되는 것을 대기하게 됩니다.

<br/>

# What we can do to improve

<details>
<summary>Text Editor 직접 구현</summary>

처음에는 html의 `<textarea>` 태그 또는 그와 비슷한 RN의 `<TextInput>`을 통해 구현할 수 있을 거라고 생각했습니다.

하지만 아래 두 가지 측면에서 텍스트 에디터가 단순 textarea 또는 TextInput으로 구현되는 것이 아니라는 것을 깨닫게 되어 아래 POC를 진행하였습니다.

- 부분적인 스타일 수정이 사실상 불가능
- 텍스트의 Line에 대한 정의가 어려움

<br/>

**`<span>`, `<div>`를 사용한 구현 시도 내용 및 Codemirror 구현 로직 조사**

```html
<pre id="code-editor">
	<div id="line-number1">
		<span class="text-type-keyword">const</span>
		<span class="text-type-var">foo</span>
		<span class="text-type-sign">=</span>
		<span class="text-type-string">"bar"</span><span class="text-type-marks">;</span>
	</div>
	<div id="line-number2">
		<span class="text-type-var">console</span><span class="text-type-marks">.</span><span class="text-type-func">log</span><span class="text-type-marks">(</span><span class="text-type-var">foo</span><span class="text-type-marks">;</span>
	</div>
</pre>
```

POC 단계에서의 기술적 시도는 `<span>`이나 `<div>`태그를 이용한 이어붙이기 방식이었습니다.

그러나 이 방법을 사용할 경우 사용자로 하여금 내가 실제로 텍스트를 입력중이라는 느낌을 받게 하는 것이 어려웠습니다.

그래서 대표적인 code editor 라이브러리인 codemirror는 어떤 방식으로 이것을 구현했는지 찾아보니 생각보다 훨씬 복잡한 방법으로 구현하고 있음을 알게 되었습니다.

<img style="width:1000px" src="https://user-images.githubusercontent.com/99792713/199449836-6f7e0232-0162-4ee9-885a-38780303c63f.png" />

사용자가 텍스트 입력 위치를 변경할 때 마다 새로운 `<textarea>`를 생성하고 없애는 것을 반복하고 있었습니다.

이 `textarea`는 내가 클릭하거나 방향키를 움직이는 부분의 위치로 **absolute하게 이동되고 있었고** `textarea`에 적히는 내용은 바로 위 부모 `div`에 의해 완전히 감춰지고 있었습니다.

그리고 caret(키보드 커서)역시 하나의 요소로서 현재 입력되고 있는 위치와 일치하도록 그 위치를 계속 변경해주고 있었습니다.

뿐만 아니라 기존 내용을 수정함에 있어서도 ‘현재 선택된 `div`, `span`요소’를 판단하고 이를 다시 수정하게끔 하는 것이 앞서 언급한 ‘입력하고 있다는 느낌을 주는 것’과 결합되면 단기간 안에 구현할 수 있는 것이 아니라는 생각을 하게 되었습니다.

추후 충분한 시간이 주어진다면 앞서 시도해본 내용을 좀 더 발전시켜 직접 코드 에디터 기능을 구현해보고 싶습니다.

</details>

<br/>
<br/>

# Tech Stacks

### Client

- React
- React Native (Expo)
- React Native Webview
- React Native Navigation
- Context API

### Client-Web

- React
- Styled Components

### Server

- Node JS
- Express
- MongoDB & Mongoose
- Ejs
- Node Schedule

### Testing

- Jest
- React Testing Library
- Node Mocks Http
- Supertest

### Deployment

- Netlify
- AWS Elastic Beanstalk

<br/>
<br/>

# Github Repositories

- [Backend Repo](https://github.com/Vanillaide/vanillaide-server)
- [Frontend Repo](https://github.com/Vanillaide/vanillaide-client-web)
- [React-Native Repo](https://github.com/Vanillaide/vanillaide-client)

<br/>
<br/>

# Directory Structure

<details>
<summary>server(src folder)</summary>
<div markdown="1">

```bash
.
├── app.js
├── bin
│   └── www
├── constants
│   ├── error.js
│   └── validateCondition.js
├── controllers
│   ├── auth.controller.js
│   ├── project.controller.js
│   └── user.controller.js
├── loaders
│   ├── db.js
│   ├── index.js
│   └── server.js
├── manageDeploymentExpiration.js
├── middlewares
│   ├── authenticate.js
│   ├── errorHandler.js
│   └── invalidUrlHandler.js
├── models
│   ├── Project.js
│   └── User.js
├── routes
│   ├── auth.js
│   ├── index.js
│   ├── projects.js
│   └── users.js
├── spec
│   ├── __mocks__
│   │   ├── sample_project.json
│   │   └── sample_user.json
│   ├── integration
│   │   ├── auth.int.spec.js
│   │   ├── project.int.spec.js
│   │   └── users.int.spec.js
│   └── unit
│       ├── auth.controller.spec.js
│       ├── project.controller.spec.js
│       └── user.controller.spec.js
└── views
    ├── deployedProject.ejs
    └── notFound.ejs
```

</div>
</details>
<details>
<summary>client-web(src folder)</summary>
<div markdown="1">

```bash
.
├── App.js
├── assets
│   └── fonts
│       ├── FiraCode-Regular.ttf
│       └── Playball-Regular.ttf
├── components
│   ├── CodeArea.js
│   ├── FunctionHeader
│   │   ├── FunctionHeader.js
│   │   ├── RedoButton
│   │   │   └── RedoButton.js
│   │   ├── RunButton
│   │   │   └── RunButton.js
│   │   ├── SaveButton
│   │   │   └── SaveButton.js
│   │   └── UndoButton
│   │       └── UndoButton.js
│   ├── LanguageBar.js
│   ├── MoveCursorButtons
│   │   ├── MoveCursorButtons.js
│   │   ├── MoveDownButton
│   │   │   └── MoveDownButton.js
│   │   ├── MoveLeftButton
│   │   │   └── MoveLeftButton.js
│   │   ├── MoveRightButton
│   │   │   └── MoveRightButton.js
│   │   └── MoveUpButton
│   │       └── MoveUpButton.js
│   └── ToolBar.js
├── constants
│   └── color.js
├── font.css
├── index.js
├── layout
│   ├── AppHeader.js
│   ├── ContentBox.js
│   └── Layout.js
├── setupTests.js
├── spec
│   └── components
│       ├── LanguageBar.spec.js
│       ├── RedoButton.spec.js
│       ├── RunButton.spec.js
│       ├── ToolBar.spec.js
│       └── UndoButton.spec.js
└── utils
    ├── debounce.js
    ├── integrateCode.js
    └── updateCursor.js
```

</div>
</details>
<details>
<summary>client</summary>
<div markdown="1">

```bash
.
├── App.js
├── assets
│   └── fonts
│       ├── FiraCode-Regular.ttf
│       └── Playball-Regular.ttf
├── components
│   ├── CodeArea.js
│   ├── FunctionHeader
│   │   ├── FunctionHeader.js
│   │   ├── RedoButton
│   │   │   └── RedoButton.js
│   │   ├── RunButton
│   │   │   └── RunButton.js
│   │   ├── SaveButton
│   │   │   └── SaveButton.js
│   │   └── UndoButton
│   │       └── UndoButton.js
│   ├── LanguageBar.js
│   ├── MoveCursorButtons
│   │   ├── MoveCursorButtons.js
│   │   ├── MoveDownButton
│   │   │   └── MoveDownButton.js
│   │   ├── MoveLeftButton
│   │   │   └── MoveLeftButton.js
│   │   ├── MoveRightButton
│   │   │   └── MoveRightButton.js
│   │   └── MoveUpButton
│   │       └── MoveUpButton.js
│   └── ToolBar.js
├── constants
│   └── color.js
├── font.css
├── index.js
├── layout
│   ├── AppHeader.js
│   ├── ContentBox.js
│   └── Layout.js
├── setupTests.js
├── spec
│   └── components
│       ├── LanguageBar.spec.js
│       ├── RedoButton.spec.js
│       ├── RunButton.spec.js
│       ├── ToolBar.spec.js
│       └── UndoButton.spec.js
└── utils
    ├── debounce.js
    ├── integrateCode.js
    └── updateCursor.js
```

</div>
</details>

<br/>
<br/>

# How to start

### Client (Web)

1.  [해당 Repository](https://github.com/Vanillaide/vanillaide-client-web)를 git clone을 합니다.

2.  해당 프로젝트 폴더 내에서 아래의 명령어를 실행합니다.

        ```
        $ npm install
        $ npm start
        ```

    <br/>

### Client (React Native Mobile App)

1. [해당 Repository](https://github.com/Vanillaide/vanillaide-client)를 git clone을 합니다.
2. environment.js 파일에 아래와 같이 환경 변수를 입력합니다.

   ```jsx
   import Constants from "expo-constants";

   const ENV = {
     dev: {
       BACK_URL: <origin uri: default = "http://localhost:8000">
       WEBVIEW_URL: <origin uri: default = "http://localhost:3000">
     },
   };

   const getEnvVars = (env = Constants.manifest.releaseChannel) => {
     if (__DEV__) {
       return ENV.dev;
     }
   };

   export default getEnvVars;
   ```

3. 해당 프로젝트 폴더 내에서 아래의 명령어를 실행합니다.

   ```
   $ npm install
   $ npm run start
   ```

4. Android의 경우 PlayStore에서 `Expo`를 IOS의 경우 AppStore에서 `Expo Go`를 다운로드 받습니다.
5. 해당 Expo어플리케이션에서 QR코드인식 모드를 켭니다.
6. 프로젝트에서 표시된 QR코드를 스캔합니다.

<br/>

### Server

1. [해당 Repository](https://github.com/Vanillaide/vanillaide-server)를 git clone을 합니다.
2. 환경변수 파일(.env)을 생성하고 아래와 같은 형식으로 입력합니다.

   ```
   DB_HOST=<db host>
   JWT_SECRET_KEY=<jwt secret key>
   BACK_URL=<origin uri: default = "http://localhost:8000">
   ```

3. 해당 프로젝트 폴더 내에서 아래의 명령어를 실행합니다.

   ```
   $ npm install
   $ npm run start
   ```

<br/>
<br/>

# Planning
**프로젝트 기간: 2022. 10. 10 ~ 10. 28**

<details>
<summary>1주차 : 기획 및 설계</summary>

- 아이디어 검토 및 기술 스택 결정
- Prototype Sketch
- Database Schema 설계
- Server Endpoint 정의
- Git, Code Style 조율
- Task Scheduling 및 Role 정의
- 개발 환경 셋업 - React Native Expo - Express (Node.js)
</details>

<details>
<summary>2주차 : 기능 개발</summary>

- Sign up, Sign in 페이지
- Project list 페이지
- Editor 페이지, Webview 설정
- 클라이언트 요청을 위한 API 서버 구축
- 로그인 유저, 특정 프로젝트에 대한 전역 상태 관리
</details>

<details>
<summary>3주차 : 기능 개발 및 마무리</summary>

- Editor 페이지 기능 개선
- Deploy 요청 및 결과 페이지
- Deployed 페이지 : 서버사이드 렌더링
- Node scheduling server 구축
- Performance 페이지 : lighthouse
- Code Style 통일, Component 분리 작업
- 파일, 폴더 구조 개선
- Client / Server Test Code 작성
- Client / Server 배포 - Client(Web) : Netlify - Server : Amazon Elastic Beanstalk
</details>

<br/>
<br/>

# Member

- 박태욱

  Contact : dcjimin@gmail.com

- 예소현

  Contact : needtlc13@gmail.com

- 한지수

  Contact : jessie.jisu.h@gmail.com
