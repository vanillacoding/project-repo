# 🧩 Coblocks
<img width="300" alt="coblocks" src="https://user-images.githubusercontent.com/33389245/199156445-3843d2a7-9ae1-4df0-b75c-b59766dd8dfd.png">

`Coblocks`는 블록형태의 코드(`기능블록, 조건블록, 반복블록`)를 사용자가 원하는대로 조합해서 캐릭터를 목표지점까지 이동시키는 코딩 로직 교육용 게임입니다.

- ### 배포 사이트 링크: [Coblocks](https://www.coblocks.online/)

<br/>

## 🗓️ 프로젝트 기간
- 기간 : 2022.10.10 ~ 2022.10.28 (총 19일)
  - Week1
    - 아이디어 수집 및 확정
    - 기술스택 검증
    - Figma를 사용한 Mockup 제작
    - Daily 태스크카드 제작

  - Week 2 ~ Week 3
    - 개발
    - 버그 수정
    - 클라이언트 배포

<br/>

## 👨‍👧‍👦 팀 구성원
- `박규태` - pgt0708@gmail.com
- `허세준` - hsj890509@gmail.com
- `남민지` - minnienam0726@gmail.com

<br/>

## 🗂️ Contents
- [💡 개발 동기](https://github.com/Team-131/coblocks-client#-%EA%B0%9C%EB%B0%9C-%EB%8F%99%EA%B8%B0)
- [⚙️ 설치 및 실행](https://github.com/Team-131/coblocks-client#%EF%B8%8F-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%8B%A4%ED%96%89)
- [🛠️ 기술 스택](https://github.com/Team-131/coblocks-client#%EF%B8%8F-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D)
- [📂 파일 구조](https://github.com/Team-131/coblocks-client#-%ED%8C%8C%EC%9D%BC-%EA%B5%AC%EC%A1%B0)
- [🎮 Features](https://github.com/Team-131/coblocks-client#-features)
- [🔥 Challenges](https://github.com/Team-131/coblocks-client#-challenges)
- [📈 개선하고 싶은 점](https://github.com/Team-131/coblocks-client#-%EA%B0%9C%EC%84%A0%ED%95%98%EA%B3%A0-%EC%8B%B6%EC%9D%80-%EC%A0%90)
- [🤔 고민했던 점과 알게된 점](https://github.com/Team-131/coblocks-client#-%EA%B3%A0%EB%AF%BC%ED%96%88%EB%8D%98-%EC%A0%90%EA%B3%BC-%EC%95%8C%EA%B2%8C%EB%90%9C-%EC%A0%90)

<br/>

## 💡 개발 동기
- 코딩 교육 플랫폼인 `Scratch` 를 보고, `Visualized Code` 에 흥미를 가지게됐고, 비슷한 방식의 시각화된 코드를 조작하는 프로젝트들을 찾아본 결과, 해당 서비스(프로젝트)들은 공통적으로 `Blockly`라는 라이브러리를 사용한다는 걸 알게 되었습니다.

- 저희는 타 서비스(플랫폼)들과의 차별점으로 `Blockly` 라이브러리를 사용하지 않고, HTML Drag&Drop API 만을 사용해 코드를 시각화한 블록을 조작하는 기능을 직접 구현해보기로 했고, 거기에 더해 조작한 블록의 실행과정을 2D 애니메이션으로 보여주는 게임을 구현함으로써 코드 실행과정에 대한 이해와, 흥미를 끌어낼 수 있는 `Coblocks` 프로젝트를 기획하게 되었습니다.

<br/>

## ⚙️ 설치 및 실행

```
npm install
npm start
```

<br/>

## 🛠️ 기술 스택
### Frontend
- React
- Redux Toolkit
- React-Router-Dom
- Styled-Component

<br/>

### Task Tool
- Mockup : Figma [(link)](https://www.figma.com/file/vyLuBaRy1Qv2mlXhyHWoG3/Coblocks?node-id=0%3A1)
- 태스크카드 관리 및 기획 : Notion Kanban

<br/>

### Deployment
- Netlify

<br/>

## 📂 파일 구조
<details>
<summary>보기 / 숨기기</summary>
📦coblocks-client

 ┣ 📂public  
 ┃ ┃ ┣ 📂audio  
 ┃ ┃ ┃ ┗ 📜cat_and_soup.mp3  
 ┃ ┃ ┣ 📂image  
 ┃ ┃ ┃ ┣ 📜cat_asset.png  
 ┃ ┃ ┃ ┣ 📜empty_key.png  
 ┃ ┃ ┃ ┣ 📜error_image.png  
 ┃ ┃ ┃ ┣ 📜key.png  
 ┃ ┃ ┃ ┣ 📜logo_cat.png  
 ┃ ┃ ┃ ┣ 📜map_asset.png  
 ┃ ┃ ┃ ┗ 📜not_found.png  
 ┃ ┃ ┗ 📜favicon.ico  
 ┃ ┣ 📜_redirects  
 ┃ ┗ 📜index.html  
 ┣ 📂readme-assets  
 ┃ ┗ 📜coblocks.png  
 ┣ 📂src  
 ┃ ┣ 📂app  
 ┃ ┃ ┣ 📜App.js  
 ┃ ┃ ┗ 📜configureStore.js  
 ┃ ┃ ┣ 📂BlockCombinator  
 ┃ ┃ ┃ ┗ 📜BlockCombinator.js  
 ┃ ┃ ┣ 📂Header  
 ┃ ┃ ┃ ┗ 📜Header.js  
 ┃ ┃ ┣ 📂Map  
 ┃ ┃ ┃ ┗ 📜Map.js  
 ┃ ┃ ┣ 📂Modal  
 ┃ ┃ ┃ ┗ 📜Modal.js  
 ┃ ┃ ┣ 📂Music  
 ┃ ┃ ┃ ┗ 📜Music.js  
 ┃ ┃ ┗ 📜Portal.js  
 ┃ ┣ 📂config  
 ┃ ┃ ┗ 📜constants.js  
 ┃ ┣ 📂features  
 ┃ ┃ ┗ 📂block  
 ┃ ┃   ┗ 📜blockSlice.js  
 ┃ ┣ 📂mapInfo  
 ┃ ┃ ┣ 📜mapInfo.js  
 ┃ ┃ ┗ 📜tutorialMapsData.js  
 ┃ ┣ 📂pages  
 ┃ ┃ ┣ 📂Error  
 ┃ ┃ ┃ ┗ 📜Error.js  
 ┃ ┃ ┣ 📂Game  
 ┃ ┃ ┃ ┗ 📜Game.js  
 ┃ ┃ ┣ 📂GameList  
 ┃ ┃ ┃ ┗ 📜GameList.js  
 ┃ ┃ ┣ 📂Home  
 ┃ ┃ ┃ ┗ 📜Home.js  
 ┃ ┃ ┣ 📂NotFound  
 ┃ ┃ ┃ ┗ 📜NotFound.js  
 ┃ ┃ ┗ 📂Tutorial  
 ┃ ┃   ┗ 📜Tutorial.js  
 ┃ ┣ 📂utils  
 ┃ ┃ ┗ 📜sleep.js  
 ┃ ┗ 📜index.js  
 ┣ 📜.eslintrc.js  
 ┣ 📜.prettierrc.js  
 ┣ 📜README.md  
 ┣ 📜package-lock.json  
 ┗ 📜package.json  
</details>
<br/>

## 🎮 Features
<details>
<summary>보기 / 숨기기</summary>

|||
|:---:|:---:|
|![1 메인화면](https://user-images.githubusercontent.com/33389245/199160875-438964c7-3735-4356-b7c5-76d7d547f378.gif)|![2 연습하기](https://user-images.githubusercontent.com/33389245/199160886-9871868e-d498-4ff5-99a9-741455173753.gif)|
|1. 메인화면: 연습하기와 게임선택 중 선택가능합니다.|2. 연습하기: 총 5단계로 이루어진 튜토리얼 페이지로 이동합니다.|
|![3 블록조작](https://user-images.githubusercontent.com/33389245/199160889-68e66e54-2ecb-4719-9873-ff5005946b7b.gif)|![4 시작하기](https://user-images.githubusercontent.com/33389245/199160894-e77a19e8-a027-43a9-bce7-3d20b9e8e42f.gif)|
|3. 블록조작: 블록 위치이동을 할 수 있으며,<br/>`[계속 반복하기]`, `[반복하기]` 블록은 중첩 1회까지 가능합니다.|4. 시작하기: [코드 블록 놓기]에 놓인 순서대로 게임이 시작됩니다.|
|![5 블록비우기](https://user-images.githubusercontent.com/33389245/199160895-b910b231-03b4-4375-a01d-fdfa76ce1b84.gif)|![6 다시하기](https://user-images.githubusercontent.com/33389245/199160898-becbb1a1-11b3-45a1-aa03-c13f3e2470d3.gif)|
|5. 블록비우기: [코드 블록 놓기] 의 모든 블록들이 비워집니다.|6. 다시하기: 캐릭터가 출발점으로 되돌아오며,<br/>블록 조작 허용 상태로 변경됩니다.|
|![7 게임선택](https://user-images.githubusercontent.com/33389245/199160901-e287bdc8-0cd3-492f-9466-77cb599be871.gif)|![8 다음게임](https://user-images.githubusercontent.com/33389245/199160905-a6942cf6-4e3c-41e0-8272-2b979546036d.gif)|
|7. 게임선택: 총 5개로 이루어진 게임 페이지로 이동합니다.|8. 다음게임: 다음 단계의 게임으로 이동합니다.|
|![9 게임실패](https://user-images.githubusercontent.com/33389245/199160906-efac7c64-5c9c-4aba-a0b7-da02bc949d41.gif)|![10 게임성공](https://user-images.githubusercontent.com/33389245/199160909-676c0f78-c878-4c7d-a6fb-604c92a01177.gif)|
|9. 게임실패: 캐릭터가 목적지에 도달하지 못한 경우,<br/>`실패` 메세지가 표시됩니다.|10. 게임성공: 캐릭터가 목적지에 도달한 경우, `성공`메세지가 표시됩니다.|
</details>
<br/>

## 🔥 Challenges
### 라이브러리를 사용하지 않고 동적으로 상호작용하는 블록들을 어떻게 구현 할 것인가?
- `Blockly` 라이브러리를 사용하지 않고 필요한 기능만을 가진 블록을 직접 구현하기로 했는데, `Blockly` 라이브러리를 사용하지 않은 레퍼런스 사이트가 거의 없어서 어려움을 겪었습니다.
- 처음에는 블록의 위치를 제한없이 자유롭게 옮기면서 블록들의 데이터를 가져올 수 있는 방법에 대해 고민했었지만, 해당방법은 블록의 정보를 읽어오기 위해 좌표별 블록의 선후관계를 분석해야하므로 구현방식에 문제점이 있다고 판단하여 다른 관점으로 접근했습니다. 대안으로, drag&drop 이벤트 발생시 블록의 순서를 관리하는 배열형태의 상태(state)를 조작함으로써, 리렌더시 블록의 위치가 배열의 순서에 맞게 배치되도록 했으며 배열형태의 상태에서 블록정보를 읽어오는 방식으로 문제를 해결했습니다.

### 캔버스에서의 함수 구상 및 클린코드 적용
- canvas의 구조를 구상할 때 가장 신경 쓴 부분은 "어떻게 하면 블록에서 오는 명령을 잘 표현 해낼까?", "어떻게 캐릭터와 맵 요소간의 상호작용을 만들 것인가?" 였습니다. 그래서 생각해낸 방법은 canvas에 자체적인 좌표 개념을 도입하는 것이었습니다. canvas를 10 X 10으로 칸을 나누어서 좌표를 부여하고 해당 좌표에 맞춰서 맵 데이터와 asset을 구성하고 나니, "앞으로 1칸 이동" 등의 블록의 표현에 용이해졌고 캐릭터가 이동할 좌표를 미리 살펴 맵 요소와의 상호작용을 처리할 수 있게 되었습니다.
- 저희가 찾아보았던 canvas를 이용한 게임 래퍼런스들은 대부분 캐릭터를 한 번 그리고 나면 모든 맵을 초기화 시켜주는 방식을 사용했었습니다. 하지만 저희는 이동하는 방향과 속도가 한정적이고 canvas에 10X10의 좌표를 부여하고 해당 좌표에 맵 데이터를 맞춰놓았기에, 캐릭터의 현재 좌표와 다음 이동할 좌표 2 칸만을 갱신하는 방식으로 최적화를 시켜 주었습니다.
- canvas에 계산적인 요소가 많이 들어감으로 인해, canvas `drawImage` 메서드가 9개의 argument를 가지게 되었습니다. 협업을 하는 팀원들의 코드가독성을 높이기 위해 `configuration object`를 인수로 사용함으로써 함수의 역할과 총 몇개의 인수를 필요로 하는지 파악하게 쉽게 하였습니다.

### Interpreter 구현
- 사용자가 실행하기 버튼을 눌렀을때 쌓여진 블록정보를 Map 컴포넌트로 전송하기위해, useRef로 DOM Element의 정보를 가져와 object(배열도 포함)형태로 블록들의 `index`, `select태그에서 선택된 옵션`, `input 태그에서 입력된 옵션`, `중첩블록 내부의 블록정보` 등의 정보를 담은 뒤 redux state로 전송했습니다.</br>
또한, Map컴포넌트에서 전달받은 블록을 실행하기 위해 useEffect Hook의 의존성배열 인자로 쌓여진 블록정보를 받는 redux state를 설정함으로써, 전달받은 블록상태가 변경될때마다, 블록의 정보를 해석 및 분기문으로 케이스를 나눠 애니메이션 함수를 실행시켜주었습니다.

### 실행단계인 블록의 Highlighting
- Map 컴포넌트의 블록을 실행하는 함수에서, 각 실행단계별 블록의 index정보를 일반블록과 중첩블록을 구분하여 redux state로 전송했으며, BlockCombinator 컴포넌트의 useEffect Hook의 의존성배열 인자로 실행중인 블록정보를 받는 redux state를 설정함으로써, 실행되는 블록정보가 변경될때마다 해당블록을 가리키는 ref의 style속성을 참조해 highlighting 시키는 방법을 적용하였습니다.

<br/>

## 📈 개선하고 싶은 점
- 간편한 인터페이스를 위해 블록 Drag&Drop 상황에 여러가지 제한을 뒀는데, 오히려 이벤트 핸들러 함수에서 처리해야할 경우의 수가 생각이상으로 많아지는 문제가 생겼고, 각 경우의 수를 대비하기 위해 분기문을 일일이 만들어 처리해주었습니다.
이로인해, 처음 기획당시 예상하지 못한 경우의 수가 나올때마다 분기문을 추가하게됐고 가독성과 유지보수성이 떨어지는 코드가 된 것 같아 아쉬움이 남습니다. <br/>
따라서, 기존에 설정한 블록별 중첩횟수 제한등의 제약사항을 없애고 자유도를 높인다면, 처리 해줘야하는 경우의 수가 줄어서 분기문을 줄일수 있을것이고, 이벤트 핸들러를 컴포넌트 단위로 구분한다면 코드의 가독성을 높이고 유지보수성을 개선할 수 있을것으로 생각됩니다.
- `Framer-motion` 라이브러리를 활용해서, 블록 Drag&Drop시 블록위치가 바뀌는 모션을 동적으로 보여주면 UX를 조금 더 개선할 수 있을것으로 보입니다.

<br/>

## 🤔 고민했던 점과 알게된 점
### 전역 상태 관리 Context API vs Redux
- Redux는 Context API를 기반으로 만든 라이브러리이므로, 전역 상태 관리 측면에서는 차이점이 거의 없습니다.
하지만 high-frequency updates에 있어서 Context API는 좋지 않은 성능을 보이지만, Redux는 그렇지 않은것으로 알고있으며, 저희 프로젝트에서는 블록실행시 매 단계별 redux state update를 하기 때문에 성능을 고려해 Redux를 사용했습니다.
또한, Redux는 Context API에 없는 middleware를 제공하고, 저희는 개발편의성을 높일 수 있는 logger middleware를 사용하기 위해 Redux(toolkit)를 사용했습니다.

### 컴포넌트의 일반변수와 useRef로 관리하는 변수의 차이
- useRef는 .current 프로퍼티로 전달된 인자로 초기화된 변경가능한 ref객체를 반환합니다. <br/>
반환된 객체는 컴포넌트의 전 생애주기동안 유지되는것에 반해, 일반변수는 컴포넌트 리렌더시 값이 초기화 되므로 값이 유지되어야 하는경우 useRef를 통해 변수를 관리할 수 있다는 점을 알게되었습니다.

### React에서 querySelector와 useRef의 차이
- Vanilla Javascript에서는 DOM객체에 접근하기위해 querySelector API를 사용합니다.<br/>
React의 데이터는 State로 조작되기때문에, DOM API (querySelector)와 혼합해서 데이터 조작을 할 경우 디버깅이 어려워지고, 유지보수가 어려워지는 코드가 됩니다.
따라서, 함수형 컴포넌트에서 DOM 객체 조작이 필요한경우, React에서 제공하는 `useRef Hook`을 통해 DOM 객체의 직접적 참조주소를 반환받아 메소드 및 속성을 이용하는게 안전하다는것을 알게됐습니다.

### 블록코드를 useEffect Hook 내부 비동기함수에서 실행시, stale closure 이슈
- `시작하기` 버튼 클릭시, useEffect Hook 내부 함수에서 캐릭터 모션관련 함수를 실행시켰는데,
state로 관리하던 캐릭터의 좌표가 업데이트되지 않고 제자리에서만 반복적으로 움직이는 문제가 발견됐습니다.
이 문제를 해결하기위해, state로 관리하던 캐릭터 정보(좌표 및 방향)을 useRef 변수를 참조하도록 변경하여 항상 최신값을 가져오게 함으로써, 해당 이슈를 해결했습니다.
